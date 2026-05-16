from pathlib import Path

import httpx
from fastapi import FastAPI, HTTPException
from fastapi.middleware.cors import CORSMiddleware
from fastapi.responses import FileResponse
from fastapi.staticfiles import StaticFiles
from pydantic import BaseModel

BASE_DIR = Path(__file__).resolve().parent.parent
FRONTEND_DIR = BASE_DIR / "frontend"
FRONTEND_DIST_DIR = FRONTEND_DIR / "dist"
REMOTE_ASSISTANT_URL = "https://atmu-ai.onrender.com"
SPA_INDEX = FRONTEND_DIST_DIR / "index.html"

app = FastAPI()
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=False,
    allow_methods=["*"],
    allow_headers=["*"],
)

if FRONTEND_DIST_DIR.exists():
    app.mount("/assets", StaticFiles(directory=str(FRONTEND_DIST_DIR / "assets")), name="assets")


class ChatRequest(BaseModel):
    message: str
    session_id: str | None = None
    version: int = 1


def serve_spa_index() -> FileResponse:
    index_file = SPA_INDEX if SPA_INDEX.exists() else FRONTEND_DIR / "index.html"
    return FileResponse(str(index_file))


@app.get("/api/session")
async def create_session():
    try:
        async with httpx.AsyncClient(timeout=60) as client:
            response = await client.get(f"{REMOTE_ASSISTANT_URL}/api/session")
    except httpx.HTTPError as exc:
        raise HTTPException(status_code=502, detail="Remote assistant session unavailable") from exc
    if response.status_code >= 400:
        raise HTTPException(status_code=502, detail="Remote assistant session error")
    return response.json()


@app.get("/api/external/health")
async def external_health():
    try:
        async with httpx.AsyncClient(timeout=45) as client:
            response = await client.get(f"{REMOTE_ASSISTANT_URL}/api/session")
    except httpx.HTTPError as exc:
        return {"ok": False}
    if response.status_code >= 400:
        return {"ok": False}
    return {"ok": True}


@app.post("/api/external/chat")
@app.post("/chat")
async def chat_endpoint(request: ChatRequest):
    payload = request.model_dump()
    if not payload.get("session_id"):
        payload["session_id"] = "atmu-web-session"
    try:
        async with httpx.AsyncClient(timeout=120) as client:
            response = await client.post(f"{REMOTE_ASSISTANT_URL}/chat", json=payload)
    except httpx.HTTPError as exc:
        raise HTTPException(status_code=502, detail="Remote assistant chat unavailable") from exc
    if response.status_code >= 400:
        raise HTTPException(status_code=502, detail="Remote assistant chat error")
    return response.json()


@app.get("/{full_path:path}")
async def serve_spa(full_path: str):
    if full_path.startswith("api/"):
        raise HTTPException(status_code=404, detail="API route not found")
    return serve_spa_index()
