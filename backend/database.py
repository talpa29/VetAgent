from sqlalchemy.orm import sessionmaker
from sqlalchemy import create_engine
from models import Base

DATABASE_URL = "postgresql://partush29:2911@localhost:5432/chatbot_db"

engine = create_engine(DATABASE_URL)
SessionLocal = sessionmaker(autocommit=False, autoflush=False, bind=engine)

def init_db():
    Base.metadata.create_all(bind=engine)
