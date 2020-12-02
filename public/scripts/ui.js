class ChatUI {
    constructor(list) {
        this.list = list;

    }
    render(data) {
        const when = dateFns.distanceInWordsToNow(data.created_at.toDate(), {
            addSuffix: true
        })
        const html = `
            <li class="list-group-item">
            <span class="username font-weight-bold">${data.username} </span>
            <span class="message">${data.message} </span>
            <div class="time font-style-small text-secondary">${when}</div>
            </li>`;


        this.list.innerHTML += html;
    }
    clear() {
        this.list.innerHTML = "";
    }
}