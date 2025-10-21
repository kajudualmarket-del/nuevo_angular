# backend/app/schemas.py

from pydantic import BaseModel, EmailStr
from typing import Optional

# --- Esquemas de Usuario (para CRUD) ---

class UserBase(BaseModel):
    """Atributos comunes para lectura de usuario."""
    email: EmailStr
    name: Optional[str] = None
    phone: Optional[str] = None
    role: Optional[str] = "user"
    is_active: Optional[bool] = True


class UserCreate(UserBase):
    """Esquema de entrada para el Registro."""
    password: str # El campo 'password' solo se usa en la creación, no en la lectura.


class User(UserBase):
    """Esquema de salida para la API (omite el hashed_password)."""
    id: int
    
    class Config:
        # Permite que Pydantic lea directamente los objetos ORM de SQLAlchemy.
        from_attributes = True 


# --- Esquemas de Autenticación ---

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