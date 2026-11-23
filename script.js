const menuButton = document.querySelector(".menu-toggle");
const navigation = document.querySelector(".main-nav");

if (menuButton && navigation) {
  menuButton.addEventListener("click", () => {
    const isOpen = navigation.classList.toggle("open");
    menuButton.setAttribute("aria-expanded", String(isOpen));
    menuButton.setAttribute("aria-label", isOpen ? "Close navigation" : "Open navigation");
  });

  navigation.querySelectorAll("a").forEach((link) => {
    link.addEventListener("click", () => {
      navigation.classList.remove("open");
      menuButton.setAttribute("aria-expanded", "false");
      menuButton.setAttribute("aria-label", "Open navigation");
    });
  });
}

const year = document.querySelector("#year");
if (year) year.textContent = new Date().getFullYear();

const bookingForm = document.querySelector("#booking-form");
if (bookingForm) {
  bookingForm.addEventListener("submit", (event) => {
    event.preventDefault();

    const name = document.querySelector("#client-name").value.trim();
    const session = document.querySelector("#session-type").value;
    const details = document.querySelector("#session-message").value.trim();

    if (!name || !session) {
      alert("Please enter your name and choose a photography service.");
      return;
    }

    const message = [
      "Hello Lovey The Photographer!",
      "",
      "I'd like to enquire about a photography session.",
      "Name: " + name,
      "Photography: " + session,
      "Details: " + (details || "I'd like to discuss the details.")
    ].join("\n");

    const whatsappUrl = "https://wa.me/27677504303?text=" + encodeURIComponent(message);
    window.open(whatsappUrl, "_blank", "noopener,noreferrer");
  });
}