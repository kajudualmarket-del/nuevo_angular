# backend/app/schemas.py (COMPLETO Y CORREGIDO)

from pydantic import BaseModel, EmailStr
from typing import Optional # Necesario para campos que no son obligatorios

# ---------------------------------------------
# --- Esquemas de Usuario (para CRUD) ---
# ---------------------------------------------

class UserBase(BaseModel):
    """Atributos comunes para lectura/escritura de usuario."""
    email: EmailStr
    name: str
    phone: Optional[str] = None
    role: Optional[str] = "user"
    is_active: Optional[bool] = True


class UserCreate(UserBase):
    """Esquema de entrada para el Registro (POST). Requiere password."""
    password: str # El campo 'password' solo se usa en la creación.


class UserUpdate(BaseModel):
    """
     CORRECCIÓN: Esquema de entrada para la Actualización (PUT/PATCH).
    Todos los campos deben ser Optional para permitir actualizaciones parciales.
    """
    email: Optional[EmailStr] = None
    name: Optional[str] = None
    phone: Optional[str] = None
    password: Optional[str] = None # Permitir cambiar la contraseña
    role: Optional[str] = None
    is_active: Optional[bool] = None


class User(UserBase):
    """Esquema de salida para la API (GET/PUT, omite el hashed_password)."""
    id: int
    
    class Config:
        # Permite que Pydantic lea directamente los objetos ORM de SQLAlchemy.
        from_attributes = True 


# ---------------------------------------------
# --- Esquemas de Autenticación ---
# ---------------------------------------------

class LoginRequest(BaseModel):
    """Esquema de entrada para el Login (Email y Password)."""
    email: EmailStr
    password: str

class Token(BaseModel):
    """Esquema de respuesta para el Login."""
    access_token: str
    token_type: str = "bearer"

class TokenData(BaseModel):
    """Datos contenidos en el payload del JWT (el subject)."""
    user_id: Optional[str] = None