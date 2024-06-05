const terms = [
    {
        name: "Phishing",
        img: "phishing.gif"
    },
    {
        name: "Malware",
        img: "malware.gif"
    },
    {
        name: "Firewall",
        img: "firewall.gif"
    },
    {
        name: "Encryption",
        img: "encryption.gif"
    }
];

const definitions = [
    "A method of protecting data by transforming it into an unreadable format.",
    "A software or hardware system designed to prevent unauthorized access to or from a private network.",
    "Malicious software that can damage or disable computers and computer systems.",
    "A technique used to trick individuals into providing sensitive information by pretending to be a trustworthy entity."
];

const correctMatches = {
    "Phishing": "A technique used to trick individuals into providing sensitive information by pretending to be a trustworthy entity.",
    "Malware": "Malicious software that can damage or disable computers and computer systems.",
    "Firewall": "A software or hardware system designed to prevent unauthorized access to or from a private network.",
    "Encryption": "A method of protecting data by transforming it into an unreadable format."
};

let selectedTerm = null;
let selectedDefinition = null;
let points = 0;

function init() {
    const termsList = document.getElementById('termsList');
    const definitionsList = document.getElementById('definitionsList');

    terms.forEach(term => {
        const li = document.createElement('li');
        const img = document.createElement('img');
        img.src = term.img;
        img.alt = term.name;
        li.appendChild(img);
        li.setAttribute('data-term', term.name);
        li.addEventListener('click', () => selectTerm(li));
        termsList.appendChild(li);
    });

    definitions.forEach(definition => {
        const li = document.createElement('li');
        li.textContent = definition;
        li.addEventListener('click', () => selectDefinition(li));
        definitionsList.appendChild(li);
    });

    document.getElementById('checkButton').addEventListener('click', checkAnswers);
}

function selectTerm(li) {
    if (selectedTerm) {
        selectedTerm.classList.remove('selected');
    }
    selectedTerm = li;
    li.classList.add('selected');
}

function selectDefinition(li) {
    if (selectedDefinition) {
        selectedDefinition.classList.remove('selected');
    }
    selectedDefinition = li;
    li.classList.add('selected');
}

function checkAnswers() {
    if (!selectedTerm || !selectedDefinition) {
        alert('Please select an attack and a definition.');
        return;
    }

    const term = selectedTerm.getAttribute('data-term');
    const isCorrect = correctMatches[term] === selectedDefinition.textContent;
    document.getElementById('result').textContent = isCorrect ? 'Correct match!' : 'Incorrect match. Try again.';

    if (isCorrect) {
        points++;
        document.getElementById('points').textContent = points;
        selectedTerm.classList.add('correct');
        selectedTerm.style.pointerEvents = 'none';
        selectedDefinition.classList.add('correct');
        selectedDefinition.style.pointerEvents = 'none';
    } else {
        selectedTerm.classList.add('incorrect');
        selectedDefinition.classList.add('incorrect');
    }

    setTimeout(() => {
        selectedTerm.classList.remove('selected', 'correct', 'incorrect');
        selectedDefinition.classList.remove('selected', 'correct', 'incorrect');
        selectedTerm = null;
        selectedDefinition = null;
    }, 1000);
}

init();
