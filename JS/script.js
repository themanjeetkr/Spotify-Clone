async function getsongs() {
  let a = await fetch("http://127.0.0.1:5500/songs/");
  let response = await a.text(); // If server returns HTML

  let div = document.createElement("div");
  div.innerHTML = response;

  let as = div.getElementsByTagName("a");
  let songs = [];

  for (let i = 0; i < as.length; i++) {
    const element = as[i];
    if (element.href.endsWith(".mp3")) { 
      songs.push(element.href);
    }
  }

  return songs;
}

async function main() {
  let songs = await getsongs();
  console.log(songs);

  // Play the first song
  var audio = new Audio(songs[0]);

  // Select UL
  let songul = document.querySelector(".songlist ul");

  // Add songs to the list
  for (let i = 0; i < songs.length; i++) {
    let li = document.createElement("li");
    let filename = songs[i].split("/").pop();

    li.classList.add("invert");
    li.classList.add("song-item");

    li.innerHTML = `
      <img  src="images/music.svg" alt="music class="invert" />
      <div class="info invert">
        <div>${filename}</div>
        <div>Unknown Artist</div>
      </div>
      <div class="playnow invert">
        <span>Play Now</span>
        <img class="invert" src="images/play.svg" alt="play" />
      </div>
    `;

    // Add click event to playnow only
    li.querySelector(".playnow").addEventListener("click", (e) => {
      e.stopPropagation();
      audio.src = songs[i];
      audio.play();
    });

    songul.appendChild(li);
  }
}

main(); // ✅ safely outside the loop
