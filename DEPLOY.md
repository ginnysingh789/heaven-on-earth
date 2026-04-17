# Deployment Guide — Kashmir Hotel Booking

## Architecture
```
GitHub (push to main)
  → GitHub Actions (CI/CD)
    → SSH into DigitalOcean Droplet
      → Docker Compose (Node.js app + Nginx + Certbot)
        → MongoDB Atlas (external, free cluster)
        → Cloudinary (external, image CDN)
```

---

## Prerequisites

| Service | What you need | Free? |
|---------|--------------|-------|
| **MongoDB Atlas** | Connection string | Yes (M0 cluster) |
| **DigitalOcean** | Droplet ($4-6/mo) + SSH key | No |
| **Cloudinary** | cloud_name, api_key, api_secret | Yes (25GB) |
| **GitHub** | Repository + Secrets | Yes |
| **Domain** (optional) | DNS pointing to Droplet IP | Varies |

---

## Step 1: MongoDB Atlas Setup

1. Go to [mongodb.com/atlas](https://www.mongodb.com/atlas)
2. Create a free **M0 cluster** (choose region closest to your users)
3. Create a database user (username + password)
4. In **Network Access**, add `0.0.0.0/0` (allow from anywhere) or your Droplet IP
5. In **Database → Connect**, get the connection string:
   ```
   mongodb+srv://<username>:<password>@cluster0.xxxxx.mongodb.net/kashmir-booking?retryWrites=true&w=majority
   ```

---

## Step 2: DigitalOcean Droplet Setup

### Create Droplet
1. Go to [cloud.digitalocean.com](https://cloud.digitalocean.com)
2. Create Droplet → **Ubuntu 22.04** → **Basic $6/mo** (1 vCPU, 1GB RAM)
3. Add your **SSH key** during creation
4. Note the **Droplet IP address**

### Configure Droplet (SSH in)
```bash
ssh root@YOUR_DROPLET_IP

# Install Docker
curl -fsSL https://get.docker.com | sh

# Install Docker Compose plugin
apt-get install -y docker-compose-plugin

# Create app directory
mkdir -p /opt/kashmir-booking
```

---

## Step 3: Create `.env` on the Droplet

```bash
nano /opt/kashmir-booking/.env
```

Paste (fill in your real values):
```env
NODE_ENV=production
PORT=5000
MONGO_URI=mongodb+srv://user:pass@cluster0.xxxxx.mongodb.net/kashmir-booking?retryWrites=true&w=majority
JWT_SECRET=generate-a-random-64-char-string-here
CLOUDINARY_CLOUD_NAME=your-cloud-name
CLOUDINARY_API_KEY=your-api-key
CLOUDINARY_API_SECRET=your-api-secret
```

Generate a JWT secret:
```bash
openssl rand -hex 32
```

---

## Step 4: GitHub Repository Setup

### Push code
```bash
git init
git add .
git commit -m "Initial commit"
git remote add origin https://github.com/YOUR_USERNAME/kashmir-booking.git
git branch -M main
git push -u origin main
```

### Add GitHub Secrets
Go to **Repository → Settings → Secrets and variables → Actions** and add:

| Secret Name | Value |
|------------|-------|
| `DROPLET_IP` | Your Droplet's IP address |
| `DROPLET_USER` | `root` |
| `DROPLET_SSH_KEY` | Your private SSH key (entire content of `~/.ssh/id_rsa`) |

---

## Step 5: First Deploy

Push to `main` branch triggers auto-deployment. Or manually run:

```bash
# On your Droplet
cd /opt/kashmir-booking
docker compose up -d --build
```

Check it's running:
```bash
docker compose ps
curl http://localhost:5000/api/health
```

---

## Step 6: SSL Setup (Optional, requires domain)

1. Point your domain's A record to the Droplet IP
2. Update `nginx/default.conf` — replace `your-domain.com` with your actual domain
3. Run certbot:
```bash
cd /opt/kashmir-booking
docker compose run --rm certbot certonly --webroot -w /var/www/certbot -d your-domain.com -d www.your-domain.com
```
4. Uncomment the HTTPS server block in `nginx/default.conf`
5. Comment out the HTTP location block and uncomment the redirect
6. Restart: `docker compose restart nginx`

---

## Step 7: Seed Admin User

After first deploy, create the admin user:
```bash
docker compose exec app node server/seed.js
```

---

## Useful Commands

```bash
# View logs
docker compose logs -f app

# Restart
docker compose restart

# Rebuild & redeploy
docker compose down
docker compose up -d --build

# Check health
curl http://localhost:5000/api/health
```

---

## Updating the App

Just push to `main`:
```bash
git add .
git commit -m "your changes"
git push
```
GitHub Actions will auto-deploy to your Droplet.
