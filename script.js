// Socket.io connection (optional - can be commented if not used)
// const socket = io();

// DOM Elements
const contactList = document.getElementById('contactList');
const searchInput = document.getElementById('searchContacts');
const messageInput = document.getElementById('messageInput');
const messages = document.getElementById('messages');
const sendBtn = document.getElementById('sendBtn');
const currentChatUser = document.getElementById('currentChatUser');
const userStatus = document.getElementById('userStatus');
const typingIndicator = document.getElementById('typingIndicator');
const darkModeToggle = document.getElementById('darkModeToggle');

// Contact List
const contacts = ["Achint", "Tarun", "Shubham", "Vishal", "Yashi", "Saloni", "Vivek"];

function loadContacts() {
  contactList.innerHTML = "";
  contacts.forEach(contact => {
    const li = document.createElement('li');
    li.textContent = contact;
    li.classList.add('contact');
    li.addEventListener('click', () => {
      currentChatUser.textContent = contact;
      userStatus.textContent = "Online";
      messages.innerHTML = "";
    });
    contactList.appendChild(li);
  });
}
loadContacts();

// Send Message
sendBtn.addEventListener('click', sendMessage);
messageInput.addEventListener('keypress', (e) => {
  if (e.key === 'Enter') {
    e.preventDefault();
    sendMessage();
  }
});

function sendMessage() {
  const msg = messageInput.value.trim();
  if (!msg) return;
  const div = document.createElement('div');
  div.classList.add('message', 'sent');
  div.textContent = msg;
  messages.appendChild(div);
  messageInput.value = "";
  messages.scrollTop = messages.scrollHeight;
}

// Dark Mode Toggle
darkModeToggle.addEventListener('click', () => {
  document.body.classList.toggle('dark-mode');
});

// AI Chat Elements
const aiInput = document.getElementById('aiInput');
const aiSendBtn = document.getElementById('sendAIBtn');
const aiMessages = document.getElementById('aiMessages');

aiSendBtn.addEventListener('click', sendAIMessage);
aiInput.addEventListener('keypress', (e) => {
  if (e.key === 'Enter') {
    e.preventDefault();
    sendAIMessage();
  }
});

function sendAIMessage() {
  const message = aiInput.value.trim();
  if (!message) return;

  const userMessage = document.createElement('div');
  userMessage.classList.add('ai-msg', 'user-msg');
  userMessage.textContent = message;
  aiMessages.appendChild(userMessage);

  aiInput.value = '';
  aiMessages.scrollTop = aiMessages.scrollHeight;

  const botMessage = document.createElement('div');
  botMessage.classList.add('ai-msg', 'bot-msg');
  botMessage.textContent = "Typing...";
  aiMessages.appendChild(botMessage);
  aiMessages.scrollTop = aiMessages.scrollHeight;

  fetch("https://api-inference.huggingface.co/models/google/flan-t5-small", {
    method: "POST",
    headers: {
      "Authorization": "Bearer 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",
      "Content-Type": "application/json"
    },
    body: JSON.stringify({
      inputs: message
    })
  })
  .then(res => res.json())
  .then(data => {
    const output = data[0]?.generated_text || "Sorry, I didn't get that.";
    botMessage.textContent = output;
    aiMessages.scrollTop = aiMessages.scrollHeight;
  })
  .catch(() => {
    botMessage.textContent = "AI not responding. Try again later.";
  });
}

// Toggle AI Popup
function toggleAI() {
  document.getElementById('aiPopup').classList.toggle('show');
}

// Fake Call Buttons
function startAudioCall() {
  alert("📞 Audio call feature is coming soon!");
}
function startVideoCall() {
  alert("🎥 Video call feature is coming soon!");
}

// Welcome Screen
document.addEventListener("DOMContentLoaded", () => {
  const enterBtn = document.getElementById("enterBtn");
  const welcomeScreen = document.getElementById("welcomeScreen");
  const chatApp = document.getElementById("chatApp");

  if (enterBtn && welcomeScreen && chatApp) {
    enterBtn.addEventListener("click", () => {
      welcomeScreen.classList.add("hidden");
      chatApp.classList.remove("hidden");
    });
  }
});
