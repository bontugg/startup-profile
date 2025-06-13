let currentIndex = 0;

function scrollCarousel(direction) {
  const carousel = document.getElementById("carousel");
  if (!carousel) return;

  const cards = carousel.querySelectorAll(".card");
  if (cards.length === 0) return;

  const cardWidth = cards[0].offsetWidth + 20; // card width + margin
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
  let count = parseInt(localStorage.getItem(visitorKey)) || 0; // FIXED: added ||
  count++;
  localStorage.setItem(visitorKey, count);

  const visitorDisplay = document.getElementById("visitorCount");
  if (visitorDisplay) visitorDisplay.innerText = count;

  const contactForm = document.getElementById("contactForm");
  if (contactForm) {
    contactForm.addEventListener("submit", function (e) {
      e.preventDefault();

      const name = this.querySelector('input[name="name"]');
      const email = this.querySelector('input[name="email"]');
      const message = this.querySelector('textarea[name="message"]');

      // FIXED: added && between conditions
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
  const themeToggleBtn = document.getElementById("themeToggle");

  function applyTheme(theme) {
    document.body.classList.toggle("dark-mode", theme === "dark");
    if (themeToggleBtn) {
      themeToggleBtn.textContent =
        theme === "dark" ? "Light Mode" : "Dark Mode";
      themeToggleBtn.setAttribute("aria-pressed", theme === "dark");
    }
  }

  // FIXED: added || operator
  const savedTheme = localStorage.getItem(themeKey) || "light";
  applyTheme(savedTheme);

  if (themeToggleBtn) {
    themeToggleBtn.addEventListener("click", () => {
      const newTheme = document.body.classList.contains("dark-mode")
        ? "light"
        : "dark";
      localStorage.setItem(themeKey, newTheme);
      applyTheme(newTheme);
    });
  }
});
