import requests
import json

class ChatHandler:
    def __init__(self):
        self.ollama_url = "http://localhost:11434/api/generate"
        
    def get_response(self, message: str) -> str:
        print("HELLO1")
        response = requests.post(
            self.ollama_url,
            json={
                "model": "llama3.2:1b",  # or your preferred model
                "prompt": message
            }
        )
        print(response)
        print("HELLO")
        
        return self.parse_response(response=response)
        
    
    def parse_response(self, response):
        try:
            response_text = response.text.strip().split('\n')
        
            full_response = ""
            for line in response_text:
                try:
                    # Parse each line as a JSON object
                    data = json.loads(line)
                    full_response += data.get("response", "")
                    
                    # Check if the response is complete
                    if data.get("done", False):
                        break
                except json.JSONDecodeError as e:
                    print(f"Error parsing JSON: {e}")
                    continue
            return full_response
        except ValueError as e:
            print(f"Error parsing JSON response: {e}")
            print(response.text)
            return "Error occurred while processing the request."