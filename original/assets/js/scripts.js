document.querySelectorAll("#faq .faq-question").forEach((question) => {
  question.addEventListener("click", () => {
    const item = question.parentElement;
    const answer = item.querySelector(".faq-answer");
    const icon = question.querySelector("svg path");

    // Cierra todos los demás
    document.querySelectorAll("#faq .faq-answer").forEach((a) => {
      if (a !== answer) a.classList.add("hidden");
    });

    // Restaura todos los íconos
    document.querySelectorAll("#faq .faq-question svg").forEach((svg) => {
      svg.innerHTML = `<path d="M0.5 6.5H12.5M6.5 0.5V12.5" stroke="#FFB300" stroke-linecap="round" stroke-linejoin="round" />`;
    });

    // Toggle actual
    const isHidden = answer.classList.contains("hidden");
    if (isHidden) {
      answer.classList.remove("hidden");
      question.querySelector(
        "svg"
      ).innerHTML = `<path d="M0.5 6.5H12.5" stroke="#FFB300" stroke-linecap="round" stroke-linejoin="round" />`; // signo menos
    } else {
      answer.classList.add("hidden");
      question.querySelector(
        "svg"
      ).innerHTML = `<path d="M0.5 6.5H12.5M6.5 0.5V12.5" stroke="#FFB300" stroke-linecap="round" stroke-linejoin="round" />`; // signo más
    }
  });
});

// Form submission
const form = document.querySelector("#lead-form form");
const feedbackSuccess = document.querySelector("#lead-form-sent-feedback");
const feedbackError = document.querySelector("#lead-form-error-feedback");
const mainContent = document.querySelector("#lead-form-main-content");
const submitButton = form.querySelector('button[type="submit"]');
const inputs = form.querySelectorAll("input");

form.addEventListener("submit", async (e) => {
  e.preventDefault();

  // Reset UI states
  feedbackError.classList.add("hidden");

  // Disable form during submission
  submitButton.disabled = true;
  submitButton.classList.add("opacity-70", "cursor-not-allowed");
  submitButton.textContent = "Enviando...";
  inputs.forEach((input) => (input.readOnly = true));

  const formData = new FormData(form);

  try {
    const res = await fetch("send-lead-form.php", {
      method: "POST",
      body: formData,
    });

    let data;
    try {
      data = await res.json();
    } catch (jsonError) {
      // If response is not valid JSON, show generic error
      throw new Error("Invalid response from server");
    }

    if (!res.ok) {
      // Handle HTTP errors (4xx, 5xx)
      throw new Error(data.message || `Server error: ${res.status}`);
    }

    if (data.status === "success") {
      // Show success state
      mainContent.classList.add("hidden");
      feedbackSuccess.classList.toggle("hidden");
      feedbackSuccess.classList.toggle("flex");
      dataLayer.push({ event: "lead_form_success" });
    } else {
      // Show error message from server
      feedbackError.textContent = data.message || "Se produjo un error. Por favor, inténtalo nuevamente.";
      feedbackError.classList.remove("hidden");
    }
  } catch (error) {
    console.error("Form submission error:", error);
    feedbackError.textContent = error.message || "Error de conexión. Por favor, inténtalo nuevamente más tarde.";
    feedbackError.classList.remove("hidden");
  } finally {
    // Re-enable form (only if not successful)
    if (feedbackSuccess.classList.contains("hidden")) {
      submitButton.disabled = false;
      submitButton.classList.remove("opacity-70", "cursor-not-allowed");
      submitButton.textContent = "Quiero que me contacten";
      inputs.forEach((input) => (input.readOnly = false));
    }
  }
});

// GTM dataLayer
document.querySelectorAll("[data-cta-button-source]").forEach((el) => {
  el.addEventListener("click", () => {
    const source = el.dataset.ctaButtonSource || "";

    dataLayer.push({ cta_button_source: source });
  });
});

// WhatsApp button
const whatsAppButton = document.querySelector("#whatsApp-button");
whatsAppButton.addEventListener("click", () => {
  dataLayer.push({ cta_button_source: "whatsapp_button" });
  dataLayer.push({ event: "lead_whatsapp_button_click" });
});
