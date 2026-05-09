# ATMURA - AI Assistant Campus Navigation & MultimediaLab Platform

ATMURA universitet kampusi uchun AI yordamchi, kampus navigatsiyasi, 3D avatar, MultimediaLab va monitoringni birlashtirgan kengaytiriladigan MVP platforma.

## Ishga tushirish

```bash
npm install
npm run dev
```

Frontend: `http://localhost:5173`
Backend API: `http://localhost:4000`

## Render Deploy

`render.yaml` tayyor. Render uchun bir dona `Web Service` yetarli:

- Build Command: `npm install && npm run build`
- Start Command: `npm start`
- Health Check Path: `/api/health`

Productionda Express `dist/` ichidagi frontend buildni ham servis qiladi, shuning uchun frontend va backend bitta service sifatida ishlaydi.

## Demo imkoniyatlar

- Role-based dashboardlar: guest, student, teacher, admin, super admin
- 3D avatar paneli va assistant dock
- Kampus xaritasi, Dijkstra/A* routing, fuzzy search
- Face greeting, voice emotion, NFC touch-to-guide demo
- Teacher qidiruvi, reception, resources, tests, portfolio, monitoring
- Express mock backend, JWT auth, RBAC, PDF report endpoint, Telegram service abstraction
