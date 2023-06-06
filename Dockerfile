# Определение базового образа
FROM node:14-alpine as base

# Установка рабочей директории
WORKDIR /src

# Копирование зависимостей и файла package.json
COPY package*.json ./

# Открытие порта контейнера
EXPOSE 5000

# Определение образа для продакшн
FROM base as production

# Установка переменной окружения NODE_ENV в значение "production"
ENV NODE_ENV=production

# Установка зависимостей только для продакшн
RUN npm ci --only=production

# Копирование всех файлов
COPY . .

# Запуск сервера с помощью команды "node bin/www"
CMD ["node", "server.js"]

# Определение образа для разработки
FROM base as dev

# Установка переменной окружения NODE_ENV в значение "development"
ENV NODE_ENV=development

# Установка глобального пакета nodemon и зависимостей для разработки
RUN npm install -g nodemon && npm install

# Копирование всех файлов
COPY . .

# Запуск сервера в режиме разработки с помощью команды "nodemon bin/www"
CMD ["nodemon", "server.js"]
