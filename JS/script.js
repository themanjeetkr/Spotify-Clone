async function getsongs() {
  let a = await fetch("http://127.0.0.1:5500/songs/");
  let response = await a.text(); // If server returns HTML

  let div = document.createElement("div");
  div.innerHTML = response;

  let as = div.getElementsByTagName("a");
  let songs = [];

  for (let i = 0; i < as.length; i++) {
    const element = as[i];
    if (element.href.endsWith(".mp3")) { // fixed typo
      songs.push(element.href);
    }
  }

  // console.log(songs); // shows all .mp3 links
  return songs;
}

async function main(){
  let songs=await getsongs();
  console.log(songs);
  var audio=new Audio(songs[0]);
  audio.play();  
}
main();
