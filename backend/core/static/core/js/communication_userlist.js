document.addEventListener("DOMContentLoaded", function () {
  //fake data for testing
    const users = [
    { id: 1, name: "Alice" },
    { id: 2, name: "Ben" },
    { id: 3, name: "Carla" }
  ];

  window.communicationUsers = users;

  const userListEl = document.getElementById("user-list");

  if (!userListEl) {
    return;
  }

  userListEl.innerHTML = "";

  users.forEach(function (user) {
    const li = document.createElement("li");
    const button = document.createElement("button");

    button.type = "button";
    button.textContent = user.name;

    button.addEventListener("click", function () {
      document.dispatchEvent(
        new CustomEvent("communication:userSelected", {
          detail: { userId: user.id }
        })
      );
    });

    li.appendChild(button);
    userListEl.appendChild(li);
  });
});