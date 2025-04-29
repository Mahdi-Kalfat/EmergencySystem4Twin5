FROM node:16-alpine
WORKDIR /app
COPY package*.json ./
RUN npm install
COPY BackEnd/ .
EXPOSE 3000
CMD ["npm", "run", "dev"]
