// Get the current visit count from localStorage
let visitCount = localStorage.getItem("visitCount");
const now = new Date();
const nowTimestamp = now.getTime();

let lastVisit = localStorage.getItem("lastVisit");

let message = "";

if (!lastVisit) {
    message = "Welcome! Let us know if you have any questions."
} else {
    lastVisit = parseInt(lastVisit);
    const timeDifference = nowTimestamp - lastVisit;
    const oneDay = 24 * 60 * 60 * 1000;

    if (timeDifference < oneDay) {
        message = "Back so soon! Awesome!"
    } else {
        const daysAgo = Math.floor(timeDifference / oneDay);
        message = `You last visited ${daysAgo} days ago.`;
    }
}

document.getElementById("visitMessage").textContent = message;

localStorage.setItem("lastVisit", nowTimestamp);

