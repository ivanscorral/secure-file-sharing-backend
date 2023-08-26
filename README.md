
# Secure File Sharing System Backend Implementation

A web-based platform for anonymous and secure file sharing. This project uses AES encryption for file security and MongoDB for data storage. Files can be configured to expire either based on time or download count.

## Features

- **Anonymous File Sharing**: Enables file sharing without requiring user authentication or registration.
- **AES Encryption**: Employs Advanced Encryption Standard (AES) for secure file storage.
- **File Expiration**: Allows setting file expiration based on time or download count.
- **Database**: Utilizes MongoDB for metadata storage and other operational data.

## Tech Stack

- **Backend**: Node.js with Express
- **Database**: MongoDB
- **Encryption**: AES
- **Package Manager**: npm or pnpm
- **Linting**: ESLint
- **Version Control**: Git

## Requirements

- Node.js
- MongoDB

## Installation

1. Clone the repository: `git clone https://github.com/ivanscorral/secure-file-sharing-backend.git`
2. Navigate to the project directory: `cd secure-file-sharing-backend`
3. Install dependencies: Run `npm install` or `pnpm install`
4. Configure Environment: Copy `.env.example` to `.env` and fill in the required variables.
5. Start the server: Execute `npm start`

## Usage

Refer to the [API documentation](docs/api.md) for a complete guide on available endpoints and usage instructions.

## Contributing

Contributions are encouraged! For guidelines on how to contribute, please read [CONTRIBUTING.md](CONTRIBUTING.md).

## Documentation

- [File Upload Flow](docs/file-upload-flow.md): In-depth guide covering the file upload process, including client-server interactions and encryption.

## FAQ

- **How do I report a bug?**
  - Use the GitHub Issues for reporting bugs.

- **Is it possible to extend the file expiration time?**
  - No, once the file is uploaded, the expiration time cannot be changed.

- **How secure is the file encryption?**
  - Files are encrypted using AES, which is a secure and widely used encryption standard.

## License

This project is under the MIT License. See [LICENSE](LICENSE) file for more details.

## Contact

For inquiries, issues, or feedback, please [open an issue](https://github.com/ivanscorral/secure-file-sharing-backend/issues).

---

Made with ❤️ by Iván Sánchez Corral, 2023.
