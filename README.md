# 🐴 Hippios API

API REST Express.js connectée à une base PostgreSQL, conteneurisée avec Docker.

## Stack technique

- **Runtime** : Node.js 20
- **Framework** : Express.js 4
- **Base de données** : PostgreSQL 16
- **Auth** : Better Auth
- **Orchestration** : Docker Compose
- **Dev** : Nodemon (hot reload)

---

## Prérequis

- [Docker Desktop](https://www.docker.com/products/docker-desktop/)
- [Node.js 20+](https://nodejs.org/) (optionnel, uniquement si tu travailles hors Docker)

---

## Installation

### 1. Cloner le dépôt

```bash
git clone https://github.com/TaupeInHambourg/hippios-api.git
cd hippios-api
```

### 2. Configurer les variables d'environnement

```bash
cp .env.example .env
```

Édite `.env` avec tes valeurs :

```env
NODE_ENV=development
PORT=3000

# PostgreSQL
DB_USER=ton_utilisateur
DB_PASSWORD=ton_mot_de_passe
DB_NAME=hippios
DB_HOST=postgres
DB_PORT=5432

# Better Auth
BETTER_AUTH_SECRET=remplace_par_une_chaine_aleatoire
BETTER_AUTH_URL=http://localhost:3000

# Origines autorisées (front-end)
TRUSTED_ORIGINS=http://localhost:5173
```

> 💡 Pour générer un secret : `openssl rand -base64 32`

### 3. Démarrer les conteneurs

```bash
docker compose up --build
```

Les deux services démarrent :
- **hippios-postgres** sur le port `5432`
- **hippios-api** sur le port `3000`

L'API attend que PostgreSQL soit healthy avant de démarrer.

### 4. Vérifier que tout fonctionne

Ouvre [http://localhost:3000](http://localhost:3000) dans ton navigateur.

---

## Utilisation

### Lister les données

Ouvre dans ton navigateur :

```
http://localhost:3000/horses
```

Ou depuis PowerShell :

```powershell
Invoke-RestMethod -Uri "http://localhost:3000/horses"
```

### Ajouter des données

Depuis **PowerShell** :

```powershell
Invoke-RestMethod -Method Post -Uri "http://localhost:3000/horses" `
  -ContentType "application/json" `
  -Body '{"name": "Tornado", "breed": "Andalou"}'
```

Depuis **un terminal Unix** (macOS / Linux / WSL) :

```bash
curl -X POST http://localhost:3000/horses \
  -H "Content-Type: application/json" \
  -d '{"name": "Tornado", "breed": "Andalou"}'
```

---

## Commandes utiles

```bash
# Démarrer (sans rebuild)
docker compose up

# Arrêter
docker compose down

# Voir les logs en temps réel
docker compose logs -f

# Accéder au shell de l'API
docker compose exec api sh

# Accéder à la base PostgreSQL
docker compose exec postgres psql -U ${DB_USER} -d ${DB_NAME}
```

---

## Structure du projet

```
hippios-api/
├── bin/
│   └── www             # Point d'entrée du serveur
├── routes/
│   ├── index.js        # Route racine
│   ├── users.js        # Routes utilisateurs
│   └── horses.js       # Routes de test DB
├── app.js              # Configuration Express
├── auth.js             # Configuration Better Auth
├── db.js               # Pool de connexion PostgreSQL
├── compose.yml         # Orchestration Docker
├── Dockerfile          # Image multi-stage (dev / prod)
└── .env.example        # Template des variables d'environnement
```