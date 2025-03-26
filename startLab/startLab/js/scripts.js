const openButton = document.querySelector("#openButton");
const dialogBox = document.querySelector("#dialogBox");
const closeButton = document.querySelector("#closeButton");
const dialogBoxText = document.querySelector("#dialogBox div");

openButton1.addEventListener("click", () => {
    dialogBox.showModal();
    dialogBoxText.innerHTML = `One Apple contains 95 calories`;
});

openButton2.addEventListener("click", () => {
    dialogBox.showModal();
    dialogBoxText.innerHTML = `Oranges are my favorite`;
});

openButton3.addEventListener("click", () => {
    dialogBox.showModal();
    dialogBoxText.innerHTML = `Bananas are natures fast food.`;
});

closeButton.addEventListener("click", () => {
    dialogBox.close();
});