// Global
let audio = new Audio();
let currentIndex = 0;
let songs = [];

// Load and return songs
async function getsongs() {
  let a = await fetch("http://127.0.0.1:5500/songs/");
  let response = await a.text();

  let div = document.createElement("div");
  div.innerHTML = response;

  let as = div.getElementsByTagName("a");
  let list = [];

  for (let i = 0; i < as.length; i++) {
    const element = as[i];
    if (element.href.endsWith(".mp3")) {
      list.push(element.href);
    }
  }
  return list;
}

// Play a song by index
const playmusic = (index) => {
  if (index < 0 || index >= songs.length) return; // guard
  currentIndex = index;
  audio.src = songs[currentIndex];
  audio.play();

  // change play button icon to pause
  document.querySelector(".play").src = "images/pause.svg";
};

async function main() {
  songs = await getsongs();
  console.log(songs);

  // set default first song
  if (songs.length > 0) {
    audio.src = songs[0];
  }

  // Select UL
  let songul = document.querySelector(".songlist ul");

  // Add songs to the list
  songs.forEach((song, i) => {
    let li = document.createElement("li");
    let filename = song.split("/").pop();

    li.classList.add("invert", "song-item");

    li.innerHTML = `
      <img src="images/music.svg" alt="music" class="invert" />
      <div class="info invert">
        <div>${filename}</div>
        <div>Unknown Artist</div>
      </div>
      <div class="playnow invert">
        <span>Play Now</span>
        <img class="invert" src="images/play.svg" alt="play" />
      </div>
    `;

    // Play when clicking "Play Now" or whole li
    li.addEventListener("click", () => playmusic(i));
    li.querySelector(".playnow").addEventListener("click", (e) => {
      e.stopPropagation();
      playmusic(i);
    });

    songul.appendChild(li);
  });

  // Controls
  let playBtn = document.querySelector(".hey");
  let prevBtn = document.querySelector(".previous");
  let nextBtn = document.querySelector(".next");

  // Play / Pause
playBtn.addEventListener("click", () => {
  if (audio.paused) {
    audio.play().catch(err => console.log("Error playing audio:", err));
    playBtn.src = "images/pause.svg";
  } else {
    audio.pause();
    playBtn.src = "images/play.svg";
  }
});



  // Previous
  prevBtn.addEventListener("click", () => {
    let newIndex = (currentIndex - 1 + songs.length) % songs.length;
    playmusic(newIndex);
  });

  // Next
  nextBtn.addEventListener("click", () => {
    let newIndex = (currentIndex + 1) % songs.length;
    playmusic(newIndex);
  });
}

main();
