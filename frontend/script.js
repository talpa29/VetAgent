async function register() {
    const username = document.getElementById('register-username').value;
    const password = document.getElementById('register-password').value;

    const response = await fetch('http://localhost:8000/register', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ username, password }) // Ensure correct JSON format
    });

    const data = await response.json();
    alert(data.message || data.detail);
}

async function login() {
    const username = document.getElementById('login-username').value;
    const password = document.getElementById('login-password').value;

    const response = await fetch('http://localhost:8000/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ username, password }) // Ensure correct JSON format
    });

    const data = await response.json();
    if (response.ok) {
        alert(data.message);
        document.getElementById('auth').style.display = 'none';
        document.getElementById('chat-container').style.display = 'block';
    } else {
        alert(data.detail);
    }
}

async function sendMessage() {
    const input = document.getElementById('user-input');
    const message = input.value;
    input.value = '';

    const response = await fetch('http://localhost:8000/chat', {
        method: 'POST',
        headers: {'Content-Type': 'application/json'},
        body: JSON.stringify({text: message})
    });
    
    const data = await response.json();
    displayMessage(message, data.response);
}

function displayMessage(userMessage, botResponse) {
    const chatMessages = document.getElementById('chat-messages');
    chatMessages.innerHTML += `
        <div class="user-message">${userMessage}</div>
        <div class="bot-message">${botResponse}</div>
    `;
}