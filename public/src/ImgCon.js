const imgEl = document.querySelector("#imgEl");
const fileInput = document.querySelector("#fileInput");
const btnPng = document.querySelector("#btnPng");
const btnJpeg = document.querySelector("#btnJpeg");
const btnWebp = document.querySelector("#btnWebp");

fileInput.addEventListener("change", (e) => {
  if (e.target.files && e.target.files[0]) {
    imgEl.src = URL.createObjectURL(e.target.files[0]);
  }
});

const downloadImage = (fileType) => {
  if (!imgEl.src) {
    alert("Please select an image first.");
    return;
  }

  const canvas = document.createElement("canvas");
  const img = new Image();
  img.src = imgEl.src;

  img.onload = () => {
    canvas.width = img.width;
    canvas.height = img.height;

    const ctx = canvas.getContext("2d");
    ctx.drawImage(img, 0, 0);

    // Convert the canvas to a Blob
    canvas.toBlob((blob) => {
      if (!blob) {
        alert("Failed to convert the image.");
        return;
      }

      // Create a temporary object URL and trigger download
      const objectURL = URL.createObjectURL(blob);
      const fileName = `ConvertedTo${fileType}-${img.src}.${fileType}`;

      // Trigger the download programmatically
      const anchor = document.createElement("a");
      anchor.href = objectURL;
      anchor.download = fileName;

      // Trigger a single download
      anchor.click();

      // Clean up the object URL
      URL.revokeObjectURL(objectURL);
    }, `image/${fileType}`);
  };

  img.onerror = () => {
    alert("Failed to load the image. Please try again.");
  };
};

// Add event listeners to buttons for different file types
btnPng.addEventListener("click", () => downloadImage("png"));
btnJpeg.addEventListener("click", () => downloadImage("jpeg"));
btnWebp.addEventListener("click", () => downloadImage("webp"));
