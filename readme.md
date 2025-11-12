# Шаблон для выполнения тестового задания

## Описание

Шаблон подготовлен для того, чтобы попробовать сократить трудоемкость выполнения тестового задания.

В шаблоне настоены контейнеры для `postgres` и приложения на `nodejs`.  
Для взаимодействия с БД используется `knex.js`.  
В контейнере `app` используется `build` для приложения на `ts`, но можно использовать и `js`.

Шаблон не является обязательным!\
Можно использовать как есть или изменять на свой вкус.

Все настройки можно найти в файлах:

- compose.yaml
- dockerfile
- package.json
- tsconfig.json
- src/config/env/env.ts
- src/config/knex/knexfile.ts

## Команды:

Запуск базы данных:

```bash
docker compose up -d --build postgres
```

Для выполнения миграций и сидов не из контейнера:

```bash
npm run knex:dev migrate latest
```

```bash
npm run knex:dev seed run
```

Также можно использовать и остальные команды (`migrate make <name>`,`migrate up`, `migrate down` и т.д.)

Для запуска приложения в режиме разработки:

```bash
npm run dev
```

Запуск проверки самого приложения:

```bash
docker compose up -d --build app
```

Для финальной проверки рекомендую:

```bash
docker compose down --rmi local --volumes
docker compose up --build
```

PS: С наилучшими пожеланиями!



# Чтобы обеспечить работу автоматизированного сервиса записи/обновления тарифов WB с последующей записью в PostgreSQL и google sheets локально и через Docker, выполните слудющие действия:

1. Создайте .env в корне проекта (рядом с docker-compose.yml) на основе примера .env.example:

Примечание: в созданных google таблицах лист должен называться "stocks_coefs"!

2. Для работы с API google sheets выполните нижеуказанные действия:
  - создайте проект прейдя по ссылке https://console.cloud.google.com/projectcreate;
  - в разделе APIs & Services → Library включите: Google Sheets API
  - создайте сервисный аккаунт:
     - перейдите в IAM & Admin → Service Accounts;
     - нажмите Create Service Account;
     - укажите имя (например wb-tariffs);
     - после создания — выбери аккаунт → Keys → Add Key → Create new key → JSON;
     - сохраните JSON-файл, переименуйте его в google_service.json и положите его по  следующему пути ./src/services/google-api/google_service.json.


3. Запустите команду  
```bash
  docker compose up 
```

Все вышеуказанные команды также работают  

