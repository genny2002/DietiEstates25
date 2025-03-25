# Fase 1: Costruzione del frontend (Angular)
FROM node:16 AS build-frontend

WORKDIR /app

# Copia il package.json e installa le dipendenze
COPY ./front-end/package*.json ./
RUN npm install

# Copia il resto dei file del frontend e costruisci il progetto
COPY ./front-end /app
RUN npm run build --prod

# Fase 2: Costruzione del backend (Express)
FROM node:16 AS build-backend

WORKDIR C:\Users\Genna\Desktop\Ingegneria del Software\progetto\progettino\applicazione\back-end

# Copia il package.json e installa le dipendenze
COPY ./back-end/package*.json ./
RUN npm install

# Copia il resto dei file del backend
COPY ./back-end /app

# Fase 3: Creazione dell'immagine finale
FROM node:16

WORKDIR C:\Users\Genna\Desktop\Ingegneria del Software\progetto\progettino\applicazione\front-end

# Installa le dipendenze sia per il frontend che per il backend
COPY --from=build-front-end /app/dist /app/front-end
COPY --from=build-back-end /app /app/back-end

# Installa dipendenze backend
WORKDIR /app/back-end
RUN npm install --production

# Esponi le porte
EXPOSE 4200 3000

# Comando per avviare sia il frontend che il backend
CMD ["sh", "-c", "npm start --prefix /app/back-end & http-server /app/front-end & wait"]
