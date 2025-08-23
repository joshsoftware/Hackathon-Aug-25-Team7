# Interview AI - Hackathon Project Frontend

This repository contains the React frontend for the Interview AI application, which uses WebRTC and AI to conduct automated technical interviews for job candidates.

## 🚀 Features

- Real-time AI-powered technical interviews
- WebRTC audio communication with AI interviewer
- Job-specific interview questions based on job descriptions
- Live transcript display of the conversation
- Professional UI for a seamless interview experience
- Integration with backend interview service

## 📋 Prerequisites

- Node.js (v16+)
- npm or yarn

## 🛠️ Installation

1. Clone the repository:
   ```bash
   git clone https://github.com/your-username/interview-ai.git
   cd interview-ai/app
   ```

2. Install dependencies:
   ```bash
   npm install
   # or
   yarn install
   ```

3. Create a `.env` file in the app directory with your API endpoints:
   ```
   VITE_API_BASE_URL=http://localhost:8000
   ```

## 🚀 Running the Application

Start the development server:

```bash
npm run dev
# or
yarn dev
```

The application will be available at http://localhost:5173

## 🏗️ Build for Production

```bash
npm run build
# or
yarn build
```

This will create an optimized production build in the `dist` directory.

## 📱 Key Components

- **InterviewPage**: Main interface for the interview experience
- **JobDescription**: Components for displaying and managing job listings
- **Authentication**: Login and user management components
- **WebRTC**: Integration with our AI interviewer backend

## 🔧 Technologies Used

- **React**: UI library
- **TypeScript**: Type-safe JavaScript
- **React Router**: Client-side routing
- **Axios**: API requests
- **WebRTC**: Real-time audio communication
- **WebSockets**: Live transcript updates
- **TailwindCSS**: Styling
- **Vite**: Build tooling and development server

## 🔄 Integration with Backend

This frontend connects to our Python FastAPI backend service which powers the AI interviewer. The integration includes:

1. WebRTC connection for real-time audio
2. WebSocket connection for live transcript updates
3. REST API for job and candidate management

