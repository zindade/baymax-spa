# 🧪 LLaVA-Med Self-Hosted API

This repository provides instructions to self-host **[LLaVA-Med](https://github.com/microsoft/LLaVA-Med)**, a multimodal model fine-tuned for biomedical and medical tasks.  
You can run it locally with GPU support and interact via an **OpenAI-compatible API**, including sending **base64-encoded images** (useful for web or mobile uploads).

---

## 🚀 Features
- OpenAI-compatible API (`/v1/chat/completions`)
- Supports text + image (file path, URL, or base64)
- Can be integrated into Flask, FastAPI, or any existing client
- Local, private, and GPU-accelerated

---

## 🛠 Requirements
- Python **3.10+**
- **CUDA-capable GPU** (24GB+ VRAM recommended for 7B model)
- [Conda](https://docs.conda.io/projects/conda/en/latest/user-guide/install/)

---

## 📦 Installation


### Clone the repo
git clone https://github.com/microsoft/LLaVA-Med.git
cd LLaVA-Med

### Create a conda environment
conda create -n llava-med python=3.10 -y
conda activate llava-med

### Install dependencies
pip install -e .

---

## 📥 Download Model

Download the 7B variant of LLaVA-Med:

`huggingface-cli download microsoft/llava-med-v1.5-mistral-7b --local-dir ./llava-med-7b`

### ▶️ Run the API Server

You’ll need three processes: controller, model worker, and API server.

1. Start the Controller
`python -m llava.serve.controller --host 0.0.0.0 --port 10000`

2. ```Start the Model Worker
python -m llava.serve.model_worker \
  --host 0.0.0.0 \
  --controller http://localhost:10000 \
  --port 40000 
  --worker http://localhost:40000 \
  --model-path ./llava-med-7b \
  --multi-modal```

3. Start the API Server
`python -m llava.serve.openai_api_server --host 0.0.0.0 --port 8000`


The API is now available at:

`http://localhost:8000/v1/chat/completions`

# 🔗 Usage Examples
## Python (with base64 image)
`import base64, requests`

## Encode an image to base64
`with open("pill.jpg", "rb") as f:
    img_b64 = base64.b64encode(f.read()).decode("utf-8")`

## Wrap as data URI
`img_uri = f"data:image/jpeg;base64,{img_b64}"`

```payload = {
    "model": "llava-med-v1.5-mistral-7b",
    "messages": [
        {"role": "user", "content": "What medication is this?"}
    ],
    "images": [img_uri]
}```


```curl -X POST "http://localhost:8000/v1/chat/completions" 
  -H "Content-Type: application/json" 
  -d "{
    "model": "llava-med-v1.5-mistral-7b",
    "messages": [{"role": "user", "content": "Identify the pill in this image"}],
    "images": ["data:image/jpeg;base64,${IMG_BASE64}"]
  }```