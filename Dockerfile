# Étape 1 : Build
FROM node:18-alpine AS build

WORKDIR /app

COPY package*.json ./
COPY vite.config.js ./
COPY tailwind.config.js ./
COPY postcss.config.js ./
COPY . .

RUN npm install
RUN npm run build

# Étape 2 : Serveur nginx pour servir le build
FROM nginx:stable-alpine

COPY --from=build /app/dist /usr/share/nginx/html

# Supprimer la config par défaut de nginx et ajouter la tienne
COPY nginx.conf /etc/nginx/conf.d/default.conf

EXPOSE 80

CMD ["nginx", "-g", "daemon off;"]
