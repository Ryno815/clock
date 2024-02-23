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
  const milliseconds = now.getMilliseconds().toString().padStart(3, '0');
  let timeOfDay = 'AM';

  if (hours >= 12) {
      timeOfDay = 'PM';
  }

  if (hours > 12) {
      hours -= 12;
  }

  hours = hours === 0 ? 12 : hours;

  const timeString = `${hours}:${minutes}:${seconds}.${milliseconds} ${timeOfDay}`;
  const dateString = `${dayOfWeek}, ${month} ${day}`;

  const fontColor = document.getElementById('fontColor').value;
  document.getElementById('clock').textContent = timeString;
  document.getElementById('date').textContent = dateString;
  document.getElementById('clock').style.color = fontColor;
  document.getElementById('date').style.color = fontColor;

  document.title = timeString;

}

function changeFont(fontName) {
  const clock = document.getElementById('clock');
  const date = document.getElementById('date');

  // Apply font family
  clock.style.fontFamily = fontName;
  date.style.fontFamily = fontName;

  // Reset font sizes to pre-determined values in CSS
  clock.style.fontSize = ''; // Reset to CSS default
  date.style.fontSize = ''; // Reset to CSS default
}


// Function to show color selector and font options when scrolling down
function showSelectorsOnScroll() {
  const scrollTop = window.scrollY || document.documentElement.scrollTop;

  // Display color selector and font options if scrolled down beyond the first viewport height
  if (scrollTop > window.innerHeight) { // Updated condition
      document.getElementById('colorSelector').style.top = '0'; // Adjust position to top of the viewport
      document.getElementById('fontOptions').style.top = '0'; // Adjust position to top of the viewport
      document.getElementById('colorSelector').style.display = 'block';
      document.getElementById('fontOptions').style.display = 'block';
  } else {
      document.getElementById('colorSelector').style.display = 'none';
      document.getElementById('fontOptions').style.display = 'none';
  }
}


// Update time every second
setInterval(updateTime, 1);

// Initial call to display the time immediately
updateTime();

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


function playRandomSongAtTopOfHour() {
  // Get the current time
  const now = new Date();
  let minutes = now.getMinutes();
  let seconds = now.getSeconds();

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
