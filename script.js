((doc, win) => {
  function typeWritter(elementSelector) {
    const element = doc.querySelector(elementSelector);
    const text = element.innerHTML.split("");
    element.innerHTML = "";
    text.forEach((letter, i) => {
      setTimeout(() => (element.innerHTML += letter), 100 * i);
    });
  }

  typeWritter("h1");
  doc.querySelector(".box:nth-child(1)").style.animation = "bounceInRight 2s";

  doc.querySelector(".box:nth-child(1)").addEventListener("animationend", () => {
    doc.querySelector(".box:nth-child(1)").style.opacity = "1";
    doc.querySelector(".box:nth-child(2)").style.animation = "bounceInRight 2s";
  });

  doc.querySelector(".box:nth-child(2)").addEventListener("animationend", () => {
    doc.querySelector(".box:nth-child(2)").style.opacity = "1";
    doc.querySelector(".box:nth-child(3)").style.animation = "bounceInRight 2s";
  });

  doc.querySelector(".box:nth-child(3)").addEventListener("animationend", () => {
    doc.querySelector(".box:nth-child(3)").style.opacity = "1";
    doc.querySelector(".down").style.opacity = "1";
  });

  document.querySelector(".down").addEventListener("click", () => {
    win.scrollTo(0, document.body.scrollHeight);
    doc.querySelector(".content").style.animation = "bounceInLeft 2s";
    doc.querySelector(".content").addEventListener("animationend", () => {
      doc.querySelector(".content").style.opacity = "1";
    });
  });

  document.querySelector(".up").addEventListener("click", () => {
    win.scrollTo(0, 0);
  });

  document.querySelector("#geometric").addEventListener("click", () => {
    win.location.href = "src/models/01 - geometric/geometric.html";
  });

  document.querySelector("#object-interation").addEventListener("click", () => {
    win.location.href = "src/models/02 - object interations/object interations.html";
  });

  document.querySelector("#dinamic").addEventListener("click", () => {
    win.location.href = "src/models/03 - dinamic/dinamic.html";
  });

  document.querySelector("#engine").addEventListener("click", () => {
    win.location.href = "src/models/engine/engine.html";
  });
})(document, window);
