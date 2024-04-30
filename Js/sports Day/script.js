function OpeningCeremony(callback) {
    console.log("Let the games begin");
    setTimeout(() => {
        const sportsObj = { red: 0, blue: 0, green: 0, yellow: 0 };
        Race100M(sportsObj, callback);
    }, 1000);
}

function Race100M(scores, callback) {
    console.log("Race 100M begins");
    const colors = ["red", "blue", "green", "yellow"];
    let times = {};
    colors.forEach(color => {
        times[color] = Math.floor(Math.random() * 6) + 10;
    });
    const sortedColors = Object.keys(times).sort((a, b) => times[a] - times[b]);

    scores[sortedColors[0]] += 50;
    scores[sortedColors[1]] += 25;

    console.log("Race results:", times);
    console.log("Updated scores:", scores);
    console.log(`${sortedColors[0]} won the race!`);

    setTimeout(() => {
        callback(scores, LongJump);
    }, 3000);
}

function LongJump(scores, callback) {
    console.log("Long Jump begins");
    const colors = ["red", "blue", "green", "yellow"];
    const randomColor = colors[Math.floor(Math.random() * colors.length)];

    scores[randomColor] += 150;

    console.log(`${randomColor} won the long jump!`);
    console.log("Updated scores:", scores);

    setTimeout(() => {
        callback(scores, HighJump);
    }, 2000);
}

function HighJump(scores, callback) {
    console.log("High Jump begins");
    let userInput = prompt("What colour secured the highest jump?");
    if (userInput) {
        userInput = userInput.toLowerCase();
        if (scores.hasOwnProperty(userInput)) {
            console.log(`${userInput} won the high jump!`);
            scores[userInput] += 100;
        } else {
            console.log("Event was cancelled");
        }
    } else {
        console.log("Event was cancelled");
    }

    console.log("Updated scores:", scores);

    setTimeout(() => {
        callback(scores, AwardCeremony);
    }, 1000);
}

function AwardCeremony(scores) {
    console.log("Award Ceremony begins");
    const sortedScores = Object.entries(scores).sort((a, b) => b[1] - a[1]);
    console.log(`${sortedScores[0][0]} came first with ${sortedScores[0][1]} points.`);
    console.log(`${sortedScores[1][0]} came second with ${sortedScores[1][1]} points.`);
    console.log(`${sortedScores[2][0]} came third with ${sortedScores[2][1]} points.`);
}

function startSportsDay() {
    OpeningCeremony((scores, nextEvent) => {
        nextEvent(scores, Race100M);
    });
}