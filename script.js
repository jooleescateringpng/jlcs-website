
document.addEventListener("DOMContentLoaded", function () {
  // Mobile navigation
  const menuToggle = document.getElementById("menuToggle");
  const navLinks = document.getElementById("navLinks");

  if (menuToggle && navLinks) {
    menuToggle.addEventListener("click", function () {
      const isOpen = navLinks.classList.toggle("is-open");
      menuToggle.setAttribute("aria-expanded", String(isOpen));
    });
  }

  // JLCS WhatsApp enquiry form
  const form = document.getElementById("enquiryForm");

  if (!form) return;

  form.addEventListener("submit", function (event) {
    event.preventDefault();

    const name = document.getElementById("customerName")?.value.trim();
    const occasion = document.getElementById("eventType")?.value;
    const date = document.getElementById("eventDate")?.value;
    const guests = document.getElementById("guestCount")?.value;
    const details = document.getElementById("message")?.value.trim();

    if (!name || !occasion) {
      alert("Please enter your name and select an occasion.");
      return;
    }

    const formattedDate = date
      ? new Date(date + "T12:00:00").toLocaleDateString("en-GB")
      : "Not specified";

    const message = [
      "Hello Julie, I would like to enquire about Joo Lee's Catering Services.",
      "",
      "Name: " + name,
      "Occasion: " + occasion,
      "Event date: " + formattedDate,
      "Estimated guests: " + (guests || "Not specified"),
      "Order details: " + (details || "Please advise on menu options and pricing."),
      "",
      "Please let me know the available menu options and pricing. Thank you."
    ].join("\n");

    const whatsappURL =
      "https://wa.me/67571407752?text=" +
      encodeURIComponent(message);

    window.open(whatsappURL, "_blank", "noopener,noreferrer");
  });
});
