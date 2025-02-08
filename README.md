# Drag & Drop Face Recognition

## Team Members
- Jiu Chen  
- Casey Lee
- Sri Sai lakshman Kunderu

## Project Overview
This project is a web-based application that allows users to compare two face images using AI-powered facial recognition. The application features a simple drag-and-drop interface where users can drop images into designated zones. Once both images are uploaded, the system processes them using the **face-api.js** library to detect faces, extract facial descriptors, and determine if the faces match.

## Purpose of the Project
The purpose of this project is to demonstrate how to integrate machine learning techniques—in this case, face recognition—into a web application. It serves as both an educational tool and a practical example of:
- Working with drag-and-drop file interactions in the browser.
- Utilizing pre-trained AI models for face detection and recognition.
- Handling asynchronous operations and user interface updates in JavaScript.

## Tools Utilized
- **HTML, CSS, JavaScript**: For building the web interface.
- **face-api.js**: A JavaScript library built on TensorFlow.js for face detection and recognition.
- **Web Browser**: The application runs on modern web browsers.
- **GitHub**: The code repository is maintained on GitHub.

## Installation and Setup
1. **Clone the Repository**:  
  git clone https://github.com/JiuChen11/face-recognition

2. **Download Models**:  
   Download the necessary models for **face-api.js** (e.g., Tiny Face Detector, Face Landmark, and Face Recognition models) from the [face-api.js GitHub repository](https://github.com/justadudewhohacks/face-api.js) and place them in a folder named `models` at the root of the project.
3. **Open the Application**:  
   Open the `index.html` file in your web browser to run the application.

## Usage Instructions
1. **Upload Images**:  
   Drag and drop two images into the respective drop zones on the page(has to be jpeg or png).
2. **Compare Faces**:  
   Once both images are uploaded, the "Compare Faces" button becomes enabled. Click it to start the face recognition process.
3. **View Results**:  
   The application processes the images and displays whether the faces match below the button.
4. **Scan Again**:  
   If you wish to try a new comparison, click the "Scan Again" button (which is centered on the page) to reset the interface.

## Challenges Faced and Solutions
- **Model Loading Issues**:  
  Initially, there were difficulties loading the face detection models due to incorrect file paths. This was resolved by ensuring that the models are placed in the correct directory (`./models`) and verifying the paths in the code.
  
- **Drag and Drop Implementation**:  
  Handling the drag-and-drop events required careful management of event listeners to prevent default browser behaviors. This was overcome by explicitly calling `event.preventDefault()` and adding/removing CSS classes to give visual feedback.
  
- **Face Detection Accuracy**:  
  In some cases, the face detection did not perform as expected. Fine-tuning the detection options (e.g., using `TinyFaceDetectorOptions`) and ensuring high-quality images helped improve accuracy.

## Credits and Acknowledgments
- **face-api.js**:  
  This project utilizes [face-api.js](https://github.com/justadudewhohacks/face-api.js), an open-source library for face detection and recognition, licensed under the MIT License.  
- **Tutorials and Online Resources**:  
  Inspiration and code snippets were adapted from various tutorials and online resources focused on drag-and-drop interfaces and AI-powered facial recognition.
- **Ai for writing the readme and making the code look organized**:
  I would like to acknowledge the assistance of AI tools in helping to organize the source code and generate portions of this README. While the core functionality and design decisions were made by me, the AI assisted in refining the code structure and documentation for clarity and consistency.

## License
This project is licensed under the **MIT License**. See the [LICENSE](LICENSE) file for more details.
