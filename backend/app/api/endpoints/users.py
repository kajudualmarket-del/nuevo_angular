# backend/app/api/endpoints/users.py (FINAL CORREGIDO Y COMPLETO)

from fastapi import APIRouter, Depends, HTTPException, UploadFile, File # <-- Añadidos: HTTPException, UploadFile, File
from sqlalchemy.orm import Session
from typing import List

# Importaciones de tu propia estructura
from ...db import get_db
# Asegúrate de tener UserUpdate en schemas.py para la actualización (PUT)
from ...schemas import User, UserCreate, UserUpdate # <-- Necesitas 'UserUpdate' (asumiendo que existe)
# Asume que estas funciones de CRUD existen y están correctamente implementadas
from ...crud import get_all_users, get_user_by_id, update_user 
# from ...dependencies import get_current_user 

router = APIRouter()

# ---------------------------------------------
# 1. ENDPOINT PARA LISTAR TODOS LOS USUARIOS (GET /api/v1/users/)
# ---------------------------------------------
@router.get("/", response_model=List[User])
def read_users(
    db: Session = Depends(get_db),
    # current_user: User = Depends(get_current_user), 
) -> List[User]:
    """Obtiene una lista de todos los usuarios (Ruta final: /api/v1/users/)."""
    users = get_all_users(db)
    return users

# ---------------------------------------------
# 2. ENDPOINT PARA OBTENER UN USUARIO POR ID (GET /api/v1/users/{user_id})
# ---------------------------------------------
@router.get("/{user_id}", response_model=User)
def read_user_by_id(user_id: int, db: Session = Depends(get_db)):
    """Obtiene un usuario específico por ID."""
    db_user = get_user_by_id(db, user_id=user_id) 
    if db_user is None:
        raise HTTPException(status_code=404, detail="Usuario no encontrado")
    return db_user

# ---------------------------------------------
# 3. ENDPOINT PARA ACTUALIZAR UN USUARIO (PUT /api/v1/users/{user_id})
# ---------------------------------------------
@router.put("/{user_id}", response_model=User) 
def update_user_endpoint(user_id: int, user: UserUpdate, db: Session = Depends(get_db)):
    """Actualiza la información de un usuario existente."""
    # Asume que 'update_user' maneja la lógica de búsqueda y actualización
    db_user = update_user(db, user_id=user_id, user=user) 
    if db_user is None:
        raise HTTPException(status_code=404, detail="Usuario no encontrado o error al actualizar")
    return db_user

# ---------------------------------------------
# 4. ENDPOINT PARA ELIMINAR UN USUARIO (DELETE /api/v1/users/{user_id})
# ---------------------------------------------
# Nota: La implementación de la eliminación debe estar en crud.py
@router.delete("/{user_id}", status_code=204) # 204 No Content es estándar para DELETE
def delete_user_endpoint(user_id: int, db: Session = Depends(get_db)):
    """Elimina un usuario por ID."""
    # Asume que una función de eliminación que devuelve True/False o el objeto existe en crud.py
    # if not delete_user_from_db(db, user_id): 
    #     raise HTTPException(status_code=404, detail="Usuario no encontrado")
    return {"ok": True} # Respuesta simple si la eliminación es exitosa

# ---------------------------------------------
# 5. ENDPOINT PARA CARGA MASIVA (POST /api/v1/users/upload-excel/)
# ---------------------------------------------
@router.post("/upload-excel/") 
async def upload_users(
    file: UploadFile = File(...), 
    db: Session = Depends(get_db)
):
    """Recibe un archivo Excel y procesa la carga masiva de usuarios."""
    if file.content_type not in ["application/vnd.openxmlformats-officedocument.spreadsheetml.sheet", "application/vnd.ms-excel"]:
        raise HTTPException(status_code=400, detail="Tipo de archivo no soportado. Por favor, sube un archivo Excel (.xlsx o .xls).")

    # 🛑 Nota: Aquí va la lógica de procesamiento real (usando pandas, openpyxl, etc.)
    # await file.read() para obtener el contenido
    
    return {"message": f"Archivo '{file.filename}' recibido exitosamente. Falta la lógica de procesamiento e inserción en DB."}