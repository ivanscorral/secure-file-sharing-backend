# Secure File Sharing System Backend Implementation

A web-based platform for anonymous and secure file sharing. This project has recently been refactored to TypeScript and now uses AES encryption for file security and MongoDB for data storage. Files can be configured to expire either based on time or download count.

## 🌟 Features

- **Anonymous File Sharing**: Enables file sharing without requiring user authentication or registration.
- **AES Encryption**: Employs Advanced Encryption Standard (AES) for secure file storage.
- **File Expiration**: Allows setting file expiration based on time or download count.
- **TypeScript**: Recently refactored to TypeScript for better type safety and maintainability.
- **Database**: Utilizes MongoDB for metadata storage and other operational data.

## 🛠️ Tech Stack & Tools

- **Backend Framework:** Node.js with Express, refactored for TypeScript support to enhance code maintainability and type safety.
- **Database Engine:** MongoDB for NoSQL storage, optimized for high volume data and JSON-like documents.
- **Encryption Standard:** Utilizes Advanced Encryption Standard (AES) for robust file security.
- **Package Management:** Supports both npm and pnpm for dependency management.
- **Code Quality:** ESLint configured for TypeScript to enforce code quality and style guidelines.
- **Version Control System:** Git for source code management, including branching and versioning.
- **Server Environment:** Designed for Node.js 20, ensuring compatibility with the latest ECMAScript features.

## 🚀 Installation

### Prerequisites

- Node.js (v20.0.0 or higher)
- MongoDB (v7.0 or higher)
- Typescript (ts-node)  

### Steps

1. **Clone the Repository**

   ```bash
    git clone https://github.com/ivanscorral/secure-file-sharing-backend.git
    ```

2. **Navigate to Project Directory**

    ```bash
    cd secure-file-sharing-backend
    ```

3. **Install Dependencies**

    ```bash
    npm install
    ```

4. **Configure Environment Variables**
    - Copy `.env.example` to `.env`.
    - Update `.env` with your MongoDB URL, secret keys, or any other required variables.

    ```bash
    cp .env.example .env
    ```

5. **Start the Server**

    ```bash
    npm start
    ```

    This will compile TypeScript and start the Express server.

## 📚 Usage

### npm scripts

- **npm start**: Runs the node command on the compilation folder.
- **npm prestart**:
- **npm lint**: Calls eslint to enforce the rules on all the project based on the .eslintrc.js configuration.
- **npm lint:fix**: Calls eslint with the ```--fix```parameter. This will automatically fix all auto-fixable errors with the linting. Warnings will be ignored.

Refer to the updated [API documentation](docs/api.md) for a complete guide on available endpoints and usage instructions.

## 👥 Contributing

Contributions are highly encouraged! For guidelines on how to contribute, please read [CONTRIBUTING.md](CONTRIBUTING.md).

## 📖 Documentation

- [File Upload Flow](docs/file-upload-flow.md): Updated in-depth guide covering the file upload process, including client-server interactions and encryption.

## ❓ FAQ

- **How do I report a bug?**
  - Use the GitHub Issues for reporting bugs.

- **Is it possible to extend the file expiration time?**
  - No, once the file is uploaded, the expiration time cannot be changed.

- **How secure is the file encryption?**
  - Files are encrypted using AES, which is a secure and widely used encryption standard.

## 📄 License

This project is under the MIT License. See [LICENSE](LICENSE) file for more details.

## Reporting issues or feedback

For inquiries, issues, or feedback, please [open an issue](https://github.com/ivanscorral/secure-file-sharing-backend/issues). Make sure to read the  [contributing section](#-contributing) of this README before opening an issue.

---

Made with ❤️ by Iván Sánchez Corral, 2023.
