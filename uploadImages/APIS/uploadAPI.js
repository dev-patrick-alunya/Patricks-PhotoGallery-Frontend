$(document).ready(function () {
    $('#uploadForm').on('submit', function (e) {
        e.preventDefault();
        $('#uploadStatus').text('Uploading...');

        const fileInput = document.getElementById('imageUpload'); // Define fileInput
        const formData = new FormData();

        // Append all selected files to the FormData object
        for (let i = 0; i < fileInput.files.length; i++) {
            formData.append('files', fileInput.files[i]);
        }

        $.ajax({
            url: 'https://patricks-photogallery-backend.onrender.com//upload',
            type: 'POST',
            data: formData,
            processData: false,
            contentType: false,
            success: function (response) {
                $('#uploadStatus').text('Upload successful!');
                alert('Upload successful!');
                // Clear the file input after successful upload
                $('#imageUpload').val('');
                window.location.reload(); // Reload the page to show the uploaded images
                const uploadedImagesDiv = $('#uploadedImages');
                uploadedImagesDiv.empty();
                response.images.forEach(image => {
                    const imgElement = `<img src="${image.url}" alt="${image.name}" style="width: 150px; height: 150px; margin: 10px;">`;
                    uploadedImagesDiv.append(imgElement);
                });
            },
            error: function () {
                $('#uploadStatus').text('Upload failed. Please try again.');
            }
        });
    });
});