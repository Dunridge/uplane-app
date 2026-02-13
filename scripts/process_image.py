from rembg import remove
from PIL import Image
import sys

input_path = sys.argv[1]
output_path = sys.argv[2]

# Remove background
with open(input_path, "rb") as inp:
    input_bytes = inp.read()
    output_bytes = remove(input_bytes)

with open("temp_no_bg.png", "wb") as out:
    out.write(output_bytes)

# Open with Pillow and flip horizontally
img = Image.open("temp_no_bg.png")
flipped = img.transpose(Image.FLIP_LEFT_RIGHT)
flipped.save(output_path)
