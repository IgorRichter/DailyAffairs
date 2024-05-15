import './dropdown-menu.js';
import './nav-app.js';
import './add-form.js';
import './data-sort.js';
import './sort.js';
import './task-types-sort.js';
import './project-section.js';

var video = document.getElementById("myVideo");
var playPauseButton = document.getElementById("playPause");

playPauseButton.addEventListener("click", function() {
    if (video.paused) {
        video.play();
        playPauseButton.textContent = "Pause";
    } else {
        video.pause();
        playPauseButton.textContent = "Play";
    }
});