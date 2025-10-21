# backend/app/api/endpoints/auth.py

from fastapi import APIRouter, Depends, HTTPException, status
from sqlalchemy.orm import Session
from typing import Any

# Importaciones de tu propia estructura
from ...db import get_db
from ...schemas import UserCreate, User, LoginRequest, Token
from ...crud import get_user_by_email, create_user
from ...utils import verify_password, create_access_token


router = APIRouter()

# ---------------------------------------------
# 1. ENDPOINT DE REGISTRO (/auth/register)
# ---------------------------------------------
@router.post("/register", response_model=User, status_code=status.HTTP_201_CREATED)
def handle_register(
    user_in: UserCreate, 
    db: Session = Depends(get_db)
) -> Any:
    """Permite el registro de un nuevo usuario."""
    
    existing_user = get_user_by_email(db, email=user_in.email)
    if existing_user:
        raise HTTPException(
            status_code=status.HTTP_400_BAD_REQUEST,
            detail="El email ya está registrado."
        )
    
    # Crea el usuario y hashea la contraseña a través de la función CRUD
    user = create_user(db, user_in)
    return user

# ---------------------------------------------
# 2. ENDPOINT DE LOGIN (/auth/login)
# ---------------------------------------------
@router.post("/login", response_model=Token)
def handle_login(
    form_data: LoginRequest, 
    db: Session = Depends(get_db)
):
    """Inicia sesión y devuelve un token de acceso JWT."""
    
    user = get_user_by_email(db, email=form_data.email)
    
    # 1. Verificar existencia y contraseña
    if not user or not verify_password(form_data.password, user.hashed_password):
        raise HTTPException(
            status_code=status.HTTP_401_UNAUTHORIZED,
            detail="Credenciales incorrectas.",
            headers={"WWW-Authenticate": "Bearer"},
        )
        
    # 2. Generar el token
    access_token = create_access_token(subject=str(user.id))
    
    return {"access_token": access_token, "token_type": "bearer"}