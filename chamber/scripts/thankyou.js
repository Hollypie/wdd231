
function getQueryParam(param) {
    const params = new URLSearchParams(window.location.search);
    return params.get(param) || "Not provided";
}

document.getElementById("first").textContent = getQueryParam("first");
document.getElementById("last").textContent = getQueryParam("last");
document.getElementById("email").textContent = getQueryParam("email");
document.getElementById("phone").textContent = getQueryParam("phone");
document.getElementById("business").textContent = getQueryParam("organization");
document.getElementById("submissionTime").textContent = getQueryParam("timestamp");

document.addEventListener("DOMContentLoaded", () => {
    document.getElementById("timestamp").value = new Date().toISOString();
});