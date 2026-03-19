# AI-_Instagram_Post_Generator
API key used and make it more relatable
This project is an AI Instagram Post Generator built with a full‑stack approach. The backend, developed in FastAPI (Python), handles content generation and data persistence, while the frontend, created with React and Tailwind CSS, provides a vibrant, professional interface for users to preview posts. The workflow began with in‑memory storage but was upgraded to JSON file persistence for reliability. The UI was carefully designed to be visually appealing, with topic‑based background images (e.g., vacation → vacation photo) to enhance user experience. Throughout development, errors and setup issues were resolved methodically by checking file names, folder paths, and dependencies, ensuring smooth integration between frontend and backend. Finally, the project was version‑controlled and uploaded to GitHub using SSH authentication for secure and seamless collaboration.

#  AI Instagram Post Generator

# Project Summary
This project is an **AI Instagram Post Generator** built with a full‑stack approach. The backend, developed in **FastAPI (Python)**, handles content generation and data persistence, while the frontend, created with **React and Tailwind CSS**, provides a vibrant, professional interface for users to preview posts. The workflow began with in‑memory storage but was upgraded to **JSON file persistence** for reliability. The UI was carefully designed to be visually appealing, with topic‑based background images (e.g., vacation → vacation photo) to enhance user experience. Errors and setup issues were resolved methodically, ensuring smooth integration between frontend and backend. Finally, the project was version‑controlled and uploaded to **GitHub** using SSH authentication for secure and seamless collaboration.

# Features
- Generate AI‑based Instagram posts from any topic.
- Backend powered by **FastAPI** for speed and reliability.
- Frontend built with **React + Tailwind CSS** for a modern, colorful UI.
- Topic‑based background images for visually appealing previews.
- Persistent storage using **JSON files**.
- Secure GitHub integration with **SSH keys**.

# Installation
### Backend (FastAPI)
```bash
git clone git@github.com:asthatripathi434/ai-instagram-post-generator.git
cd ai-instagram-post-generator/backend
python -m venv venv
source venv/bin/activate   # On Windows: venv\Scripts\activate
pip install -r requirements.txt
uvicorn main:app --reload
    
