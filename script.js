document.getElementById('createTicket').addEventListener('click', createTicket);

let tickets = JSON.parse(localStorage.getItem('tickets')) || [];
renderTickets();

function createTicket() {
    const title = document.getElementById('ticketTitle').value;
    const description = document.getElementById('ticketDescription').value;
    const priority = document.getElementById('ticketPriority').value;
    const status = document.getElementById('ticketStatus').value;

    if (title && description && priority && status) {
        const ticket = {
            id: Date.now(),
            title,
            description,
            priority,
            status
        };
        tickets.push(ticket);
        localStorage.setItem('tickets', JSON.stringify(tickets));
        renderTickets();
        clearForm();
    } else {
        alert('Please fill out all fields.');
    }
}

function renderTickets() {
    const ticketList = document.getElementById('ticketList');
    ticketList.innerHTML = '';

    tickets.forEach(ticket => {
        const ticketDiv = document.createElement('div');
        ticketDiv.className = 'ticket';
        
        ticketDiv.innerHTML = `
            <h3>${ticket.title}</h3>
            <p>${ticket.description}</p>
            <p><strong>Priority:</strong> ${ticket.priority}</p>
            <p><strong>Status:</strong> ${ticket.status}</p>
            <div class="ticket-actions">
                <button onclick="editTicket(${ticket.id})">Edit</button>
                <button onclick="deleteTicket(${ticket.id})">Delete</button>
                <button onclick="toggleResolved(${ticket.id})">
                    ${ticket.status === 'Resolved' ? 'Mark as Open' : 'Mark as Resolved'}
                </button>
            </div>
        `;
        
        ticketList.appendChild(ticketDiv);
    });
}

function editTicket(id) {
    const ticket = tickets.find(t => t.id === id);
    document.getElementById('ticketTitle').value = ticket.title;
    document.getElementById('ticketDescription').value = ticket.description;
    document.getElementById('ticketPriority').value = ticket.priority;
    document.getElementById('ticketStatus').value = ticket.status;

    deleteTicket(id);
}

function deleteTicket(id) {
    tickets = tickets.filter(t => t.id !== id);
    localStorage.setItem('tickets', JSON.stringify(tickets));
    renderTickets();
}

function toggleResolved(id) {
    const ticket = tickets.find(t => t.id === id);
    ticket.status = ticket.status === 'Resolved' ? 'Open' : 'Resolved';
    localStorage.setItem('tickets', JSON.stringify(tickets));
    renderTickets();
}

function clearForm() {
    document.getElementById('ticketTitle').value = '';
    document.getElementById('ticketDescription').value = '';
    document.getElementById('ticketPriority').value = '';
    document.getElementById('ticketStatus').value = '';
}
