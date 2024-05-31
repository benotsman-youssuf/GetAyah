// Get the necessary DOM elements
const surrahElement = document.getElementById("surrah");
const ayaNumElement = document.getElementById("aya-num");
const ayaElement = document.getElementById("aya");
const btnElement = document.getElementById("butn");
const audioElement = document.getElementById("audio");
const tafseerElement = document.getElementById("tafsir");
const nextaya = document.getElementById("nextayah");
const moyassarElement = document.getElementById("moyassar");
const saadiElement = document.getElementById("saadi");
const ibnkathirElement = document.getElementById("ibn-kathir");

const root = document.documentElement;
const theme = document.getElementById("theme");
const menu = document.getElementById("menu");
const sidebar = document.getElementById("sidebar");
const closeSidebar = document.getElementById("closeSidebar");
const tableOfContent =  document.getElementById("tableOfContent");

const next = document.querySelector(".next");
const previous = document.querySelector(".previous");

const copy = document.querySelector("#copy");
const translate = document.querySelector("#translate");

let ayah ,surrah , surrahNum, ayahNum ,saadiSlug ,muyassarSlug, ibnkathirSlug , numberOfAyahs , RandomNum , NextAyah , enAyah , enSurrah;

const fetchAya = async (random ) => {
    try {        
        // Fetch the ayah data from the API
        const response = await fetch(
            `https://api.alquran.cloud/v1/ayah/${random}/ar.alafasy`
        );
        const data = await response.json();

        const nextresponse = await fetch(
            `https://api.alquran.cloud/v1/ayah/${random+1}/ar.alafasy`
        );
        const nextdata = await nextresponse.json();

        const enAyahresponse = await fetch(
            `https://api.alquran.cloud/v1/ayah/${random}/en.yusufali`
        );
        const enAyahdata = await enAyahresponse.json();

        // Extract the surah name, ayah text, surah number, and ayah number
        surrah = data.data.surah.name;
        ayah = data.data.text;
        surrahNum = data.data.surah.number;
        ayahNum = data.data.numberInSurah;
        numberOfAyahs = data.data.surah.numberOfAyahs;

        const nextp = nextdata.data.text;

        enAyah = enAyahdata.data.text;
        enSurrah = enAyahdata.data.surah.englishName;

        // Update the DOM elements with the fetched data
        surrahElement.textContent = surrah;
        ayaElement.textContent = ayah;
        ayaNumElement.textContent = ayahNum;

        nextaya.textContent = selectFirstTwoWords(nextp);

        // Set the audio source to the corresponding recitation of the ayah
        audioElement.src = `https://cdn.islamic.network/quran/audio/128//ar.mahermuaiqly/${random}.mp3`;

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
const fetchSidebar = async () => {
    try {
        const response = await fetch(
            `https://api.alquran.cloud/v1/surah`
        );
        const data = await response.json();
        for (let i = 0; i < data.data.length; i++) {
            const surah = data.data[i];
            const surahTitle = document.createElement("li");
            surahTitle.classList.add("surah-title");
            tableOfContent.appendChild(surahTitle);
            surahTitle.textContent = surah.name;

            let sum = 0;
            surahTitle.addEventListener("click", () => {
                for (let j = 0; j < data.data[i].number-1; j++) {
                    sum += data.data[j].numberOfAyahs;
                }
            fetchAya(sum + 1);
            });

        }
    } 
    catch (error) {
        
    }
};
fetchSidebar();
// Initial fetch of the ayah data

let clicks = 0;
// Event listener for the "Fetch Ayah" button
btnElement.addEventListener('click' , () => {
    copy.innerHTML = '<i class="fa-solid fa-copy fa-xl"></i>';

    RandomNum = getRandomInt(1 ,6236 );
    fetchAya(RandomNum);
});
next.addEventListener('click' , () => {
    copy.innerHTML = '<i class="fa-solid fa-copy fa-xl"></i>';
    
    clicks++;
    RandomNum++ ;
    console.log(RandomNum);
    fetchAya(RandomNum);

});
previous.addEventListener('click' , () => {
    copy.innerHTML = '<i class="fa-solid fa-copy fa-xl"></i>';

    RandomNum--;
    fetchAya(RandomNum);
})

window.onload = function() {

    RandomNum = getRandomInt(1 ,6236 );
    fetchAya(RandomNum);
};
// controlling next aya behaviour
nextaya.addEventListener('click' , ()=>{
    copy.innerHTML = '<i class="fa-solid fa-copy fa-xl"></i>';

    if (nextaya.style.filter === 'blur(0px)') {
        nextaya.style.filter = 'blur(4px)';
    }
    else nextaya.style.filter = 'blur(0px)';

});

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
function selectFirstTwoWords(str) {
    const words = str.split(/\s+/);
    const firstTwoWords = words.slice(0, 2);
    const result = firstTwoWords.join(' ');
    return result;
}

copy.addEventListener('click' , ()=>{
    console.log(ayaElement.textContent);
    navigator.clipboard.writeText(surrahElement.textContent + " " + ayaNumElement.textContent + " : \n" + "{"+ayaElement.textContent +" }"+ "\n\n" +"التفسير الميسر: "+ tafseerElement.textContent );
    copy.innerHTML = '<i class="fa-solid fa-check fa-xl"></i>';
    });
translate.addEventListener('click' , ()=>{
    // ayaElement.textContent = enAyah;
    if (ayaElement.textContent === ayah) {
        ayaElement.textContent = enAyah;
        surrahElement.textContent = enSurrah;
    }
    else {
        ayaElement.textContent = ayah;
        surrahElement.textContent = surrah;
    }
});
menu.addEventListener('click', () => {
    sidebar.style.width = "30%";
    menu.style.display = "none";
    if (window.innerWidth < 800) {
        sidebar.style.width = "100%";
    }
});
closeSidebar.addEventListener('click', () => {
    sidebar.style.width = "0";
    menu.style.display = "block";
});

document.addEventListener('DOMContentLoaded', function () {
    particlesJS('particles-js', {
        particles: {
            number: {
                value: 100,
                density: {
                    enable: true,
                    value_area: 800
                }
            },
            color: {
                value: '#ffffff'
            },
            shape: {
                type: 'circle',
                stroke: {
                    width: 0,
                    color: '##000000'
                },
                polygon: {
                    nb_sides: 5
                }
            },
            opacity: {
                value: 0.2,
                random: false,
                anim: {
                    enable: false,
                    speed: 1,
                    opacity_min: 0.1,
                    sync: false
                }
            },
            size: {
                value: 3,
                random: true,
                anim: {
                    enable: false,
                    speed: 40,
                    size_min: 0.1,
                    sync: false
                }
            },
            line_linked: {
                enable: true,
                distance: 150,
                color: '#ffffff',
                opacity: 0.4,
                width: 1
            },
            move: {
                enable: true,
                speed: 0.3, // Decrease the speed here
                direction: 'none',
                random: false,
                straight: false,
                out_mode: 'out',
                bounce: false,
                attract: {
                    enable: false,
                    rotateX: 600,
                    rotateY: 1200
                }
            }
        },
        interactivity: {
            detect_on: 'canvas',
            events: {
                onhover: {
                    enable: true,
                    mode: 'repulse'
                },
                onclick: {
                    enable: true,
                    mode: 'push'
                },
                resize: true
            },
            modes: {
                grab: {
                    distance: 400,
                    line_linked: {
                        opacity: 1
                    }
                },
                bubble: {
                    distance: 400,
                    size: 40,
                    duration: 2,
                    opacity: 8,
                    speed: 3,
                },
                repulse: {
                    distance: 200,
                    duration: 0.4
                },
                push: {
                    particles_nb: 4
                },
                remove: {
                    particles_nb: 2
                }
            }
        },
        retina_detect: true
    });
});

function changeMode(){
    if (theme.innerHTML === '<i class="fa-solid fa-brightness fa-2xl"></i>') {
        theme.innerHTML = '<i class="fa-solid fa-moon fa-2xl"></i> ';
    } else {
        theme.innerHTML = '<i class="fa-solid fa-brightness fa-2xl"></i>';
    }
  }
  
theme.addEventListener('click' , ()=>{
    const computedStyle = getComputedStyle(root);
    const currentTheme = computedStyle.getPropertyValue('--body-bg-color').trim();
    changeMode();
    if (currentTheme === '#D2B48C') {
        root.style.setProperty('--body-bg-color', '#121212'); /* Very dark background */
        root.style.setProperty('--body-text-color', '#E0E0E0'); /* Light text */
        root.style.setProperty('--primary-bg-color', 'linear-gradient(45deg, #1F1F1F, #282828, #0F0F0F)'); /* Dark gradient */
        root.style.setProperty('--secondary-bg-color', 'rgba(40, 40, 40, 0.9)'); /* Dark translucent background */
        root.style.setProperty('--button-bg-color', '#444444'); /* Dark button background */
        root.style.setProperty('--button-text-color', '#FFFFFF'); /* White text */
        root.style.setProperty('--button-hover-color', 'rgba(255, 255, 255, 0.1)'); /* Light hover color */
        root.style.setProperty('--button-hover-shadow', '0 0.5rem 1rem rgba(0, 0, 0, 0.6)'); /* Dark shadow */
        root.style.setProperty('--scrollbar-thumb-color', '#555555'); /* Darker scrollbar */
        root.style.setProperty('--highlight-bg-color', 'rgba(60, 60, 60, 0.9)'); /* Highlight background */
        root.style.setProperty('--highlight-shadow', 'inset 0px 0 20px rgba(0, 0, 0, 0.5)'); /* Highlight shadow */
        root.style.setProperty('--aya-text-color', '#E0E0E0'); /* Light text for aya */
    }
    if (currentTheme === '#121212') {
        root.style.setProperty('--body-bg-color', '#D2B48C'); // Tan
        root.style.setProperty('--body-text-color', '#502A0A'); // Dark Wood
        root.style.setProperty('--primary-bg-color', 'linear-gradient(45deg, #A0522D, #BC8F8F, #8B4513)'); // SaddleBrown, RosyBrown, SaddleBrown
        root.style.setProperty('--secondary-bg-color', 'rgba(255, 255, 255, 0.8)');
        root.style.setProperty('--button-bg-color', '#8B4513'); // SaddleBrown
        root.style.setProperty('--button-text-color', '#fff');
        root.style.setProperty('--button-hover-color', 'rgba(255, 255, 255, 0.2)');
        root.style.setProperty('--button-hover-shadow', '0 0.5rem 1rem rgba(0, 0, 0, 0.3)');
        root.style.setProperty('--scrollbar-thumb-color', '#5555552e');
        root.style.setProperty('--highlight-bg-color', 'rgba(245, 245, 245, 0.819)');
        root.style.setProperty('--highlight-shadow', 'inset 0px 0 20px rgba(0, 0, 0, 0.1)');
        root.style.setProperty('--aya-text-color', '#333');
    }
})