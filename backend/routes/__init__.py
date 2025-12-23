from .employees import employees_bp
from .time_entries import time_entries_bp

def register_blueprints(app):
    app.register_blueprint(employees_bp)
    app.register_blueprint(time_entries_bp)

