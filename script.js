let currentIndex = 0;

function scrollCarousel(direction) {
  const carousel = document.getElementById("carousel");
  if (!carousel) return;

  const cards = carousel.querySelectorAll(".card");
  if (cards.length === 0) return;

  const cardWidth = cards[0].offsetWidth + 20;
  const totalCards = cards.length;

  currentIndex += direction;
  currentIndex = Math.max(0, Math.min(currentIndex, totalCards - 1));

  carousel.parentElement.scrollTo({
    left: currentIndex * cardWidth,
    behavior: "smooth",
  });
}

document.addEventListener("DOMContentLoaded", () => {
  const visitorKey = "visitCount";
  let count = parseInt(localStorage.getItem(visitorKey)) || 0;
  count++;
  localStorage.setItem(visitorKey, count);
  const visitorDisplay = document.getElementById("visitorCount");
  if (visitorDisplay) visitorDisplay.innerText = `Visitors: ${count}`;

  const contactForm = document.getElementById("contactForm");
  if (contactForm) {
    contactForm.addEventListener("submit", function (e) {
      e.preventDefault();

      const name = this.querySelector('input[name="name"]');
      const email = this.querySelector('input[name="email"]');
      const message = this.querySelector('textarea[name="message"]');

      if (!name.value || !email.value || !message.value) {
        alert("Please fill in all fields.");
        return;
      }

      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (!emailRegex.test(email.value)) {
        alert("Please enter a valid email address.");
        return;
      }

      alert("Thank you! Your message has been sent.");
      this.reset();
    });
  }

  const themeKey = "siteTheme";
  const themeSwitch = document.getElementById("themeSwitch");

  function applyTheme(theme) {
    document.body.classList.toggle("dark-mode", theme === "dark");
    if (themeSwitch) themeSwitch.checked = theme === "dark";
  }

  const savedTheme = localStorage.getItem(themeKey) || "light";
  applyTheme(savedTheme);

  if (themeSwitch) {
    themeSwitch.addEventListener("change", () => {
      const newTheme = themeSwitch.checked ? "dark" : "light";
      localStorage.setItem(themeKey, newTheme);
      applyTheme(newTheme);
    });
  }
});

function sendMessage() {
  const userInput = document.getElementById("userInput");
  const chatDisplay = document.getElementById("chatDisplay");

  const message = userInput.value.trim();
  if (!message) return;

  const userMessage = document.createElement("div");
  userMessage.className = "chat-message user";
  userMessage.textContent = "🧑: " + message;
  chatDisplay.appendChild(userMessage);

  const botReply = document.createElement("div");
  botReply.className = "chat-message bot";
  botReply.textContent = "🤖: " + getBotReply(message);
  chatDisplay.appendChild(botReply);

  userInput.value = "";
  chatDisplay.scrollTop = chatDisplay.scrollHeight;
}

function sendSample(text) {
  const input = document.getElementById("userInput");
  input.value = text;
  sendMessage();
}

function getBotReply(message) {
  const msg = message.toLowerCase();

  if (msg.includes("founded"))
    return "GulitNet was founded by Bontu Duguma and her team.";
  if (msg.includes("problem"))
    return "GulitNet solves grocery access and affordability in Ethiopia.";
  if (msg.includes("services"))
    return "We offer an app, delivery service, and vendor tools.";
  if (msg.includes("support"))
    return "You can support us by spreading the word or partnering.";
  if (msg.includes("goal"))
    return "Our goal is to transform grocery delivery across Ethiopia.";

  return "Sorry, I don't understand that yet, but I'm learning!";
}
