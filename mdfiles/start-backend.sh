#!/bin/bash

echo "================================"
echo "Starting Medical Assistant Backend"
echo "================================"
echo ""

cd backend

echo "Activating virtual environment..."
source mediassis/bin/activate

echo ""
echo "Starting FastAPI server..."
echo "Backend will be available at: http://localhost:8009"
echo "API Documentation: http://localhost:8009/docs"
echo ""
echo "Press Ctrl+C to stop the server"
echo ""

python -m uvicorn app.main:app --host 0.0.0.0 --port 8009

