# backend-vue-map-explorer

Backend for the **VueMap-Explorer** project, built with Node.js, Express, and MongoDB. This initial version is developed in plain JavaScript with plans to migrate to TypeScript in the future.

---

## Table of Contents

- [Overview](#overview)
- [Technologies Used](#technologies-used)
- [Features](#features)
- [Installation and Setup](#installation-and-setup)
- [Project Structure](#project-structure)
- [Environment Variables](#environment-variables)
- [MongoDB Connection](#mongodb-connection)
- [Swagger API Documentation](#swagger-api-documentation)
- [Future Roadmap](#future-roadmap)
- [Contributing](#contributing)
- [License](#license)

---

## Overview

This repository hosts the backend for the **VueMap-Explorer** application. It provides essential API endpoints and services to support the frontend and manage data through MongoDB Atlas. The backend also supports GeoJSON for handling geographical data, enabling advanced mapping and geospatial functionalities.

---

## Technologies Used

The project leverages a diverse set of technologies and libraries to ensure a robust and scalable backend:

- **Node.js** – JavaScript runtime for server-side development.
- **Express** – Web framework for building APIs.
- **MongoDB Atlas** – Cloud-based NoSQL database.
- **Mongoose** – ODM library for MongoDB.
- **Swagger** – For API documentation (using `swagger-ui-express` and `swagger-jsdoc`).
- **GeoJSON** – Standard format for encoding geographic data.
- **dotenv** – Environment variable management.
- **cors** – Handling Cross-Origin Resource Sharing.
- **morgan** – HTTP request logging.
- **cookie-parser** – Parsing cookies.
- **express-validator** – Request data validation.
- **axios** – Promise-based HTTP client.
- **bcryptjs** – Password hashing.
- **jsonwebtoken** – Authentication token management.
- **joi** – Data validation.
- **moment** – Date formatting and manipulation.
- **multer & multer-storage-cloudinary** – File uploads and cloud storage integration.
- **nanoid & uuid** – Unique identifier generation.
- **nodemailer & @sendgrid/mail** – Email sending services.
- **cloudinary** – Cloud-based media management.
- **Additional utilities:** Libraries like `jimp` for image processing and `query-string` for query string manipulation.

This comprehensive stack is inspired by the technology set in the reference repository and is tailored to meet the specific needs of the VueMap-Explorer project.

---

## Features

- **Express Server:** Basic server setup with middleware for JSON parsing and HTTP request logging.
- **MongoDB Integration:** Seamless connection to a cloud-based MongoDB Atlas database using Mongoose.
- **GeoJSON Support:** Built-in support for handling geographical data in GeoJSON format.
- **Swagger Documentation:** Auto-generated API documentation accessible via a dedicated route.
- **Modular Architecture:** Organized folders for configuration, routes, controllers, and models.
- **Future-Proofing:** Designed for easy extension and planned migration to TypeScript.

---

## Installation and Setup

1. **Clone the Repository:**

   ```bash
   git clone https://github.com/maxexc/backend-vue-map-explorer.git
   ```
