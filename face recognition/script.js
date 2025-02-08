document.addEventListener("DOMContentLoaded", async () => {
    console.log("🔄 Initializing application...");
    await loadModels();
    setupDragAndDrop();
});

// Load Face-api.js models
async function loadModels() {
    try {
        await Promise.all([
            faceapi.nets.tinyFaceDetector.loadFromUri("./models"),
            faceapi.nets.faceLandmark68Net.loadFromUri("./models"),
            faceapi.nets.faceRecognitionNet.loadFromUri("./models")
        ]);
        console.log("✅ Models loaded successfully.");
    } catch (err) {
        console.error("❌ Error loading models:", err);
        document.getElementById("result").textContent = "Error loading models.";
    }
}

// Set up drag and drop functionality
function setupDragAndDrop() {
    ["dropZone1", "dropZone2"].forEach((zoneId) => {
        const dropZone = document.getElementById(zoneId);

        dropZone.addEventListener("dragover", (event) => {
            event.preventDefault();
            dropZone.classList.add("hover");
        });

        dropZone.addEventListener("dragleave", () => {
            dropZone.classList.remove("hover");
        });

        dropZone.addEventListener("drop", async (event) => {
            event.preventDefault();
            dropZone.classList.remove("hover");

            const file = event.dataTransfer.files[0];
            if (file) {
                console.log(`📂 File dropped in ${zoneId}:`, file.name);
                await displayImage(dropZone, file);
            }
        });
    });

    document.getElementById("compareButton").addEventListener("click", compareFaces);
    document.getElementById("scanAgainButton").addEventListener("click", resetScreen);
}

// Display dropped image
async function displayImage(dropZone, file) {
    // Check if the file is an image (accepts all image types)
    if (!file.type.startsWith("image/")) {
        alert("Please drop an image file.");
        return;
    }

    const img = new Image();
    img.src = URL.createObjectURL(file);
    img.onload = () => URL.revokeObjectURL(img.src);

    // Remove placeholder text and add the image
    dropZone.innerHTML = "";
    dropZone.appendChild(img);

    // Enable comparison button when both images are loaded
    if (document.getElementById("dropZone1").querySelector("img") &&
        document.getElementById("dropZone2").querySelector("img")) {
        document.getElementById("compareButton").disabled = false;
    }
}

// Compare faces in both images
async function compareFaces() {
    const img1 = document.getElementById("dropZone1").querySelector("img");
    const img2 = document.getElementById("dropZone2").querySelector("img");

    if (!img1 || !img2) {
        document.getElementById("result").textContent = "⚠️ Please upload both images.";
        return;
    }

    document.getElementById("result").textContent = "🔍 Processing...";

    const [desc1, desc2] = await Promise.all([getFaceDescriptor(img1), getFaceDescriptor(img2)]);

    if (!desc1 || !desc2) {
        document.getElementById("result").textContent = "❌ Could not detect faces in one or both images.";
        return;
    }

    const distance = faceapi.euclideanDistance(desc1, desc2);
    document.getElementById("result").textContent =
        distance < 0.6 ? "✅ Faces Match!" : "❌ Faces Do Not Match!";

    // Show "Scan Again" button
    document.getElementById("scanAgainButton").style.display = "block";
}

// Get face descriptor from an image
async function getFaceDescriptor(img) {
    const detection = await faceapi.detectSingleFace(img, new faceapi.TinyFaceDetectorOptions())
        .withFaceLandmarks().withFaceDescriptor();
    return detection ? detection.descriptor : null;
}

// Reset the interface to its original state
function resetScreen() {
    document.getElementById("dropZone1").innerHTML = "<p>Drop Image 1 here</p>";
    document.getElementById("dropZone2").innerHTML = "<p>Drop Image 2 here</p>";
    document.getElementById("result").textContent = "Result will appear here";
    document.getElementById("compareButton").disabled = true;
    document.getElementById("scanAgainButton").style.display = "none"; // Hide "Scan Again" button
}
