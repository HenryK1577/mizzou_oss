import json
from channels.generic.websocket import AsyncWebsocketConsumer

class EchoConsumer(AsyncWebsocketConsumer):
    async def connect(self):
        await self.accept()
        await self.send(text_data=json.dumps({"type": "connected"}))

    async def receive(self, text_data=None, bytes_data=None):
        if text_data:
            await self.send(text_data=json.dumps({"echo": text_data}))

    async def disconnect(self, close_code):
        pass
