# product-paid-app

This project is a full-stack application that integrates a product page, customer management, and payment gateway through Wompi. It includes both a frontend built with React using Redux for state management and a backend built with NestJS using TypeORM, PostgreSQL for the database, and a variety of AWS services for deployment (such as ECS, CloudFront, RDS).

## Table of Contents

- [Project Overview](#project-overview)
- [System Architecture](#system-architecture)
- [Frontend](#frontend)
- [Backend](#backend)
- [Database Schema](#database-schema)
- [Deployment](#deployment)
- [API Documentation](#api-documentation)
- [Getting Started](#getting-started)
    - [Backend Setup](#backend-setup)
    - [Frontend Setup](#frontend-setup)
    - [Database Setup](#database-setup)
    - [Docker Setup](#docker-setup)
- [Usage](#usage)
- [Testing](#testing)

---

## Project Overview

This project provides the following features:

- **Product Catalog**: Displays products with details.
- **Payment Processing**: Integrates with Wompi for validating customer payment information and processing transactions.
- **Customer Management**: Manages customer details including addresses and payment tokens.
- **Order Management**: Handles transactions, including creating, validating, and querying transaction statuses.
    
The project adheres to **Hexagonal Architecture** (Ports & Adapters) to ensure scalability and maintainability. 

## System Architecture

The architecture of this system follows the **Hexagonal Architecture** pattern, with distinct layers:

1. **Domain Layer (Core Business Logic)**:
     - Entities
     - Domain Services (e.g., Transaction, Product, Customer management)

2. **Application Layer**:
     - Use Cases (Interactors) for business processes like payment validation, product retrieval, etc.
     - DTOs (Data Transfer Objects)

3. **Infrastructure Layer**:
     - Adapters (e.g., Payment Gateway adapter for Wompi)
     - Repositories (e.g., Database Access using TypeORM)
     - Controllers (API Endpoints)

### System Diagram

```plaintext
[Frontend (React + Redux)] -> [Backend (NestJS)] -> [PostgreSQL (RDS)]
                        |                                    |
                    [S3]                                  [Wompi API (Payments)]
                    [CloudFront]                           [AWS ECS (Deployments)]
```

- **Frontend**: Uses React for UI, Redux for state management, and connects to the backend via RESTful APIs.
- **Backend**: NestJS server, connecting to PostgreSQL database and the Wompi payment API.
- **Database**: PostgreSQL hosted on AWS RDS, using TypeORM for data mapping.
- **Deployment**: Dockerized containers deployed on AWS ECS with networking and file hosting handled via S3 and CloudFront.

## Frontend

The frontend of this project is built with **React** and **Redux**, following **Flux Architecture** principles for state management. It includes:

- **Product Page**: Displays product details and allows customers to add items to their cart.
- **Payment Page**: Handles user inputs for customer info and payment details.
- **Transaction Summary**: Displays order confirmation and status.
    
**Tools Used**:
- React
- Redux for state management
- Material-UI for components and styling
- CloudFront & S3 for static asset delivery

### Key Files

- `src/store/productSlice.ts`: Handles fetching and managing product data.
- `src/store/paymentSlice.ts`: Handles payment and transaction state.
- `src/pages/ProductPage.tsx`: Displays product details and handles user input for purchases.
- `src/pages/PaymentPage.tsx`: Handles customer info and payment submissions.

## Backend

The backend is built with **NestJS** using a modular structure based on Hexagonal Architecture.

### Key Backend Components

- **Controllers**: REST endpoints to handle product retrieval, payment processing, and customer management.
- **Services**: Handle business logic such as validating credit card information and making payment requests to Wompi.
- **Repositories**: TypeORM repositories interacting with PostgreSQL database.
- **Entities**: Core models like `Product`, `Customer`, `Transaction`.

**Key Backend Technologies**:
- NestJS for the API framework
- TypeORM for database management
- Wompi for payment gateway integration
- AWS (ECS, RDS, S3, CloudFront) for deployment and hosting

### Key Files

- `src/modules/product/product.controller.ts`: Handles product-related endpoints.
- `src/modules/payment/payment.controller.ts`: Handles payment and transaction-related endpoints.
- `src/modules/product/product.repository.ts`: Interfaces with the product database.
- `src/modules/payment/payment.service.ts`: Contains logic for making payment requests to Wompi.

## Database Schema

The database is hosted on **AWS RDS (PostgreSQL)** and consists of three main tables:

1. **Product**
     ```sql
     CREATE TABLE products (
         id SERIAL PRIMARY KEY,
         name VARCHAR(255),
         description TEXT,
         price INTEGER,
         image_url VARCHAR(255),
         stock INTEGER
     );
     ```

2. **Customer**
     ```sql
     CREATE TABLE customers (
         id SERIAL PRIMARY KEY,
         name VARCHAR(255),
         email VARCHAR(255),
         payment_token VARCHAR(255),
         address TEXT
     );
     ```

3. **Transaction**
     ```sql
     CREATE TABLE transactions (
         id SERIAL PRIMARY KEY,
         reference VARCHAR(255),
         customer_id INTEGER REFERENCES customers(id),
         product_id INTEGER REFERENCES products(id),
         amount INTEGER,
         currency VARCHAR(3),
         status VARCHAR(50),
         payment_method VARCHAR(50),
         created_at TIMESTAMP,
         updated_at TIMESTAMP
     );
     ```

## Deployment

The backend and frontend are deployed using **Docker** and AWS services:

- **Frontend**: Deployed on AWS S3, served through AWS CloudFront for CDN functionality.
- **Backend**: Deployed using AWS ECS, interacting with PostgreSQL hosted on RDS.
- **Database**: AWS RDS (PostgreSQL), connected to backend services via VPC.

## API Documentation

The API follows REST conventions. Here are some key endpoints:

- **Products**: 
    - `GET /products` - Fetch a list of products.
    - `GET /products/:id` - Fetch a product by its ID.

- **Payments**:
    - `POST /payments/check-info` - Validate customer and payment info (tokenizes the card).
    - `POST /payments/request` - Requests a payment to be processed.

- **Transactions**:
    - `GET /transactions/:id` - Fetch a transaction by its ID.

## Getting Started

### Backend Setup

1. Install dependencies:
     ```bash
     cd backend
     npm install
     ```

2. Configure environment variables in `.env`:
     ```bash
     DB_HOST=your-rds-endpoint
     DB_USER=your-username
     DB_PASSWORD=your-password
     DB_NAME=shopping-app
     WOMPI_PUBLIC_KEY=your-wompi-public-key
     WOMPI_PRIVATE_KEY=your-wompi-private-key
     ```

3. Run the backend:
     ```bash
     npm run start:dev
     ```

### Frontend Setup

1. Install dependencies:
     ```bash
     cd frontend
     npm install
     ```

2. Run the frontend:
     ```bash
     npm start
     ```

### Database Setup

1. Create the PostgreSQL database:
     ```bash
     createdb shopping-app
     ```

2. Run migrations or the schema script to create tables.

### Docker Setup

The project is fully dockerized. To start the entire system (frontend, backend, database):

1. Build and start services:
     ```bash
     docker-compose up --build
     ```

## Usage

Once both frontend and backend are running, visit the frontend app and interact with the products, customers, and payments.

## Testing

The project includes both unit and integration tests. To run tests for the backend:

```bash
npm run test
```

For the frontend, you can use:
```bash
npm test
```

---

This completes the project README, providing a full-stack overview and guidance on setup, deployment, and usage.

