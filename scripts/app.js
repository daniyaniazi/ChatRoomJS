//Dom queries
const chatlist = document.querySelector(".chat-list")
// class instances
const chatUI = new ChatUI(chatlist)
const chatRoom = new Chatroom("music", "mario")

// Get chats 
chatRoom.getChats((data) => {
    console.log(data)
    //updating the ui
    chatUI.render(data);
})
