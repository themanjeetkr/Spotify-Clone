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
  // audio.play();

  // Select UL (make sure HTML has <div class="songlist"><ul></ul></div>)
  let songul = document.querySelector(".songlist ul");

  // Add songs to the list
  for (let i = 0; i < songs.length; i++) {
    let li = document.createElement("li");
    li.textContent = songs[i].split("/").pop(); // show only file name
    li.addEventListener("click", () => {
      audio.src = songs[i];
      audio.play();
    });
    songul.appendChild(li);
  }
}

main();
