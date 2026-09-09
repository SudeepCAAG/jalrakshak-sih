@echo off
echo =================================================================
echo  Launching Full Stack Urban Flood Nowcasting System
echo =================================================================
echo Starting Python Backend on http://127.0.0.1:8000 ...
start "Urban Flood Backend (FastAPI)" cmd /c "cd backend && python -m uvicorn app.main:app --host 127.0.0.1 --port 8000 --reload"

ping 127.0.0.1 -n 3 >nul

echo Starting Next.js Frontend on http://localhost:3000 ...
start "JalRakshak Frontend (Next.js)" cmd /c "cd frontend && npm run dev"

echo.
echo =================================================================
echo  JalRakshak System is running!
echo  - Frontend Dashboard:        http://localhost:3000
echo  - Backend API (FastAPI):     http://127.0.0.1:8000/docs
echo =================================================================
pause
