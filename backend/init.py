from app import app, db
from models import Employee

with app.app_context():
    db.create_all()
    print("Tables created")

with app.app_context():
    admin = Employee(
        name="Admin",
        email="anandtrambadiya036@gmail.com"
    )
    admin.set_password("admin123")   # change later
    db.session.add(admin)
    db.session.commit()
    print("Admin created with password")