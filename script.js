const menuToggle = document.getElementById("menuToggle");
const navLinks = document.getElementById("navLinks");
menuToggle.addEventListener("click", () => {
  const open = navLinks.classList.toggle("open");
  menuToggle.setAttribute("aria-expanded", String(open));
  menuToggle.setAttribute("aria-label", open ? "Close navigation" : "Open navigation");
});
navLinks.querySelectorAll("a").forEach(link => link.addEventListener("click", () => {
  navLinks.classList.remove("open");
  menuToggle.setAttribute("aria-expanded", "false");
  menuToggle.setAttribute("aria-label", "Open navigation");
}));
document.getElementById("year").textContent = new Date().getFullYear();

const form = document.getElementById("enquiryForm");
form.addEventListener("submit", event => {
  event.preventDefault();
  const name = document.getElementById("customerName").value.trim();
  const occasion = document.getElementById("eventType").value;
  const date = document.getElementById("eventDate").value;
  const guests = document.getElementById("guestCount").value;
  const details = document.getElementById("message").value.trim();
  const lines = [
    "Hello Julie, I would like to enquire about Joo Lee's Catering Services.",
    "",
    "Name: " + name,
    "Occasion: " + occasion,
    date ? "Event date: " + date : "",
    guests ? "Estimated guests: " + guests : "",
    details ? "Details: " + details : "",
    "",
    "Please let me know the menu options and pricing. Thank you."
  ].filter(Boolean);
  const message = lines.join("\n");
  const method = event.submitter ? event.submitter.value : "whatsapp";
  const status = document.getElementById("formStatus");

  if (method === "email") {
    const subject = "Catering Enquiry - " + name;
    const url = "mailto:jooleescateringpng@gmail.com?subject=" + encodeURIComponent(subject) + "&body=" + encodeURIComponent(message);
    status.textContent = "Opening your email app with the enquiry prepared. Review it and press Send.";
    window.location.href = url;
  } else {
    const url = "https://wa.me/67571407752?text=" + encodeURIComponent(message);
    status.textContent = "Opening WhatsApp with your enquiry prepared. Review it and press Send.";
    window.open(url, "_blank", "noopener,noreferrer");
  }
});
