document.addEventListener("DOMContentLoaded", function () {
  const conversations = {
    1: [
      { sender: "Alice", text: "Hey there." },
      { sender: "me", text: "Hi Alice." }
    ],
    2: [
      { sender: "Ben", text: "Did you see the update?" }
    ],
    3: []
  };

  let selectedUserId = null;

  const chatHeaderEl = document.getElementById("chat-header");
  const messageListEl = document.getElementById("message-list");
  const messageFormEl = document.getElementById("message-form");
  const messageInputEl = document.getElementById("message-input");

  if (!chatHeaderEl || !messageListEl || !messageFormEl || !messageInputEl) {
    return;
  }

  function getSelectedUser() {
    const users = window.communicationUsers || [];
    return users.find(function (user) {
      return user.id === selectedUserId;
    });
  }

  function renderChat() {
    if (selectedUserId === null) {
      chatHeaderEl.textContent = "Select a user";
      messageListEl.innerHTML = "";
      return;
    }

    const selectedUser = getSelectedUser();

    if (!selectedUser) {
      chatHeaderEl.textContent = "Select a user";
      messageListEl.innerHTML = "";
      return;
    }

    chatHeaderEl.textContent = "Conversation with " + selectedUser.name;
    messageListEl.innerHTML = "";

    const messages = conversations[selectedUserId] || [];

    messages.forEach(function (message) {
      const messageEl = document.createElement("p");
      messageEl.textContent = message.sender + ": " + message.text;
      messageListEl.appendChild(messageEl);
    });
  }

  document.addEventListener("communication:userSelected", function (event) {
    selectedUserId = event.detail.userId;
    renderChat();
    messageInputEl.focus();
  });

  messageFormEl.addEventListener("submit", function (event) {
    event.preventDefault();

    if (selectedUserId === null) {
      return;
    }

    const text = messageInputEl.value.trim();

    if (!text) {
      return;
    }

    if (!conversations[selectedUserId]) {
      conversations[selectedUserId] = [];
    }

    conversations[selectedUserId].push({
      sender: "me",
      text: text
    });

    messageInputEl.value = "";
    renderChat();
    messageInputEl.focus();
  });

  renderChat();
});