# backend/app/main.py (FINAL CORREGIDO)

import os
from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware

# Importaciones de tu propia estructura
from .db import create_tables # Función para crear las tablas
from .api.endpoints import auth # Router de Autenticación
from .api.endpoints import users # 🚀 AÑADIDO: Router de Usuarios

# Inicialización de FastAPI
app = FastAPI(
    title="NUEVO_ANGULAR: Gestión de Usuarios API",
    openapi_url="/api/v1/openapi.json"
)

# 🚨 CRÍTICO: Configuración CORS
FRONTEND_ORIGIN = os.getenv("FRONTEND_ORIGIN")
# CORRECCIÓN: Si FRONTEND_ORIGIN existe, lo dividimos por la coma para obtener una lista de orígenes.
# Si no existe, usamos una lista vacía para evitar errores.
origins_list = []
if FRONTEND_ORIGIN:
    origins_list = FRONTEND_ORIGIN.split(',')

# 💡 Ahora añadimos los orígenes. Usar "http://localhost" o "http://127.0.0.1" ya no es necesario 
# si están incluidos en la variable de entorno, pero los dejamos si necesitas probar sin Docker.
origins = origins_list 

app.add_middleware(
    CORSMiddleware,
    # Ahora 'origins' es una lista ['http://localhost:9001', 'http://localhost:4200']
    allow_origins=origins, 
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)


# --- ROUTERS ---

# Router de Autenticación (Ruta final: /api/v1/auth/...)
app.include_router(auth.router, prefix="/api/v1/auth", tags=["Auth"])

# 🚀 AÑADIDO: Router de Usuarios (Ruta final: /api/v1/users/...)
app.include_router(users.router, prefix="/api/v1/users", tags=["Users"])


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