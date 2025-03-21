from fastapi import FastAPI
import sqlite3
from sqlite3 import Error
import os

app = FastAPI()

# Path to SQLite database file, stored in the same folder as app.py
DATABASE = os.path.join(os.path.dirname(__file__), 'database.db')

def create_connection():
    """Create a database connection."""
    conn = None
    try:
        conn = sqlite3.connect(DATABASE)
    except Error as e:
        print(f"Error connecting to database: {e}")
    return conn

def create_table():
    """Create a table if it doesn't exist."""
    conn = create_connection()
    if conn:
        try:
            sql_create_table = """CREATE TABLE IF NOT EXISTS users (
                                    id integer PRIMARY KEY,
                                    name text NOT NULL,
                                    email text NOT NULL
                                );"""
            conn.execute(sql_create_table)
            conn.commit()
        except Error as e:
            print(f"Error creating table: {e}")
        finally:
            conn.close()

# Call create_table to ensure the table exists
create_table()

@app.get("/")
def read_root():
    try:
        # Connect to SQLite database
        conn = create_connection()
        cursor = conn.cursor()

        # Insert some sample data if the table is empty
        cursor.execute("SELECT COUNT(*) FROM users")
        if cursor.fetchone()[0] == 0:
            cursor.executemany("INSERT INTO users (name, email) VALUES (?, ?)", [
                ("Alice", "alice@example.com"),
                ("Bob", "bob@example.com"),
                ("Charlie", "charlie@example.com"),
                ("Saad", "saadali@gmail.com"),
                ("Samad", "samad@gmail.com"),
                ("Zeeshan", "zeeshan@gmail.com")                
            ])
            conn.commit()

        # Retrieve data from the table
        cursor.execute("SELECT * FROM users")
        users = cursor.fetchall()

        return {"users": users}
    except Exception as e:
        return {"error": f"Error: {str(e)}"}
    finally:
        if conn:
            conn.close()
