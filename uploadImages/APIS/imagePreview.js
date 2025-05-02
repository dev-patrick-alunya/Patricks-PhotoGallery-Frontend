document.getElementById('imageUpload').addEventListener('change', function(event) {
    const previewContainer = document.getElementById('previewList');
    previewContainer.innerHTML = ''; // Clear previous previews
    const files = event.target.files;

    Array.from(files).forEach(file => {
        if (file.type.startsWith('image/')) {
            const reader = new FileReader();
            reader.onload = function(e) {
                const img = document.createElement('img');
                img.src = e.target.result;
                img.alt = file.name;
                img.classList.add('preview-image');
                previewContainer.appendChild(img);
            };
            reader.readAsDataURL(file);
        }
    });
});