# Secure File Sharing Backend API Documentation

This document describes the API of the Secure File Sharing Backend. It is intended for use by the frontend, and is not intended to be used directly by users or other applications. This document is not intended to be a complete description of the API, but rather a guide to the most important parts of the API.

## Authentication

The API uses a token-based authentication system. The token is passed in the `Authorization` header of the request. The token is a JSON Web Token (JWT) signed with the server's private key. The token contains the user's username and the token's expiration time. The token is valid for 24 hours.

## Endpoints

### `POST    /api/files/upload`

This endpoint is used to upload a file to the server. The file is uploaded as a multipart form. The file is encrypted using AES-256 in CBC mode with a random IV. The key is encrypted using RSA-OAEP with SHA-256 and a random salt. The salt is encrypted using RSA-OAEP with SHA-256 and a random salt. The encrypted file, encrypted key, and encrypted salt are all uploaded as part of the multipart form. The encrypted file is stored in the `files` directory. The encrypted key and encrypted salt are stored in the FileMetadata object in the database.

#### `Request`

The request must contain the following fields:

- `file`: The file to upload.
- `filename`: The name of the file.
- `expiration_method`: The method of expiration for the file. Must be one of `never`, `time`, or `downloads`.
- `expiration_time`: The time at which the file expires. Only required if `expiration_method` is `time`.
- `expiration_downloads`: The number of downloads after which the file expires. Only required if `expiration_method` is `downloads`.

#### `Response`

The response contains the following fields:

- `id`: The ID of the file.

### `GET /api/files/download`

This endpoint is used to download a file from the server. The file is downloaded as a multipart form. The file is decrypted using AES-256 in CBC mode with the IV stored in the FileMetadata object in the database. The key is decrypted using RSA-OAEP with SHA-256 and the salt stored in the FileMetadata object in the database. The salt is decrypted using RSA-OAEP with SHA-256 and the server's private key. The decrypted file is returned as part of the multipart form.

#### `Request`

The request must contain the following fields:

- `id`: The ID of the file.

#### `Response`

The response contains the following fields:

- `file`: The file to download.
- `filename`: The name of the file.

Once the file has been downloaded, the watchdog thread will update the FileMetadata object in the database to indicate that the file has been downloaded and handle the expiration of the file and the deletion of the file from the server if necessary.
