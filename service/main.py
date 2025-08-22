"""
AI Interview System - Main Application
Initializes the database and provides example usage
"""

import logging
from interview_db import InterviewDB, Interview

# Configure logging
logging.basicConfig(level=logging.INFO)
logger = logging.getLogger(__name__)

def initialize_database():
    """Initialize the database and required tables"""
    try:
        # Initialize database connection
        db = InterviewDB()
        
        # Initialize interview table
        db.initialize_interview_table()
        logger.info("Database initialization completed successfully")
        
        return db
    except Exception as e:
        logger.error(f"Database initialization failed: {e}")
        raise

def main():
    """Main application entry point"""
    try:
        # Initialize database
        db = initialize_database()
        
        # Example: Create new interview
        interview = Interview(candidate_id=1, jd_id=1)
        interview_id = db.create_interview(interview)
        logger.info(f"Created new interview with ID: {interview_id}")
        
        # Example: Start the interview
        db.start_interview(interview_id)
        logger.info(f"Started interview {interview_id}")
        
        # Example: Add Q&A during interview
        db.add_qa_to_interview(
            interview_id,
            "What is your experience with Python?",
            "I have 5 years of Python experience...",
            {
                "correctness": "good",
                "confidence": "high",
                "relevance": "high"
            }
        )
        logger.info(f"Added Q&A to interview {interview_id}")
        
        # Example: End the interview
        db.end_interview(interview_id)
        logger.info(f"Ended interview {interview_id}")
        
        # Example: Get interview Q&A
        qa_pairs = db.get_interview_qa_pairs(interview_id)
        logger.info(f"Retrieved {len(qa_pairs)} Q&A pairs from interview {interview_id}")
        
    except Exception as e:
        logger.error(f"Application error: {e}")
        raise

if __name__ == "__main__":
    main()