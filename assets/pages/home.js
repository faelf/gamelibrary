import { config } from "../data/config.js";

export const homePage = {
  title: "Home",
  html: /* html */ `
  <section class="m-2">
      <h2 id="greeting"></h2>
      <p class="lead">Welcome to your Game Collection App!</p>
  </section>
  `,
  setup() {
    const greetingText = document.getElementById("greeting");
    const firstName = config.getFirstName();
    greeting.innerText = `Hello, ${firstName}!`;
  },
};
