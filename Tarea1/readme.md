# API de Noticias

Una API sencilla hecha con Node.js y Express para buscar noticias usando NewsAPI.

## Qué hace

Esta aplicación te permite acceder a noticias a través de tres endpoints:
- **Sources**: Lista las fuentes de noticias disponibles
- **Top Headlines**: Los titulares más importantes
- **News**: Búsqueda general de noticias

## Tecnologías

- Node.js
- Express.js 
- Axios (para hacer peticiones HTTP)
- Dotenv (para manejar variables de entorno)
- Nodemon (para desarrollo)

## Qué necesitas antes de empezar

1. Node.js instalado (versión 14 o más reciente)
2. Una cuenta en NewsAPI:
   - Ve a https://newsapi.org
   - Regístrate y consigue tu API Key

## Cómo instalar

1. Clona el repositorio y entra a la carpeta:
```bash
git clone <url-del-repositorio>
cd tarea1
```

2. Instala las dependencias:
```bash
npm install
```

3. Crea un archivo `.env` y agrega tu API Key:
```env
NEWS_API_KEY=tu_api_key_aqui
PORT=3000
```

4. Ejecuta la aplicación:
```bash
# Para desarrollo (se reinicia automáticamente)
npm run dev

# Para producción
npm start
```

La app estará corriendo en http://localhost:3000

## Endpoints disponibles

### GET /api/sources
Lista las fuentes de noticias. Puedes filtrar por categoría, idioma o país.

Ejemplo: `/api/sources?category=technology&language=es`

### GET /api/top-headlines  
Obtiene los titulares principales. Puedes filtrar por país, categoría o buscar términos específicos.

Ejemplo: `/api/top-headlines?country=mx&category=sports`

### GET /api/everything
Busca noticias por término. Este endpoint requiere el parámetro `q` para la búsqueda.

Ejemplo: `/api/everything?q=tecnologia&language=es`

