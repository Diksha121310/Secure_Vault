package com.securevault.backend.security;

import java.nio.charset.StandardCharsets;
import java.security.SecureRandom;
import java.util.Base64;

import javax.crypto.Cipher;
import javax.crypto.SecretKey;
import javax.crypto.spec.GCMParameterSpec;
import javax.crypto.spec.SecretKeySpec;

public class AESEncryption {

    // EXACTLY 32 CHARACTERS = 32 BYTES
    private static final byte[] KEY = new byte[] {
        1, 2, 3, 4,
        5, 6, 7, 8,
        9, 10, 11, 12,
        13, 14, 15, 16
    };

    private static final int IV_LENGTH = 12;

    private static final int TAG_LENGTH = 128;

    private static SecretKey getKey() {

        return new SecretKeySpec(KEY, "AES");
    }

    // ENCRYPT
    public static String encrypt(String plainText) {

        try {

            byte[] iv = new byte[IV_LENGTH];

            SecureRandom secureRandom = new SecureRandom();

            secureRandom.nextBytes(iv);

            Cipher cipher =
                    Cipher.getInstance("AES/GCM/NoPadding");

            GCMParameterSpec spec =
                    new GCMParameterSpec(TAG_LENGTH, iv);

            cipher.init(
                    Cipher.ENCRYPT_MODE,
                    getKey(),
                    spec
            );

            byte[] encrypted =
                    cipher.doFinal(
                            plainText.getBytes(StandardCharsets.UTF_8)
                    );

            byte[] combined =
                    new byte[IV_LENGTH + encrypted.length];

            System.arraycopy(
                    iv,
                    0,
                    combined,
                    0,
                    IV_LENGTH
            );

            System.arraycopy(
                    encrypted,
                    0,
                    combined,
                    IV_LENGTH,
                    encrypted.length
            );

            return Base64.getEncoder()
                    .encodeToString(combined);

        } catch (Exception e) {

            throw new RuntimeException(
                    "Encryption failed",
                    e
            );
        }
    }

    // DECRYPT
    public static String decrypt(String encryptedText) {

        try {

            byte[] decoded =
                    Base64.getDecoder()
                            .decode(encryptedText);

            byte[] iv = new byte[IV_LENGTH];

            byte[] encrypted =
                    new byte[decoded.length - IV_LENGTH];

            System.arraycopy(
                    decoded,
                    0,
                    iv,
                    0,
                    IV_LENGTH
            );

            System.arraycopy(
                    decoded,
                    IV_LENGTH,
                    encrypted,
                    0,
                    encrypted.length
            );

            Cipher cipher =
                    Cipher.getInstance("AES/GCM/NoPadding");

            GCMParameterSpec spec =
                    new GCMParameterSpec(TAG_LENGTH, iv);

            cipher.init(
                    Cipher.DECRYPT_MODE,
                    getKey(),
                    spec
            );

            byte[] decrypted =
                    cipher.doFinal(encrypted);

            return new String(
                    decrypted,
                    StandardCharsets.UTF_8
            );

        } catch (Exception e) {

            throw new RuntimeException(
                    "Decryption failed",
                    e
            );
        }
    }
    
    public static byte[] encryptBytes(byte[] data) {

        try {

                byte[] iv = new byte[IV_LENGTH];

                SecureRandom secureRandom =
                        new SecureRandom();

                secureRandom.nextBytes(iv);

                Cipher cipher =
                        Cipher.getInstance("AES/GCM/NoPadding");

                GCMParameterSpec spec =
                        new GCMParameterSpec(
                                TAG_LENGTH,
                                iv
                        );

                cipher.init(
                        Cipher.ENCRYPT_MODE,
                        getKey(),
                        spec
                );

                byte[] encrypted =
                        cipher.doFinal(data);

                byte[] combined =
                        new byte[
                                IV_LENGTH +
                                encrypted.length
                        ];

                System.arraycopy(
                        iv,
                        0,
                        combined,
                        0,
                        IV_LENGTH
                );

                System.arraycopy(
                        encrypted,
                        0,
                        combined,
                        IV_LENGTH,
                        encrypted.length
                );

                return combined;

        } catch (Exception e) {

                throw new RuntimeException(
                        "File encryption failed",
                        e
                );
        }
    }
    
    public static byte[] decryptBytes(byte[] data) {

        try {

                byte[] iv =
                        new byte[IV_LENGTH];

                byte[] encrypted =
                        new byte[
                                data.length -
                                IV_LENGTH
                        ];

                System.arraycopy(
                        data,
                        0,
                        iv,
                        0,
                        IV_LENGTH
                );

                System.arraycopy(
                        data,
                        IV_LENGTH,
                        encrypted,
                        0,
                        encrypted.length
                );

                Cipher cipher =
                        Cipher.getInstance("AES/GCM/NoPadding");

                GCMParameterSpec spec =
                        new GCMParameterSpec(
                                TAG_LENGTH,
                                iv
                        );

                cipher.init(
                        Cipher.DECRYPT_MODE,
                        getKey(),
                        spec
                );

                return cipher.doFinal(
                        encrypted
                );

        } catch (Exception e) {

                throw new RuntimeException(
                        "File decryption failed",
                        e
                );
        }
    }
}