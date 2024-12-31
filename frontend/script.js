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