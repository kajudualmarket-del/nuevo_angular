# backend/app/db.py

import os
from sqlalchemy import create_engine
from sqlalchemy.ext.declarative import declarative_base
from sqlalchemy.orm import sessionmaker

# 🚨 CRÍTICO: Leer la URL desde las variables de entorno inyectadas por Docker Compose 🚨
# La URL es: mysql+pymysql://root:password@app-mysql-db:3306/nuevo_angular_db
DATABASE_URL = os.getenv("DATABASE_URL")

if not DATABASE_URL:
    raise ValueError("DATABASE_URL no está configurada en las variables de entorno.")

# Crear el motor de SQLAlchemy
engine = create_engine(DATABASE_URL, pool_pre_ping=True)

# Crear la clase SessionLocal
# autocommit=False: útil si usas migraciones o transacciones complejas.
# autoflush=False: evita que SQLAlchemy envíe comandos automáticamente.
SessionLocal = sessionmaker(
    autocommit=False, 
    autoflush=False, 
    bind=engine
)

# Base Declarativa (es la que usarán tus modelos en models.py)
Base = declarative_base()


# Función de Dependencia (para usar en los routers de FastAPI)
def get_db():
    """Proporciona una sesión de base de datos para los endpoints de FastAPI."""
    db = SessionLocal()
    try:
        yield db
    finally:
        db.close()

# ----------------------------------------------------------------------
# NOTA IMPORTANTE: Inicializar la DB y crear las tablas
# ----------------------------------------------------------------------
# Normalmente, esta lógica iría en init_db.py y se llamaría desde main.py.
# Para la prueba inicial, puedes añadir esta función para crear las tablas
# (como la futura tabla 'users') si aún no usas un sistema de migraciones (Alembic).

def create_tables():
    """Crea todas las tablas definidas en los modelos."""
    # Importar los modelos *antes* de llamar a create_all para que Base los reconozca.
    # from .models import User  
    Base.metadata.create_all(bind=engine)