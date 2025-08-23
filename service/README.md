# Interview AI - Hackathon Project Backend

This repository contains the Python FastAPI backend for the Interview AI application, a cutting-edge solution that leverages AI to conduct technical interviews for job candidates.

## 🚀 Features

- AI-powered interview bot using Pipecat
- WebRTC audio streaming for real-time conversations
- Speech-to-text and text-to-speech capabilities
- Dynamic interview content based on job descriptions
- PostgreSQL database for storing job descriptions and interview data
- RESTful API for frontend integration
- JWT authentication for secure access

## 📋 Prerequisites

- Python 3.10+
- PostgreSQL
- API keys for:
  - Deepgram (Speech-to-Text)
  - Cartesia (Text-to-Speech)
  - Anthropic Claude (LLM)

## 🛠️ Installation

1. Clone the repository:
   ```bash
   git clone https://github.com/your-username/interview-ai.git
   cd interview-ai/service
   ```

2. Create and activate a virtual environment:
   ```bash
   python -m venv venv
   # On Windows
   venv\Scripts\activate
   # On Unix or MacOS
   source venv/bin/activate
   ```

3. Install dependencies:
   ```bash
   pip install -r requirements.txt
   ```

4. Create a `.env` file with your configuration:
   ```
   DATABASE_URL=postgresql://username:password@localhost/interview_db
   DEEPGRAM_API_KEY=your_deepgram_api_key
   CARTESIA_API_KEY=your_cartesia_api_key
   ANTHROPIC_API_KEY=your_anthropic_api_key
   JWT_SECRET=your_secret_key
   ```

5. Initialize the database:
   ```bash
   # The tables will be created on first startup
   ```

## 🚀 Running the Application

Start the development server:

```bash
uvicorn main:app --reload
```

The API will be available at http://localhost:8000

API Documentation is automatically generated at:
- http://localhost:8000/docs (Swagger UI)
- http://localhost:8000/redoc (ReDoc)

## 📱 Key Components

- **Interview Bot**: AI-powered interview system using Pipecat
- **WebRTC Handler**: Real-time audio communication
- **API Endpoints**: RESTful interface for frontend
- **Database Models**: PostgreSQL database schema
- **Authentication**: JWT-based authentication system

## 🔧 Technologies Used

- **FastAPI**: Modern, fast web framework
- **SQLAlchemy**: ORM for database interactions
- **Pipecat**: AI conversation framework
- **WebRTC**: Real-time audio streaming
- **Deepgram**: Speech-to-text processing
- **Cartesia**: Text-to-speech generation
- **Anthropic Claude**: Large language model for interview intelligence
- **PostgreSQL**: Relational database
- **JWT**: Authentication mechanism

## 🔄 API Endpoints

### Authentication
- `POST /api/auth/register`: Register a new user
- `POST /api/auth/login`: Login and get access token

### Job Descriptions
- `GET /api/jd/`: Get all job descriptions
- `GET /api/jd/{jd_id}`: Get job description by ID
- `GET /api/jd/count`: Get count of job descriptions

### Candidates
- `GET /api/candidates/`: Get all candidates
- `GET /api/candidates/by-job`: Get candidates for a specific job
- `GET /api/candidates/id/{candidate_id}`: Get candidate by ID
- `POST /api/candidates/schedule-status`: Update interview scheduling status

### Interview
- `POST /api/connect`: Initialize WebRTC connection for interview
- `GET /health`: Health check endpoint
- `GET /`: Root endpoint
