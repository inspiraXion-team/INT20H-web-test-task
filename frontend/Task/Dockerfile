# ������������� Node.js ��� ��������� ������
FROM node:18 AS build

# ������������ ������ ���������
WORKDIR /app

# ������� package.json �� package-lock.json ��� ������������ �����������
COPY package.json package-lock.json ./

# ��������� package-lock.json, ��� �������� ���� npm � optional dependencies
RUN rm -f package-lock.json

# ������������ ���������
RUN npm install

# ������� ����� ����� ������� � ���������
COPY . .

# ������� ���������� (�� ��������� Vite)
RUN npm run build

# ������������� Nginx ��� ������ �������� ���������
FROM nginx:alpine AS final

# ������� ������ ����� �� ���������� �������� Nginx
COPY --from=build /app/dist /usr/share/nginx/html

# ������� ��������� ������ Nginx (�������)
COPY nginx.conf /etc/nginx/nginx.conf

# ³�������� ���� 80
EXPOSE 80

# ��������� Nginx
CMD ["nginx", "-g", "daemon off;"]
