# Usa un'immagine di base ufficiale di Node.js
FROM node:22

# Imposta la directory di lavoro
WORKDIR "C:/Users/Genna/Desktop/Ingegneria del Software/progetto/progettino/applicazione/back-end"

# Copia package.json e package-lock.json
COPY package*.json ./

# Installa le dipendenze
RUN npm install --production

# Copia il resto del codice
COPY . .

# Esegui la build (ad esempio, per TypeScript o Webpack)
RUN npm run build

# Rimuovi le dipendenze di sviluppo per ottimizzare il container
RUN npm prune --production

# Esponi la porta usata dall'app
EXPOSE 3000

# Comando per avviare l'app
CMD ["npm", "start"]