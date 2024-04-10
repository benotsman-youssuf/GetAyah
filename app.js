const surrahElement = document.getElementById('surrah');
const ayaNumElement = document.getElementById('aya-num');
const ayaElement = document.getElementById('aya');
const btnElement = document.getElementById('butn');
const audioElement = document.getElementById('audio');
const tafseerElement = document.getElementById('tafsir');

let surrahNum, ayahNum;

const fetchAya = async () => {
    try {
        let random = getRandomInt(1, 6236);
        const response = await fetch(`https://api.alquran.cloud/v1/ayah/${random}/ar.alafasy`);
        const data = await response.json();

        const surrah = data.data.surah.name;
        const ayah = data.data.text;
        surrahNum = data.data.surah.number;
        ayahNum = data.data.numberInSurah;

        surrahElement.textContent = surrah;
        ayaElement.textContent = ayah;
        ayaNumElement.textContent = ayahNum;
        audioElement.src = `https://cdn.islamic.network/quran/audio/128/ar.alafasy/${random}.mp3`;

        fetchTafseer();
    } catch (error) {
        console.log('error');
    }
}

const fetchTafseer = async () => {
    try {
        const response = await fetch(`http://api.quran-tafseer.com/tafseer/1/${surrahNum}/${ayahNum}`);
        const data = await response.json();
        const tafseer = data.text;
        tafseerElement.textContent = tafseer;
    } catch (error) {
        console.log('error');
    }
}

btnElement.addEventListener('click', fetchAya);

function getRandomInt(min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
}