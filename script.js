let events = JSON.parse(localStorage.getItem('events')) || [];

function saveEvents() {
    localStorage.setItem('events', JSON.stringify(events));
}

function showNotification(message) {
    const notification = document.getElementById('notification');
    notification.innerText = message;
    notification.style.display = 'block';
    setTimeout(() => {
        notification.style.display = 'none';
    }, 3000);
}

function addEvent() {
    const name = document.getElementById('eventName').value;
    const date = document.getElementById('eventDate').value;
    const time = document.getElementById('eventTime').value;
    const location = document.getElementById('eventLocation').value;
    const category = document.getElementById('eventCategory').value;

    if (name && date && time && location) {
        const event = { name, date, time, location, category };
        events.push(event);
        saveEvents();
        displayEvents();
        clearForm();
        showNotification('Događaj uspešno dodat!');
    } else {
        alert('Molimo popunite sva polja!');
    }
}

function displayEvents() {
    const eventsSection = document.getElementById('events');
    eventsSection.innerHTML = '';
    events.forEach((event, index) => {
        const eventElement = document.createElement('div');
        eventElement.classList.add('event');
        eventElement.innerHTML = `<h3>${event.name}</h3>
                                 <p>${event.date} u ${event.time}</p>
                                 <p>Lokacija: ${event.location}</p>
                                 <p>Kategorija: ${event.category}</p>
                                 <button class="edit-button" onclick="editEvent(${index})">Uredi</button>
                                 <button class="delete-button" onclick="deleteEvent(${index})">Obriši</button>`;
        eventsSection.appendChild(eventElement);
    });
}

function deleteEvent(index) {
    events.splice(index, 1);
    saveEvents();
    displayEvents();
    showNotification('Događaj obrisan!');
}

function editEvent(index) {
    const event = events[index];
    document.getElementById('eventName').value = event.name;
    document.getElementById('eventDate').value = event.date;
    document.getElementById('eventTime').value = event.time;
    document.getElementById('eventLocation').value = event.location;
    document.getElementById('eventCategory').value = event.category;
    deleteEvent(index);
    showNotification('Uređivanje događaja započeto!');
}

function searchEvents() {
    const query = document.getElementById('eventSearch').value.toLowerCase();
    const filteredEvents = events.filter(event => event.name.toLowerCase().includes(query));
    displayFilteredEvents(filteredEvents);
}

function displayFilteredEvents(filteredEvents) {
    const eventsSection = document.getElementById('events');
    eventsSection.innerHTML = '';
    filteredEvents.forEach(event => {
        const eventElement = document.createElement('div');
        eventElement.classList.add('event');
        eventElement.innerHTML = `<h3>${event.name}</h3>
                                 <p>${event.date} u ${event.time}</p>
                                 <p>Lokacija: ${event.location}</p>
                                 <p>Kategorija: ${event.category}</p>`;
        eventsSection.appendChild(eventElement);
    });
}

function clearForm() {
    document.getElementById('eventName').value = '';
    document.getElementById('eventDate').value = '';
    document.getElementById('eventTime').value = '';
    document.getElementById('eventLocation').value = '';
    document.getElementById('eventCategory').value = 'muzika';
}

function loadEvents() {
    displayEvents();
}
