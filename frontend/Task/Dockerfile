# Використовуємо Node.js для створення образу
FROM node:18 AS build

# Встановлюємо робочу директорію
WORKDIR /app

# Копіюємо package.json та package-lock.json для встановлення залежностей
COPY package.json package-lock.json ./

# Видаляємо package-lock.json, щоб уникнути бага npm з optional dependencies
RUN rm -f package-lock.json

# Встановлюємо залежності
RUN npm install

# Копіюємо решту файлів проекту в контейнер
COPY . .

# Збираємо застосунок (за допомогою Vite)
RUN npm run build

# Використовуємо Nginx для віддачі зібраного фронтенду
FROM nginx:alpine AS final

# Копіюємо зібрані файли до стандартної директорії Nginx
COPY --from=build /app/dist /usr/share/nginx/html

# Копіюємо кастомний конфіг Nginx (опційно)
COPY nginx.conf /etc/nginx/nginx.conf

# Відкриваємо порт 80
EXPOSE 80

# Запускаємо Nginx
CMD ["nginx", "-g", "daemon off;"]
