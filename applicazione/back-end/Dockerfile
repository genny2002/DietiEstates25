# Usa un'immagine di base ufficiale di Node.js
FROM node:16

# Imposta la directory di lavoro
WORKDIR C:\Users\Genna\Desktop\Ingegneria del Software\progetto\progettino\applicazione\back-end

# Copia package.json e package-lock.json
COPY package*.json ./

# Installa le dipendenze
RUN npm install --production

# Copia il resto del codice
COPY . .

# Esponi la porta usata dall'app
EXPOSE 3000

# Comando per avviare l'app
CMD ["npm", "start"]