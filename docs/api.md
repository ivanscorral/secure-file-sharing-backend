# Secure File Sharing Backend API Documentation

This document describes the API of the Secure File Sharing Backend. It is intended for use by the frontend, and is not intended to be used directly by users or other applications. This document is not intended to be a complete description of the API, but rather a guide to the most important parts of the API.

## Authentication

The API uses a token-based authentication system. The token is passed in the `Authorization` header of the request. The token is a JSON Web Token (JWT) signed with the server's private key. The token contains the user's username and the token's expiration time. The token is valid for 24 hours.

## Endpoints

### `GET /api/files/upload`
