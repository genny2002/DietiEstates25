# Usa un'immagine di base ufficiale di Node.js
FROM node:18

# Imposta la directory di lavoro (percorso Linux)
WORKDIR "C:/Users/Genna/Desktop/Ingegneria del Software/progetto/progettino/applicazione/front-end/dietiEstates"

# Copia package.json e package-lock.json nella directory di lavoro
COPY package*.json ./

# Installa le dipendenze
RUN npm install

# Installa Angular CLI globalmente
RUN npm install -g @angular/cli

# Copia il resto del codice
COPY . .

# Esegui la build del progetto Angular
RUN npm run build

# Installa serve per servire i file statici
RUN npm install -g serve

# Esponi la porta 4200
EXPOSE 4200

# Comando per avviare l'app (server di produzione con serve)
CMD ["ng", "serve", "--host", "0.0.0.0", "--disable-host-check", "--poll", "2000"]