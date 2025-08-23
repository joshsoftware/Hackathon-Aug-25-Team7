# AI Interview System - Hackathon Team 7

This project is an intelligent interview system that uses AI to conduct technical interviews with candidates. The system leverages natural language processing, speech recognition, and conversational AI to create a realistic interview experience tailored to specific job descriptions.

## 🌟 Features

- AI-powered interview bot with natural conversation capabilities
- Job-specific interview questions based on required skills and responsibilities
- Real-time WebRTC audio communication
- Live transcript display during interviews
- Secure authentication and user management
- Candidate and job description management
- Interview scheduling and status tracking


## 📦 Repository Structure

The project is organized into two main components:

- **Frontend**: React application with TypeScript, Vite, and TailwindCSS
- **Backend**: Python FastAPI application with Pipecat for AI conversation


## 🚀 Getting Started

### Prerequisites

- Node.js 16+ and npm/yarn for the frontend
- Python 3.10+ for the backend
- PostgreSQL database
- API keys for Deepgram, Cartesia, and Anthropic Claude

### Quick Start

1. Clone the repository:
   ```bash
   git clone https://github.com/your-username/Hackathon-Aug-25-Team7.git
   cd Hackathon-Aug-25-Team7
   ```

2. Set up and start the backend:
   ```bash
   cd service
   python -m venv venv
   source venv/bin/activate  # On Windows: venv\Scripts\activate
   pip install -r requirements.txt
   # Create .env file with required API keys and database URL
   uvicorn main:app --reload
   ```

3. Set up and start the frontend:
   ```bash
   cd app
   npm install
   # Create .env file with backend URL
   npm run dev
   ```

4. Open your browser and navigate to http://localhost:5173

## 📚 Documentation

For detailed documentation on each component:

- [Frontend Documentation](./app/README.md)
- [Backend Documentation](./service/README.md)

## 🧠 How It Works

1. **Job Description Analysis**: The system analyzes job descriptions to identify required skills and responsibilities.
2. **AI-Powered Interviews**: Using Anthropic Claude, the system conducts natural conversational interviews.
3. **Real-time Audio**: WebRTC enables real-time audio communication between the candidate and the AI interviewer.
4. **Speech Processing**: Deepgram converts speech to text, and Cartesia converts text to speech.
5. **Interview Assessment**: The conversation is analyzed to assess candidate suitability.

## 💻 Technologies Used

### Frontend
- React
- TypeScript
- WebRTC
- TailwindCSS
- Vite

### Backend
- FastAPI
- SQLAlchemy
- Pipecat
- WebRTC
- PostgreSQL
- Anthropic Claude
- Deepgram
- Cartesia


## 🏆 Hackathon Team 7

This project was developed during the August 2025 Hackathon by Team 7:
- Ashiya Ajare
- Nidhi Soni
- Vishakha Sainani
- Bhushan Nagpure
- Aditya Padekar
- Prajjwalkumar Panzade



## 🔮 Future Enhancements

- Multi-language support
- Video interview capabilities
- Advanced analytics for interview performance
- Integration with ATS (Applicant Tracking Systems)
- Customizable interview templates
