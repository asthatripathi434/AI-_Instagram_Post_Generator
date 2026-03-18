import random

class ContentAgent:
    def generate_content(self, topic: str, tone: str):
        if tone == "professional":
            caption = f"Exploring {topic} with insights that matter. Stay informed, stay ahead."
        else:
            caption = f"Just vibing with {topic} today — what do you think?"

        hashtags = self._generate_hashtags(topic)
        return caption[:150], hashtags

    def _generate_hashtags(self, topic: str):
        base_tags = ["#AI", "#Innovation", "#Tech", "#Trending", "#Explore", "#Inspiration"]
        topic_tag = f"#{topic.replace(' ', '')}"
        random.shuffle(base_tags)
        return [topic_tag] + base_tags[:5]