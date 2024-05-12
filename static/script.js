const chatBody = document.getElementById('chat-body');
const userInput = document.getElementById('user-input');
const sendBtn = document.getElementById('send-btn');
const fileInput = document.getElementById('file-input');

sendBtn.addEventListener('click', sendMessage);
userInput.addEventListener('keypress', handleKeyPress);

function sendMessage() {
    const userMessage = userInput.value.trim();
    if (userMessage !== '') {
        appendMessage(userMessage, 'user');
        sendUserMessage(userMessage); // Send user message to Flask backend
        userInput.value = '';
    }
}

function appendMessage(message, sender) {
    const messageElement = document.createElement('div');
    messageElement.classList.add('chat-message');
    messageElement.textContent = message;
    if (sender === 'user') {
        messageElement.classList.add('user-message');
    }
    chatBody.appendChild(messageElement);
    chatBody.scrollTop = chatBody.scrollHeight;
}

function sendUserMessage(message) {
    const formData = new FormData();
    formData.append('user_message', message);

    fetch('/get_response', {
        method: 'POST',
        body: formData
    })
    .then(response => response.json())
    .then(data => {
        const botResponse = data.bot_response;
        appendMessage(botResponse, 'bot');
    })
    .catch(error => {
        console.error('Error:', error);
    });
}

function handleKeyPress(event) {
    if (event.key === 'Enter') {
        event.preventDefault(); // Prevents line break in text area
        sendBtn.click();
    }
}

// Add event listener for file input change
fileInput.addEventListener('change', handleFileUpload);

// Function to handle file upload
function handleFileUpload(event) {
    const files = event.target.files;
    const uploadedFilesContainer = document.getElementById('uploaded-files');

    uploadedFilesContainer.innerHTML = ''; // Clear previous uploaded files

    // Display uploaded files section if files are uploaded
    if (files.length > 0) {
        uploadedFilesContainer.style.display = 'block';

        // Iterate through uploaded files and display them
        for (let i = 0; i < files.length; i++) {
            const file = files[i];
            const fileName = file.name;
            const uploadedFileElement = document.createElement('div');
            uploadedFileElement.classList.add('uploaded-file');
            uploadedFileElement.textContent = fileName;

            // Create remove button for each file
            const removeButton = document.createElement('span');
            removeButton.classList.add('remove-file-btn');
            removeButton.textContent = '❌';
            removeButton.addEventListener('click', () => {
                uploadedFilesContainer.removeChild(uploadedFileElement);
                fileInput.value = ''; // Clear file input
                removeFile(fileName); // Remove file from server
                if (uploadedFilesContainer.childElementCount === 0) {
                    uploadedFilesContainer.style.display = 'none'; // Hide uploaded files section if no files are uploaded
                }
            });

            // Append file element and remove button to uploaded files container
            uploadedFileElement.appendChild(removeButton);
            uploadedFilesContainer.appendChild(uploadedFileElement);

            // Send file to server
            sendFileToServer(file);
        }
    } else {
        uploadedFilesContainer.style.display = 'none'; // Hide uploaded files section if no files are uploaded
    }
}

// Function to send file to server
function sendFileToServer(file) {
    const formData = new FormData();
    formData.append('file', file);

    fetch('/upload', {
        method: 'POST',
        body: formData
    })
    .then(response => {
        if (response.ok) {
            console.log('File uploaded successfully');
        } else {
            console.error('Error uploading file');
        }
    })
    .catch(error => {
        console.error('Error:', error);
    });
}

// Function to remove file from server
function removeFile(filename) {
    fetch('/remove', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/x-www-form-urlencoded'
        },
        body: 'filename=' + filename
    })
    .then(response => response.json())
    .then(data => {
        if (data.success) {
            console.log('File removed successfully');
        } else {
            console.error('Error removing file:', data.error);
        }
    })
    .catch(error => {
        console.error('Error:', error);
    });
}