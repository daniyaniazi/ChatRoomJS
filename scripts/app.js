//Dom queries
const chatlist = document.querySelector(".chat-list")
const newChatForm = document.querySelector(".new-chat")
const newNameForm = document.querySelector(".new-name")
const updateMessage = document.querySelector(".update-mssg")
const changeRoom = document.querySelector(".chat-rooms")

// Check Local storage for a name
const username = localStorage.username ? localStorage.username : "anonymous"
// class instances
const chatUI = new ChatUI(chatlist)
const chatRoom = new Chatroom("music", username)

// Get chats 
chatRoom.getChats((data) => {
    chatUI.render(data);
})

//add new chat
newChatForm.addEventListener("submit", e => {
    e.preventDefault();
    const message = newChatForm.message.value.trim()
    chatRoom.addChat(message).then(() => {
        newChatForm.reset()
    }).catch(err => console.log(err))
})
//update username
newNameForm.addEventListener("submit", e => {
    e.preventDefault();
    const newName = newNameForm.name.value.trim()
    chatRoom.updateName(newName);
    newNameForm.reset();
    // show feedback msg
    updateMessage.innerHTML = ` Your name is updated to <span class="font-weight-bold">${newName}</span> `;
    updateMessage.classList.add("updateNoti")

    setTimeout(() => {
        updateMessage.innerText = '';
        updateMessage.classList.remove("updateNoti")
    }, 3000);
})

// update the chat room
changeRoom.addEventListener("click", e => {
    if (e.target.tagName === "BUTTON") {
        chatUI.clear();
        chatRoom.updateRoom(e.target.getAttribute('id'))
        chatRoom.getChats(chat => chatUI.render(chat))
    }
}
)