from fastapi import FastAPI
from pydantic import BaseModel
from agents.content_agent import ContentAgent
from agents.image_agent import ImageAgent
from storage import PostStorage
import uuid
from fastapi.middleware.cors import CORSMiddleware

app = FastAPI(title="AI Instagram Post Generator")

# Allow frontend (React) to call backend
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_methods=["*"],
    allow_headers=["*"],
)

# Initialize agents and storage
content_agent = ContentAgent()
image_agent = ImageAgent()
storage = PostStorage()

class PostRequest(BaseModel):
    topic: str
    tone: str

@app.get("/")
def read_root():
    return {"message": "✅ Backend is running for AI Instagram Post Generator"}

@app.post("/generate-post")
def generate_post(req: PostRequest):
    caption, hashtags = content_agent.generate_content(req.topic, req.tone)
    image_url = image_agent.generate_image(req.topic)

    post_id = str(uuid.uuid4())
    post_data = {
        "id": post_id,
        "topic": req.topic,
        "tone": req.tone,
        "caption": caption,
        "hashtags": hashtags,
        "image_url": image_url,
        "status": "draft"
    }
    storage.save_post(post_id, post_data)
    return {"preview": post_data}

@app.post("/post/{post_id}")
def post_instagram(post_id: str):
    post = storage.get_post(post_id)
    if not post:
        return {"error": "Post not found"}
    post["status"] = "posted"
    storage.save_post(post_id, post)
    return {
        "simulation": f"✅ Post '{post_id}' successfully posted!",
        "post": post
    }

@app.get("/posts")
def list_posts():
    return {"posts": storage.list_posts()}
