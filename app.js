// click handler by pressing enter button 
document.getElementById("search-field")
    .addEventListener("keypress", function(event) {
        if (event.key === 'Enter')
            document.getElementById("search-btn").click();
    });

const searchSongs = async() => {
    const searchText = document.getElementById("search-field").value;
    const url = `https://api.lyrics.ovh/suggest/:${searchText}`
    toggleSpiner();
    try {
        const res = await fetch(url);
        const data = await res.json();
        displaySongs(data.data);
    } catch (error) {
        displayError('Something Went Wrong!! Please try again later!')
    }
}
const displaySongs = songs => {
    const divContainer = document.getElementById("songs-container");
    divContainer.innerText = '';
    songs.forEach(song => {
        const divSong = document.createElement('div');
        divSong.className = "single-result row align-items-center my-3 p-3";
        divSong.innerHTML = `
        <div class="col-md-9">
            <h3 class="lyrics-name">${song.title}</h3>
            <p class="author lead">Album by <span>${song.artist.name}</span></p>
            <audio controls>
                <source src="${song.preview}" type="audio/mpeg">
            </audio>
        </div>
        <div class="col-md-3 text-md-right text-center">
            <button onclick="getLyrics('${song.artist.name}', '${song.title}')" class="btn btn-success">Get Lyrics</button>
        </div>
        `;
        divContainer.appendChild(divSong);
        toggleSpiner();
    });
}

const getLyrics = async(artist, title) => {
    const url = `https://api.lyrics.ovh/v1/${artist}/${title}`;
    try {
        const res = await fetch(url);
        const data = await res.json();
        displayLyrics(data.lyrics);
    } catch (error) {
        displayError('Sorry! I failed to load lyrics, Please try again later!!!')
    }
}

const displayLyrics = lyrics => {
    const lyricsDiv = document.getElementById('lyrics-song');
    lyricsDiv.innerText = lyrics;
}
const displayError = error => {
    const errorTag = document.getElementById('error-message');
    errorTag.innerText = error;
}

// spinner - loading

const toggleSpiner = () => {
    const spinner = document.getElementById('spinner-loading');
    const songs = document.getElementById('songs-container');
    spinner.classList.toggle('d-none');
    songs.classList.toggle('d-none');
}