/* ---SELECT HEADER--- */
const elInput = document.querySelector(".bottomMenu input");
const elInput2 = document.querySelector(".contentSecondaryInput input");
const elDeleteSearch = document.querySelector(".deleteSearch");
const elDeleteSearch2 = document.querySelector(".deleteSearch2");
const elCroixSearch = document.querySelector(".croixSearch");
const elCroixSearch2 = document.querySelector(".croixSearch2");
const elTopMenu = document.querySelector(".topMenu");
const elSousMenu = document.querySelector(".sousMenu");
const elNavLinks = document.querySelector(".links");
const elMenu = document.querySelector(".menu");
const elHeader = document.querySelector(".header");
const elLinks = document.querySelectorAll(".links > div > span");
const elOpacityDiv = document.querySelector(".opacityDiv");
/* --- SELECT THUMBNAILS --- */
const elCards = document.querySelectorAll(".mediaCard");

/* LISTENER HEADER */
elInput.addEventListener("click", clickSearch);
elInput2.addEventListener("click", clickSearch);
elInput.addEventListener("keyup", backSpaceSearch);
elInput2.addEventListener("keyup", backSpaceSearch);
elDeleteSearch.addEventListener("click", clearSearch);
elDeleteSearch2.addEventListener("click", clearSearch);
elCroixSearch.addEventListener("click", closeSearch);
elCroixSearch2.addEventListener("click", closeSearch);
window.addEventListener("scroll", scrollFunction);


function clickSearch() {
  this.classList.add("activeSearch");
  this.style.backgroundColor = '#ff5400';
  this.style.backgroundImage = "none";
  this.setAttribute("placeholder", "RPG, hack 'n' Slash, multijoueur...");
  this.nextElementSibling.nextElementSibling.style.display = "block";
  if (window.matchMedia("(max-width: 650px)").matches) {
    elLogo = document.querySelector('.divLogo').parentNode;
    elIconRight = document.querySelector('.headerRight');
    elLogo.style.display = 'none';
    elIconRight.style.display = 'none';
    this.parentNode.style.marginLeft = "0";
    this.parentNode.style.marginRight = "20px";
  };
}

function closeSearch() {
  let input = this.previousElementSibling.previousElementSibling;
  input.removeAttribute("placeholder", "RPG, hack 'n' Slash, multijoueur...");
  input.removeAttribute("style", "background-color: rgb(255, 84, 0)");
  input.classList.remove("activeSearch");
  input.style.backgroundImage = "none";
  this.style.display = "none";
  this.previousElementSibling.style.display = "none";
  input.addEventListener("transitionend", closeSearchTransitionEnd);
  function closeSearchTransitionEnd(e) {
    if (e.propertyName === "width") {
      input.removeAttribute("style", "background-color: none;")
      input.style.backgroundImage = "url(./image/logos/menu/search.svg)";
      input.removeEventListener("transitionend", closeSearchTransitionEnd);
    }
  }
  if (window.matchMedia("(max-width: 650px)").matches) {
    elLogo = document.querySelector('.divLogo').parentNode;
    elIconRight = document.querySelector('.headerRight');
    elLogo.style.display = 'block';
    elIconRight.style.display = 'flex';
    input.parentNode.style.marginLeft = "50px"
    input.parentNode.style.marginRight = "50px";
  };
}

function backSpaceSearch() {
  this.nextElementSibling.style.display = this.value != "" ? "block" : "none";
}

function clearSearch() {
  this.previousElementSibling.value = "";
  this.style.display = "none";
}

function scrollFunction(e) {
  if (window.scrollY > 0) {
    console.log("window.scrollY > 0")
    if (window.matchMedia("(max-width: 950px)").matches) {
      elMenu.style.display = "none";
      elOpacityDiv.style.display = "none";
    } else {
      //la class menuDown pourrait ne pas exister : syntaxe "replace" impossible.
      elMenu.classList.remove("menuDown");
      elMenu.classList.add("menuUp");
      elHeader.classList.add("headerScrolled");
      elInput.classList.add("searchScrolled");
      elNavLinks.classList.remove("beforeLinks");
    }

  } else {
    if (window.matchMedia("(max-width: 950px)").matches) {
      elMenu.style.display = "block";
    } else {
      elMenu.classList.replace("menuUp", "menuDown");
      elHeader.classList.remove("headerScrolled");
      elInput.classList.remove("searchScrolled");
      setTimeout(() => {
        elNavLinks.classList.add("beforeLinks");
      }, "100");
    }

  }
}

/*   - SOUS MENU - */
elLinks.forEach(function (link) {
  link.addEventListener("click", displayMenu);
  function displayMenu() {
    elOpacityDiv.style.display = "block";
    let menuAffiche = this.nextElementSibling;
    menuAffiche.style.display = "block";
    let parent = this.parentNode;

    parent.addEventListener("mouseleave", function (event) {
      if (event) {
        menuAffiche.style.display = "none";
        elOpacityDiv.style.display = "none";
      }
    });
  }
});

/* - LISTENER THUMBNAILS */
elCards.forEach(function (elCard) {
  let image = elCard.firstElementChild;
  let video = image.nextElementSibling;
  let iconPromo = video.nextElementSibling;
  // let video = elCard.lastElementChild;
  let timeoutVideo;
  elCard.addEventListener("mouseenter", mouseenter);

  function mouseenter() {
    iconPromo.classList.add("fadeOut");
    if (window.matchMedia("(min-width: 801px)").matches) {
      image.classList.remove("unScale");
      image.classList.add("scale_fadeOut");

      timeoutVideo = setTimeout(displayedVideo, 300);
    } else {
      video.style.transform = "scale(1)";
      image.classList.add('fadeOut');
      timeoutVideo = setTimeout(displayedVideo, 300);
    }
  }

  elCard.addEventListener("mouseleave", mouseleave);

  function mouseleave() {
    stopDisplayVideo();
    video.pause();
    video.classList.remove("fadeIn");
    iconPromo.classList.replace("fadeOut", "fadeIn");
    if (window.matchMedia("(min-width: 801px)").matches) {
      image.style.opacity = "1";
      image.style.tranform = "scale(1.07)";

      image.classList.replace("scale_fadeOut", "unScale");

    } else {
      image.style.opacity = "1";
      image.classList.remove('fadeOut');
    }

    image.addEventListener("animationend", animationendImage);
    function animationendImage(e) {
      if (e.animationName === "unScale") {
        image.removeAttribute("style");
        image.removeAttribute("class");
        video.removeAttribute("class");
        iconPromo.classList.remove("fadeIn");
      }
    }

  }

  function displayedVideo() {
    video.classList.add("fadeIn");
    video.play();
  }
  function stopDisplayVideo() {
    clearTimeout(timeoutVideo);
  }
});

/*   GSAP    */
const elBanner = document.querySelector(".banner");
gsap.to(elBanner, {
  scrollTrigger: {
    trigger: "headerContainer",
    scrub: true,
  },
  y: 200,
});





