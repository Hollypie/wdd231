
function getQueryParam(param) {
    const params = new URLSearchParams(window.location.search);
    return params.get(param) || "Not provided";
}

document.getElementById("firstName").textContent = getQueryParam("firstName");
document.getElementById("lastName").textContent = getQueryParam("lastName");
document.getElementById("email").textContent = getQueryParam("email");
document.getElementById("phone").textContent = getQueryParam("phone");
document.getElementById("business").textContent = getQueryParam("organization");
document.getElementById("timestamp").textContent = getQueryParam("timestamp");