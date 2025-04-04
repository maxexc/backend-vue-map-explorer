# backend-vue-map-explorer

Backend for the **VueMap-Explorer** project, built with Node.js, Express, and
MongoDB. This initial version is developed in plain JavaScript with plans to
migrate to TypeScript in the future.

---

## Table of Contents

- [Swagger API Documentation](#swagger-api-documentation)
- [Overview](#overview)
- [Technologies Used](#technologies-used)
- [Features](#features)
- [Installation and Setup](#installation-and-setup)
- [Project Structure](#project-structure)
- [Environment Variables](#environment-variables)
- [MongoDB Connection](#mongodb-connection)
- [Future Roadmap](#future-roadmap)
- [Contributing](#contributing)
- [License](#license)

---

## Swagger API Documentation

This project includes Swagger for API documentation. After starting the server,
you can access Swagger UI at:

Local: http://localhost:3001/api-docs

Production (Render): https://backend-vue-map-explorer.onrender.com/api-docs ✔

Server (Render): https://backend-vue-map-explorer.onrender.com 🌍

All endpoints are described in `swagger.json`, covering **User, Points,
Routes,** and more. You can test requests directly in the browser using the “Try
it out” button, but note that you must provide a valid **Bearer token** for
protected routes.

**Important**: If you’re dealing with very large data (e.g. tens of thousands of
coordinates), Swagger UI may lag while rendering the JSON response. In such
cases, Postman or cURL might be more responsive for heavy payloads.

## Overview

This repository hosts the backend for the **VueMap-Explorer** application. It
provides essential API endpoints and services to support the frontend and manage
data through MongoDB Atlas. The backend also supports GeoJSON for handling
geographical data, enabling advanced mapping and geospatial functionalities.

---

## Technologies Used

The project leverages a diverse set of technologies and libraries to ensure a
robust and scalable backend:

- **Node.js** – JavaScript runtime for server-side development.
- **Express** – Web framework for building APIs.
- **MongoDB Atlas** – Cloud-based NoSQL database.
- **Mongoose** – ODM library for MongoDB.
- **Swagger** – For API documentation (using `swagger-ui-express` and
  `swagger-jsdoc`).
- **GeoJSON** – Standard format for encoding geographic data.
- **dotenv** – Environment variable management.
- **cors** – Handling Cross-Origin Resource Sharing.
- **morgan** – HTTP request logging.
- **cookie-parser** – Parsing cookies.
- **axios** – Promise-based HTTP client.
- **bcryptjs** – Password hashing.
- **jsonwebtoken** – Authentication token management.
- **joi** – Data validation.
- **moment** – Date formatting and manipulation.
- **multer & multer-storage-cloudinary** – File uploads and cloud storage
  integration.
- **nanoid & uuid** – Unique identifier generation.
- **nodemailer & @sendgrid/mail** – Email sending services.
- **cloudinary** – Cloud-based media management.
- **Additional utilities:** Libraries like `jimp` for image processing and
  `query-string` for query string manipulation.

This comprehensive stack is inspired by the technology set in the reference
repository and is tailored to meet the specific needs of the VueMap-Explorer
project.

---

## Features

- **Authorization & JWT:** Simple JWT-based authentication with refresh tokens.
- **Express Server:** Basic server setup with middleware for JSON parsing and
  HTTP request logging.
- **MongoDB Integration:** Seamless connection to a cloud-based MongoDB Atlas
  database using Mongoose.
- **GeoJSON Support:** Built-in support for handling geographical data in
  GeoJSON format.
- **Swagger Documentation:** Auto-generated API documentation accessible via a
  dedicated route.
- **Modular Architecture:** Organized folders for configuration, routes,
  controllers, and models.
- **Future-Proofing:** Designed for easy extension and planned migration to
  TypeScript.

---

## Installation and Setup

1. **Clone the Repository:**

   ```bash
   git clone https://github.com/maxexc/backend-vue-map-explorer.git
   ```

2. **Install Dependencies:**

```bash
   npm install
```

3. **Create .env file (see Environment Variables below for required keys)**

4. **Run the Development Server:**

```bash
   npm run dev
```

By default it will run on http://localhost:3001.

5. **(Optional) Build Production Version:**

```bash
   npm run build
```

## Environment Variables

You’ll need a .env file with (for example):

```bash
   MONGODB_URI=mongodb+srv://...
   JWT_SECRET=some_really_secret_key
   EXPIRES_TIME=1h
   CLOUDINARY_URL=cloudinary://...
   PORT=3001
```

Adjust according to your own environment.
