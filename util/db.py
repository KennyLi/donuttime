import sqlite3

DB_FILE="./data/drawing.db"

def createTable():
    """Create all data tables."""
    db = sqlite3.connect(DB_FILE)
    c = db.cursor()

    command = "CREATE TABLE users (username TEXT, password TEXT)"
    c.execute(command)

    command = "CREATE TABLE drawing (username TEXT, drawing_name TEXT, drawing BLOB, UNIQUE(username, drawing_name) ON CONFLICT REPLACE)"
    c.execute(command)

    db.commit()
    db.close()


def add_user(username, password):
    """Insert credentials for newly registered user into database."""
    db = sqlite3.connect(DB_FILE)
    c = db.cursor()
    c.execute("INSERT INTO users VALUES(?, ?)", (username, password))
    db.commit()
    db.close()

def auth_user(username, password):
    """Authenticate a user attempting to log in."""
    db = sqlite3.connect(DB_FILE)
    c = db.cursor()

    for entry in c.execute("SELECT users.username, users.password FROM users"):
        if(entry[0] == username and entry[1] == password):
            db.close()
            return True
    db.close()
    return False

def check_user(username):
    """Check if a username has already been taken when registering."""
    db = sqlite3.connect(DB_FILE)
    c = db.cursor()

    for entry in c.execute("SELECT users.username FROM users"):
        if(entry[0] == username):
            db.close()
            return True
    db.close()
    return False

def add_drawing(username, drawing_name, blob):
    db = sqlite3.connect(DB_FILE)
    db.text_factory = str
    c = db.cursor()
    c.execute("INSERT INTO drawing VALUES(?, ?, ?)", (username, drawing_name, blob))
    db.commit()
    db.close()

def get_drawing(username):
    db = sqlite3.connect(DB_FILE)
    c = db.cursor()

    c.execute("SELECT drawing_name, drawing FROM drawing WHERE username =?", (username,))
    return c.fetchall()

# print(get_drawing("Kenny"))
