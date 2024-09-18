let currentImageIndex = 1;
const totalImages = 5; // Update this based on the number of images

// Show the current image and question
function showImage(index) {
    for (let i = 1; i <= totalImages; i++) {
        const container = document.getElementById(`image-question-${i}`);
        if (i === index) {
            container.style.display = 'flex';
        } else {
            container.style.display = 'none';
        }
    }
    
    // Check if all images have been rated and show the Calculate Percentile button
    if (index === totalImages) {
        const formData = new FormData(document.getElementById('engagement-form'));
        let allRated = true;
        for (let i = 1; i <= totalImages; i++) {
            const radios = formData.getAll(`engagement${i}`);
            if (radios.length === 0) {
                allRated = false;
                break;
            }
        }
        document.getElementById('calculate-button').style.display = allRated ? 'block' : 'none';
    } else {
        document.getElementById('calculate-button').style.display = 'none';
    }
}

// Show the next image in the sequence
function showNextImage() {
    currentImageIndex++;
    if (currentImageIndex > totalImages) {
        currentImageIndex = 1;
    }
    showImage(currentImageIndex);
}

// Show the previous image in the sequence
function showPrevImage() {
    currentImageIndex--;
    if (currentImageIndex < 1) {
        currentImageIndex = totalImages;
    }
    showImage(currentImageIndex);
}

// Calculate the percentile based on user ratings
function calculatePercentile() {
    const form = document.getElementById('engagement-form');
    const formData = new FormData(form);
    let totalScore = 0;
    let numberOfRatings = 0;

    // Iterate over each form entry and calculate the total score
    for (let [name, value] of formData.entries()) {
        if (name.startsWith('engagement') && value) {
            totalScore += parseInt(value);
            numberOfRatings++;
        }
    }

    // Validate that all images have been rated
    if (numberOfRatings < totalImages) {
        alert('Please rate all images!');
        return;
    }

    // Calculate the percentile (max score per image is 5)
    const maxScore = totalImages * 5;
    const percentile = (totalScore / maxScore) * 100;

    // Display the result
    const resultDiv = document.getElementById('result');
    resultDiv.innerHTML = `Your engagement percentile is: ${percentile.toFixed(2)}%`;
}

// Initialize the display of the current image
document.addEventListener('DOMContentLoaded', () => {
    showImage(currentImageIndex);
});
