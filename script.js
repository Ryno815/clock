// Function to update time
function updateTime() {
    const now = new Date();
    // Add 1 hour, 31 minutes, and 27 seconds to the current time
    now.setHours(now.getHours() + 0);
    now.setMinutes(now.getMinutes() + 0);
    now.setSeconds(now.getSeconds() + 0);
    
    const daysOfWeek = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
    const months = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];
    const dayOfWeek = daysOfWeek[now.getDay()];
    const month = months[now.getMonth()];
    const day = now.getDate();
    
    let hours = now.getHours();
    const minutes = now.getMinutes().toString().padStart(2, '0');
    const seconds = now.getSeconds().toString().padStart(2, '0');
    let timeOfDay = 'AM';

    if (hours >= 12) {
        timeOfDay = 'PM';
    }

    if (hours > 12) {
        hours -= 12;
    }

    hours = hours === 0 ? 12 : hours;

    const timeString = `${hours}:${minutes}:${seconds} ${timeOfDay}`;
    const dateString = `${dayOfWeek}, ${month} ${day}`;

    const fontColor = document.getElementById('fontColor').value;
    document.getElementById('clock').textContent = timeString;
    document.getElementById('date').textContent = dateString;
    document.getElementById('clock').style.color = fontColor;
    document.getElementById('date').style.color = fontColor;

    document.title = timeString;

}

// Update time every second
setInterval(updateTime, 1000);

// Initial call to display the time immediately
updateTime();

let hideTimeoutColorPicker;

// Function to show color selector
function showColorSelector() {
    const colorSelector = document.getElementById('colorSelector');
    colorSelector.style.display = 'block';
    // Cancel hiding timeout for color selector
    clearTimeout(hideTimeoutColorPicker);
}

// Function to hide color selector
function hideColorSelector() {
    const colorSelector = document.getElementById('colorSelector');
    // Set timeout to hide color selector after 5 seconds
    hideTimeoutColorPicker = setTimeout(function() {
        colorSelector.style.display = 'none';
    }, 5000); // 5 seconds delay
}

// Show color selector when mouse moves to bottom right
document.addEventListener('mouseenter', function(event) {
    const x = event.clientX;
    const y = event.clientY;
    const bottom = window.innerHeight - y;
    const right = window.innerWidth - x;
    if (bottom < 50 && right < 50) {
        showColorSelector();
    }
});

// Hide color selector when mouse leaves the bottom right
document.addEventListener('mouseleave', function(event) {
    const x = event.clientX;
    const y = event.clientY;
    const bottom = window.innerHeight - y;
    const right = window.innerWidth - x;
    if (bottom >= 50 || right >= 50) {
        hideColorSelector();
    }
});

// Cancel hiding timeout for color selector when interacting with it
document.getElementById('colorSelector').addEventListener('mouseenter', function() {
    clearTimeout(hideTimeoutColorPicker);
});

// Hide color selector when mouse leaves the color selector area
document.getElementById('colorSelector').addEventListener('mouseleave', function() {
    hideColorSelector();
});

// Hide color selector when color is selected
document.getElementById('fontColor').addEventListener('input', function() {
    hideColorSelector();
});


// Function to show font options
function showFontOptions() {
    const fontOptions = document.getElementById('fontOptions');
    fontOptions.style.display = 'block';
    // Set timeout to hide font options after 5 seconds
    hideTimeoutFontOptions = setTimeout(function() {
        fontOptions.style.display = 'none';
    }, 5000); // 5 seconds delay
}

// Function to hide font options
function hideFontOptions() {
    const fontOptions = document.getElementById('fontOptions');
    fontOptions.style.display = 'none';
}

// Show font options when mouse moves to bottom left
document.addEventListener('mouseenter', function(event) {
    const x = event.clientX;
    const y = event.clientY;
    const bottom = window.innerHeight - y;
    const left = x;
    if (bottom < 50 && left < 50) {
        showFontOptions();
    }
});

// Hide font options when mouse leaves the bottom left
document.addEventListener('mouseleave', function(event) {
    const x = event.clientX;
    const y = event.clientY;
    const bottom = window.innerHeight - y;
    const left = x;
    if (bottom >= 50 || left >= 50) {
        hideFontOptions();
    }
});

// Function to change font
function changeFont(fontName) {
    const clock = document.getElementById('clock');
    const date = document.getElementById('date');

    // Apply font family
    clock.style.fontFamily = fontName;
    date.style.fontFamily = fontName;

    // Apply font size adjustments for Courier New
    if (fontName === 'Courier New') {
        clock.style.fontSize = '22em';
        date.style.fontSize = '5em';
    } else {
        clock.style.fontSize = '25em';
        date.style.fontSize = '10em';
    }
}

// Function to show color selector and font options when scrolling down
function showSelectorsOnScroll() {
    const scrollTop = window.scrollY || document.documentElement.scrollTop;

    // Display color selector and font options if scrolled down beyond a certain point
    if (scrollTop > 100) { // Adjust the value as needed
        document.getElementById('colorSelector').style.display = 'block';
        document.getElementById('fontOptions').style.display = 'block';
    } else {
        document.getElementById('colorSelector').style.display = 'none';
        document.getElementById('fontOptions').style.display = 'none';
    }
}

// Event listener for scrolling
window.addEventListener('scroll', showSelectorsOnScroll);









// Array of song filenames
const songs = ['Dropkick Murphys.mp3', 'Gangnam.mp3', 'Godzilla.mp3', 'Star Wars.mp3','Dual.mp3']; // Add more song filenames as needed

// Function to play a random song
function playRandomSong() {
    // Choose a random song from the array
    const randomIndex = Math.floor(Math.random() * songs.length);
    const randomSong = songs[randomIndex];

    // Create an audio element
    const audio = new Audio(`songs/${randomSong}`);

    // Play the audio
    audio.play();
}

// Function to play a random song at the top of every hour
function playRandomSongAtTopOfHour() {
    // Get the current time
    const now = new Date();
    now.setMinutes(now.getMinutes() + 0);
    now.setSeconds(now.getSeconds() + 0);

    // Calculate the time until the next hour
    const timeUntilNextHour = (60 - minutes) * 60 * 1000 - seconds * 1000;

    // Schedule the random song to play at the top of the next hour
    setTimeout(function() {
        playRandomSong();
        // Schedule the next random song to play at the top of the next hour
        setInterval(playRandomSong, 1000 * 60 * 60); // Repeat every hour
    }, timeUntilNextHour);
}

// Call the function to start playing random songs
playRandomSongAtTopOfHour();
