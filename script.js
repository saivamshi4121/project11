// script.js

document.addEventListener('DOMContentLoaded', function() {
    if (localStorage.getItem('loggedIn') === 'true') {
        showEventManagement();
    } else {
        showLoginForm();
    }
    
    // Event listener for login form submission
    document.addEventListener('submit', function(event) {
        if (event.target.id === 'loginForm') {
            event.preventDefault();
            
            let username = document.getElementById('username').value;
            let password = document.getElementById('password').value;
            
            // Simulate login (check credentials in localStorage)
            let registeredUsername = localStorage.getItem('registeredUsername');
            let registeredPassword = localStorage.getItem('registeredPassword');
            
            if (username === registeredUsername && password === registeredPassword) {
                localStorage.setItem('loggedIn', 'true');
                showEventManagement();
            } else {
                alert('Invalid username or password');
            }
        } else if (event.target.id === 'registerForm') {
            event.preventDefault();
            
            let username = document.getElementById('regUsername').value;
            let password = document.getElementById('regPassword').value;
            
            if (username && password) {
                // Simulate registration (store in localStorage for simplicity)
                localStorage.setItem('registeredUsername', username);
                localStorage.setItem('registeredPassword', password);
                
                alert('Registration successful! Please login with your credentials.');
                showLoginForm();
            } else {
                alert('Please fill in all fields.');
            }
        }
    });
    
    // Event listener for logout button
    document.addEventListener('click', function(event) {
        if (event.target.id === 'logout') {
            event.preventDefault();
            localStorage.removeItem('loggedIn');
            showLoginForm();
        }
    });
    
    // Event listener for event form submission
    document.addEventListener('submit', function(event) {
        if (event.target.id === 'eventForm') {
            event.preventDefault();
            
            let title = document.getElementById('title').value;
            let description = document.getElementById('description').value;
            let date = document.getElementById('date').value;
            let location = document.getElementById('location').value;
            let organizer = document.getElementById('organizer').value;
            
            if (title && description && date && location && organizer) {
                let eventObj = {
                    id: new Date().getTime(),
                    title: title,
                    description: description,
                    date: date,
                    location: location,
                    organizer: organizer
                };
                
                saveEvent(eventObj);
                document.getElementById('eventForm').reset();
                alert('Event saved successfully! Updated to the database.');
            } else {
                alert('Please fill in all fields.');
            }
        }
    });
});

function showLoginForm() {
    document.body.innerHTML = `
        <div class="container">
            <h1>Login</h1>
            <form id="loginForm">
                <input type="text" id="username" placeholder="Username" required>
                <input type="password" id="password" placeholder="Password" required>
                <button type="submit">Login</button>
            </form>
            <p>Don't have an account? <a href="javascript:void(0);" onclick="showRegisterForm()">Register here</a></p>
        </div>
    `;
}

function showRegisterForm() {
    document.body.innerHTML = `
        <div class="container">
            <h1>Register</h1>
            <form id="registerForm">
                <input type="text" id="regUsername" placeholder="Username" required>
                <input type="password" id="regPassword" placeholder="Password" required>
                <button type="submit">Register</button>
            </form>
            <p>Already have an account? <a href="javascript:void(0);" id="showLogin">Login here</a></p>
        </div>
    `;
}

function showEventManagement() {
    document.body.innerHTML = `
        <div class="container">
            <h1>Event Management System</h1>
            <button id="logout">Logout</button>
            <form id="eventForm">
                <input type="text" id="title" placeholder="Event Title" required>
                <textarea id="description" placeholder="Event Description" required></textarea>
                <input type="date" id="date" required>
                <input type="text" id="location" placeholder="Event Location" required>
                <input type="text" id="organizer" placeholder="Event Organizer" required>
                <button type="submit" id="saveEvent">Save Event</button>
            </form>
            <div id="eventList"></div>
        </div>
    `;
    
    loadEvents();
}

function saveEvent(eventObj) {
    let events = JSON.parse(localStorage.getItem('events')) || [];
    events.push(eventObj);
    localStorage.setItem('events', JSON.stringify(events));
    loadEvents();
}

function loadEvents() {
    let events = JSON.parse(localStorage.getItem('events')) || [];
    let eventList = document.getElementById('eventList');
    eventList.innerHTML = '';
    
    events.forEach(function(event) {
        let eventItem = document.createElement('div');
        eventItem.classList.add('event');
        
        eventItem.innerHTML = `
            <h3>${event.title}</h3>
            <p><strong>Date:</strong> ${event.date}</p>
            <p><strong>Location:</strong> ${event.location}</p>
            <p><strong>Organizer:</strong> ${event.organizer}</p>
            <p>${event.description}</p>
            <button onclick="deleteEvent(${event.id})">Delete</button>
        `;
        
        eventList.appendChild(eventItem);
    });
}

function deleteEvent(eventId) {
    let events = JSON.parse(localStorage.getItem('events')) || [];
    events = events.filter(function(event) {
        return event.id !== eventId;
    });
    
    localStorage.setItem('events', JSON.stringify(events));
    loadEvents();
    alert('Event deleted successfully! Updated to the database.');
}
