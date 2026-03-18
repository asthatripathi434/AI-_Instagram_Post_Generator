import json
import os

class PostStorage:
    def __init__(self, filename="posts.json"):
        self.filename = filename
        # Load existing posts if file exists, otherwise start empty
        if os.path.exists(self.filename):
            try:
                with open(self.filename, "r") as f:
                    self.posts = json.load(f)
            except json.JSONDecodeError:
                self.posts = {}
        else:
            self.posts = {}

    def save_post(self, post_id, post_data):
        """Save or update a post by ID"""
        self.posts[post_id] = post_data
        with open(self.filename, "w") as f:
            json.dump(self.posts, f, indent=4)

    def get_post(self, post_id):
        """Retrieve a single post"""
        return self.posts.get(post_id)

    def list_posts(self):
        """Return all posts as a list"""
        return list(self.posts.values())