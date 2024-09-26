-- Creación de la tabla Product
CREATE TABLE product (
    id SERIAL PRIMARY KEY,
    name VARCHAR(255) NOT NULL,
    description TEXT,
    price DECIMAL(10, 2) NOT NULL,
    stock INT NOT NULL,
    image_url TEXT
);

-- Creación de la tabla Customer
CREATE TABLE customer (
    id SERIAL PRIMARY KEY,
    first_name VARCHAR(100) NOT NULL,
    last_name VARCHAR(100) NOT NULL,
    email VARCHAR(255) NOT NULL,
    address TEXT NOT NULL,
    city VARCHAR(100),
    country VARCHAR(100),
    phone_number VARCHAR(20),
    credit_card_token VARCHAR(255) 
);

-- Creación de la tabla Transaction
CREATE TABLE transaction (
    id SERIAL PRIMARY KEY,
    product_id INT REFERENCES product(id) ON DELETE CASCADE,
    customer_id INT REFERENCES customer(id) ON DELETE CASCADE,
    transaction_date TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
    amount DECIMAL(10, 2) NOT NULL,
    payment_status VARCHAR(50) CHECK (payment_status IN ('PENDING', 'COMPLETED', 'DECLINED')),
    wompi_transaction_id VARCHAR(255), -- El ID de la transacción en Wompi
    delivery_status VARCHAR(50) CHECK (delivery_status IN ('PENDING', 'SHIPPED', 'DELIVERED')) DEFAULT 'PENDING'
);

INSERT INTO product (name, description, price, stock, image_url)
VALUES
('Smartphone X200', 'A powerful smartphone with 8GB RAM and 128GB storage.', 75000, 30, 'https://example.com/images/smartphone-x200.jpg'),
('Laptop Ultra 15', 'A high-performance laptop with Intel i7 processor and 16GB RAM.', 150000, 20, 'https://example.com/images/laptop-ultra-15.jpg'),
('Smartwatch Pro', 'A stylish smartwatch with heart rate monitor and GPS.', 35000, 50, 'https://example.com/images/smartwatch-pro.jpg'),
('Wireless Earbuds Z', 'Noise-cancelling wireless earbuds with long battery life.', 20000, 100, 'https://example.com/images/wireless-earbuds-z.jpg'),
('Gaming Console XY', 'Next-gen gaming console with 1TB storage and 4K resolution.', 400000, 10, 'https://example.com/images/gaming-console-xy.jpg'),
('Bluetooth Speaker Max', 'Portable Bluetooth speaker with 360-degree sound.', 50000, 40, 'https://example.com/images/bluetooth-speaker-max.jpg'),
('4K Action Camera', 'Waterproof 4K action camera with image stabilization.', 80000, 15, 'https://example.com/images/4k-action-camera.jpg'),
('Drone Phantom 4', 'High-end drone with 4K camera and GPS navigation.', 120000, 5, 'https://example.com/images/drone-phantom-4.jpg'),
('Smart Home Hub', 'Control your smart home devices with voice commands.', 60000, 25, 'https://example.com/images/smart-home-hub.jpg'),
('VR Headset Pro', 'Virtual reality headset with high resolution and immersive experience.', 95000, 12, 'https://example.com/images/vr-headset-pro.jpg');
