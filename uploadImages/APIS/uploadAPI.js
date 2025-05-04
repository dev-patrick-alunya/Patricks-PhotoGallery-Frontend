$(document).ready(function () {
    $('#uploadForm').on('submit', function (e) {
        e.preventDefault();
        $('#uploadStatus').text('Uploading...');

        const fileInput = document.getElementById('imageUpload');
        if (fileInput.files.length === 0) {
            $('#uploadStatus').text('Please select at least one file.');
            return;
        }

        const allowedTypes =
        [
            'image/jpeg', 
            'image/png', 
            'image/gif',
            'image/jpg',
            'image/webp',
            'image/bmp',
        ];
        const formData = new FormData();

        for (let i = 0; i < fileInput.files.length; i++) {
            if (!allowedTypes.includes(fileInput.files[i].type)) {
                $('#uploadStatus').text('Only JPEG, PNG, and GIF files are allowed.');
                return;
            }
            if (fileInput.files[i].size > 5 * 1024 * 1024) { // 5MB limit
                $('#uploadStatus').text('File size must be less than 5MB.');
                return;
            }
            formData.append('files', fileInput.files[i]);
        }

        $.ajax({
            url: 'https://patricks-photogallery-backend.onrender.com/upload',
            type: 'POST',
            data: formData,
            processData: false,
            contentType: false,
            beforeSend: function () {
                $('#uploadStatus').text('Uploading...');
                $('#uploadButton').prop('disabled', true); // Disable the button
            },
            success: function (response) {
                $('#uploadStatus').text('Upload successful!');
                alert('Upload successful!');
                $('#imageUpload').val('');
                const uploadedImagesDiv = $('#uploadedImages');
                uploadedImagesDiv.empty();
                response.images.forEach(image => {
                    const imgElement = `<img src="${image.url}" alt="${image.name}" style="width: 150px; height: 150px; margin: 10px;">`;
                    uploadedImagesDiv.append(imgElement);
                });
            },
            error: function (xhr) {
                const errorMessage = xhr.responseJSON?.message || 'Upload failed. Please try again.';
                $('#uploadStatus').text(errorMessage);
            },
            complete: function () {
                $('#uploadButton').prop('disabled', false); // Re-enable the button
            }
        });
    });
});