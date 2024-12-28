let cropper;
const imageInput = document.getElementById("image-input");
const image = document.getElementById("image");
const croppedPreview = document.getElementById("cropped-preview");
const cropButton = document.getElementById("crop-button");
const downloadButton = document.getElementById("download-button");
const imageLabel = document.getElementById("fileSelect");

// Handle image upload
imageInput.addEventListener("change", (event) => {
  const file = event.target.files[0];
  if (file) {
    const reader = new FileReader();
    reader.onload = (e) => {
      image.src = e.target.result;
      if (cropper) {
        cropper.destroy();
      }
      cropper = new Cropper(image, {
        aspectRatio: NaN,
        viewMode: 1,
        preview: "#preview-container",
      });
    };
    reader.readAsDataURL(file);
    // imageLabel.style.display = "none";
  }
});

// Crop and preview
// cropButton.addEventListener('click', () => {
//   if (cropper) {
//     const canvas = cropper.getCroppedCanvas();
//     croppedPreview.src = canvas.toDataURL();
//   }
// });

// Download cropped image
downloadButton.addEventListener("click", () => {
  if (cropper) {
    const canvas = cropper.getCroppedCanvas();
    const link = document.createElement("a");
    link.href = canvas.toDataURL();
    link.download = "cropped-image.png";
    link.click();
  }
});
