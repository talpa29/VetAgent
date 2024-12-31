from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from chat_handler import ChatHandler

app = FastAPI()
chat_handler = ChatHandler()

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_methods=["*"],
    allow_headers=["*"],
)

@app.post("/chat")
async def chat_endpoint(message: dict):
    response = chat_handler.get_response(message["text"])
    return {"response": response}