
// MOBILE NAVIGATION
const menuToggle = document.getElementById("menuToggle");
const nav = document.getElementById("nav");

menuToggle.addEventListener("click", () => {
  const isOpen = nav.classList.toggle("show");
  menuToggle.setAttribute("aria-expanded", isOpen);
  menuToggle.textContent = isOpen ? "×" : "☰";
});

document.querySelectorAll(".nav a").forEach(link => {
  link.addEventListener("click", () => {
    nav.classList.remove("show");
    menuToggle.setAttribute("aria-expanded", "false");
    menuToggle.textContent = "☰";
  });
});


// PROPERTY FILTERS AND SEARCH
const propertyCards = document.querySelectorAll(".property-card");
const filterButtons = document.querySelectorAll(".filter-btn");
const locationSearch = document.getElementById("locationSearch");
const typeSearch = document.getElementById("typeSearch");
const priceSearch = document.getElementById("priceSearch");
const searchBtn = document.getElementById("searchBtn");
const noResults = document.getElementById("noResults");
const propertyCount = document.getElementById("propertyCount");

let selectedType = "all";

function filterProperties() {
  const locationValue = locationSearch.value.trim().toLowerCase();
  const typeValue = typeSearch.value;
  const maxPrice = priceSearch.value;

  let visibleCount = 0;

  propertyCards.forEach(card => {
    const cardType = card.dataset.type;
    const cardLocation = card.dataset.location.toLowerCase();
    const cardPrice = Number(card.dataset.price);

    const matchesType =
      selectedType === "all" || cardType === selectedType;

    const matchesSearchType =
      typeValue === "all" || cardType === typeValue;

    const matchesLocation =
      cardLocation.includes(locationValue);

    const matchesPrice =
      maxPrice === "all" || cardPrice <= Number(maxPrice);

    const shouldShow =
      matchesType &&
      matchesSearchType &&
      matchesLocation &&
      matchesPrice;

    card.style.display = shouldShow ? "" : "none";

    if (shouldShow) {
      visibleCount++;
    }
  });

  noResults.style.display =
    visibleCount === 0 ? "block" : "none";

  propertyCount.textContent =
    visibleCount + (visibleCount === 1 ? " Property" : " Properties");
}

filterButtons.forEach(button => {
  button.addEventListener("click", () => {
    filterButtons.forEach(btn => btn.classList.remove("active"));

    button.classList.add("active");
    selectedType = button.dataset.filter;

    typeSearch.value = "all";

    filterProperties();
  });
});

searchBtn.addEventListener("click", () => {
  selectedType = "all";

  filterButtons.forEach(btn => {
    btn.classList.toggle("active", btn.dataset.filter === "all");
  });

  filterProperties();
});

locationSearch.addEventListener("input", filterProperties);
typeSearch.addEventListener("change", filterProperties);
priceSearch.addEventListener("change", filterProperties);


// PROPERTY DETAILS MODAL
const propertyModal = document.getElementById("propertyModal");
const modalClose = document.getElementById("modalClose");
const modalName = document.getElementById("modalName");
const modalLocation = document.getElementById("modalLocation");
const modalPrice = document.getElementById("modalPrice");
const modalDescription = document.getElementById("modalDescription");
const modalEnquire = document.getElementById("modalEnquire");

document.querySelectorAll(".details-btn").forEach(button => {
  button.addEventListener("click", () => {
    modalName.textContent = button.dataset.name;
    modalLocation.textContent = button.dataset.location;
    modalPrice.textContent = button.dataset.price;
    modalDescription.textContent = button.dataset.description;

    propertyModal.classList.add("open");
    propertyModal.setAttribute("aria-hidden", "false");
    document.body.style.overflow = "hidden";
  });
});

function closePropertyModal() {
  propertyModal.classList.remove("open");
  propertyModal.setAttribute("aria-hidden", "true");
  document.body.style.overflow = "";
}

modalClose.addEventListener("click", closePropertyModal);

propertyModal.addEventListener("click", event => {
  if (event.target === propertyModal) {
    closePropertyModal();
  }
});

document.addEventListener("keydown", event => {
  if (event.key === "Escape") {
    closePropertyModal();
  }
});

modalEnquire.addEventListener("click", closePropertyModal);


// CONTACT FORM DEMO
const contactForm = document.getElementById("contactForm");
const formMessage = document.getElementById("formMessage");

contactForm.addEventListener("submit", event => {
  event.preventDefault();

  const name = document.getElementById("contactName").value.trim();

  formMessage.textContent =
    `Thank you, ${name}! This is a demo form. No enquiry has been sent.`;

  contactForm.reset();
});


// INITIAL PROPERTY COUNT
filterProperties();
