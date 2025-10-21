# Usa Python 3.11 Slim
FROM python:3.11-slim

# Establece el directorio de trabajo
WORKDIR /app

# Instala dependencias del sistema necesarias
# Incluye gcc y libmysqlclient-dev para dependencias de MySQL (pymysql)
# Incluye netcat-openbsd para el script de espera (nc -z) en docker-compose.yml
RUN apt-get update && \
    apt-get install -y gcc default-libmysqlclient-dev pkg-config netcat-openbsd curl && \
    rm -rf /var/lib/apt/lists/*

# Copia e instala dependencias de Python
COPY requirements.txt .
RUN pip install --no-cache-dir -r requirements.txt

# Copia el código fuente de la aplicación
COPY ./app /app/app

# El comando de inicio se define en docker-compose.yml