# backend/app/models.py

from sqlalchemy import Column, Integer, String, Boolean
# Importa la Base Declarativa que definimos en db.py
from .db import Base 

class User(Base):
    """
    Modelo de usuario mapeado a la tabla 'users'.
    Contiene campos esenciales para la autenticación y la gestión.
    """
    __tablename__ = "users"

    # Campos de Autenticación
    id = Column(Integer, primary_key=True, index=True)
    email = Column(String(255), unique=True, index=True, nullable=False)
    # Almacena el hash de la contraseña (NO la contraseña en texto plano)
    hashed_password = Column(String(255), nullable=False)
    is_active = Column(Boolean, default=True)

    # Campos de Gestión (para el futuro CRUD/Carga Masiva)
    name = Column(String(100), nullable=True)
    phone = Column(String(20), nullable=True)
    role = Column(String(50), default="user") # Ejemplo: 'user', 'admin'

    def __repr__(self):
        return f"<User(email='{self.email}', id={self.id})>"