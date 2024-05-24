// Get the necessary DOM elements
const surrahElement = document.getElementById("surrah");
const ayaNumElement = document.getElementById("aya-num");
const ayaElement = document.getElementById("aya");
const btnElement = document.getElementById("butn");
const audioElement = document.getElementById("audio");
const tafseerElement = document.getElementById("tafsir");
const moyassarElement = document.getElementById("moyassar");
const saadiElement = document.getElementById("saadi");
const ibnkathirElement = document.getElementById("ibn-kathir");

const next = document.querySelector(".next");
const previous = document.querySelector(".previous");


// Variables to store the current surah and ayah numbers
let surrahNum, ayahNum ,saadiSlug ,muyassarSlug, ibnkathirSlug;

const RandomNum = getRandomInt(1 , 6236);
let nxt = RandomNum ;
// Function to fetch a random ayah
const fetchAya = async (random) => {
    try {        
        // Fetch the ayah data from the API
        const response = await fetch(
            `https://api.alquran.cloud/v1/ayah/${random}/ar.alafasy`
        );
        const data = await response.json();

        // Extract the surah name, ayah text, surah number, and ayah number
        const surrah = data.data.surah.name;
        const ayah = data.data.text;
        surrahNum = data.data.surah.number;
        ayahNum = data.data.numberInSurah;

        // Update the DOM elements with the fetched data
        surrahElement.textContent = surrah;
        ayaElement.textContent = ayah;
        ayaNumElement.textContent = ayahNum;

        // Set the audio source to the corresponding recitation of the ayah
        audioElement.src = `https://cdn.islamic.network/quran/audio/128/ar.alafasy/${random}.mp3`;

        // Fetch the default tafseer
        fetchTafseer(muyassarSlug);
    } catch (error) {
        console.error("Error fetching Aya:", error);
    }
};

// Function to fetch tafseer based on the selected tafseer ID
saadiSlug = 'ar-tafseer-al-saddi';
muyassarSlug = 'ar-tafsir-muyassar';
ibnkathirSlug = 'ar-tafsir-ibn-kathir';

const fetchTafseer = async (tafsiirSlug) => {
    try {
        // Fetch the tafseer data from the API
        const response = await fetch(
            `https://cdn.jsdelivr.net/gh/spa5k/tafsir_api@main/tafsir/${tafsiirSlug}/${surrahNum}/${ayahNum}.json`
        );
        const data = await response.json();

        // Extract the tafseer text
        const tafseer = data.text;

        // Update the tafseer element in the DOM
        tafseerElement.textContent = tafseer;
    } catch (error) {
        console.error("Error fetching Tafseer:", error);
    }
};

// Event listener for the "Fetch Ayah" button
btnElement.addEventListener('click' , () => {
    fetchAya(RandomNum);
    console.log(RandomNum);
});
next.addEventListener('click' , () => {
    nxt++;
    fetchAya(nxt);
    console.log(nxt);
});
previous.addEventListener('click' , () =>{
    nxt--;
    fetchAya(nxt);
});

window.onload = function() {fetchAya(RandomNum)};

// Event listeners for the tafseer buttons
moyassarElement.addEventListener("click", () => fetchTafseer(muyassarSlug));
saadiElement.addEventListener("click", () => fetchTafseer(saadiSlug));
ibnkathirElement.addEventListener("click", () => fetchTafseer(ibnkathirSlug));
// enElement.addEventListener("click", () => fetchTafseer(10));

// Function to generate a random integer between min and max (inclusive)
function getRandomInt(min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
}

// Event listeners for the tafseer buttons
const buttons = document.querySelectorAll("#tafasir > button");
buttons.forEach((button) => {
    button.addEventListener("click", () => {
        // Remove the "active" class from all buttons
        buttons.forEach((btn) => btn.classList.remove("active"));

        // Add the "active" class to the clicked button
        button.classList.add("active");
    });
});
