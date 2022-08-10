import Game from "./script.js";

((doc, win) => {
  var playing = play.value;

  if (playing === "true") {
    Game();
  }

  jogar.addEventListener("click", () => {
    initial.style.display = "none";
    blocker.style.display = "initial";
    play.value = "true";
    Game();
  });

  creditos.addEventListener("click", () => {
    const menu = doc.getElementById("menu");

    menu.style.display = "none";
  });

  voltarMenu.addEventListener("click", () => {
    const menu = doc.getElementById("menu");

    menu.style.display = "flex";
  });

  sair.addEventListener("click", () => {
    win.history.back();
  });
})(document, window);
