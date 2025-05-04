// This script fetches photos from the backend and displays them in a gallery format.
//             localStorage.setItem('userId', data.userId); // Store userId in local storage

// Fetch photos from the backend and display them in the gallery
async function loadGallery() {
    try {
        const response = await fetch('https://patricks-photogallery-backend.onrender.com/photos', {
            method: 'GET',
            // Add any necessary authentication headers here
        });
        
        // Check if the response is ok (status code 200-299)
        if (!response.ok) {
            console.error('Failed to fetch photos:', response.statusText);
            return;
        }
        
        // Parse the JSON response
        let responseData = await response.json();
        let photos = responseData.photos; // Access the 'photos' property

        // Clear the existing gallery content
        const galleryContainer = document.getElementById('gallery-container');
        galleryContainer.innerHTML = '';
            
        // Loop through the photos and create elements for each one
        photos.forEach(row => {
            row.url = `https://patricks-photogallery-backend.onrender.com/uploads/${row.filename}`; // Fixed reference to photo.filename
            const photoElement = document.createElement('div');
            photoElement.classList.add('photo-item');
            photoElement.style.display = 'inline-block';
            photoElement.style.margin = '10px';
            photoElement.style.textAlign = 'center';
            photoElement.style.border = '1px solid #ddd';
            photoElement.style.borderRadius = '8px';
            photoElement.style.padding = '10px';
            photoElement.style.boxShadow = '0 4px 6px rgba(0, 0, 0, 0.1)';
            photoElement.style.backgroundColor = '#f9f9f9';

            photoElement.innerHTML = `
            <img src="${row.url}" style="max-width: 150px; max-height: 150px; border-radius: 4px;"/>
            <p style="margin: 10px 0; font-size: 14px; color: #333;">${row.filename}</p>
            <button class="zoom-button">Zoom</button>
            <a href="${row.url}" download class="download-button">Download</a>
            <button class="delete-button">Delete</button>
            `;

            const downloadButton = photoElement.querySelector('.download-button');
            downloadButton.style.display = 'inline-block';
            downloadButton.style.margin = '5px';
            downloadButton.style.padding = '5px 10px';
            downloadButton.style.backgroundColor = '#28a745';
            downloadButton.style.color = '#fff';
            downloadButton.style.border = 'none';
            downloadButton.style.borderRadius = '4px';
            downloadButton.style.textDecoration = 'none';
            downloadButton.style.cursor = 'pointer';

            const deleteButton = photoElement.querySelector('.delete-button');
            deleteButton.style.display = 'inline-block';
            deleteButton.style.margin = '5px';
            deleteButton.style.padding = '5px 10px';
            deleteButton.style.backgroundColor = '#dc3545';
            deleteButton.style.color = '#fff';
            deleteButton.style.border = 'none';
            deleteButton.style.borderRadius = '4px';
            deleteButton.style.cursor = 'pointer';

            galleryContainer.appendChild(photoElement);
            deleteButton.addEventListener('click', async () => {
                try {
                    const deleteResponse = await fetch(`https://patricks-photogallery-backend.onrender.com/delete/${row.filename}`, { // Fixed filename reference
                        method: 'DELETE',
                    });
                    if (!deleteResponse.ok) {
                        console.error('Failed to delete photo:', deleteResponse.statusText);
                        return;
                    }
                    galleryContainer.removeChild(photoElement);
                } catch (error) {
                    console.error('Error deleting photo:', error);
                }
            });

            const zoomButton = photoElement.querySelector('.zoom-button');
            zoomButton.style.backgroundColor = '#007BFF';
            zoomButton.style.color = '#fff';
            zoomButton.style.border = 'none';
            zoomButton.style.padding = '5px 10px';
            zoomButton.style.cursor = 'pointer';
            zoomButton.style.borderRadius = '4px';
            zoomButton.style.marginTop = '5px';

            const zoomedImageStyle = document.createElement('style');
            zoomedImageStyle.textContent = `
                .zoomed-image {
                    position: fixed;
                    top: 0;
                    left: 0;
                    width: 100%;
                    height: 100%;
                    display: flex;
                    justify-content: center;
                    align-items: center;
                    background-color: rgba(0, 0, 0, 0.8);
                    z-index: 1000;
                }
                .zoom-overlay {
                    position: absolute;
                    top: 0;
                    left: 0;
                    width: 100%;
                    height: 100%;
                    background: transparent;
                }
                .zoom-content {
                    position: relative;
                    z-index: 1001;
                    background: #fff;
                    padding: 10px;
                    border-radius: 8px;
                    box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
                }
                .zoom-content img {
                    max-width: 90vw;
                    max-height: 80vh;
                    border-radius: 4px;
                }
                .close-zoom {
                    position: absolute;
                    top: 10px;
                    right: 10px;
                    background-color: #FF4136;
                    color: #fff;
                    border: none;
                    padding: 5px 10px;
                    cursor: pointer;
                    border-radius: 4px;
                }
            `;
            document.head.appendChild(zoomedImageStyle);
            zoomButton.addEventListener('click', () => {
                const zoomedImage = document.createElement('div');
                zoomedImage.classList.add('zoomed-image');
                zoomedImage.innerHTML = `
                    <div class="zoom-overlay"></div>
                    <div class="zoom-content">
                        <img src="${row.url}" alt="${row.filename}" />
                        <button class="close-zoom">Close</button>
                    </div>
                `;
                document.body.appendChild(zoomedImage);

                const closeZoomButton = zoomedImage.querySelector('.close-zoom');
                closeZoomButton.addEventListener('click', () => {
                    document.body.removeChild(zoomedImage);
                });

                const zoomOverlay = zoomedImage.querySelector('.zoom-overlay');
                zoomOverlay.addEventListener('click', () => {
                    document.body.removeChild(zoomedImage);
                });
            });
            zoomButton.addEventListener('click', () => {
                const zoomedImage = document.createElement('div');
                zoomedImage.classList.add('zoomed-image');
                zoomedImage.innerHTML = `
                    <div class="zoom-overlay"></div>
                    <div class="zoom-content">
                        <img src="${row.url}" alt="${row.filename}" />
                        <button class="close-zoom">Close</button>
                    </div>
                `;
                document.body.appendChild(zoomedImage);

                const closeZoomButton = zoomedImage.querySelector('.close-zoom');
                closeZoomButton.addEventListener('click', () => {
                    document.body.removeChild(zoomedImage);
                });

                const zoomOverlay = zoomedImage.querySelector('.zoom-overlay');
                zoomOverlay.addEventListener('click', () => {
                    document.body.removeChild(zoomedImage);
                });
            });
        });
    } catch (error) {
        console.error('Error loading gallery:', error);
    }
}

// Load the gallery on page load
document.addEventListener('DOMContentLoaded', loadGallery);
