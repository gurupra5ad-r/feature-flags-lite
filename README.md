# feature-flags-lite
**What this shows:** API design, security basics (JWT), React SDK ergonomics.

- `GET /flags` public; `PUT /flags/:key` requires `Authorization: Bearer <jwt>`
- React `useFlag(key)` hook + provider with simple cache
