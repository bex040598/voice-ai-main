FROM node:24-alpine AS frontend-builder

WORKDIR /app/frontend

COPY frontend/package.json frontend/package-lock.json ./
RUN npm ci

COPY frontend/ ./
RUN npm run build


FROM python:3.11-slim

WORKDIR /app

COPY backend/requirements.txt ./
RUN pip install --no-cache-dir -r requirements.txt

COPY backend backend
COPY --from=frontend-builder /app/frontend/dist frontend/dist

WORKDIR /app/backend

ENV PORT=8001

EXPOSE 8001

CMD ["sh", "-c", "uvicorn main:app --host 0.0.0.0 --port ${PORT}"]
