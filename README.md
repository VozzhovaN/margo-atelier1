# MARGO ATELIER

Мобильное консультационное досье ателье: клиентский опросник, AI Style Direction и Telegram-уведомления.

Приложение — это React + Express, а не одиночный HTML. Файл `index.html` сам по себе в браузере не откроется: его поднимает сервер из `server.ts` на порту **3000**.

## 1. Что должно быть установлено

- **Node.js 20 или новее**
- Проверка в PowerShell:

```powershell
node -v
npm -v
```

Если `node` не находится — установите LTS с [https://nodejs.org](https://nodejs.org) и перезапустите терминал.

## 2. Открыть папку проекта

В PowerShell:

```powershell
cd "C:\Users\Nelli\Desktop\вайбкодинг\проекты курсор\margo-atelier"
```

Дальше все команды выполняются из этой папки (рядом должны быть `package.json` и `server.ts`).

## 3. Установить зависимости (один раз)

```powershell
npm install
```

Появится папка `node_modules`. Это займёт 1–3 минуты.

## 4. Создать файл настроек `.env`

Скопируйте шаблон:

```powershell
Copy-Item .env.example .env
```

Откройте `.env` и при желании заполните:

- `GEMINI_API_KEY` — живой AI Style Direction; **можно оставить пустым**, тогда сработает встроенный движок ателье
- `TELEGRAM_BOT_TOKEN` и `TELEGRAM_CHAT_ID` — уведомления о заявках в Telegram; **можно оставить пустыми** для первого запуска
- `PORT=3000` — меняйте, только если порт занят
- `APP_URL` — нужен уже на сервере с доменом, локально не обязателен

Без ключей приложение всё равно запускается.

## 5. Запуск для работы на компьютере (разработка)

```powershell
npm run dev
```

В консоли должно появиться: `MARGO ATELIER listening on http://0.0.0.0:3000 (development)`.

Откройте в браузере: **http://localhost:3000**

- RU/EN в шапке
- кнопка «Сформировать досье» — опросник
- иконка консоли — заявки ателье

Остановить: в том же терминале `Ctrl+C`.

Не закрывайте этот терминал, пока пользуетесь сайтом.

## 6. Если порт 3000 занят

В `.env` поставьте, например, `PORT=3001`, снова `npm run dev`, откройте http://localhost:3001.

## 7. Production-режим (как на сервере)

Это отдельный режим: сначала сборка, потом запуск без Vite.

```powershell
npm run build
npm start
```

Снова откройте **http://localhost:3000**.

На Windows не пишите `NODE_ENV=production npm start` — эта запись из Linux. Для локальной проверки достаточно `npm start`: сервер сам понимает, что запущен файл `dist/server.cjs`.

На Linux-сервере:

```bash
NODE_ENV=production npm start
```

## 8. Запуск на сервере

1. Скопировать весь проект, **включая** `src/assets/images`.
2. Node.js 20+.
3. `npm install` → создать `.env` → `npm run build` → `npm start`.
4. Для Telegram Mini App нужен **HTTPS** (Nginx/Caddy на этот порт).

Заполните в `.env` на сервере:

- `PORT` — порт процесса (или тот, что выдаёт хостинг)
- `GEMINI_API_KEY` — если нужен живой Gemini; иначе сработает встроенный движок
- `TELEGRAM_BOT_TOKEN` и `TELEGRAM_CHAT_ID` — чтобы досье приходили в Telegram
- `APP_URL` — публичный HTTPS-адрес, например `https://atelier.example.com`

Фронтенд отдаётся из `dist/public`, API — с того же порта (`/api/...`).

Пример Nginx:

```nginx
server {
  listen 443 ssl;
  server_name atelier.example.com;

  location / {
    proxy_pass http://127.0.0.1:3000;
    proxy_set_header Host $host;
    proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
    proxy_set_header X-Forwarded-Proto $scheme;
  }
}
```

Заявки сохраняются в `data/consultations.json`. На хостинге с эфемерным диском задайте постоянный путь через `DATA_DIR`.

### Docker

```bash
docker build -t margo-atelier .
docker run --env-file .env -p 3000:3000 margo-atelier
```

## Частые ошибки

- **`Cannot find module`** — не выполнен `npm install` или команда запущена не из папки проекта.
- **`Frontend build not found`** — для `npm start` сначала нужен `npm run build`. Для повседневной работы используйте `npm run dev`.
- Страница пустая при открытии `index.html` двойным щелчком — так задумано, нужен сервер из шага 5.
- Картинки не трогать: они в `src/assets/images` и подхватываются при `npm run dev` / `npm run build`.
