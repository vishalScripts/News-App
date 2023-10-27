const apiKey = "091852c27ea9427c948c1b5e1e072960";
const url = "https://newsapi.org/v2/everything?q=";

window.addEventListener("load", () => fetchNews("india"));

async function fetchNews(querry) {
    const response = await fetch(`${url}${querry}&apiKey=${apiKey}`);
    const data = await response.json();
    bindData(data.articles);
}

function bindData(articles) {
    const cardsContainer = document.getElementById("cards-container");
    const newsCardTemplate = document.getElementById("template-news-card");

    cardsContainer.innerHTML = "";
    articles.forEach((article) => {
        if (!article.urlToImage) return;
        const cardClone = newsCardTemplate.content.cloneNode(true);
        fillDataInCard(cardClone, article);
        cardsContainer.appendChild(cardClone);
    });
}

function fillDataInCard(cardClone, article) {
    const newsImg = cardClone.querySelector("#news-img");
    const newsTittle = cardClone.querySelector("#news-tittle");
    const newsSource = cardClone.querySelector("#news-source");
    const newsDescription = cardClone.querySelector("#news-desc");

    newsImg.src = article.urlToImage;
    newsTittle.innerHTML = article.title;
    newsDescription.innerHTML = article.description;

    const date = new Date(article.publishedAt).toLocaleString("en-US");
    //console.log(date);

    newsSource.innerHTML = `${article.source.name} ▪ ${date}`;

    cardClone.firstElementChild.addEventListener("click", () => {
        window.open(article.url, "_blank");
    });
}
const companyLogo = document.getElementById("company-logo");
companyLogo.addEventListener("click", () => {
    fetchNews("india");
});

const stateButton = document.getElementById("state-btn");
const statesContainer = document.getElementById("states-container");
function toggleStateBtn() {
    statesContainer.classList.toggle("block");
}
stateButton.addEventListener(
    "click",
    (e) => {
        const dropDownIcon = document.getElementById("drop-down-icon");
        toggleStateBtn();
        dropDownIcon.classList.toggle("drop-down-icon");
    },
    true
);

const indianStates = [
    "Andhra Pradesh",
    "Arunachal Pradesh",
    "Assam",
    "Bihar",
    "Chhattisgarh",
    "Goa",
    "Gujarat",
    "Haryana",
    "Himachal Pradesh",
    "Jharkhand",
    "Karnataka",
    "Kerala",
    "Madhya Pradesh",
    "Maharashtra",
    "Manipur",
    "Meghalaya",
    "Mizoram",
    "Nagaland",
    "Odisha",
    "Punjab",
    "Rajasthan",
    "Sikkim",
    "Tamil Nadu",
    "Telangana",
    "Tripura",
    "Uttar Pradesh",
    "Uttarakhand",
    "West Bengal",
];
function bindState() {
    indianStates.forEach((state) => {
        statesContainer.innerHTML += `<li class="hover-link nav-items state" id="${state}">${state}</li>`;
    });
}

let currentSelectedNav = null;
bindState();
const navItems = document.querySelectorAll(".nav-items");
navItems.forEach((item) => {
    item.addEventListener("click", (e) => {
        //* removing previous nav from currentSelectedNav
        if (currentSelectedNav !== null) {
            currentSelectedNav.classList.remove("active");
        }
        currentSelectedNav = "";

        //*adding clicked nav into currentSelectedNav
        currentSelectedNav = item;

        let querry = item.innerHTML;
        fetchNews(querry);
        currentSelectedNav.classList.add("active");
    });
});

const searchButton = document.getElementById("search-button");
const newsInput = document.getElementById("news-input");
function toggleInput() {
    if (currentSelectedNav !== null) {
        currentSelectedNav.classList.remove("active");
    }

    let querry = newsInput.value;
    if (querry) {
        fetchNews(querry);
        newsInput.removeAttribute("placeholder");
        newsInput.setAttribute("placeholder", `e.g. ${querry}`);
        newsInput.value = "";
    } else {
        newsInput.style.border = "2px solid red";
        newsInput.setAttribute("placeholder", `Enter the value (e.g. science)`);
        newsInput.classList.add("shake-element");

        setTimeout(() => {
            newsInput.classList.remove("shake-element");
        }, 500);
    }
}
searchButton.addEventListener("click", (e) => {
    e.preventDefault();
    toggleInput();
});

newsInput.addEventListener("keypress", (e) => {
    newsInput.style.border = "2px solid #bbd0e2";
    if (e.key === "Enter") {
        toggleInput();
    }
});

const hamburgerButton = document.getElementById("hamburger");
hamburgerButton.addEventListener("click", () => {
    hamburger(windowWidth);
});

let getWindowWidth = function () {
    const width = window.innerWidth;
    return width;
};

// Call the function to get the initial window width
getWindowWidth();

// Listen for the resize event to update the width
let windowWidth = getWindowWidth();
window.addEventListener("resize", () => {
    windowWidth = getWindowWidth();
    console.log(windowWidth);
});

window.addEventListener(
    "click",
    () => {
        //default the style of input
        newsInput.style.border = "2px solid #bbd0e2";
    },
    true
);
function hamburger(width) {
    const hamburgerLines = document.querySelectorAll(".line");
    hamburgerLines.forEach((elem, index) => {
        elem.classList.toggle(`line-${index + 1}`);
        elem.classList.toggle(`clicked-line-${index + 1}`);
    });
    if (width <= 580) {
        const navLink = document.querySelector(".nav-links");
        const computedStyle = getComputedStyle(navLink);
        let positionRight = computedStyle.getPropertyValue("right");

        if (positionRight == "-170px") {
            navLink.style.right = "0px";
        } else {
            navLink.style.right = "-170px";
        }
    }
}
