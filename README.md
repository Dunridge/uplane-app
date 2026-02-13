# Uplane Image Transformation Service

A full-stack application that allows users to upload an image, automatically remove its background, horizontally flip it, and view or delete the resulting image.

Built with **Next.js**, **TypeScript**, **Tailwind CSS**, and a **Python backend script** for image processing using [rembg](https://github.com/danielgatis/rembg) and Pillow.

---

## Features

- **Image Upload:** Simple UI to upload a single image.
- **Image Processing:** 
  - Remove background using Python `rembg`
  - Horizontally flip the image using Pillow
- **Image Preview:** View processed image immediately in the browser
- **Image Deletion:** Remove images from storage (future enhancement can be linked to Cloud hosting)
- **Responsive UI:** Built with Tailwind CSS

---

## Tech Stack

- **Frontend:** Next.js 13 (App Router), TypeScript, Tailwind CSS  
- **Backend:** Next.js API routes calling a Python script  
- **Python Libraries:** `rembg[cpu]`, `pillow`  
- **Image Handling:** Base64 for immediate preview (can be extended to Cloudinary/S3)

---

## Project Structure

```

uplane-app/
├─ app/
│  └─ api/
│     ├─ images/
│     │  └─ route.ts         # POST: upload and process image
│     └─ images/[id]/route.ts # DELETE: remove image (optional)
├─ components/
│  ├─ Header.tsx
│  ├─ UploadCard.tsx
│  ├─ ProcessingState.tsx
│  └─ ResultCard.tsx
├─ lib/
│  └─ api.ts                 # frontend API functions
├─ scripts/
│  └─ process_image.py       # Python background removal + flip
├─ uploads/                  # temporary storage of images
├─ package.json
├─ tsconfig.json
└─ tailwind.config.js

````

---

## Setup Instructions

### 1. Clone the repository

```bash
git clone <your-repo-url>
cd uplane-app
````

### 2. Install Node dependencies

```bash
npm install
```

### 3. Setup Python environment

Using Conda:

```bash
conda create -n uplane-python python=3.11
conda activate uplane-python
pip install "rembg[cpu]" pillow
```

* Make note of the Python path:

```bash
which python
# e.g., /opt/anaconda3/bin/python
```

* Update `app/api/images/route.ts` to use this Python path when calling `execFile`

### 4. Run the development server

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) to view the app.

---

## Usage

1. **Upload an image** via the UploadCard component
2. **Processing state** shows a spinner while Python processes the image
3. **ResultCard** displays the processed image:

   * Background removed
   * Horizontally flipped
4. **Delete** the image to reset the state

---

## Notes on Implementation

* The backend **POST `/api/images`**:
  * Receives a FormData file
  * Saves it temporarily to `/uploads`
  * Calls Python script `process_image.py`:

    * Removes the background using `rembg`
    * Flips the image horizontally using Pillow
  * Returns a JSON object with:

    ```json
    {
      "id": "image-<timestamp>",
      "url": "data:image/png;base64,...."
    }
    ```
* Frontend uses this URL directly in `<img>` for display
* Temporary files are deleted after processing

---

## Future Improvements

* Store images on **Cloudinary or S3** for real URLs
* Fully implement **DELETE endpoint** to remove hosted images
* Add **error handling for unsupported file types**
* Optimize performance for large images
