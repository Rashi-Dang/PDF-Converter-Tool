// images to pdf

let fileInput = document.getElementById('file-input');
    let imageContainer = document.getElementById('images');
    let numOfFiles = document.getElementById('num-of-files');
    let content = document.getElementById('content');

      //console.log(fileInput, imageContainer, numOfFiles);


function preview() {
    imageContainer.innerHTML = "";
    numOfFiles.textContent = `${fileInput.files.length} Files Selected`;
    content.innerHTML = 'Your Image is ready to download...⬆️';

    for (let i of fileInput.files) {
        let figure = document.createElement("figure");
        let figCap = document.createElement("figcaption");
        let checkIcon = document.createElement("span"); // Create a span element for the check icon

        figCap.innerText = i.name;
        checkIcon.classList.add('check'); // Add the 'check' class to the check icon span
        checkIcon.innerHTML = '<i class="fa-solid fa-circle-check"></i>'; // Unicode for the checkmark symbol
        figCap.appendChild(checkIcon); // Append the check icon span to the fig caption
        figure.appendChild(figCap);

        imageContainer.appendChild(figure);
    }
}


function pdfDownload() {
    let doc = new jsPDF(); // Create a new jsPDF instance
    let imagesLoaded = 0;
    let maxImagesPerPage = 3; // Adjust as needed
    let spaceAtEnd = 10; // Adjust as needed, this is the spacing at the end of each image

    for (let i = 0; i < fileInput.files.length; i++) {
        let img = new Image();
        img.src = URL.createObjectURL(fileInput.files[i]);
        img.onload = function () {
            let pageWidth = doc.internal.pageSize.getWidth();
            let pageHeight = doc.internal.pageSize.getHeight();
            let maxImageWidth = pageWidth; // Initially set to page width
            let maxImageHeight = pageHeight / maxImagesPerPage - spaceAtEnd; // Height adjusted for spacing

            // Calculate scaling factors for width and height
            let widthScaleFactor = maxImageWidth / this.width;
            let heightScaleFactor = maxImageHeight / this.height;

            // Choose the smaller scaling factor to ensure the image fits within the page
            let scaleFactor = Math.min(widthScaleFactor, heightScaleFactor);
            let width = this.width * scaleFactor;
            let height = this.height * scaleFactor;

            // Calculate position for the image
            let x = (pageWidth - width) / 2;
            let y = (imagesLoaded % maxImagesPerPage) * (pageHeight / maxImagesPerPage) + spaceAtEnd * ((imagesLoaded % maxImagesPerPage) + 1);

            doc.addImage(this, 'PNG', x, y, width, height); // Add the image to the PDF
            imagesLoaded++;

            if (imagesLoaded % maxImagesPerPage === 0 || imagesLoaded === fileInput.files.length) {
                if (imagesLoaded < fileInput.files.length) {
                    doc.addPage(); // Add a new page if there are more images to add
                } else {
                    doc.save('images.pdf'); // Save the PDF once all images are added
                }
            }
        };
        imageContainer.innerHTML="";
        content.innerHTML="";
        numOfFiles.innerHTML="";
    }
}

        
      