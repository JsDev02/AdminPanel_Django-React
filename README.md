# AdminPanel_Django-React

## Descripción

Aplicación web con backend en Django y frontend en React que proporciona una consola de administración con diferentes roles de usuario:

- **Usuarios Admin**: Panel con métricas detalladas de usuarios (inicios de sesión, duración de sesión, interacciones)
- **Usuarios Regulares**: Acceso a landing page con registro de interacciones

## Requisitos Previos

- Python 3.x
- Node.js y npm

## Configuración del Proyecto

### Backend (Django)

1. Configurar entorno virtual:
```bash
python -m venv venv
source venv/Scripts/activate
```

2. Instalar dependencias:
```bash
pip install -r requirements.txt
```
3. Base de datos:
Este proyecto incluye un archivo `db.sqlite3` con datos de prueba precargados. Si deseas regenerar la base de datos desde cero, puedes hacerlo con:

```bash
python manage.py makemigrations
python manage.py migrate
python load_data.py
```

4. Iniciar servidor de desarrollo:
```bash
python manage.py runserver
```

### Frontend (React)

1. Instalar dependencias:
```bash
npm install
```

2. Iniciar servidor de desarrollo:
```bash
npm run dev
```

## Estructura del Proyecto

### Backend
- `Backend/`: Configuración del backend
- `users/`: Aplicación encargada de gestionar a los usuarios, incluyendo su autenticación, roles y actividad
- `frontinfo/`: Aplicación que gestiona la información mostrada en la página de inicio del panel
- `load_data.py`: Script utilizado para cargar datos de prueba en la base de datos

### Frontend
- `Front/`: Código del frontend en React

## Endpoints de API

### Autenticación
- `POST /api/token/`: Obtener token de acceso
  - Payload: `{"username": "admin", "password": "admin123"}`
  - Respuesta: Token de acceso, id, rol y nombre

### Endpoints de Usuarios
Todos requieren de token para funcionar
- `GET /api/frontinfo/`: Información del panel
- `GET /api/users/`: Lista de usuarios (admin)
- `GET /api/users/{id}`: Información de usuario específico (no puede obtener la información de otro usuario, solo de sí mismo)
- `PATCH /api/users/{id}`: Actualización de información personal  (no puede modificar a otro usuario, solo a sí mismo)

## Credenciales de Prueba

### Administrador
- Usuario: `admin`
- Contraseña: `admin123`

### Usuarios Regulares
- Usuarios: `user1` a `user35`
- Contraseñas: `password1` a `password35`

## Configuración Adicional

- **Autenticación**: JWT (JSON Web Tokens)
- **Base de Datos**: SQLite (por defecto de django)
- **CORS**: Configurado para `http://localhost:5173`
- **Expiración de Tokens**: 1 día (por practicidad de desarrollo)

## Solución de Problemas

### Error de CORS
Verificar configuración en `Backend/settings.py`:
```python
CORS_ALLOWED_ORIGINS = [
    'http://localhost:5173',
]
```

### Token Expirado
- Cerrar sesión y volver a iniciar

### Botón de cerrar sesión
- Eliminar los datos almacenados en el localStorage y recargar la página para regresar al login.
