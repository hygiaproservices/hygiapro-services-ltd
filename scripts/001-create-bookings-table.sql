-- Create bookings table to track all bookings and prevent double-booking
CREATE TABLE IF NOT EXISTS bookings (
    id SERIAL PRIMARY KEY,
    reference VARCHAR(100) UNIQUE NOT NULL,
    customer_name VARCHAR(255) NOT NULL,
    customer_email VARCHAR(255) NOT NULL,
    customer_phone VARCHAR(50) NOT NULL,
    customer_address TEXT NOT NULL,
    notes TEXT,
    booking_date DATE NOT NULL,
    booking_time VARCHAR(10) NOT NULL,
    services JSONB NOT NULL,
    total_amount DECIMAL(12, 2) NOT NULL,
    payment_status VARCHAR(50) DEFAULT 'pending',
    booking_status VARCHAR(50) DEFAULT 'confirmed',
    created_at TIMESTAMP
    WITH
        TIME ZONE DEFAULT NOW(),
        updated_at TIMESTAMP
    WITH
        TIME ZONE DEFAULT NOW()
);

-- Create index for fast lookup of bookings by date and time
CREATE INDEX IF NOT EXISTS idx_bookings_date_time ON bookings (booking_date, booking_time);

-- Create index for looking up by reference
CREATE INDEX IF NOT EXISTS idx_bookings_reference ON bookings (reference);

-- Create index for customer email lookup
CREATE INDEX IF NOT EXISTS idx_bookings_email ON bookings (customer_email);