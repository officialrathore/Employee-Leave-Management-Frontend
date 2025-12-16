# Employee Leave Management System - Frontend

[![React](https://img.shields.io/badge/React-19.2.0-blue)](https://reactjs.org/)
[![Vite](https://img.shields.io/badge/Vite-5.0.0-646CFF)](https://vitejs.dev/)
[![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS-4.1.17-38B2AC)](https://tailwindcss.com/)

A modern, responsive React 19 frontend application for employee leave management with role-based dashboards, calendar views, and intuitive user interfaces.

## 🚀 Features

### Core Functionality
- **Authentication System** - Secure login/signup with JWT tokens
- **Role-based Interfaces** - Separate dashboards for employees and managers
- **Responsive Design** - Mobile-first approach with collapsible sidebar
- **Real-time Notifications** - Toast notifications for user feedback
- **Interactive Calendar** - Full-featured calendar with multiple views
- **Data Visualization** - Charts and statistics for leave analytics

### Employee Features
- **Personal Dashboard** - Leave balance overview with charts
- **Leave Application** - Easy-to-use form with date picker
- **Leave History** - Filterable history with search functionality
- **Calendar View** - Personal leave schedule visualization
- **Balance Tracking** - Real-time leave balance by type

### Manager Features
- **Team Dashboard** - Overview of all leave requests and statistics
- **Request Management** - Approve/reject requests with comments
- **Team Calendar** - View all approved leaves across the organization
- **Employee Overview** - Access to team member information

## 🛠️ Tech Stack

- **React 19** - Latest React with concurrent features and hooks
- **Vite** - Fast build tool and development server
- **Tailwind CSS** - Utility-first CSS framework
- **React Router DOM** - Client-side routing and navigation
- **React Big Calendar** - Advanced calendar component
- **Recharts** - Data visualization library
- **React Toastify** - Modern notification system
- **Axios** - HTTP client for API communication
- **date-fns** - Date manipulation and formatting
- **React Icons** - Icon library for UI elements

## 📋 Prerequisites

- **Node.js** (v18 or higher)
- **npm** or **yarn** package manager
- **Backend API** running (see backend README)

## 🚀 Quick Start

### Installation

```bash
# Install dependencies
npm install
```

### Environment Setup

Create environment files in the frontend root directory:

```bash
# Development environment
echo "VITE_BASE_URL=http://localhost:5000/api" > .env.local

# Production environment
echo "VITE_BASE_URL=https://leavehub-backend.onrender.com/api" > .env.production
```

### Environment Variables:
- **VITE_BASE_URL**: Your backend API URL
  - Development: `http://localhost:5000/api`
  - Production: `https://your-backend.onrender.com/api`

### Development

```bash
# Start development server
npm run dev
```

The application will be available at `http://localhost:5173`

### Build for Production

```bash
# Create production build
npm run build

# Preview production build locally
npm run preview
```

## 🚀 Deployment

### Deploy to Vercel (Recommended)

1. **Connect Repository**: Import your GitHub repository to Vercel
2. **Configure Project**:
   - **Framework Preset**: Vite
   - **Root Directory**: `frontend`
   - **Build Command**: `npm run build`
   - **Output Directory**: `dist`
3. **Environment Variables**:
   - `VITE_BASE_URL`: `https://your-backend.onrender.com/api`
4. **Deploy**: Your app will be live instantly

### Deploy to Netlify

1. **Connect Repository**: Link your GitHub repository
2. **Build Settings**:
   - **Base directory**: `frontend`
   - **Build command**: `npm run build`
   - **Publish directory**: `dist`
3. **Environment Variables**: Add `VITE_BASE_URL`
4. **Deploy**: Automatic deployments on git push

### Live Application
- **Production**: [[https://leavehub.vercel.app](https://employee-leave-management-frontend-azure.vercel.app/)]([https://leavehub.vercel.app](https://employee-leave-management-frontend-azure.vercel.app/))
- **Development**: `http://localhost:5173`

## 📁 Project Structure

```
frontend/
├── public/
│   └── vite.svg
├── src/
│   ├── assets/.jsx             # Image assets
│   ├── components/
│   │   ├── Calendar.jsx         # Date range picker component
│   │   ├── LeaveCalendar.jsx   # Personal calendar view
│   │   ├── LeaveCard.jsx       # Leave request card component
│   │   ├── LeaveRequestCard.jsx       # Leave request card component for manager
│   │   ├── LeaveTypeCard.jsx   # Leave type card component
│   │   ├── ProtectedRoute.jsx     # Protected route component
│   │   ├── Sidebar.jsx     #  Responsive sidebar navigation
│   │   └── StatCard.jsx         # Statistics card component
│   ├── context/
│   │   └── AuthContext.jsx     # Authentication state management
│   ├── pages/
│   │   ├── ApplyLeave.jsx      # Leave application form
│   │   ├── ApproveRequests.jsx # Manager approval interface
│   │   ├── EmployeeDashboard.jsx # Employee dashboard
│   │   ├── LeaveCalendarPage.jsx # Calendar page wrapper
│   │   ├── LeaveHistory.jsx     # Leave history with filters
│   │   ├── Login.jsx           # Authentication page
│   │   ├── ManagerCalendar.jsx # Team calendar view
│   │   ├── ManagerDashboard.jsx # Manager dashboard
│   │   └── SignUp.jsx          # User registration
│   ├── services/
│   │   ├── axios.js            # Axios configuration
│   │   ├── leaveService.js     # Leave-related API calls
│   │   └── managerService.js   # Manager-specific API calls
│   ├── styles/
│   │   └── calendar-custom.css # Calendar component styles
│   ├── App.jsx                 # Main application component
│   ├── App.css                 # Global application styles
│   ├── index.css               # Tailwind CSS imports
│   └── main.jsx               # Application entry point
├── eslint.config.js            # ESLint configuration
├── index.html                  # HTML template
├── package.json                # Dependencies and scripts
├── README.md                   # This file
└── vite.config.js              # Vite build configuration
```

## 🎨 UI Components

### Key Components

#### Authentication Components
- **Login/SignUp Forms** - Clean, accessible forms with validation
- **AuthContext** - React context for authentication state management

#### Dashboard Components
- **EmployeeDashboard** - Statistics cards, charts, and leave overview
- **ManagerDashboard** - Team statistics and quick actions

#### Calendar Components
- **Calendar** - Date range picker with validation
- **LeaveCalendar** - Interactive calendar with leave events
- **ManagerCalendar** - Team-wide calendar view


### Design System

#### Colors
- **Primary**: Blue (#3B82F6) for buttons and links
- **Success**: Green (#10B981) for approvals and positive actions
- **Warning**: Yellow (#F59E0B) for pending states
- **Error**: Red (#EF4444) for rejections and errors
- **Gray Scale**: Various grays for text and backgrounds

#### Typography
- **Primary Font**: System font stack for optimal performance
- **Headings**: Bold weights for hierarchy
- **Body Text**: Regular weight for readability

#### Responsive Breakpoints
- **Mobile**: < 768px
- **Tablet**: 768px - 1024px
- **Desktop**: > 1024px

## 🔧 Configuration

### Environment Variables

Create a `.env` file in the root directory:

```env
# API Base URL
VITE_API_URL=http://localhost:5000/api
```

### Vite Configuration

The `vite.config.js` includes:
- React plugin for JSX support
- Tailwind CSS integration
- Development server configuration

### ESLint Configuration

Custom ESLint rules in `eslint.config.js`:
- React hooks rules
- React refresh for hot reloading
- Custom rules for unused variables

## 🚀 Deployment

### Build Process

```bash
# Install dependencies
npm ci

# Run linting
npm run lint

# Build for production
npm run build
```

### Static Hosting

The `dist` folder contains all static files ready for deployment on:
- Vercel
- Netlify
- GitHub Pages
- AWS S3 + CloudFront
- Any static hosting service

### Environment Setup

For production deployment, ensure:
- API URL points to production backend
- HTTPS enabled for security
- Proper CORS configuration

## 🔒 Security Features

### Client-side Security
- **Input Validation** - Form validation and sanitization
- **JWT Token Management** - Secure token storage and automatic refresh
- **Route Protection** - Role-based access control for pages
- **XSS Protection** - React's built-in XSS prevention

### API Security
- **Authorization Headers** - Automatic JWT token inclusion
- **Error Handling** - Secure error messages without data leakage
- **Request Interception** - Axios interceptors for consistent error handling

## 🧪 Development

### Available Scripts

```bash
# Development server
npm run dev

# Production build
npm run build

# Preview production build
npm run preview

# Lint code
npm run lint
```

### Code Quality

- **ESLint** - Code linting and formatting
- **Prettier** - Code formatting (if configured)
- **React DevTools** - Development debugging tools

### Browser Support

- **Chrome** (latest)
- **Firefox** (latest)
- **Safari** (latest)
- **Edge** (latest)

## 🤝 Contributing

1. Follow the existing code style
2. Use meaningful component and variable names
3. Add proper error handling
4. Test on multiple screen sizes
5. Update this README for new features

## 📝 License

This project is part of the Employee Leave Management System and follows the same license terms.

## 🆘 Troubleshooting

### Common Issues

**Build Errors**
- Ensure Node.js version is v18+
- Clear node_modules and reinstall: `rm -rf node_modules && npm install`

**API Connection Issues**
- Check if backend is running on correct port
- Verify API URL in environment variables
- Check browser console for CORS errors

**Styling Issues**
- Ensure Tailwind CSS is properly configured
- Check for conflicting CSS classes
- Verify responsive breakpoints

**Authentication Issues**
- Clear localStorage: `localStorage.clear()`
- Check token expiration
- Verify backend authentication endpoints

---

**Built with ❤️ using React 19 and modern web technologies**
