"""
AI Interview System - Simple Database Layer
Only handles interview table creation and CRUD operations
Assumes users, JD, and shortlisted_candidates tables already exist

Environment Setup:
Create .env file with: DATABASE_URL=your_neon_db_url
"""

import os
import psycopg2
from psycopg2.extras import RealDictCursor
from contextlib import contextmanager
from datetime import datetime
from dataclasses import dataclass
from typing import Optional, Dict, Any, List
import json
import logging
from dotenv import load_dotenv

# Load environment variables
load_dotenv()

# Configure logging
logging.basicConfig(level=logging.INFO)
logger = logging.getLogger(__name__)

@dataclass
class Interview:
    """Interview model"""
    id: Optional[int] = None
    candidate_id: int = 0  # References Shortlisted_Candidate.id
    jd_id: int = 0  # References JD.jd_id
    interview_qa: Optional[str] = None  # JSON string of questions and answers
    status: str = "scheduled"  # 'scheduled', 'in_progress', 'completed', 'cancelled'
    interview_start_time: Optional[datetime] = None
    interview_end_time: Optional[datetime] = None
    
    def to_dict(self) -> Dict[str, Any]:
        """Convert interview object to dictionary"""
        return {
            'id': self.id,
            'candidate_id': self.candidate_id,
            'jd_id': self.jd_id,
            'interview_qa': self.interview_qa,
            'status': self.status,
            'interview_start_time': self.interview_start_time.isoformat() if self.interview_start_time else None,
            'interview_end_time': self.interview_end_time.isoformat() if self.interview_end_time else None
        }
    
    @classmethod
    def from_dict(cls, data: Dict[str, Any]) -> 'Interview':
        """Create interview object from dictionary"""
        start_time = None
        end_time = None
        
        if data.get('interview_start_time'):
            if isinstance(data['interview_start_time'], str):
                start_time = datetime.fromisoformat(data['interview_start_time'])
            else:
                start_time = data['interview_start_time']
                
        if data.get('interview_end_time'):
            if isinstance(data['interview_end_time'], str):
                end_time = datetime.fromisoformat(data['interview_end_time'])
            else:
                end_time = data['interview_end_time']
        
        return cls(
            id=data.get('id'),
            candidate_id=data.get('candidate_id', 0),
            jd_id=data.get('jd_id', 0),
            interview_qa=data.get('interview_qa'),
            status=data.get('status', 'scheduled'),
            interview_start_time=start_time,
            interview_end_time=end_time
        )
    
    def add_qa_pair(self, question: str, answer: str, evaluation: Optional[Dict] = None):
        """Add a question-answer pair to the interview"""
        if not self.interview_qa:
            self.interview_qa = "[]"
        
        qa_list = json.loads(self.interview_qa)
        qa_pair = {
            "question": question,
            "answer": answer,
            "timestamp": datetime.now().isoformat(),
            "evaluation": evaluation or {}
        }
        qa_list.append(qa_pair)
        self.interview_qa = json.dumps(qa_list)
    
    def get_qa_pairs(self) -> List[Dict]:
        """Get all question-answer pairs from the interview"""
        if not self.interview_qa:
            return []
        return json.loads(self.interview_qa)


class InterviewDB:
    """Simple database manager for interviews only"""
    
    def __init__(self):
        self.database_url = os.getenv('DATABASE_URL')
        if not self.database_url:
            raise ValueError("DATABASE_URL environment variable is required")
        self._test_connection()
    
    def _test_connection(self):
        """Test database connection"""
        try:
            with self.get_connection() as conn:
                with conn.cursor() as cursor:
                    cursor.execute("SELECT 1")
                    logger.info("Database connection successful")
        except Exception as e:
            logger.error(f"Database connection failed: {e}")
            raise
    
    @contextmanager
    def get_connection(self):
        """Get database connection"""
        conn = None
        try:
            conn = psycopg2.connect(self.database_url)
            yield conn
        except Exception as e:
            if conn:
                conn.rollback()
            logger.error(f"Database error: {e}")
            raise
        finally:
            if conn:
                conn.close()
    
    @contextmanager
    def get_cursor(self, commit=True):
        """Get database cursor with auto-commit"""
        with self.get_connection() as conn:
            cursor = conn.cursor(cursor_factory=RealDictCursor)
            try:
                yield cursor
                if commit:
                    conn.commit()
            except Exception as e:
                conn.rollback()
                logger.error(f"Database transaction error: {e}")
                raise
            finally:
                cursor.close()
    
    def initialize_interview_table(self):
        """Create interviews table if it doesn't exist"""
        try:
            # First, check if required tables exist
            check_tables_sql = """
            SELECT EXISTS (
                SELECT FROM information_schema.tables 
                WHERE table_name = 'shortlisted_candidate'
            ) as has_shortlisted,
            EXISTS (
                SELECT FROM information_schema.tables 
                WHERE table_name = 'jd'
            ) as has_jd;
            """
            
            with self.get_cursor(commit=False) as cursor:
                cursor.execute(check_tables_sql)
                result = cursor.fetchone()
                
                if not result['has_shortlisted'] or not result['has_jd']:
                    raise ValueError("Required tables (Shortlisted_Candidate, JD) must exist before creating interviews table")
            
            # Create interviews table with foreign keys
            create_table_sql = """
            CREATE TABLE IF NOT EXISTS interviews (
                id SERIAL PRIMARY KEY,
                candidate_id INT NOT NULL,
                jd_id INT NOT NULL,
                interview_qa TEXT,
                status VARCHAR(50) CHECK (status IN ('scheduled', 'in_progress', 'completed', 'cancelled')) DEFAULT 'scheduled',
                interview_start_time TIMESTAMP,
                interview_end_time TIMESTAMP
            );
            
            -- Create indexes for better performance
            CREATE INDEX IF NOT EXISTS idx_interviews_candidate_id ON interviews(candidate_id);
            CREATE INDEX IF NOT EXISTS idx_interviews_jd_id ON interviews(jd_id);
            CREATE INDEX IF NOT EXISTS idx_interviews_status ON interviews(status);
            CREATE INDEX IF NOT EXISTS idx_interviews_start_time ON interviews(interview_start_time);
            """
            
            with self.get_cursor() as cursor:
                cursor.execute(create_table_sql)
                logger.info("Interviews table initialized successfully")
            
        except Exception as e:
            logger.error(f"Failed to initialize interviews table: {e}")
            raise
    
    # CRUD Operations
    
    def create_interview(self, interview: Interview) -> Optional[int]:
        """Create a new interview"""
        try:
            query = """
                INSERT INTO interviews (candidate_id, jd_id, interview_qa, status, 
                                      interview_start_time, interview_end_time)
                VALUES (%s, %s, %s, %s, %s, %s)
                RETURNING id
            """
            
            with self.get_cursor() as cursor:
                cursor.execute(query, (
                    interview.candidate_id,
                    interview.jd_id,
                    interview.interview_qa,
                    interview.status,
                    interview.interview_start_time,
                    interview.interview_end_time
                ))
                result = cursor.fetchone()
                interview_id = result['id'] if result else None
                logger.info(f"Created interview with ID: {interview_id}")
                return interview_id
                
        except Exception as e:
            logger.error(f"Error creating interview: {e}")
            raise
    
    def get_interview_by_id(self, interview_id: int) -> Optional[Interview]:
        """Get interview by ID"""
        try:
            query = "SELECT * FROM interviews WHERE id = %s"
            
            with self.get_cursor(commit=False) as cursor:
                cursor.execute(query, (interview_id,))
                result = cursor.fetchone()
                
                if result:
                    return Interview.from_dict(dict(result))
                return None
                
        except Exception as e:
            logger.error(f"Error getting interview by ID {interview_id}: {e}")
            raise
    
    def start_interview(self, interview_id: int) -> bool:
        """Start an interview"""
        try:
            query = """
                UPDATE interviews 
                SET status = 'in_progress', interview_start_time = %s 
                WHERE id = %s
            """
            
            with self.get_cursor() as cursor:
                cursor.execute(query, (datetime.now(), interview_id))
                success = cursor.rowcount > 0
                if success:
                    logger.info(f"Started interview {interview_id}")
                return success
                
        except Exception as e:
            logger.error(f"Error starting interview {interview_id}: {e}")
            raise
    
    def add_qa_to_interview(self, interview_id: int, question: str, answer: str, evaluation: Optional[Dict] = None) -> bool:
        """Add Q&A pair to interview"""
        try:
            # Get current interview
            interview = self.get_interview_by_id(interview_id)
            if not interview:
                return False
            
            # Add the Q&A pair
            interview.add_qa_pair(question, answer, evaluation)
            
            # Update the interview
            query = "UPDATE interviews SET interview_qa = %s WHERE id = %s"
            
            with self.get_cursor() as cursor:
                cursor.execute(query, (interview.interview_qa, interview_id))
                success = cursor.rowcount > 0
                if success:
                    logger.info(f"Added Q&A to interview {interview_id}")
                return success
                
        except Exception as e:
            logger.error(f"Error adding Q&A to interview {interview_id}: {e}")
            raise
    
    def end_interview(self, interview_id: int) -> bool:
        """End an interview"""
        try:
            query = """
                UPDATE interviews 
                SET status = 'completed', interview_end_time = %s 
                WHERE id = %s
            """
            
            with self.get_cursor() as cursor:
                cursor.execute(query, (datetime.now(), interview_id))
                success = cursor.rowcount > 0
                if success:
                    logger.info(f"Ended interview {interview_id}")
                return success
                
        except Exception as e:
            logger.error(f"Error ending interview {interview_id}: {e}")
            raise
    
    def get_interview_qa_pairs(self, interview_id: int) -> List[Dict]:
        """Get all Q&A pairs from an interview"""
        try:
            interview = self.get_interview_by_id(interview_id)
            if not interview:
                return []
            return interview.get_qa_pairs()
        except Exception as e:
            logger.error(f"Error getting Q&A pairs for interview {interview_id}: {e}")
            raise
    
    def get_interviews_by_status(self, status: str) -> List[Interview]:
        """Get interviews by status"""
        try:
            query = "SELECT * FROM interviews WHERE status = %s ORDER BY id"
            
            with self.get_cursor(commit=False) as cursor:
                cursor.execute(query, (status,))
                results = cursor.fetchall()
                
                return [Interview.from_dict(dict(row)) for row in results]
                
        except Exception as e:
            logger.error(f"Error getting interviews by status {status}: {e}")
            raise


# Simple usage example
def main():
    """Example usage"""
    try:
        # Initialize database
        db = InterviewDB()
        
        # Initialize interview table (create if doesn't exist)
        db.initialize_interview_table()
        
        # Example: Create interview for existing candidate and JD
        # interview = Interview(candidate_id=1, jd_id=1)
        # interview_id = db.create_interview(interview)
        
        # Example: Start interview
        # db.start_interview(interview_id)
        
        # Example: Add Q&A during Pipecat session
        # db.add_qa_to_interview(
        #     interview_id,
        #     "What is your experience with Python?",
        #     "I have 5 years of Python experience...",
        #     {"correctness": "good", "confidence": "high"}
        # )
        
        # Example: End interview
        # db.end_interview(interview_id)
        
        logger.info("Interview database initialized successfully")
        
    except Exception as e:
        logger.error(f"Error: {e}")


if __name__ == "__main__":
    main()