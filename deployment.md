# Deployment Configuration

## Architecture Overview

This application follows a microservices architecture with:
- **Frontend**: Next.js application (handles user interface)
- **Backend**: Express.js API server (handles business logic and database operations)
- **Database**: PostgreSQL (stores application data)

## Environment Variables

### Backend (.env)
```env
# Database Configuration
DB_HOST=localhost
DB_PORT=5432
DB_NAME=doctor_appointment_db
DB_USER=postgres
DB_PASSWORD=postgres

# JWT Configuration
JWT_SECRET=your-secret-key-change-in-production

# Server Configuration
PORT=5000
NODE_ENV=production

# Frontend URL (for CORS)
CLIENT_URL=http://localhost:3000

# Admin Configuration
ADMIN_EMAILS=admin@example.com
```

### Frontend (.env.local)
```env
# Frontend Environment Variables
NEXT_PUBLIC_API_URL=http://localhost:3000/api
NEXT_PUBLIC_BACKEND_URL=http://localhost:5000
```

## Deployment Options

### Option 1: Vercel (Frontend) + Railway/Render (Backend)

1. **Frontend on Vercel**:
   - Connect to GitHub repository
   - Use build command: `npm run build`
   - Set environment variables in Vercel dashboard

2. **Backend on Railway/Render**:
   - Deploy the Express server separately
   - Connect to the same PostgreSQL database
   - Configure CORS to allow Vercel domain

### Option 2: Docker Compose (Self-hosted)

Use the provided `docker-compose.yml` file for local development and self-hosted deployment.

### Option 3: Separate Deployments

1. Deploy Next.js app to Vercel
2. Deploy Express API to Render/Railway
3. Use managed PostgreSQL (Supabase/AWS RDS/etc.)

## Build Scripts

### Frontend Build
```bash
npm run build
```

### Backend Build
```bash
npm run migrate  # Run database migrations
npm run backend  # Start backend server
```

## Production Considerations

1. **Security**:
   - Use strong JWT secret in production
   - Enable HTTPS in production
   - Sanitize user inputs
   - Use production database credentials

2. **Performance**:
   - Enable database connection pooling
   - Implement caching where appropriate
   - Optimize database queries with indexes

3. **Monitoring**:
   - Add proper logging
   - Set up health check endpoints
   - Monitor database performance

## Health Check

The backend provides a health check endpoint:
- GET `/health` - Returns status of the API server

## Migration Script

Run database migrations before starting the backend:
```bash
npm run migrate
```