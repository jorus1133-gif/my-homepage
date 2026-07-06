const body = document.body;
const searchForm = document.getElementById('search-form');
const searchInput = document.getElementById('search-input');
const klok = document.getElementById('klok');

const btnStyle1 = document.getElementById('btn-style-1');
const btnStyle2 = document.getElementById('btn-style-2');
const btnStyle3 = document.getElementById('btn-style-3');

const animatieGradient1 = 'radial-gradient(circle, #fa1d1d, #e7643c, #d59723, #f7ad24)';
const animatieGradient2 = 'linear-gradient(32deg, #1d293d, #1d353d, #1d3d2a, #333d1d)';

body.style.background = localStorage.getItem('bg-body') || '#0f172a'; 
btnStyle1.style.background = localStorage.getItem('bg-btn1') || animatieGradient1; 
btnStyle2.style.background = localStorage.getItem('bg-btn2') || animatieGradient2; 
btnStyle3.style.background = localStorage.getItem('bg-btn3') || 'url("images/mcbg.png") center / cover no-repeat';

// gives css class to animation owner
function updateAnimatieKlasse() {
    [body, btnStyle1, btnStyle2, btnStyle3].forEach(element => {
        if (element.style.background.includes('250, 29, 29') || element.style.background.includes('#fa1d1d')|| element.style.background.includes('29, 41, 61') || element.style.background.includes('#1f293d')) {
            element.classList.add('animatie');
        } else {
            element.classList.remove('animatie');
        }
    });
}

updateAnimatieKlasse();
function slaKleurenOp() {
    localStorage.setItem('bg-body', body.style.background);
    localStorage.setItem('bg-btn1', btnStyle1.style.background);
    localStorage.setItem('bg-btn2', btnStyle2.style.background);
    localStorage.setItem('bg-btn3', btnStyle3.style.background);
}

function wisselKleur(knop) {
    const huidigeBodyBg = body.style.background;
    body.style.background = knop.style.background;
    knop.style.background = huidigeBodyBg;

    slaKleurenOp();
    updateAnimatieKlasse();
}

btnStyle1.addEventListener('click', () => wisselKleur(btnStyle1));
btnStyle2.addEventListener('click', () => wisselKleur(btnStyle2));
btnStyle3.addEventListener('click', () => wisselKleur(btnStyle3));

// clock
function updateclock(){
    const now = new Date();
    const hours = String(now.getHours()).padStart(2, '0');
    const minutes = String(now.getMinutes()).padStart(2, '0');
    const seconds = String(now.getSeconds()).padStart(2, '0');
    klok.textContent = `${hours}:${minutes}:${seconds}`;
}

setInterval(updateclock, 1000);

searchForm.addEventListener('submit', (e) => {
    e.preventDefault();
    const query = searchInput.value;
    if (query === 'clear') {
        localStorage.clear();
        window.location.reload();
    } else if (query) {
        window.location.href = `https://www.google.com/search?q=${encodeURIComponent(query)}`;
    }
});

function laadWeer() {
    fetch('https://api.open-meteo.com/v1/forecast?latitude=52.688741507097625&longitude=6.184598376291858&current_weather=true')
        .then(res => res.json())
        .then(data => {
            const temp = data.current_weather.temperature;
            document.getElementById('weather').innerHTML = `<h3>Temperatuur</h3><p>${temp}°C</p>`;
        });
}

function laadfacts() {
    fetch('https://uselessfacts.jsph.pl/api/v2/facts/random')
        .then(res => res.json())
        .then(data => {
            document.getElementById('facts').innerHTML = `<p>${data.text}</p>`;
        });
}

function laadQuote() {
    fetch('https://dummyjson.com/quotes/random')
        .then(res => res.json())
        .then(data => {
            document.getElementById('quote-text').innerHTML =
            `<p>"${data.quote}"</p>
            <h3> </h3>
            <h3>Author</h3>
            <p>${data.author}</p>`;
        });
}

function laadjoke() {
    fetch('https://v2.jokeapi.dev/joke/Any?')
        .then(res => res.json())
        .then(data => {
            if (data.type === 'single') {
                document.getElementById('joke').innerHTML = `<p>"${data.joke}"</p>`;
            } else {
                document.getElementById('joke').innerHTML = `<p>"${data.setup}"</p><h3> </h3><p><em>${data.delivery}</em></p>`;
            }
        });
}

laadjoke();
laadWeer();
laadfacts();
laadQuote();

document.getElementById('facts').addEventListener('click', laadfacts);
document.getElementById('joke').addEventListener('click', laadjoke);
