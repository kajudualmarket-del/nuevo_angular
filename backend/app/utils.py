# backend/app/utils.py (FINAL CORREGIDO Y LIMPIO)

import os
from datetime import datetime, timedelta
from typing import Any, Optional, Union

from passlib.context import CryptContext
from jose import jwt # Necesitas 'python-jose[cryptography]' y 'passlib[bcrypt]'

# CONFIGURACIÓN: Lee la clave secreta desde las variables de entorno
SECRET_KEY = os.getenv("SECRET_KEY")
ALGORITHM = "HS256"
# Tiempo de expiración del token (ej. 30 minutos)
ACCESS_TOKEN_EXPIRE_MINUTES = 30

if not SECRET_KEY:
    # Esta línea está ahora limpia de caracteres U+00A0
    raise ValueError("SECRET_KEY no está configurada en el entorno.")

# Contexto para hashing de contraseñas
pwd_context = CryptContext(schemes=["bcrypt"], deprecated="auto")


# --- FUNCIONES DE HASHING ---

def get_password_hash(password: str) -> str:
    """
    Genera el hash de una contraseña.
    """
    # Trunca el string a 72 bytes (el límite de bcrypt)
    truncated_password = password.encode('utf-8')[:72]
    
    return pwd_context.hash(truncated_password)

def verify_password(plain_password: str, hashed_password: str) -> bool:
    """Verifica si la contraseña plana coincide con el hash."""
    return pwd_context.verify(plain_password, hashed_password)


# --- FUNCIONES DE JWT ---

def create_access_token(
    subject: Union[str, Any], expires_delta: Optional[timedelta] = None
) -> str:
    """Crea un nuevo token de acceso JWT."""
    if expires_delta:
        expire = datetime.utcnow() + expires_delta
    else:
        expire = datetime.utcnow() + timedelta(minutes=ACCESS_TOKEN_EXPIRE_MINUTES)
        
    # 'sub' (subject) contendrá el ID del usuario
    to_encode = {"exp": expire, "sub": str(subject)}
    
    encoded_jwt = jwt.encode(to_encode, SECRET_KEY, algorithm=ALGORITHM)
    return encoded_jwt