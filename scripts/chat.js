
class Chatroom {
    constructor(room, username) {
        this.room = room;
        this.username = username;
        this.chat = db.collection('chat');
        this.unsub;
    }
    async addChat(message) {
        //format chat object
        const now = new Date;
        const chat = {
            message,
            username: this.username,
            room: this.room,
            created_at: firebase.firestore.Timestamp.fromDate(now)
            // created_at: firebase.firestore.Timestamp.fromData(now),

        }
        // saving the chat
        const response = await this.chat.add(chat);
        return response;
    }
    getChats(callback) {
        this.unsub = this.chat
            .where('room', '==', this.room)
            .orderBy('created_at')
            .onSnapshot(snapshot => {
                snapshot.docChanges().forEach(change => {
                    if (change.type === "added")
                        //update the ui 
                        callback(change.doc.data());
                });
            })
    }
    updateName(username) {
        this.username = username;
    }
    updateRoom(room) {
        this.room = room;
        console.log(this.room)
        if (this.unsub) {
            this.unsub();
        }

    }
}


