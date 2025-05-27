# Étape 1 : Build
FROM node:18-alpine AS builder

# Définir le dossier de travail
WORKDIR /app

# Copier les fichiers nécessaires
COPY package*.json ./
COPY prisma ./prisma
COPY . .

# Installer les dépendances
RUN npm install

# Générer le client Prisma
RUN npx prisma generate

# Construire l'application
RUN npm run build

# Étape 2 : Production
FROM node:18-alpine

# Définir le dossier de travail
WORKDIR /app

# Copier l'application depuis le builder
COPY --from=builder /app ./

# Installer uniquement les dépendances de production
RUN npm install --omit=dev

# Exposer le port (à adapter selon ton app)
EXPOSE 3000

# Commande de démarrage
CMD ["sh", "-c", "npx prisma migrate deploy && npm start"]

