# E-Commerce React App con Firebase

Aplicación de React + TypeScript + Vite para gestionar productos, cupones y usuarios con autenticación y persistencia en Firestore.

## Descripción

Este proyecto funciona como una pequeña tienda o panel administrativo con:

- listado de productos nacionales
- detalle de productos
- carrito de compras
- perfil de usuario
- login y registro con Firebase Auth
- gestión de productos en Firestore
- gestión de cupones en Firestore
- rutas protegidas para usuarios administradores y autenticados

## Tecnologías

- React 19
- TypeScript
- Vite
- React Router DOM
- Bootstrap + React Bootstrap
- Firebase Firestore
- Firebase Authentication
- Styled Components

## Funcionalidades principales

### Productos

- Crear, editar y eliminar productos desde la sección de administración.
- Cargar información como nombre, descripción, categoría, precio, stock e imagen.
- Mostrar productos en la vista pública con búsqueda y paginación.
- Ver el detalle de cada producto en una ruta específica.

### Cupones

- Registrar cupones con código y porcentaje de descuento.
- Listar cupones existentes desde Firestore.
- Eliminar cupones desde la administración.

### Perfil

- Vista de perfil para usuarios autenticados.
- Cierre de sesión con `useAuth`.
- Acceso protegido mediante rutas configuradas en `ProtectedRoute`.

### Autenticación

- Registro de usuarios con email y contraseña usando Firebase Auth.
- Inicio de sesión con Firebase Auth.
- Persistencia y control de sesión mediante Firebase.

### Carrito y búsqueda

- Carrito de compras con contexto global.
- Búsqueda de productos en la interfaz.
- Navegación por rutas del catálogo y detalle.

## Requisitos locales

Antes de correr el proyecto, asegúrate de tener instalado:

- Node.js 18 o superior
- npm
- Un proyecto de Firebase con:
  - Firebase Authentication habilitado
  - Firestore habilitado
  - una colección llamada `productos nacionales`
  - una colección llamada `cupones`

## Configuración local

1. Clona el repositorio:

```bash
git clone <url-del-repo>
npm install
```

2. Entra al proyecto:

```bash
cd "BA Aprende/REACT JS/Ejercicios/001"
```

3. Configura Firebase en el archivo de configuración:

El proyecto usa la configuración de Firebase en:

- `src/firebase/config.tsx`

Debes reemplazar el objeto `firebaseConfig` con el de tu propio proyecto Firebase.

4. Opcional: configura la clave de Imgbb para subir imágenes desde el formulario de producto.

En el archivo `src/components/Gestion/Gestion.tsx` se usa:

```ts
const apiKey = import.meta.env.VITE_IMGBB_API_KEY;
```

Puedes crear un archivo `.env` en la raíz del proyecto con:

```env
VITE_IMGBB_API_KEY=tu_api_key
```

## Scripts disponibles

```bash
npm run dev
```

Inicia el servidor de desarrollo de Vite.

```bash
npm run build
```

Genera una build de producción.

```bash
npm run preview
```

Previsualiza la build generada.

```bash
npm run lint
```

Ejecuta ESLint para revisar el proyecto.

## Cómo ejecutar la aplicación

Desde la raíz del proyecto:

```bash
npm install
npm run dev
```

La aplicación quedará disponible en el puerto estándar de Vite, normalmente:

```text
http://localhost:5173
```

## Estructura principal

- `src/App.tsx` — rutas principales y layout
- `src/components/Gestion/Gestion.tsx` — CRUD de productos
- `src/components/GestionCupones/GestionCupones.tsx` — CRUD de cupones
- `src/components/Perfil/Perfil.tsx` — perfil del usuario
- `src/components/Login/Login.tsx` — login
- `src/components/Registro/Registro.tsx` — registro
- `src/firebase/config.tsx` — configuración de Firebase
- `src/context/` — contextos globales de carrito, búsqueda y autenticación

## Observaciones importantes

- La colección de productos usada por la app se llama `productos nacionales`.
- La colección de cupones es `cupones`.
- La aplicación usa rutas protegidas para limitar el acceso a ciertas páginas.
- El proyecto está pensado como una demo o MVP de administración de una tienda con Firebase.

## Siguientes mejoras recomendadas

- Mejorar la gestión de roles de usuario.
- Agregar validaciones más robustas en formularios.
- Centralizar la configuración en variables de entorno.
- Separar mejor la lógica entre servicios y componentes.
- Mejorar la experiencia de perfil con información real del usuario autenticado.
