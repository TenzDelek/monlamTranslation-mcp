Steps to run the mcp server for monlam

1. fork this repo
2. install dependencies
3. go to settings of windsurf or any any ide of choice
<img width="1512" alt="Screenshot 2025-04-12 at 10 47 09 PM" src="https://github.com/user-attachments/assets/5505e03e-38a0-4b14-b280-3a73ac07e51d" />

4. click on add custom server and write this below

```json
{
  "mcpServers": {
    "MonlamTranslation": {
      "command": "node",
      "args": [
        "your file path (get it by typing pwd) then followed by /index.js"
      ]
    }
  }
}
```

## Demo
https://github.com/user-attachments/assets/f2b3ad89-3161-4cb0-9cbb-b2d1eeb7846e

