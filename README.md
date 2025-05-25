# quizly-mygcse
## GCSE quiz platform

> This is a [Next.js](https://nextjs.org) project bootstrapped with [`create-next-app`](https://nextjs.org/docs/app/api-reference/cli/create-next-app).

## Getting Started

```bash
npm install

npm run dev
npm run start
```

## Setting Up Appwrite (Windows)
> 📦 Make sure [Docker Desktop](https://www.docker.com/products/docker-desktop/) is installed and running.

Run this command in your terminal:

bat`docker compose up -d` in root/appwrite (where `docker-compose.yml` is)

Turn off: bat`docker compose down` in same place.

> Setup:
```bat
docker run -it --rm ^
    --volume //var/run/docker.sock:/var/run/docker.sock ^
    --volume "%cd%"/appwrite:/usr/src/code/appwrite:rw ^
    --entrypoint="install" ^
    appwrite/appwrite:1.7.3
```
