let header = document.getElementById("header");
let trivia = document.getElementById("trivia");
let headerBtn = document.getElementById("headerBtn");
let options = document.querySelectorAll(".option");
let questions = document.getElementById("questions");
let answers = document.querySelectorAll("button");
let questionCounter = document.getElementById("questionCounter");
let level = document.getElementById("level");
let info = document.getElementById("info");
let scoreInfo = document.getElementById("scoreInfo");
let indices = new Set([]);
let index;
let count = 0;
let rightAnswer = 0;
let option;

let triviaDic = [
    {
        question: "¿Cuánto dura un partido de fútbol?",
        answers:  ["90 minutos", "100 minutos", "45 minutos", "120 minutos"],
        correctAnswer: "90 minutos"
    },
    {
        question: "¿Cada cuántos años se celebran los Juegos Olímpicos?",
        answers:  ["4", "5", "2", "8"],
        correctAnswer: "4"
    },
    {
        question: "¿Cuál es el último cinturón que puedes conseguir en artes marciales?",
        answers:  ["Rojo", "Blanco", "Azul", "Negro"],
        correctAnswer: "Negro"
    },
    {
        question: "¿Qué deporte practican los Harlem Globetrotters?",
        answers:  ["Baloncesto", "Fútbol", "Hockey", "Béisbol"],
        correctAnswer: "Baloncesto"
    },
    {
        question: "¿Qué deporte se juega anualmente en París en el torneo de Roland Garros?",
        answers: ["Tenis", "Ciclismo", "Fútbol", "Voleibol"],
        correctAnswer: "Tenis"
    },
    {
        question: "¿Dónde se celebró el primer mundial de fútbol?",
        answers: ["Uruguay, 13 de julio de 1930", "Brasil, 13 de julio de 1930", "Italia, 27 de mayo de 1934", "Inglaterra, 27 de mayo de 1934"],
        correctAnswer: "Uruguay, 13 de julio de 1930"
    },
    {
        question: "Además de la selección croata, ¿qué equipo defiende actualmente el futbolista Luka Modrić?",
        answers:  ["Real Madrid C. F.", "Atlético de Madrid", "Tottenham Hotspurs", "Dinamo Zagreb"],
        correctAnswer: "Real Madrid C. F."
    },

    {
        question: "¿Cuál se considera la carrera ciclista más importante?",
        answers:  ["Tour de France", "Giro d'Italia ", "the Vuelta a España", "Paris-Roubaix"],
        correctAnswer: "Tour de France"
    },
    {
        question: "¿En qué equipo jugó Michael Jordan durante la mayor parte de su carrera?",
        answers:  ["Chicago Bulls", "Washington Wizards", "Boston Celtics", "Los Angeles Lakers"],
        correctAnswer: "Chicago Bulls"
    },
    {
        question:"¿Quién es el piloto con más victorias en la historia de la Fórmula 1?",
        answers:  ["Lewis Hamilton", "Michael Schumacher", "Sebastian Vettel", "Max Verstappen"],
        correctAnswer: "Lewis Hamilton"
    },
    {
        question: "¿Qué equipo ganó el primer partido de la NBA en 1946?",
        answers:  ["New York Knicks", "Philadelphia Warriors", "Cleveland Rebels", "Toronto Huskies"],
        correctAnswer: "New York Knicks"
    },
   
    {
        question: "¿Quién fue la primera mujer en ganar una medalla olímpica?",
        answers:  ["Charlotte Cooper", "Larisa Latynina", "Flor Isava-Fonseca", "Hélène Prevost"],
        correctAnswer: "Charlotte Cooper"
    },
    {
        question: "¿Cuánto dura una maratón?",
        answers:  ["42,195 kilómetros (26,2 millas)", "41,195 kilómetros (25,6 millas)", "44,195 kilómetros (27,4 millas)", "43,195 kilómetros (26,8 millas)"],
        correctAnswer: "42,195 kilómetros (26,2 millas)"
    },
    
    {
        question: "¿A qué distancia está la línea de tres puntos en el baloncesto?",
        answers:  ["6,25 metros", "6,75 metros", "7 metros", "7,25 metros"],
        correctAnswer: "6.75 metros"
    },
    {
        question: "¿Con qué se recompensaba a los campeones olímpicos en la antigüedad?",
        answers:  ["Una corona hecha de hojas de olivo", "Una medalla", "Antorchas olímpicas", "Flores"],
        correctAnswer: "Una corona hecha de hojas de olivo"
    },
    
] 

function disableButtons() {
    answers.forEach(element => {
        element.disabled = "true";
    });
}

function enableButtons() {
    answers.forEach(element => {
        element.removeAttribute("disabled");
    });
}

//Header
headerBtn.addEventListener("click", () => {
    header.style.display = "none";
    trivia.style.display = "flex";
    run();

})

function createRandomIndex(lenght) {
    let num = Math.floor(Math.random() * lenght);
    while(indices.has(num)){
        num = Math.floor(Math.random() * lenght); 
    }
    indices.add(num); 
    index = num;
}
 
function resetValues() {
    indices = new Set([]);
    index;
    count = 0;
    rightAnswer = 0;
    info.innerHTML = "";
    scoreMessage.innerHTML = "";
    scoreInfo = "";
    
}

function countQuestions() {
    ++count;
    questionCounter.innerHTML = `Pregunta ${count}/15`
}

//trivia
function run() {
    if(indices.size == 15) {
        scoreInfo.innerHTML = rightAnswer <= 5 ? "Tal vez no estés loco(a) por deportes": rightAnswer >= 6 && rightAnswer < 13 ? "Puedes estar orgulloso(a) de tu conocimiento" : "Pareces ser un gran aficionado(a) a los deportes.";
        finish();
    } else {
        let l = count >= 5 && count < 10 ? 10 : count >= 10 ? 15 : 5;
        createRandomIndex(l);
        answers.forEach(elem => {
        if(elem.hasAttribute("style")) {
            elem.removeAttribute("style");
            info.innerHTML = "";
        }
    });
    level.innerHTML = count >= 5 && count < 10 ? "Pregunta nivel intermedio" : count >= 10 ? "Pregunta difícil" : "Pregunta fácil";
    addQuestion(index);
    addAnswers(index);
    countQuestions();

    }
}

function addQuestion(index) {
    questions.innerHTML = triviaDic[index].question;
}

function addAnswers(index) {
    let indicesAnswers = new  Set([]);
    let num = Math.floor(Math.random() * 4);
    let i = 0;
    while(indicesAnswers.size < 4){
        while(indicesAnswers.has(num)){
            num = Math.floor(Math.random() * 4); 
         }
         indicesAnswers.add(num);
    }
    let values = Array.from(indicesAnswers);
    console.log(values)
    answers.forEach(answer => {
        answer.innerHTML = triviaDic[index].answers[values[i]];
        i++;
    })

}

answers.forEach(elem => {
   elem.addEventListener("click", () => {
   let value = elem.innerHTML;
   play(elem, value);
     
   })
})

function play(elem, value) {
    disableButtons();
    check(elem, value);
}

function check(elem, value) {
let arrInfo = [
    "90 minutos divididos en dos partes de 45 minutos cada una.",
    "Los Juegos Olímpicos se organizan cada 4 años.",
    "En judo, kárate y taekwondo, la última cinta es el cinturón negro.",
    "Los Harlem Globetrotters son un equipo de baloncesto de Estados Unidos, conocido por mezclar deporte y entretenimiento en cada uno de sus partidos.",
    "Roland Garros es uno de los torneos de tenis más emblemáticos y prestigiosos del mundo y se celebra anualmente en París, Francia.",
    "La Copa Mundial de la FIFA Uruguay 1930 fue la primera edición de la Copa Mundial de la FIFA organizada por la FIFA. Tuvo lugar en Uruguay entre el 13 y el 30 de julio de 1930.",
    "El 27 de agosto de 2012, Tottenham y Real Madrid confirmaron mediante un comunicado oficial el traspaso del croata al equipo blanco donde continúa jugando en la actualidad.",
    "El Tour de Francia es la carrera ciclista más prestigiosa y difícil del mundo.",
    "A lo largo de su carrera, jugó 13 temporadas con los Chicago Bulls.",
    "Lewis Hamilton, tiene 103 victorias totales, seguido por Michael Schumacher con 91 victorias.",
    "El 1 de noviembre de 1946, los Toronto Huskies recibieron a los New York Knickerbockers, en lo que la NBA reconoce como el primer partido oficial de la liga.",
    "Charlotte Reinagle Cooper, tenista inglesa.",
    "La distancia estándar moderna para el maratón fue establecida por la Federación Internacional de Atletismo Amateur en 1921 directamente a partir de la longitud utilizada en los Juegos Olímpicos de Verano de 1908 en Londres.",
    "Aunque las distancias difieren entre todos los niveles del baloncesto, la línea de 3 puntos es universal.",
    "En la antigüedad, los ganadores de los Juegos Olímpicos recibían una corona olímpica hecha de ramas de olivo."
]

if(value == triviaDic[index].correctAnswer) {
    elem.style.background = "#59981A";
    elem.style.color = "#fff";
    rightAnswer++;
   
    } else {
        elem.style.background = "#F51720";
        elem.style.color = "#fff";
    }

info.innerHTML = arrInfo[index];

setTimeout(() => {
    enableButtons();
    run();
}, 3000)
}

function finish() {
    let secScore = document.getElementById("secScore");
    let result = document.getElementById("scoreMessage");
    setTimeout(() => {

        trivia.style.display = "none";
        secScore.style.display = "flex";
        scoreMessage.innerHTML += `Tu puntaje es ${rightAnswer} de 15`
    }, 2000)
}

secScore.addEventListener("click", () => {
    secScore.style.display = "none";
    header.style.display = "flex"
    resetValues();
});