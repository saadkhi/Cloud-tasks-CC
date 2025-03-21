import mysql.connector

try:
    connection = mysql.connector.connect(
        host="localhost",
        database="CC_DBK",
        user="root",
        password=""
    )
    print("Connection successful!")
except Exception as e:
    print(f"Connection failed: {e}")
