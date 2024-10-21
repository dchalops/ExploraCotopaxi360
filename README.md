# Firebase Auth JWT - Next - Prisma - tRPC

- [x] Next
- [x] Prisma
- [x] tRPC
- [x] TypeScript
- [x] Firebase
- [x] Tailwind CSS / SASS
- [x] shadcn/ui

### Set Up

Install dependencies 
```
npm install
``` 

Run dev server 
```
npm run dev
``` 

Preview production build 
```
npm run build && npm run start
``` 

### Create `.env` from `.env.example` 

```
cp .env.example .env
```

### Firebase App Configuration

Replace variables with [firebase console](https://console.firebase.google.com/) app configuration values

`NEXT_PUBLIC_FB_API_KEY=''` 

`NEXT_PUBLIC_FB_AUTH_DOMAIN=''` 

`NEXT_PUBLIC_FB_PROJECT_ID=''` 

`NEXT_PUBLIC_FB_STORAGE_BUCKET=''` 

`NEXT_PUBLIC_FB_MESSAGING_SENDER_ID=''` 

`NEXT_PUBLIC_FB_APP_ID=''` 

### Firebase Admin SDK Configuration

`FIREBASE_SERVICE_ACCOUNT_KEY={}` 

[Remove line breaks](https://www.textfixer.com/tools/remove-line-breaks.php) from service account json

### Prisma Set Up 

Add database url to `.env.local`

`DATABASE_URL=''` 

```
npx prisma db push

Para generar el cliente de Prisma, ejecuta:
npx prisma generate

Si realizaste cambios en el esquema y deseas migrarlos, puedes usar:
npx prisma migrate dev
```

### Roadmap 

- [x] Sign Up - `synced with prisma UserAccount model`
- [x] Login
- [x] Sign Out

<img src="./public/Mapa.jpeg" style="width: 100%; max-width: 800px; height: auto; margin-top: 16px;"># exploracotopai360
