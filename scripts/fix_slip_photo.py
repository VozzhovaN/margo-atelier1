from PIL import Image, ImageEnhance
import numpy as np
from pathlib import Path

repo = Path(__file__).resolve().parents[1]
src_out = repo / "src" / "assets" / "images" / "margo_silhouette_slip.png"
base = list(repo.glob("*15_19_39.png"))[0]

rgb = np.asarray(Image.open(base).convert("RGB")).astype(np.float32)
hsv_img = Image.open(base).convert("HSV")
hsv = np.asarray(hsv_img).astype(np.float32)
h, s, v = hsv[:, :, 0], hsv[:, :, 1], hsv[:, :, 2]

# PIL HSV: H is 0-255 (~360deg). Yellow ~ 20-50, orange ~ 10-25
yellowish = ((h >= 12) & (h <= 55)).astype(np.float32)

# Desaturate yellow/orange areas and lift value (whiten)
s = s * (1.0 - yellowish * 0.55)
v = np.clip(v + yellowish * 28, 0, 255)

hsv2 = np.stack([h, s, v], axis=-1).astype(np.uint8)
cooled = Image.fromarray(hsv2, mode="HSV").convert("RGB")
arr = np.asarray(cooled).astype(np.float32)

# Global cool white balance
avg = arr.reshape(-1, 3).mean(axis=0)
arr *= avg.mean() / np.maximum(avg, 1e-3)
arr[:, :, 0] *= 0.93
arr[:, :, 1] *= 0.96
arr[:, :, 2] *= 1.07

arr = np.clip(arr * 1.05 + 14, 0, 255)
out = Image.fromarray(arr.astype(np.uint8), "RGB")
out = ImageEnhance.Brightness(out).enhance(1.04)
out = ImageEnhance.Color(out).enhance(0.88)
out = ImageEnhance.Contrast(out).enhance(1.03)
out.save(src_out, optimize=True)
print("done")
