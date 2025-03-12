# CardioSys - Backend

CardioSys Backend is the server-side application that powers the CardioSys Medical Management System. Built with **Node.js**, 
it provides a robust and scalable API to manage patient data, medical records, and appointment scheduling. 
The backend handles secure data storage, communication with the frontend, and integrates with the database to ensure 
smooth and efficient operations in a medical environment.

## Features

- **API Endpoints**:  
  Provides RESTful API endpoints to manage patients, medical records, and appointments.

- **Authentication**:  
  Secure user authentication using **JWT** to ensure that only authorized users can access sensitive data.

- **Database Integration**:  
  Connects to a **SQL database** to store and retrieve patient data, medical files, and appointment details.

- **Report Generation**:  
  Generate reports based on medical data, with functionality to export as PDFs.

- **File Uploads**:  
  Allows secure file uploads for medical documents and patient records.

## Installation

1. Clone the repository to your local machine.
    ```bash
    git clone https://github.com/agusalta/CardioSys-Back.git

2. Navigate to the project directory:
    ```bash
    cd sistema-medico-back

3. Install the required dependencies.
    ```bash
    npm install

4. Set up your environment variables by creating a `.env` file. 
Make sure to configure the database connection, JWT secret key, and other necessary settings.
    ```bash
    JWT_SECRET=your_secret_key
    MYSQL_DATABASE=your_database_name
    MYSQL_ROOT_PASSWORD=your_root_password
    MYSQLHOST=your_mysql_host
    MYSQLPORT=your_mysql_port
    MYSQLUSER=your_mysql_user
    NODE_ENV=development
    ORIGIN=your_origin_url
    PASSWORD_HASH=your_password_hash_key
    USER=your_default_user

5. Start the application in development mode.
     ```bash
    npm run dev
6. The backend server will be running at default host: `http://localhost:3000`.

## Technologies Used

![Node.js](https://img.shields.io/badge/Node.js-43853D?style=for-the-badge&logo=node.js&logoColor=white) ![Express](https://img.shields.io/badge/Express-000000?style=for-the-badge&logo=express&logoColor=white) ![SQL](https://img.shields.io/badge/SQL-003B57?style=for-the-badge&logo=postgresql&logoColor=white) ![JWT](https://img.shields.io/badge/JWT-000000?style=for-the-badge&logo=json-web-tokens&logoColor=white)

## API Documentation

For detailed API documentation & SQL database scheme, feel free to contact me at my email address.

## Contributing

Contributions are welcome! If you'd like to contribute, fork the repository, create a branch, and submit a pull request.

---

For any inquiries, feel free to contact the development team at [agustinaltamrirano2024@gmail.com].
