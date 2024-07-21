# SciChat-LLM-with-PDF-Support

SciChat-LLM-with-PDF-Support is an advanced language model designed to facilitate scientific discussions by integrating support for PDF documents. This project leverages the capabilities of a large language model (LLM) to provide insightful and context-aware responses to queries related to scientific literature and general questions.

## Features

- **PDF Integration**: Upload and parse PDF documents to enable the model to provide accurate and relevant information based on the content.
- **Context-Aware Responses**: Generates responses that are informed by the content of the uploaded PDF documents.
- **Interactive Chat Interface**: A user-friendly chat interface for interacting with the language model.
- **Advanced Query Handling**: Handles complex scientific queries and provides detailed explanations.
- **General Question Support**: Answers general questions even without uploading any PDF, making it a versatile tool for various queries.

## Getting Started

### Prerequisites

Before you begin, ensure you have met the following requirements:

- Python 3.7 or higher
- Ollama and Mistral7b model
- Required Python packages (listed in `requirements.txt`)
- An environment capable of running large language models

### Installation

1. Clone the repository:
    ```sh
    git clone https://github.com/JugalGajjar/SciChat-LLM-with-PDF-Support.git
    cd SciChat-LLM-with-PDF-Support
    ```

2. Install the required packages:
    ```sh
    pip install -r requirements.txt
    ```

3. Download Ollama & Mistral:
    ```sh
    Website: https://ollama.com/download
    ollama pull mistral:instruct
    ```

### Usage

1. Run Ollama model:
   ```sh
    ollama run mistral:instruct
    ```
   
2. Run the application:
    ```sh
    python app.py
    ```

3. Upload a PDF document through the interface (optional).

4. Start asking questions related to the content of the uploaded PDF or any general questions.
