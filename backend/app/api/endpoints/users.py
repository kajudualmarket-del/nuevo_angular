# backend/app/api/endpoints/users.py (FINAL CORREGIDO)

from fastapi import APIRouter, Depends
from sqlalchemy.orm import Session
from typing import List

# Importaciones de tu propia estructura
from ...db import get_db
from ...schemas import User, UserCreate # <-- CORRECCIÓN CLAVE: Importar el esquema 'User'
from ...crud import get_all_users 
# from ...dependencies import get_current_user 

router = APIRouter()

# ---------------------------------------------
# ENDPOINT PARA LISTAR TODOS LOS USUARIOS
# ---------------------------------------------
# Ahora 'User' está definido gracias a la importación.
@router.get("/", response_model=List[User])
def read_users(
    db: Session = Depends(get_db),
    # current_user: User = Depends(get_current_user), # Descomentar para JWT
) -> List[User]:
    """Obtiene una lista de todos los usuarios (Ruta final: /api/v1/users/)."""
    users = get_all_users(db)
    return users

# Opcional: Si tienes un endpoint para crear usuarios, usa UserCreate en ese lugar.
# @router.post("/", response_model=User)
# def create_user_endpoint(user: UserCreate, db: Session = Depends(get_db)):
#     # ...
#     pass