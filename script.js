const contactList = document.getElementById('contactList');
const searchInput = document.getElementById('searchContacts');
const messageInput = document.getElementById('messageInput');
const messages = document.getElementById('messages');
const sendBtn = document.getElementById('sendBtn');
const currentChatUser = document.getElementById('currentChatUser');
const userStatus = document.getElementById('userStatus');
const typingIndicator = document.getElementById('typingIndicator');
const darkModeToggle = document.getElementById('darkModeToggle');
const aiPopup = document.getElementById('aiPopup');
const aiMessages = document.getElementById('aiMessages');
const aiInput = document.getElementById('aiInput');
const aiSendBtn = document.getElementById('sendAIBtn');

const contacts = [
  { name: "Achint", avatar: "https://randomuser.me/api/portraits/men/10.jpg" },
  { name: "Tarun", avatar: "https://randomuser.me/api/portraits/men/11.jpg" },
  { name: "Shubham", avatar: "https://randomuser.me/api/portraits/men/12.jpg" },
  { name: "Vishal", avatar: "https://randomuser.me/api/portraits/men/13.jpg" },
  { name: "Yashi", avatar: "https://randomuser.me/api/portraits/women/14.jpg" },
  { name: "Saloni", avatar: "https://randomuser.me/api/portraits/women/15.jpg" },
  { name: "Vivek", avatar: "https://randomuser.me/api/portraits/men/16.jpg" },
];

function loadContacts() {
  contactList.innerHTML = "";
  contacts.forEach(c => {
    const li = document.createElement('li');
    li.innerHTML = `<img src="${c.avatar}" class="profile-pic"><span>${c.name}</span>`;
    li.addEventListener('click', () => {
      currentChatUser.textContent = c.name;
      userStatus.textContent = "🟢 Online";
      messages.innerHTML = "";
    });
    contactList.appendChild(li);
  });
}

sendBtn.addEventListener('click', sendMessage);
messageInput.addEventListener('keypress', (e) => {
  if (e.key === 'Enter') sendMessage();
});

function sendMessage() {
  const msg = messageInput.value.trim();
  if (!msg) return;
  const div = document.createElement('div');
  div.className = 'message sent';
  div.textContent = msg;
  messages.appendChild(div);
  messageInput.value = "";
  messages.scrollTop = messages.scrollHeight;
}

aiSendBtn.addEventListener('click', sendAIMessage);
aiInput.addEventListener('keypress', (e) => {
  if (e.key === 'Enter') sendAIMessage();
});

function sendAIMessage() {
  const msg = aiInput.value.trim();
  if (!msg) return;

  const userDiv = document.createElement('div');
  userDiv.className = 'message sent';
  userDiv.textContent = msg;
  aiMessages.appendChild(userDiv);

  const botDiv = document.createElement('div');
  botDiv.className = 'message received';
  botDiv.textContent = "Typing...";
  aiMessages.appendChild(botDiv);

  aiInput.value = '';
  aiMessages.scrollTop = aiMessages.scrollHeight;

  fetch("https://api-inference.huggingface.co/models/google/flan-t5-small", {
    method: "POST",
    headers: {
      "Authorization": "Bearer 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",
      "Content-Type": "application/json"
    },
    body: JSON.stringify({ inputs: msg })
  })
  .then(res => res.json())
  .then(data => {
    botDiv.textContent = data[0]?.generated_text || "No reply.";
    aiMessages.scrollTop = aiMessages.scrollHeight;
  })
  .catch(() => {
    botDiv.textContent = "AI not available.";
  });
}

function toggleAI() {
  aiPopup.classList.toggle("show");
}

darkModeToggle.addEventListener("click", () => {
  document.body.classList.toggle("dark-mode");
});

// Welcome screen
document.getElementById("enterBtn").addEventListener("click", () => {
  document.getElementById("welcomeScreen").style.display = "none";
  document.getElementById("chatApp").classList.remove("hidden");
});

// Init
loadContacts();
