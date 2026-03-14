const title = document.getElementById("title");
console.log(title);

const mybtn = document.getElementById("btn");
mybtn.addEventListener("click", function () {
    title.textContent = "Title Updated";
});

title.addEventListener("mouseover", function () {
    title.classList.add("bg-blue");
});