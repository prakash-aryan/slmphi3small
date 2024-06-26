# slmphi3small

slmphi3small is a chatbot application powered by the Phi-3 language model. It features a React frontend and a Flask backend, allowing users to interact with the Phi-3 model through a user-friendly interface.

## Table of Contents
- [Credits](#credits)
- [Project Structure](#project-structure)
- [Prerequisites](#prerequisites)
- [Installation](#installation)
- [Switching Between CPU and DirectML](#switching-between-cpu-and-directml)
- [Running the Application](#running-the-application)
- [Troubleshooting](#troubleshooting)

## Credits

This project is based on the Phi-3 model and uses code from the [onnxruntime-genai](https://github.com/microsoft/onnxruntime-genai) repository by Microsoft. For the latest model and updates, please refer to their [Phi-3 tutorial](https://github.com/microsoft/onnxruntime-genai/blob/main/examples/python/phi-3-tutorial.md).

## Project Structure

```
slmphi3small/
│
├── .huggingface/
├── cpu_and_mobile/
│   └── cpu-int4-rtn-block-32-acc-level-4/
├── directml/
├── frontend/
│   ├── node_modules/
│   ├── public/
│   ├── src/
│   │   ├── App.css
│   │   ├── App.js
│   │   ├── App.test.js
│   │   ├── index.css
│   │   ├── index.js
│   │   ├── logo.svg
│   │   ├── reportWebVitals.js
│   │   ├── setupProxy.js
│   │   └── setupTests.js
│   ├── .gitignore
│   ├── package-lock.json
│   ├── package.json
│   ├── postcss.config.js
│   ├── README.md
│   └── tailwind.config.js
├── phi3-chat.py
└── server.py
```

## Prerequisites

Before you begin, ensure you have the following installed:
- Python 3.8 or higher
- Node.js 14 or higher
- npm (usually comes with Node.js)
- Git

## Installation

1. Clone the repository:
   ```
   git clone git@github.com:prakash-aryan/slmphi3small.git
   cd slmphi3small
   ```

2. Set up the Python environment:
   ```
   python -m venv venv
   source venv/bin/activate  # On Windows, use `venv\Scripts\activate`
   ```

3. Install Python dependencies:
   ```
   pip install flask flask-cors numpy
   pip install --pre onnxruntime-genai  # For CPU version
   # OR
   pip install --pre onnxruntime-genai-directml  # For DirectML version
   ```

4. Download the Phi-3 model:
   For CPU:
   ```
   huggingface-cli download microsoft/Phi-3-mini-4k-instruct-onnx --include cpu_and_mobile/cpu-int4-rtn-block-32-acc-level-4/* --local-dir .
   ```
   For DirectML:
   ```
   huggingface-cli download microsoft/Phi-3-mini-4k-instruct-onnx --include directml/* --local-dir .
   ```

5. Set up the frontend:
   ```
   cd frontend
   npm install react react-dom axios react-icons framer-motion
   npm install -D tailwindcss@latest postcss@latest autoprefixer@latest
   npx tailwindcss init -p
   ```

## Switching Between CPU and DirectML

Before running the application, you need to choose whether to use the CPU or DirectML version. To switch between them, modify the `command` variable in `server.py`:

For CPU:
```python
command = f'python phi3-chat.py -m cpu_and_mobile/cpu-int4-rtn-block-32-acc-level-4'
```

For DirectML:
```python
command = f'python phi3-chat.py -m directml\directml-int4-awq-block-128'
```

Make sure you have installed the corresponding Python package (`onnxruntime-genai` for CPU or `onnxruntime-genai-directml` for DirectML) as mentioned in the installation steps.

## Running the Application

1. Start the Flask backend:
   In the root directory of the project:
   ```
   python server.py
   ```

2. Start the React frontend:
   In a new terminal, navigate to the frontend directory:
   ```
   cd frontend
   npm start
   ```

3. Open your browser and go to `http://localhost:3000` to use the chatbot.

## Troubleshooting

If you encounter any issues:
1. Ensure all dependencies are correctly installed.
2. Check that you've downloaded the correct model files.
3. Verify that the paths in `server.py` match your project structure.

For more detailed information or the latest updates on the Phi-3 model, please refer to the [official onnxruntime-genai repository](https://github.com/microsoft/onnxruntime-genai).
