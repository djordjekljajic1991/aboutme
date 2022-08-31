let inputValue;
const blasts = document.querySelectorAll(".blast");

const blastsHome = [];
const blastsAbout = [];
const blastsContact = [];
const blastsMySkills = [];

///////smoooth scrolling
////////////////////
const links = document.querySelectorAll(".lists_link");

links.forEach((el) => {
  el.addEventListener("click", function (e) {
    e.preventDefault();
    const id = e.target.getAttribute("href");
    document.querySelector(id).scrollIntoView({ behavior: "smooth" });
  });
});

//
/////
blasts.forEach((blast) => {
  if (blast.closest(".section-home")) {
    return blastsHome.push(blast);
  }
  if (blast.closest(".section-contact")) {
    return blastsContact.push(blast);
  }
  if (blast.closest(".section-my-skills")) return blastsMySkills.push(blast);
  else return blastsAbout.push(blast);
});

const addAnimationClassList = function (blast) {
  blast.classList.add("animation");
  blast.addEventListener("animationend", function () {
    blast.classList.remove("animation");
  });
};

const animationFunc = function (ob) {
  ob.forEach((blast, i) => {
    const timeaut = setTimeout(function () {
      addAnimationClassList(blast);
    }, i * 130);
  });
};

blasts.forEach((blast) => {
  blast.addEventListener("mouseover", function () {
    addAnimationClassList(blast);
  });
});

const observer = new IntersectionObserver((entries) => {
  entries.forEach((entry) => {
    if (entry.isIntersecting) {
      if (entry.target.classList.contains("section-home")) {
        entry.target.classList.add("animation-observer");
        animationFunc(blastsHome);
        observer.unobserve(entry.target);
      }
      if (entry.target.classList.contains("blast-child-about")) {
        entry.target.classList.add("animation-blast-child-about");
        animationFunc(blastsAbout);
        observer.unobserve(entry.target);
      }

      if (entry.target.classList.contains("section-my-skills")) {
        animationFunc(blastsMySkills);
        entry.target.classList.add("animation-observer-2-rows");
        observer.unobserve(entry.target);
      }
      if (entry.target.classList.contains("blast-child-contact")) {
        animationFunc(blastsContact);
        entry.target.classList.add("animation-blast-child-contact");
        observer.unobserve(entry.target);
      }
    }
  });
});

observer.observe(document.querySelector(".section-home"));
observer.observe(document.querySelector(".blast-child-about"));
observer.observe(document.querySelector(".section-my-skills"));
observer.observe(document.querySelector(".blast-child-contact"));

/////////////////////////////////
///////border botom animation
const animationHelper = document.querySelectorAll(".animation_helper");
const inputField = document.querySelectorAll(".input__field");

const isEmpty = (str) => !str.trim().length;

const clearAnimation = function () {
  animationHelper.forEach((el) => {
    el.classList.remove("border__bottom-animation");
  });
};
const clearAllAnimation = function () {
  animationHelper.forEach((el) => {
    el.classList.remove("border__bottom-animation");
    el.classList.remove("border__bottom-animation-red");
  });
};
let data;
inputField.forEach((el) => {
  inputValue;
  el.addEventListener("focus", function (e) {
    e.preventDefault();
    clearAnimation();

    data = e.path[1].children[1];
    inputValue = e.path[0];
    data.classList.remove("border__bottom-animation-red");
    data.classList.add("border__bottom-animation");
  });

  el.addEventListener("blur", function (e) {
    e.preventDefault();
    inputValue = e.path[0];
    checkInputField(inputValue);
  });
});

///////////////////////////////////
//////send message

const checkInputField = function (inputField) {
  const mailFormat = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;

  if (
    inputValue.getAttribute("type") === "email" &&
    !inputValue.value.match(mailFormat)
  ) {
    {
      inputValue.nextElementSibling.classList.add(
        "border__bottom-animation-red"
      );
      return false;
    }
  }
  if (isEmpty(inputValue.value) === true) {
    inputValue.nextElementSibling.classList.add("border__bottom-animation-red");
    return false;
  }
};

const checkBeforeSend = function () {
  const dataErr = [];
  inputField.forEach((el) => {
    inputValue = el;
    checkInputField(inputValue);
    if (checkInputField() === false) {
      dataErr.push(false);
    }
  });
  if (dataErr.length === 0) sendEmail();
};

const send = document.querySelector(".btn__send-msg");

send.addEventListener("click", function (e) {
  e.preventDefault();
  checkBeforeSend();
});

const sendEmail = function () {
  Email.send({
    SecureToken: "1953283e-c992-44d1-a1a4-19d8c53b1bda",
    To: "djolek91@gmail.com",
    From: "djolek91@gmail.com",
    Subject: document.getElementsByName("subject")[0].value,
    Body:
      "Name" +
      document.getElementsByName("name")[0].value +
      "<br> Email: " +
      document.getElementsByName("email")[0].value +
      "<br> Message: " +
      document.getElementsByName("msg")[0].value,
  }).then(function () {
    alert("Message Sent Succesfully");
    document.querySelector(".contact-form").reset();
    clearAllAnimation();
  });
};

const map = L.map("map").setView([44.8571126, 17.5214822], 12);

L.tileLayer("https://tile.openstreetmap.org/{z}/{x}/{y}.png", {
  attribution:
    '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
}).addTo(map);

// var myIcon = new L.icon({
//   iconUrl: "/logo.png",
//   iconSize: [38, 95],
//   iconAnchor: [22, 94],
//   popupAnchor: [-3, -76],
//    shadowUrl: "/src/img/logo.png",
//   shadowSize: [68, 95],
//   shadowAnchor: [22, 94],
// });
L.marker([44.8571126, 17.5214822]).addTo(map);

//L.marker([44.8571126, 17.5214822]).addTo(map).bindPopup("dsajdj").openPopup;
//L.marker([44.8571126, 17.5214822], { icon: myIcon }).addTo(map);
