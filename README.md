# INT20H-web-test-task

Quespiration – це інтерактивна платформа для створення та проходження квестів. Користувачі можуть конструювати власні квести, додавати запитання різних типів (текстові, тестові, зображення) та ділитися ними з іншими. Платформа має систему рейтингів, прогресу та нагород.
📌 Автори:
Маріненко Анастасія
Калюжний Микита
Римар Юлія
Бєрєстова Марія

📌 Що ми зробили?
🔹 Готові компоненти:
🔹 Головна сторінка – відображає список популярних квестів, пошук, рейтинг.
🔹 Авторизація та реєстрація
🔹 Профіль користувача – зміна аватара, перегляд досягнень, історія проходжень.
🔹 Створення квесту – реалізований конструктор квестів з можливістю додавання рівнів, запитань.
🔹Проходження квесту – можливість відповісти на запитання та отримати результат.
🔹Збереження прогресу – користувач може повернутися до проходження незавершеного квесту.

🔹 Створено базу даних для збереження всієї інформації про квести, користувачів і прогрес.
🔹 Розроблено структуру таблиць:
🔹 Користувачі (User) – збереження профілю, статусу, аватарів.
🔹 Квести (Quest) – назва, опис, час проходження, автор.
🔹 Рівні квесту (QuestTask) – збереження рівнів, варіантів відповідей, медіа-контенту.
🔹Оцінки квестів (QuestRating) – рейтинг, коментарі.
🔹 Прогрес проходження (QuestProgress, TaskProgress) – збереження статусу, результатів.
🔹 Готові API для роботи з базою даних:
Користувачі – створення, оновлення, авторизація через JWT.
Квести – CRUD-операції (створення, редагування, отримання, видалення).
Прогрес проходження – запис результатів проходження рівнів.
Рейтинги та коментарі – збереження оцінок і коментарів до квестів.
Система винагород – автоматична видача бейджів.
Безпека – авторизація через JWT, захист ендпоінтів.
🔹 Файли (зображення, медіа) зберігаються у хмарному сховищі Azure.
Завантаження аватарів користувачів.
Збереження зображень для завдань у квестах.
Обробка завантажених медіа-файлів.
🔹 Розгортання на сервері через Docker та Azure:
Контейнери Docker для бекенду, фронтенду та бази даних.
Деплоймент на сервер Azure.
Swagger-документація API.
📌 Що ще потрібно доробити?
🔸 Автоматичний переклад платформи на різні мови.
🔸 Функціонування пошукового поля на титульній сторінці.
🔸 Повноцінна система бейджів за проходження квестів.
🔸 Зв’язування сторінки проходження квесту з бекендом у реальному часі.
🔸 Відображення рейтингу квестів на головній сторінці.
🔸 Збереження коментарів та їх вивід у профілі квесту.

# **Запуск контейнерів через Docker**

Цей документ містить інструкції для налаштування та запуску контейнерів **Frontend** та **Backend** за допомогою `docker-compose`.

---

## **Вимоги**

Перед початком переконайтеся, що у вас встановлені:

- [Docker](https://www.docker.com/get-started/)
- [Docker Compose](https://docs.docker.com/compose/install/)

## **Структура проєкту**

```
/Hakaton
│── frontend/
│   ├── Task/
│   │   ├── Dockerfile
│   │   ├── package.json
│   │   ├── ...
│── WebAPI/
│   ├── API/
│   │   ├── Dockerfile
│   │   ├── Program.cs
│   │   ├── docker-compose.yml
│   │   ├── .env
```

## **Налаштування файлу**

У папку проєкту (`/WebAPI`) вставьте файл `.env`.
Сам файл вам був наданий ще у посиланні до форми про тестове завдання (категорія Web Development).

## **Запуск контейнерів**

Перейдіть у папку проєкту (`/`) та виконайте команду:

```sh
docker-compose up --build
```

Ця команда:

- **Збере та створить образи** `frontend` і `api`.
- **Запустить контейнери** та підключить їх до спільної мережі.

## **Перевірка роботи контейнерів**

Після запуску:

- **Backend (ASP.NET Core API)** буде доступний за адресою:\
  👉 `http://localhost:8080`
- **Frontend (React/Vite)** буде доступний за адресою:\
  👉 `http://localhost:3000`

## **Зупинка контейнерів**

Якщо потрібно зупинити контейнери, виконайте:

```sh
docker-compose down
```

## **Додаткові команди**

### Видалення всіх контейнерних образів:

```sh
docker system prune -a
```

### Перевірка стану запущених контейнерів:

```sh
docker ps
```

> > > > > > > 5317ced05954df883c3d188b77e28966ab429f41
