function resizeFile(file, maxWidth = 800, maxHeight = 800) {
  return new Promise((resolve) => {
    const reader = new FileReader();
    reader.onload = (e) => {
      const img = new Image();
      img.src = e.target.result;
      img.onload = () => {
        let w = img.width;
        let h = img.height;

        const ratio = Math.min(maxWidth / w, maxHeight / h, 1); // never upscale
        w = w * ratio;
        h = h * ratio;

        const canvas = document.createElement("canvas");
        canvas.width = w;
        canvas.height = h;
        const ctx = canvas.getContext("2d");
        ctx.drawImage(img, 0, 0, w, h);

        resolve(canvas.toDataURL("image/jpeg", 0.8)); // base64
      };
    };
    reader.readAsDataURL(file);
  });
}

export {resizeFile};