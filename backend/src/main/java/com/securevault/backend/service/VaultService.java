package com.securevault.backend.service;

import java.time.LocalDateTime;
import java.util.Base64;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import com.securevault.backend.model.VaultItem;
import com.securevault.backend.repository.VaultRepository;
import com.securevault.backend.security.AESEncryption;

@Service
public class VaultService {

    @Autowired
    private VaultRepository vaultRepository;

    @Autowired
    private AuditService auditService;

    @Autowired
    private ActivityService activityService;

    // SAVE SECRET
    public String saveItem(VaultItem item) {

        String encrypted =
                AESEncryption.encrypt(item.getEncryptedData());

        item.setEncryptedData(encrypted);

        item.setCreatedAt(LocalDateTime.now());

        vaultRepository.save(item);

        auditService.log(
                item.getUserEmail(),
                "VAULT_ITEM_CREATED"
        );

        activityService.log(
                item.getUserEmail(),
                "Secret Added",
                item.getTitle()
        );

        return "Vault item saved securely";
    }

    // GET ITEMS
    public List<VaultItem> getItems(String email) {

        List<VaultItem> items =
                vaultRepository.findByUserEmail(email);

        for (VaultItem item : items) {

            if (item.getEncryptedData() != null) {

                try {

                    String decrypted =
                            AESEncryption.decrypt(
                                    item.getEncryptedData()
                            );

                    item.setEncryptedData(decrypted);

                } catch (Exception e) {

                    item.setEncryptedData("Unable to decrypt");
                }
            }

            item.setEncryptedFile(null);
        }

        return items;
    }

    // GET FILES
    public List<VaultItem> getFiles(String email) {

        List<VaultItem> files =
                vaultRepository
                        .findByUserEmailAndEncryptedFileIsNotNull(email);

        for (VaultItem item : files) {

            item.setEncryptedFile(null);
            item.setEncryptedData(null);
        }

        return files;
    }

    // DELETE
    public String deleteItem(String id, String email) {

        VaultItem item =
                vaultRepository
                        .findByIdAndUserEmail(id, email)
                        .orElse(null);

        if (item == null) {
            return "Item not found";
        }

        vaultRepository.delete(item);

        auditService.log(
                email,
                "VAULT_ITEM_DELETED"
        );

        activityService.log(
                email,
                "Secret Deleted",
                item.getTitle()
        );

        return "Item deleted";
    }

    // UPDATE
    public String updateItem(String id, VaultItem updatedItem) {

        VaultItem existing =
                vaultRepository.findById(id).orElse(null);

        if (existing == null) {
            return "Item not found";
        }

        existing.setTitle(updatedItem.getTitle());
        existing.setType(updatedItem.getType());

        existing.setEncryptedData(
                AESEncryption.encrypt(
                        updatedItem.getEncryptedData()
                )
        );

        vaultRepository.save(existing);

        auditService.log(
                existing.getUserEmail(),
                "VAULT_ITEM_UPDATED"
        );

        activityService.log(
                existing.getUserEmail(),
                "Secret Updated",
                existing.getTitle()
        );

        return "Item updated successfully";
    }

    // FILE UPLOAD
    public String uploadFile(
            String email,
            String title,
            MultipartFile file
    ) {

        try {

            VaultItem item = new VaultItem();

            item.setUserEmail(email);
            item.setTitle(title);

            String contentType = file.getContentType();

            if (contentType != null) {

                if (contentType.contains("pdf")) {
                    item.setType("PDF");
                } else if (contentType.contains("image")) {
                    item.setType("IMAGE");
                } else if (contentType.contains("spreadsheet")
                        || contentType.contains("excel")) {
                    item.setType("EXCEL");
                } else if (contentType.contains("presentation")
                        || contentType.contains("powerpoint")) {
                    item.setType("PPT");
                } else {
                    item.setType("DOCUMENT");
                }
            }

            item.setFileName(file.getOriginalFilename());
            item.setFileType(file.getContentType());

            String encrypted =
                    AESEncryption.encrypt(
                            Base64.getEncoder()
                                    .encodeToString(file.getBytes())
                    );

            item.setEncryptedFile(encrypted);

            item.setCreatedAt(LocalDateTime.now());

            vaultRepository.save(item);

            activityService.log(
                    email,
                    "File Uploaded",
                    file.getOriginalFilename()
            );

            return "File uploaded successfully";

        } catch (Exception e) {

    System.out.println("========== FILE UPLOAD ERROR ==========");
    e.printStackTrace();
    System.out.println("Exception Class : " + e.getClass().getName());
    System.out.println("Exception Msg   : " + e.getMessage());
    System.out.println("=======================================");

    return "Upload failed: "
            + e.getClass().getName()
            + " : "
            + e.getMessage();
}
    }

    // DOWNLOAD
    public VaultItem getFileById(String id, String email) {

        VaultItem item =
                vaultRepository
                        .findByIdAndUserEmail(id, email)
                        .orElse(null);

        if (item != null) {

            activityService.log(
                    email,
                    "File Downloaded",
                    item.getFileName()
            );
        }

        return item;
    }
}