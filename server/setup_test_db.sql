-- setup_test_db.sql

-- Drop the test_todo table if it exists
DROP TABLE IF EXISTS test_todo;

-- Create the test_todo table
CREATE TABLE test_todo (
    id SERIAL PRIMARY KEY,
    text VARCHAR(255) NOT NULL,
    completed BOOLEAN NOT NULL DEFAULT FALSE,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Insert initial data
INSERT INTO test_todo (text, completed) VALUES
('Test Todo 1', FALSE),
('Test Todo 2', TRUE),
('Test Todo 3', FALSE);
