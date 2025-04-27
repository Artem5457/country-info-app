# Country Info API

## Description
This small application provides information about countries and add holidays to the user’s calendar.

## Stack
- Node.js
- TypeScript
- Express.js
- Prisma ORM (PostgreSQl)

## Commands to start working with API
- `npm i` — Install all dependencies.
- `npx prisma generate` — Sychronization with database.
- `npm run build` — Build project.
- `npm run start` — Start server.

## Endpoints
1. Get Available Countries
`GET /api/country/available`

2. Get Country Info
`POST /api/country/info`
`{ countryCode: 'UA', countryName: 'Ukraine' }` — Example of request body.
