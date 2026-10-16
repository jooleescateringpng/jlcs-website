// JLCS contact configuration. Update BUSINESS_EMAIL when the official business email is confirmed.
// WhatsApp uses international format: country code + number, with no plus sign or spaces.
const JLCS_CONTACT = {
  BUSINESS_EMAIL: "jooleescateringpng@gmail.com" // Official JLCS business email
  WHATSAPP_NUMBER: "67571407752" // Existing website number: PNG country code + 7140 7752
};

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
const formStatus = document.getElementById("formStatus");
const emailLink = document.getElementById("emailEnquiryLink");
const whatsappLink = document.getElementById("whatsappEnquiryLink");
const emailButton = document.getElementById("prepareEmailEnquiry");

function buildEnquiryMessage() {
  const name = document.getElementById("customerName").value.trim();
  const occasion = document.getElementById("eventType").value;
  const date = document.getElementById("eventDate").value;
  const guests = document.getElementById("guestCount").value;
  const details = document.getElementById("message").value.trim();
  return [
    "Hello Julie, I would like to enquire about Joo Lee's Catering Services.",
    "",
    "Name: " + name,
    "Occasion: " + occasion,
    date ? "Event date: " + date : "",
    guests ? "Estimated guests: " + guests : "",
    details ? "Details: " + details : "",
    "",
    "Please let me know the menu options and pricing. Thank you."
  ].filter(Boolean).join("\n");
}

function makeWhatsAppUrl(message) {
  return "https://wa.me/" + JLCS_CONTACT.WHATSAPP_NUMBER + "?text=" + encodeURIComponent(message);
}

function makeEmailUrl(message) {
  const subject = "Catering Enquiry - Joo Lee's Catering Services";
  return "mailto:" + encodeURIComponent(JLCS_CONTACT.BUSINESS_EMAIL) +
    "?subject=" + encodeURIComponent(subject) +
    "&body=" + encodeURIComponent(message);
}

function showEmailNotConfigured() {
  formStatus.textContent = "Email enquiries are not active yet. Add the official JLCS business email in script.js; you can still enquire using WhatsApp.";
}

if (JLCS_CONTACT.BUSINESS_EMAIL.trim()) {
  emailLink.href = "mailto:" + JLCS_CONTACT.BUSINESS_EMAIL.trim();
  emailLink.removeAttribute("aria-describedby");
  document.getElementById("emailSetupNote").textContent = "Prefer email? Use the email enquiry button to contact JLCS.";
} else {
  emailLink.addEventListener("click", event => {
    event.preventDefault();
    showEmailNotConfigured();
  });
}

form.addEventListener("submit", event => {
  event.preventDefault();
  if (!form.reportValidity()) return;
  const url = makeWhatsAppUrl(buildEnquiryMessage());
  formStatus.textContent = "Opening WhatsApp with your enquiry. Review the message before sending.";
  window.open(url, "_blank", "noopener,noreferrer");
});

emailButton.addEventListener("click", () => {
  if (!form.reportValidity()) return;
  if (!JLCS_CONTACT.BUSINESS_EMAIL.trim()) {
    showEmailNotConfigured();
    return;
  }
  formStatus.textContent = "Opening your email app with the enquiry prepared. Review it before sending.";
  window.location.href = makeEmailUrl(buildEnquiryMessage());
});

// Keep the quick WhatsApp button aligned with the configured number.
whatsappLink.href = makeWhatsAppUrl("Hello Julie, I'd like to enquire about Joo Lee's Catering Services.");
