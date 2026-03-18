class ImageAgent:
    def generate_image(self, topic: str):
        return f"https://placehold.co/600x400?text={topic.replace(' ', '+')}"