# backend/app/crud.py

from sqlalchemy.orm import Session
from typing import Optional

# Importaciones de tu propia estructura
from .models import User  # Modelo SQLAlchemy
from .schemas import UserCreate # Esquema Pydantic para la creación
from .utils import get_password_hash # Utilidad de hashing

def get_user_by_email(db: Session, email: str) -> Optional[User]:
    """Busca un usuario por su email."""
    return db.query(User).filter(User.email == email).first()

def create_user(db: Session, user_in: UserCreate) -> User:
    """Crea un nuevo usuario con la contraseña hasheada."""
    
    # 1. Hashear la contraseña
    hashed_password = get_password_hash(user_in.password)
    
    # 2. Crear la instancia de la DB usando los campos del esquema
    db_user = User(
        email=user_in.email,
        hashed_password=hashed_password,
        name=user_in.name,
        phone=user_in.phone,
        role=user_in.role
    )
    
    # 3. Guardar en la DB
    db.add(db_user)
    db.commit()
    db.refresh(db_user)
    return db_user

# Futuras funciones CRUD (get_user_by_id, update_user, delete_user) irían aquí.