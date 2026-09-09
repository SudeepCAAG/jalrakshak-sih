@echo off
echo =================================================================
echo  Starting Urban Flood Nowcasting System - Python FastAPI Backend
echo =================================================================
cd backend
python -m uvicorn app.main:app --host 127.0.0.1 --port 8000 --reload
pause
