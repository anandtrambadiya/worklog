from flask import Blueprint, request, jsonify
from models import db, TimeEntry
from datetime import date, timedelta

time_entries_bp = Blueprint(
    "time_entries",
    __name__,
    url_prefix="/time-entries"
)

# POST /time-entries → log daily hours
@time_entries_bp.route("", methods=["POST"])
def add_time_entry():
    data = request.get_json()

    if data["hours_worked"] > 24:
        return jsonify({"msg": "Hours cannot exceed 24"}), 400

    # prevent duplicate entry for same day
    existing = TimeEntry.query.filter_by(
        employee_id=data["employee_id"],
        date=data["date"]
    ).first()

    if existing:
        return jsonify({"msg": "Entry already exists for this date"}), 400

    entry = TimeEntry(
        employee_id=data["employee_id"],
        date=data["date"],
        hours_worked=data["hours_worked"],
        description=data.get("description", "")
    )

    db.session.add(entry)
    db.session.commit()

    return jsonify({"msg": "Time entry added"}), 201


# GET /time-entries → fetch logs
@time_entries_bp.route("", methods=["GET"])
def get_time_entries():
    employee_id = request.args.get("employeeId", type=int)
    date = request.args.get("date")

    query = TimeEntry.query

    if employee_id:
        query = query.filter_by(employee_id=employee_id)

    if date:
        query = query.filter_by(date=date)

    entries = query.all()

    return jsonify([
        {
            "id": e.id,
            "employee_id": e.employee_id,
            "date": e.date,
            "hours_worked": e.hours_worked,
            "description": e.description
        }
        for e in entries
    ])

# PUT /time-entries/<id> → update entry
@time_entries_bp.route("/<int:entry_id>", methods=["PUT"])
def update_time_entry(entry_id):
    data = request.get_json()
    entry = TimeEntry.query.get_or_404(entry_id)

    if data.get("hours_worked") and data["hours_worked"] > 24:
        return jsonify({"msg": "Hours cannot exceed 24"}), 400

    entry.date = data.get("date", entry.date)
    entry.hours_worked = data.get("hours_worked", entry.hours_worked)
    entry.description = data.get("description", entry.description)

    db.session.commit()

    return jsonify({"msg": "Time entry updated"})


# DELETE /time-entries/<id>
@time_entries_bp.route("/<int:entry_id>", methods=["DELETE"])
def delete_time_entry(entry_id):
    entry = TimeEntry.query.get_or_404(entry_id)
    db.session.delete(entry)
    db.session.commit()
    return jsonify({"msg": "Time entry deleted"})


# GET /summary/:employeeId → total hours
@time_entries_bp.route("/summary/<int:employee_id>", methods=["GET"])
def summary(employee_id):
    today = date.today()

    # Start of week (Monday)
    week_start = today - timedelta(days=today.weekday())

    # Start of month
    month_start = today.replace(day=1)

    entries = TimeEntry.query.filter_by(employee_id=employee_id).all()

    weekly_hours = 0
    monthly_hours = 0
    total_hours = 0

    for e in entries:
        entry_date = date.fromisoformat(e.date)
        total_hours += e.hours_worked

        if entry_date >= week_start:
            weekly_hours += e.hours_worked

        if entry_date >= month_start:
            monthly_hours += e.hours_worked

    return jsonify({
        "employee_id": employee_id,
        "weekly_hours": weekly_hours,
        "monthly_hours": monthly_hours,
        "total_hours": total_hours  # <-- added for chart
    })
