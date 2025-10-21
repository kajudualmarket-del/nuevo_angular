# backend/app/main.py (FINAL CORREGIDO)

import os
from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware

# Importaciones de tu propia estructura
from .db import create_tables # Función para crear las tablas
from .api.endpoints import auth # Router de Autenticación


# Inicialización de FastAPI
# ✅ CORRECCIÓN DE SINTAXIS (eliminando el carácter invisible U+00A0)
app = FastAPI(
    title="NUEVO_ANGULAR: Gestión de Usuarios API",
    openapi_url="/api/v1/openapi.json"
)

# 🚨 CRÍTICO: Configuración CORS
FRONTEND_ORIGIN = os.getenv("FRONTEND_ORIGIN")
origins = [
    FRONTEND_ORIGIN,
    "http://localhost",
]

app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)


# --- ROUTERS ---

# ✅ CORRECCIÓN DE ROUTING: El prefijo ahora es /api/v1/auth para coincidir con el frontend
app.include_router(auth.router, prefix="/api/v1/auth", tags=["Auth"])

# (Aquí se agregarán los routers de /users, /upload, etc.)


# --- EVENTOS DE INICIO ---

@app.on_event("startup")
def on_startup():
    """Ejecuta tareas al iniciar la aplicación."""
    # Crea todas las tablas definidas en models.py si no existen
    print("Intentando crear tablas de la base de datos...")
    create_tables() 
    print("Tablas de la base de datos creadas/verificadas.")


@app.get("/")
def read_root():
    return {"message": "FastAPI Backend is running. Access docs at /docs"}