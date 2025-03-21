import sqlite3
import os

# Define the path for the SQLite database file
db_path = os.path.join(os.path.dirname(__file__), "cc_database.db")

def init_db():
    # Connect to the SQLite database (this will create the database file if it doesn't exist)
    connection = sqlite3.connect(db_path)
    cursor = connection.cursor()

    # Create the 'messages' table if it doesn't exist
    cursor.execute(
        """
        CREATE TABLE IF NOT EXISTS messages (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            content TEXT NOT NULL
        )
        """
    )

    # Commit changes and close the connection
    connection.commit()
    connection.close()
    print(f"Database and table created at {db_path}")

if __name__ == "__main__":
    init_db()
