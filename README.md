# openauth-nextjs-api-demo

Little demo trying out [OpenAuth](https://openauth.js.org/) for centralized authentication

- Authenticating from a Next.js app
- Protecting routes in Next.js middleware
- Authenticating in REST API from cookies or authorization header

## How to run

```bash
bun install
docker compose up -d
cd packages/db && cp .env.example .env && bunx prisma migrate dev
cd ../auth
cd ../web && cp .env.example .env
cd ../api && cp .env.example .env
cd ../.. && bun dev
```

Open browser and go to http://localhost:3000
