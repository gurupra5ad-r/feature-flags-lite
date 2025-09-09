# WARP.md

This file provides guidance to WARP (warp.dev) when working with code in this repository.

## Architecture Overview

This is a **feature flags system** demonstrating API design, JWT security, and React SDK ergonomics. The project consists of three main components:

### Monorepo Structure
- **Root**: NPM workspaces configuration with concurrent development script
- **`server/`**: Express.js API server (port 3001) 
- **`app/`**: React client application (port 5173, Vite)

### Server Architecture (`server/src/`)
- **`index.js`**: Express server with security middleware (helmet, CORS, rate limiting)
- **`auth.js`**: JWT authentication middleware for protected endpoints
- **`store.js`**: In-memory flag storage with simple get/set operations

**API Design:**
- `GET /flags` - Public endpoint returning all flags
- `PUT /flags/:key` - JWT-protected endpoint for updating flag state

### Client Architecture (`app/src/`)
- **`FlagProvider.jsx`**: React context provider with flag fetching and caching
- **`useFlag(key)`**: Custom hook for consuming flag state
- **`App.jsx`**: Demo component showing conditional rendering based on flags

**Key Pattern**: The client uses React Context + custom hooks for clean flag consumption throughout the component tree.

## Development Commands

### Start Development Environment
```bash
npm run dev
```
Concurrently runs both server (`node src/index.js`) and client (`vite`) in development mode.

### Individual Services
```bash
# Server only (from project root)
npm --prefix server run dev

# Client only (from project root)  
npm --prefix app run dev
```

### Testing & CI
```bash
# Run workspace tests (CI-friendly, won't fail on missing tests)
npm run ci

# Install dependencies across workspaces
npm ci
```

## Environment Configuration

### JWT Authentication
- Server uses `JWT_SECRET` environment variable (defaults to 'dev' if not set)
- Required for `PUT /flags/:key` endpoints
- Token format: `Authorization: Bearer <jwt>`

### Default Ports
- Server: http://localhost:3001
- Client: http://localhost:5173

### Default Flags
The in-memory store initializes with:
```javascript
{
  newNav: { enabled: false },
  betaSearch: { enabled: true }
}
```

## Key Implementation Details

### Security Middleware Stack
The server implements production-ready security:
- Helmet for security headers
- CORS for cross-origin requests  
- Rate limiting (120 requests per minute)
- JWT verification for protected routes

### Client Flag Pattern
The React implementation provides a clean developer experience:
```javascript
// Provider setup
<FlagProvider>
  <App />
</FlagProvider>

// Flag consumption
const showNewFeature = useFlag('featureKey');
```

This pattern ensures flags are fetched once on mount and cached in React context for efficient access across components.
