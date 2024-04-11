const surrahElement = document.getElementById("surrah");
const ayaNumElement = document.getElementById("aya-num");
const ayaElement = document.getElementById("aya");
const btnElement = document.getElementById("butn");
const audioElement = document.getElementById("audio");
const tafseerElement = document.getElementById("tafsir");
const moyassarElement = document.getElementById("moyassar");
const saadiElement = document.getElementById("saadi");
const enElement = document.getElementById("en");

let surrahNum, ayahNum;

const fetchAya = async () => {
  try {
    const random = getRandomInt(1, 6236);
    const response = await fetch(
      `https://api.alquran.cloud/v1/ayah/${random}/ar.alafasy`
    );
    const data = await response.json();

    const surrah = data.data.surah.name;
    const ayah = data.data.text;
    surrahNum = data.data.surah.number;
    ayahNum = data.data.numberInSurah;

    surrahElement.textContent = surrah;
    ayaElement.textContent = ayah;
    ayaNumElement.textContent = ayahNum;
    audioElement.src = `https://cdn.islamic.network/quran/audio/128/ar.alafasy/${random}.mp3`;
    fetchTafseer(1);
  } catch (error) {
    console.error("Error fetching Aya:", error);
  }
};

const fetchTafseer = async (tafsiirId) => {
  try {
    const response = await fetch(
      `http://api.quran-tafseer.com/tafseer/${tafsiirId}/${surrahNum}/${ayahNum}`
    );
    const data = await response.json();
    const tafseer = data.text;
    tafseerElement.textContent = tafseer;
  } catch (error) {
    console.error("Error fetching Tafseer:", error);
  }
};

btnElement.addEventListener("click", fetchAya);
moyassarElement.addEventListener("click", () => fetchTafseer(1));
saadiElement.addEventListener("click", () => fetchTafseer(3));
enElement.addEventListener("click", () => fetchTafseer(10));

function getRandomInt(min, max) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

const buttons = document.querySelectorAll("#tafasir > button");

buttons.forEach((button) => {
  button.addEventListener("click", () => {
    buttons.forEach((btn) => btn.classList.remove("active"));
    button.classList.add("active");
  });
});
