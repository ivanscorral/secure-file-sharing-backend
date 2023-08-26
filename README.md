# Secure File Sharing System Backend Implementation

A web-based platform that provides anonymous and secure file sharing. It leverages AES encryption and allows files to expire based on time or download count. MongoDB is used as the database.

## Features

- **Anonymous File Sharing**: Share files without the need for user authentication or registration.
- **AES Encryption**: Files are encrypted using the Advanced Encryption Standard (AES) for added security.
- **File Expiration**: Files can be set to expire after a certain amount of time or after a specific number of downloads.
- **Database**: MongoDB is utilized for storing file metadata and other information.

## Requirements

- Node.js
- MongoDB

## Installation

1. Clone the repository: `git clone https://github.com/ivanscorral/secure-file-sharing-backend.git`
2. .git`
3. Navigate to the project directory: `cd secure-file-sharing-backend`
4. Install dependencies: `npm install` or `pnpm install`
5. Configure environment variables: Copy the `.env.example` file to `.env` and fill in the required details.
6. Start the server: `npm start`

## Usage

See the [API documentation](docs/api.md) for details on available endpoints and how to interact with the system.

## Contributing

Contributions are welcome! Please see [CONTRIBUTING.md](CONTRIBUTING.md) for details on how to contribute to this project.

## Documentation

- [File Upload Flow](docs/file-upload-flow.md): Detailed description of the file upload process, including client-server interactions and encryption handling.

## License

This project is licensed under the MIT License - see the [LICENSE.md](LICENSE) file for details.

## Contact

For questions, issues, or feedback, please [open an issue](https://github.com/ivanscorral/secure-file-sharing/issues) or contact the maintainer directly.

---

Made with ❤️ by Iván Sánchez Corral. 2023.
