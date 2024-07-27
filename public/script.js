const date = document.getElementById('date')
date.innerHTML = new Date().getFullYear()

//image preview handler
const imageInput = document.getElementById('imageInput');
const imagePreview = document.getElementById('imagePreview');

imageInput.addEventListener('change', (e) => {
  const file = imageInput.files[0];
  const reader = new FileReader();

  reader.onload = (e) => {
    imagePreview.src = e.target.result;
  };

  reader.readAsDataURL(file);
});
