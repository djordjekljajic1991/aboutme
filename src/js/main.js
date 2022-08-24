const { afterMain } = require("@popperjs/core");

const blasts = document.querySelectorAll(".blast");
console.log(typeof blasts);
const blastsHome = [];
const blastsAbout = [];
const blastsContact = [];

blasts.forEach((blast) => {
  if (blast.closest(".section-home")) {
    return blastsHome.push(blast);
  }
  if (blast.closest(".section-contact")) {
    return blastsContact.push(blast);
  } else return blastsAbout.push(blast);
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
      }

      if (entry.target.classList.contains("blast-child-about")) {
        animationFunc(blastsAbout);
        entry.target.classList.add("blast-childs");
        observer.unobserve(entry.target);
      }
      if (entry.target.classList.contains("blast-child-home")) {
        animationFunc(blastsHome);
        observer.unobserve(entry.target);
      }
      if (entry.target.classList.contains("blast-child-contact")) {
        animationFunc(blastsContact);
        entry.target.classList.add("blast-childs");
        observer.unobserve(entry.target);
      }
    }
  });
});

observer.observe(document.querySelector(".section-home"));
observer.observe(document.querySelector(".blast-child-home"));

observer.observe(document.querySelector(".blast-child-about"));
observer.observe(document.querySelector(".blast-child-contact"));

///////border botom animation

const inputField = document.querySelectorAll(".animation_helper");

inputField.forEach((el) => {
  el.closest(".animated").addEventListener("click", function (e) {
    inputField.forEach((el) => {
      el.classList.remove("border__bottom-animation");
    });
    el.classList.add("border__bottom-animation");
  });
});

//////send message
const form = document.querySelector(".btn__send-msg");

form.addEventListener("click", function (e) {
  e.preventDefault();

  sendEmail();
  document.querySelector(".contact-form").reset();
  // return false;
});

const sendEmail = function () {
  Email.send({
    //  SecureToken: "1953283e-c992-44d1-a1a4-19d8c53b1bda",
    Host: "smtp.elasticemail.com",
    Username: "djolek91@gmail.com",
    Password: "8C742EA9F11698EE340BEA9A38F2FDB4AC36",
    To: "djolek91@gmail.com",
    From: document.getElementsByName("email")[0].value,
    Subject: document.getElementsByName("subject")[0].value,
    Body:
      "Name" +
      document.getElementsByName("name")[0].value +
      "<br> Email: " +
      document.getElementsByName("email")[0].value +
      "<br> Message: " +
      document.getElementsByName("msg")[0].value,
  }).then((message) => alert("Message Sent Succesfully"));
  console.log(Email.send);
};

const btnSendMsg = document.querySelector(".btn__send-msg");
btnSendMsg.addEventListener("click", function () {
  const name = document.getElementsByName("name")[0].value;
});
