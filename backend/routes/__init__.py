from flask import Flask
from routes.auth import auth_bp
# from routes.employee import employee_bp
# from routes.admin import admin_bp

def register_blueprints(app: Flask):
    app.register_blueprint(auth_bp, url_prefix="/auth")
    # app.register_blueprint(employee_bp, url_prefix="/employee")
    # app.register_blueprint(admin_bp, url_prefix="/admin")
