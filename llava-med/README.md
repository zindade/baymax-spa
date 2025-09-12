# 🧪 LLaVA-Med Self-Hosted API

This repository provides instructions to self-host **[LLaVA-Med](https://github.com/microsoft/LLaVA-Med)**, a multimodal model fine-tuned for biomedical and medical tasks.  
You can run it locally with GPU support and interact via an **API**, including sending **base64-encoded images** (useful for web or mobile uploads).



## 🛠 Requirements
- Python **3.10+**
- **CUDA-capable GPU** (24GB+ VRAM recommended for 7B model)
- [Conda](https://docs.conda.io/projects/conda/en/latest/user-guide/install/)

`wget https://repo.anaconda.com/miniconda/Miniconda3-latest-Linux-x86_64.sh`
`bash Miniconda3-latest-Linux-x86_64.sh`

`~/miniconda3/bin$ ./conda init`
`~/miniconda3/bin$ source ~/.bashrc`

---

## 📦 Installation


### Clone the repo
git clone https://github.com/microsoft/LLaVA-Med.git
cd LLaVA-Med

### Create a conda environment
`conda create -n llava-env python=3.10 -y` 
`conda activate llava-env` 
`conda install pytorch==2.0.1 torchvision==0.15.2 torchaudio==2.0.2 pytorch-cuda=11.7 -c pytorch -c nvidia -y`

### Install dependencies
`pip install bitsandbytes==0.41.0`
`pip install "numpy<2"`
`pip install -e .`

---

## 📥 Download Model

Download the 7B variant of LLaVA-Med:

`huggingface-cli download microsoft/llava-med-v1.5-mistral-7b --local-dir ./llava-med-v1.5-mistral-7b`

### ▶️ Run the API Server

You’ll need three processes: controller, model worker, and API server.

1. Start the Controller
`python -m llava.serve.controller --host 0.0.0.0 --port 10000`

2. Start the Model Worker  

```
python -m llava.serve.model_worker \
  --host 0.0.0.0 \
  --controller http://localhost:10000 \
  --port 40000 \
  --worker http://localhost:40000 \
  --model-path llava-med-v1.5-mistral-7b/ \
  --model-name llava-med \
  --multi-modal
```

For CPU mode:
```
python -m llava.serve.model_worker \
  --model-path ./llava-med-v1.5-mistral-7b \
  --model-name llava-med \
  --device cpu \
  --multi-modal \
  --host 0.0.0.0 \
  --port 8000
```


