// Configuration for the clocks
// You can easily add, remove, or modify locations here.
// Find valid timezone names here: https://en.wikipedia.org/wiki/List_of_tz_database_time_zones
const clockConfigs = [
    { name: 'Abeokuta', timezone: 'Africa/Lagos' },
    { name: 'New York', timezone: 'America/New_York' },
    { name: 'London', timezone: 'Europe/London' },
    { name: 'India', timezone: 'Asia/Kolkata' },
    { name: 'Malawi', timezone: 'Africa/Blantyre' }
];

const container = document.getElementById('clock-container');

// Create the DOM elements for each clock
function initializeClocks() {
    clockConfigs.forEach((config, index) => {
        const card = document.createElement('div');
        card.className = 'clock-card';
        card.id = `clock-${index}`;

        const city = document.createElement('div');
        city.className = 'city-name';
        city.textContent = config.name;

        const time = document.createElement('div');
        time.className = 'time-display';
        time.id = `time-${index}`;

        const date = document.createElement('div');
        date.className = 'date-display';
        date.id = `date-${index}`;

        card.appendChild(city);
        card.appendChild(time);
        card.appendChild(date);
        
        container.appendChild(card);
    });
}

// Update the time for all clocks
function updateClocks() {
    const now = new Date();

    clockConfigs.forEach((config, index) => {
        // Format time
        const timeOptions = { 
            timeZone: config.timezone, 
            hour: '2-digit', 
            minute: '2-digit', 
            second: '2-digit',
            hour12: false 
        };
        const timeFormatter = new Intl.DateTimeFormat('en-US', timeOptions);
        const timeParts = timeFormatter.formatToParts(now);
        
        let hours, minutes, seconds;
        timeParts.forEach(part => {
            if (part.type === 'hour') hours = part.value;
            if (part.type === 'minute') minutes = part.value;
            if (part.type === 'second') seconds = part.value;
        });

        const timeElement = document.getElementById(`time-${index}`);
        timeElement.innerHTML = `${hours}:${minutes}:${seconds}`;

        // Format date
        const dateOptions = { 
            timeZone: config.timezone, 
            weekday: 'short', 
            month: 'short', 
            day: 'numeric' 
        };
        const dateFormatter = new Intl.DateTimeFormat('en-US', dateOptions);
        
        const dateElement = document.getElementById(`date-${index}`);
        dateElement.textContent = dateFormatter.format(now);
    });
}

// Initialize and start the interval
initializeClocks();
updateClocks();
setInterval(updateClocks, 1000);
