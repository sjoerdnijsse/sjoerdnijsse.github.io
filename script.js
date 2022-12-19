const timer = document.querySelector(".timer")
const level = document.querySelector(".level")
const Smallblind = document.querySelector(".smallblind")
const Bigblind = document.querySelector(".bigblind")
const nextsmallblind = document.querySelector(".nextsmallblind")
const nextbigblind = document.querySelector(".nextbigblind")
const form = document.querySelector(".settingspage>form")
const settings = document.querySelector(".settingspage")
const timeinput = document.querySelector(".time-input")
const audio = new Audio('smb_1-up.wav');

let formlevel = 1;

document.querySelector(".fa-xmark").addEventListener("click", closesettings)

document.querySelector(".addelement").addEventListener("click", () => {
    var addblind = `

    `
    if (formlevel > 21) {
        addblind = `
        <div class="lvl ${formlevel}">
        <span class="newlevel">level</span>
        ${formlevel}
        <label for="Smallblind">Small blind</label>
        <input type="number" name="Smallblind" data-level="${formlevel} class="Smallblindinput">
        <label for="bigblind">Big blind</label>
        <input type="number" name="Bigblind" data-level="${formlevel} class="bigblindinput">
        </div>
        `
        console.log(addblind)
    } else {
        addblind = `
    <div class="lvl ${formlevel}">
    <span class="newlevel">level</span>
    ${formlevel}
    <label for="Smallblind">Small blind</label>
    <input type="number" name="Smallblind" class="Smallblindinput" data-level="${formlevel}" placeholder="${levels[formlevel - 1][0]}">
    <label for="bigblind">Big blind</label>
    <input type="number" name="Bigblind" class="bigblindinput" data-level="${formlevel}" placeholder="${levels[formlevel - 1][1]}">
    </div>
    `
    }
    form.innerHTML += addblind;
    formlevel = formlevel + 1;
})

var opensettings = false;

document.querySelector(".settings>button").addEventListener("click", () => {
    if (opensettings) {
        closesettings()
    } else {
        opensettings = true;
        settings.style.transform = "translateX(0)"
    }

})


document.querySelector(".start").addEventListener("click", () => {
    playing = true;
})
document.querySelector(".stop").addEventListener("click", () => {
    playing = false;
})
document.querySelector(".resetall").addEventListener("click", () => {
    time = 900;
    let minutes = Math.trunc(time / 60);
    let seconds = time % 60
    timer.innerHTML = minutes + ":" + seconds + "0";
    currentlevel = 1;
    levelfunction()
})
document.querySelector(".reset").addEventListener("click", () => {
    time = 900;
    let minutes = Math.trunc(time / 60);
    let seconds = time % 60
    timer.innerHTML = minutes + ":" + seconds + "0";
    levelfunction()
})

let playing = false;

var levels = [
    ["5", "10"],
    ["10", "20"],
    ["15", "30"],
    ["25", "50"],
    ["50", "100"],
    ["75", "150"],
    ["100", "200"],
    ["125", "250"],
    ["150", "300"],
    ["200", "400"],
    ["250", "500"],
    ["300", "600"],
    ["350", "700"],
    ["400", "800"],
    ["450", "900"],
    ["500", "1000"],
    ["600", "1200"],
    ["700", "1400"],
    ["800", "1600"],
    ["900", "1800"],
    ["1000", "2000"]
]


let time = 900;
let currentlevel = 1;
var resettime = 0;

document.addEventListener("click", (e) => {
    if (opensettings === true) {
        if (settings.contains(e.target) || document.querySelector(".settingsbutton").contains(e.target)) { }
        else {
            closesettings()
        }
    }
})
var timeinminutes = 0;

function closesettings() {
    if (timeinput.value !== "") {
        timeinseconds = parseFloat(timeinput.value) * 60;
        time = timeinseconds;
        resettime = timeinseconds;
        let minutes = Math.trunc(time / 60);
        let seconds = time % 60
        timer.innerHTML = minutes + ":" + seconds + "0";
    }
    settings.style.transform = "translateX(-1000%)"
    opensettings = false;
    const smallblindsinput = document.querySelectorAll(".Smallblindinput")
    const bigblindsinput = document.querySelectorAll(".bigblindinput")
    smallblindsinput.forEach(inputfield => {
        if (inputfield.value === "") {
            inputfield.value = levels[inputfield.dataset.level - 1][0];
        }
        levels[inputfield.dataset.level - 1][0] = inputfield.value;
    });
    bigblindsinput.forEach(inputfield => {
        if (inputfield.value === "") {
            inputfield.value = levels[inputfield.dataset.level - 1][1];
        }
        levels[inputfield.dataset.level - 1][1] = inputfield.value
    });
    levelfunction()
}
function levelfunction() {
    audio.play();
    level.innerHTML = currentlevel;
    Smallblind.innerHTML = levels[currentlevel - 1][0]
    Bigblind.innerHTML = levels[currentlevel - 1][1]
    nextsmallblind.innerHTML = levels[currentlevel][0]
    nextbigblind.innerHTML = levels[currentlevel][1]
}

setInterval(() => {
    if (playing) {
        time--;
        let minutes = Math.trunc(time / 60);
        let seconds = time % 60
        if (seconds < 10) {
            seconds = "0" + seconds
        }
        timer.innerHTML = minutes + ":" + seconds;
        if (time === 0) {
            if (resettime !== 0) {
                time = resettime
            } else {
                time = 900;
            }
            currentlevel++;
            levelfunction()
        }
    }
}, 1);

