const forms = document.querySelectorAll("[data-contact-form]");

forms.forEach((form) => {
  const status = form.querySelector("[data-form-status]");

  form.addEventListener("submit", (event) => {
    event.preventDefault();
    const email = form.querySelector('input[type="email"]');
    const message = form.querySelector("textarea");
    const validEmail = email && email.value.includes("@") && email.value.includes(".");
    const hasMessage = message && message.value.trim().length >= 8;

    if (!validEmail || !hasMessage) {
      if (status) {
        status.textContent = form.dataset.errorMessage || "Please add a valid email and message.";
      }
      return;
    }

    if (status) {
      status.textContent = form.dataset.successMessage || "Request prepared. Please send it by email.";
    }

    const subject = encodeURIComponent("I Believe Tools inquiry");
    const body = encodeURIComponent(
      Array.from(new FormData(form).entries())
        .map(([key, value]) => `${key}: ${value}`)
        .join("\n")
    );

    window.location.href = `mailto:jessica@ibelievetools.com?subject=${subject}&body=${body}`;
  });
});
