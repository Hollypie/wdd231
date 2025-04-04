// this code generates and returns the current year.
function getCurrentYear() {
    const currentYear = new Date().getFullYear();
    return currentYear;
}

// this code calls the getCurrentYear() function and prints the year as part of a document. 
function displayYear() {
    const year = getCurrentYear();
    document.getElementById("yearDisplay").textContent = year;
}

function lastModified() {
    const dateTime = document.lastModified;
    document.getElementById("lastModified").textContent = "last modification: " + dateTime;
}

window.onload = function() {
    // this code tells the page to run displayYear() when the page load to the element that has the first incidence of the id of "displayYear".
    displayYear();
    // this code tells the page to run lastModified() when the page loads to the element that has the first incidence of the id of "lastModified".
    lastModified();
}
