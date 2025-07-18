# CareerFlow

CareerFlow is a full-stack job application platform designed to connect job seekers and employers. It features user authentication, job listings, application management, and profile uploads.

## Features
- User registration and login
- Employer and job seeker dashboards
- Job posting and application tracking
- Resume and profile image uploads
- RESTful API backend (Node.js, Express)
- Modern frontend (React, Vite, Tailwind CSS)

## Project Structure
```
backend/
  Controllers/        # Express controllers
  Middleware/         # Custom middleware
  Models/             # Mongoose models
  config/             # Configuration files
  routes/             # API routes
  uploads/            # Uploaded files
  utils/              # Utility functions
  server.js           # Main server file
  package.json        # Backend dependencies
frontend/
  src/
    api/              # Axios config
    assets/           # Static assets
    common/           # Shared components
    components/       # Feature components
    contexts/         # React contexts
    pages/            # Page components
    index.css         # Global styles
    App.jsx           # Main app component
    main.jsx          # Entry point
  index.html          # HTML template
  package.json        # Frontend dependencies
  tailwind.config.js  # Tailwind config
  vite.config.js      # Vite config
```

## Getting Started

### Prerequisites
- Node.js (v18+ recommended)
- npm or yarn

### Backend Setup
1. Navigate to the `backend` folder:
   ```sh
   cd backend
   ```
2. Install dependencies:
   ```sh
   npm install
   ```
3. Configure environment variables (e.g., MongoDB URI, Cloudinary keys) in a `.env` file.
4. Start the backend server:
   ```sh
   npm start
   ```

### Frontend Setup
1. Navigate to the `frontend` folder:
   ```sh
   cd frontend
   ```
2. Install dependencies:
   ```sh
   npm install
   ```
3. Start the frontend development server:
   ```sh
   npm run dev
   ```

### Usage
- Access the frontend at `http://localhost:5173` (default Vite port).
- The backend API runs at `http://localhost:5000` (default Express port).

## Contributing
Pull requests are welcome. For major changes, please open an issue first to discuss what you would like to change.

## License
This project is licensed under the MIT License.
