# MoneyMate Deployment Guide

This guide covers different deployment options for MoneyMate.

## Option 1: Deploy to Free Platforms (Recommended for Beginners)

### Backend - Railway/Render

1. **Create account** at [Railway.app](https://railway.app) or [Render.com](https://render.com)

2. **Create new project** from GitHub repository

3. **Set environment variables**:
   ```
   PORT=5000
   MONGODB_URI=your_mongodb_atlas_connection_string
   NODE_ENV=production
   ```

4. **Set build/start commands**:
   - Build command: `cd backend && npm install`
   - Start command: `cd backend && npm start`

5. **Deploy** - Platform will auto-deploy on push

### Frontend - Vercel/Netlify

1. **Create account** at [Vercel.com](https://vercel.com) or [Netlify.com](https://netlify.com)

2. **Import project** from GitHub

3. **Configure build settings**:
   - Base directory: `frontend`
   - Build command: `npm run build`
   - Publish directory: `frontend/build`

4. **Add environment variable**:
   ```
   REACT_APP_API_URL=https://your-backend-url.com/api
   ```

5. **Deploy** - Platform will auto-deploy on push

### Database - MongoDB Atlas (Free)

1. **Create account** at [MongoDB Atlas](https://www.mongodb.com/cloud/atlas)

2. **Create free cluster** (M0 tier)

3. **Set up database user** with password

4. **Whitelist IP addresses** (use 0.0.0.0/0 for all)

5. **Get connection string**:
   ```
   mongodb+srv://username:password@cluster.mongodb.net/moneymate
   ```

6. **Update backend environment variable**

## Option 2: Traditional VPS Deployment

### Requirements
- Ubuntu 20.04+ server
- Domain name (optional)

### Steps

1. **Install dependencies**:
   ```bash
   # Update system
   sudo apt update && sudo apt upgrade -y

   # Install Node.js
   curl -fsSL https://deb.nodesource.com/setup_18.x | sudo -E bash -
   sudo apt install -y nodejs

   # Install MongoDB
   wget -qO - https://www.mongodb.org/static/pgp/server-6.0.asc | sudo apt-key add -
   echo "deb [ arch=amd64,arm64 ] https://repo.mongodb.org/apt/ubuntu focal/mongodb-org/6.0 multiverse" | sudo tee /etc/apt/sources.list.d/mongodb-org-6.0.list
   sudo apt update
   sudo apt install -y mongodb-org
   sudo systemctl start mongod
   sudo systemctl enable mongod

   # Install Nginx
   sudo apt install -y nginx

   # Install PM2
   sudo npm install -g pm2
   ```

2. **Clone and setup**:
   ```bash
   cd /var/www
   git clone https://github.com/HymaJayaram-067/Money_mate.git
   cd Money_mate

   # Backend setup
   cd backend
   npm install
   cp .env.example .env
   # Edit .env with your settings
   nano .env

   # Frontend setup
   cd ../frontend
   npm install
   npm run build
   ```

3. **Configure PM2**:
   ```bash
   cd /var/www/Money_mate/backend
   pm2 start server.js --name moneymate-backend
   pm2 save
   pm2 startup
   ```

4. **Configure Nginx**:
   ```bash
   sudo nano /etc/nginx/sites-available/moneymate
   ```

   Add configuration:
   ```nginx
   server {
       listen 80;
       server_name your-domain.com;

       # Frontend
       location / {
           root /var/www/Money_mate/frontend/build;
           try_files $uri /index.html;
       }

       # Backend API
       location /api {
           proxy_pass http://localhost:5000;
           proxy_http_version 1.1;
           proxy_set_header Upgrade $http_upgrade;
           proxy_set_header Connection 'upgrade';
           proxy_set_header Host $host;
           proxy_cache_bypass $http_upgrade;
       }
   }
   ```

   Enable site:
   ```bash
   sudo ln -s /etc/nginx/sites-available/moneymate /etc/nginx/sites-enabled/
   sudo nginx -t
   sudo systemctl restart nginx
   ```

5. **Setup SSL (optional but recommended)**:
   ```bash
   sudo apt install certbot python3-certbot-nginx
   sudo certbot --nginx -d your-domain.com
   ```

## Option 3: Docker Deployment

See `docker-compose.yml` in the repository for containerized deployment.

```bash
# Start all services
docker-compose up -d

# View logs
docker-compose logs -f

# Stop services
docker-compose down
```

## Environment Variables Reference

### Backend (.env)
```env
PORT=5000
MONGODB_URI=mongodb://localhost:27017/moneymate
NODE_ENV=production
```

### Frontend (.env)
```env
REACT_APP_API_URL=http://localhost:5000/api
```

## Post-Deployment Checklist

- [ ] Backend API is accessible
- [ ] Frontend loads correctly
- [ ] Database connection is working
- [ ] Can create/view expenses
- [ ] Can create/view budgets
- [ ] Insights are generated correctly
- [ ] HTTPS is configured (if using custom domain)
- [ ] Environment variables are secure
- [ ] CORS settings are correct
- [ ] Error logging is set up

## Monitoring

### PM2 Monitoring (VPS)
```bash
pm2 monit
pm2 logs moneymate-backend
```

### Application Logs
- Check browser console for frontend errors
- Check PM2 logs for backend errors
- Monitor MongoDB logs if self-hosted

## Updating the Application

```bash
# Pull latest changes
git pull origin main

# Backend
cd backend
npm install
pm2 restart moneymate-backend

# Frontend
cd ../frontend
npm install
npm run build
```

## Troubleshooting

**502 Bad Gateway**
- Check if backend is running: `pm2 status`
- Check backend logs: `pm2 logs moneymate-backend`
- Verify MongoDB is running: `sudo systemctl status mongod`

**CORS Errors**
- Update CORS settings in `backend/server.js`
- Ensure frontend URL is whitelisted

**Database Connection Failed**
- Check MongoDB is running
- Verify connection string in `.env`
- Check firewall rules if using MongoDB Atlas

**Build Errors**
- Clear node_modules and reinstall: `rm -rf node_modules && npm install`
- Check Node.js version compatibility

## Support

For deployment issues, check:
- GitHub Issues
- Platform-specific documentation (Railway, Vercel, etc.)
- MongoDB Atlas documentation
