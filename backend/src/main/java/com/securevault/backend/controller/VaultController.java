package com.securevault.backend.controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.multipart.MultipartFile;

import com.securevault.backend.model.VaultItem;
import com.securevault.backend.service.VaultService;

import org.springframework.http.HttpHeaders;
import org.springframework.http.ResponseEntity;

import jakarta.servlet.http.HttpServletRequest;

import java.util.Base64;
import com.securevault.backend.security.AESEncryption;

@RestController
@RequestMapping("/api/vault")
@CrossOrigin(origins = "*")
public class VaultController {

    @Autowired
    private VaultService vaultService;

    // ADD ITEM
    @PostMapping("/add")
    public String addItem(@RequestBody VaultItem item,
                          HttpServletRequest request) {

        String email = (String) request.getAttribute("email");

        item.setUserEmail(email);

        return vaultService.saveItem(item);
    }

    // GET ITEMS
    @GetMapping("/my-items")
    public List<VaultItem> getItems(HttpServletRequest request) {

        String email = (String) request.getAttribute("email");

        return vaultService.getItems(email);
    }

    // DELETE ITEM
    @DeleteMapping("/delete/{id}")
        public String deleteItem(
                @PathVariable String id,
                HttpServletRequest request
        ) {
        String email =
            (String) request.getAttribute("email");

        return vaultService.deleteItem(id, email);
    }

    // UPDATE ITEM
    @PutMapping("/update/{id}")
    public String updateItem(@PathVariable String id,
                             @RequestBody VaultItem item) {

        return vaultService.updateItem(id, item);
    }
    
    @PostMapping("/upload")
    public String uploadFile(
            @RequestParam("title") String title,
            @RequestParam("file") MultipartFile file,
            HttpServletRequest request
    ) {

        String email =
                (String) request.getAttribute("email");

        return vaultService.uploadFile(
                email,
                title,
                file
        );
    }
    @GetMapping("/files")
    public List<VaultItem> getFiles(
            HttpServletRequest request
    ) {

        String email =
                (String) request.getAttribute("email");

        return vaultService.getFiles(email);
    }
    @GetMapping("/download/{id}")
    public ResponseEntity<byte[]> downloadFile(
        @PathVariable String id,
        HttpServletRequest request
    ) {

        String email =
            (String) request.getAttribute("email");

        VaultItem item =
            vaultService.getFileById(
                    id,
                    email
            );

        if (item == null) {

                return ResponseEntity
                        .notFound()
                        .build();
        }

        try {

                String decryptedBase64 =
                        AESEncryption.decrypt(
                                item.getEncryptedFile()
                        );

                byte[] fileBytes =
                        Base64.getDecoder()
                                .decode(decryptedBase64);

                return ResponseEntity.ok()
                        .header(
                                HttpHeaders.CONTENT_DISPOSITION,
                                "attachment; filename=" + item.getFileName()
                        )
                        .header(
                                HttpHeaders.CONTENT_TYPE,
                                item.getFileType()
                        )
                        .body(fileBytes);

        } catch (Exception e) {

                return ResponseEntity.internalServerError()
                        .build();
        }
    }
    @GetMapping("/preview/{id}")
        public ResponseEntity<String> previewFile(
                @PathVariable String id,
                HttpServletRequest request
        ) {

        String email =
            (String) request.getAttribute("email");

        VaultItem item =
            vaultService.getFileById(id, email);

        if (item == null) {
                return ResponseEntity.notFound().build();
        }

        try {

                String decrypted =
                        AESEncryption.decrypt(
                                item.getEncryptedFile()
                        );

                byte[] bytes =
                        Base64.getDecoder()
                                .decode(decrypted);

                String content =
                        new String(bytes);

                return ResponseEntity.ok(content);

        } catch (Exception e) {

                e.printStackTrace();

                return ResponseEntity.internalServerError()
                        .build();
        }
    }
}
