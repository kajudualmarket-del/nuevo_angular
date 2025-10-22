# backend/app/crud.py (FINAL COMPLETO Y CORREGIDO)

from sqlalchemy.orm import Session
from typing import Optional, List # <-- Añadido List para get_all_users

# Importaciones de tu propia estructura
from .models import User # Modelo SQLAlchemy
# Se necesitan UserCreate y UserUpdate para las funciones
from .schemas import UserCreate, UserUpdate 
from .utils import get_password_hash # Utilidad de hashing
# Nota: Si necesitas verificar la contraseña, también importarías check_password

# ---------------------------------------------
# FUNCIONES EXISTENTES (Mantenidas intactas)
# ---------------------------------------------

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
        hashed_password=hashed_password, # Asegúrate de que tu modelo tenga 'hashed_password'
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

def get_all_users(db: Session) -> List[User]:
    """Obtiene todos los usuarios de la base de datos."""
    return db.query(User).all()

# ---------------------------------------------
# FUNCIONES AÑADIDAS (Para soportar Editar y Eliminar)
# ---------------------------------------------

def get_user_by_id(db: Session, user_id: int) -> Optional[User]:
    """
    🛑 AÑADIDO: Obtiene un usuario por su ID.
    Necesario para cargar el formulario de edición.
    """
    return db.query(User).filter(User.id == user_id).first()

def update_user(db: Session, user_id: int, user: UserUpdate) -> Optional[User]:
    """
    🛑 AÑADIDO: Actualiza la información de un usuario.
    Necesario para el endpoint PUT/PATCH de edición.
    """
    db_user = db.query(User).filter(User.id == user_id).first()
    
    if db_user:
        # Pydantic model_dump(exclude_unset=True) obtiene solo los campos que fueron enviados en la solicitud
        # Esto evita sobrescribir campos con None si no se enviaron
        update_data = user.model_dump(exclude_unset=True) 
        
        # Manejo especial de la contraseña si se proporciona una nueva
        if 'password' in update_data and update_data['password']:
            new_password = update_data.pop('password')
            update_data['hashed_password'] = get_password_hash(new_password)
        
        # Aplicar el resto de los cambios
        for key, value in update_data.items():
            setattr(db_user, key, value)
            
        db.add(db_user)
        db.commit()
        db.refresh(db_user)
        return db_user
    
    return None

def delete_user(db: Session, user_id: int) -> bool:
    """
    🛑 AÑADIDO: Elimina un usuario por su ID.
    Necesario para el endpoint DELETE.
    """
    db_user = db.query(User).filter(User.id == user_id).first()
    
    if db_user:
        db.delete(db_user)
        db.commit()
        return True
        
    return False # Usuario no encontrado