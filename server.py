from flask import Flask, request, jsonify
from flask_cors import CORS
import subprocess
import re

app = Flask(__name__)
CORS(app)

@app.route('/chat', methods=['POST'])
def chat():
    message = request.json['message']
    
    # Run the chatbot script and capture the output
    command = f'python phi3-chat.py -m directml\directml-int4-awq-block-128'
    process = subprocess.Popen(command, shell=True, stdin=subprocess.PIPE, stdout=subprocess.PIPE, stderr=subprocess.PIPE, text=True)
    output, _ = process.communicate(input=message + '\n')
    
    # Extract the bot's reply from the output and clean it up
    bot_reply = output.split('Output:')[1].strip()
    
    # Remove the "Input:" line and any trailing whitespace
    bot_reply = re.sub(r'\s*Input:\s*$', '', bot_reply).strip()
    
    return jsonify({'reply': bot_reply})

if __name__ == '__main__':
    app.run(port=5000)