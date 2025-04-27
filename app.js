const play = document.getElementById("play");
const pause = document.getElementById("pause");
const reset = document.getElementById("reset");
const timer = document.getElementById("timer");

let ringtone = new Audio("ringtone.mp3");

let timeLeft = 12;
let interval;
let running = false;

const updateTimer = () => {
	const minutes = Math.floor(timeLeft / 60);
	const seconds = timeLeft % 60;

	timer.innerHTML =
	`${minutes.toString().padStart(2,"0")}:${seconds.toString().padStart(2,"0")}`;

};

const playTimer = () => {
	if(running) return;
	running = true;

	interval = setInterval(() => {
		timeLeft--;
		updateTimer();

		if(timeLeft === 0) {
			clearInterval(interval);
			running = false;
			ringtone.play();
			timeLeft = 1800;
			updateTimer();
		}

	}, 1000);
};

const pauseTimer = () => {
	clearInterval(interval);
	running = false;

}

const resetTimer = () => {
	clearInterval(interval);
	running = false;
	timeLeft = 1800;
	fadeOut(ringtone);
	ringtone.currentTime = 0;
	updateTimer();
}

function fadeOut(audio) {
	let fadeAudio = setInterval(() => {
		if (audio.volume > 0.05) {
			audio.volume -= 0.05; // Decrease volume slowly
		} else {
			audio.pause();       // Stop when almost silent
			audio.currentTime = 0;
			audio.volume = 1.0;   // Reset volume for next play
			clearInterval(fadeAudio);
		}
	}, 100); // every 100ms
}

play.addEventListener("click",playTimer);
pause.addEventListener("click",pauseTimer);
reset.addEventListener("click",resetTimer);