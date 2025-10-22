# backend/app/crud.py (FINAL CORREGIDO Y LIMPIO)

from sqlalchemy.orm import Session
from typing import Optional

# Importaciones de tu propia estructura
from .models import User # Modelo SQLAlchemy
from .schemas import UserCreate # Esquema Pydantic para la creación
from .utils import get_password_hash # Utilidad de hashing

def get_user_by_email(db: Session, email: str) -> Optional[User]:
    """Busca un usuario por su email."""
    return db.query(User).filter(User.email == email).first()

def create_user(db: Session, user_in: UserCreate) -> User:
    """Crea un nuevo usuario con la contraseña hasheada y asigna un rol."""
    
    # 1. Hashear la contraseña
    hashed_password = get_password_hash(user_in.password)
    
    # 2. Crear la instancia de la DB
    db_user = User(
        email=user_in.email,
        hashed_password=hashed_password,
        name=user_in.name,
        phone=user_in.phone,
        # CORRECCIÓN: Asignar un rol por defecto.
        role="user" 
    )
    
    # 3. Guardar en la DB
    db.add(db_user)
    db.commit()
    db.refresh(db_user)
    return db_user

def get_all_users(db: Session) -> list[User]:
    """Obtiene todos los usuarios de la base de datos."""
    return db.query(User).all()

# Futuras funciones CRUD (get_user_by_id, update_user, delete_user) irían aquí.