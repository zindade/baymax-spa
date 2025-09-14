#!/bin/bash
# Navigate to project folder
cd ~/codeforall/baymax-spa/llava-med || exit

# Activate conda environment
source ~/miniconda3/etc/profile.d/conda.sh
conda activate llava-env

# Start controller in background
python -m LLaVA-Med.llava.serve.controller --host 0.0.0.0 --port 10000 &
sleep 2

# Start model worker (this one stays in foreground)
exec python -m LLaVA-Med.llava.serve.model_worker \
  --host 0.0.0.0 \
  --controller http://localhost:10000 \
  --port 40000 \
  --worker http://localhost:40000 \
  --model-path ./LLaVA-Med/llava-med-v1.5-mistral-7b/ \
  --model-name llava-med \
  --multi-modal