
document.addEventListener("DOMContentLoaded", () => {
  // Certificate modal elements
  const modal = document.getElementById("cert-modal");
  const modalTitle = document.getElementById("modal-title");
  const modalIssuer = document.getElementById("modal-issuer");
  const modalPdf = document.getElementById("modal-pdf");
  const closeModalBtn = document.getElementById("close-modal");

  // PDF action buttons
  const downloadBtn = document.getElementById("download-certificate");
  const openPdfBtn = document.getElementById("open-pdf");

  // Certificate cards
  const certificateCards = document.querySelectorAll(".cert-card");

  // Check that all required elements exist
  if (
    !modal ||
    !modalTitle ||
    !modalIssuer ||
    !modalPdf ||
    !closeModalBtn ||
    !downloadBtn ||
    !openPdfBtn
  ) {
    console.error("Certificate modal elements are missing from index.html.");
    return;
  }

  let previouslyFocusedElement = null;

  // Convert a root-level PDF filename into a usable URL.
  // encodeURIComponent handles spaces and special characters.
  function getPdfUrl(fileName) {
    return encodeURIComponent(fileName);
  }

  // Open certificate preview
  function openCertificate(card) {
    const title = card.getAttribute("data-title");
    const issuer = card.getAttribute("data-issuer");
    const pdfFile = card.getAttribute("data-pdf");

    if (!pdfFile) {
      console.error("PDF filename is missing for:", title);
      return;
    }

    const pdfUrl = getPdfUrl(pdfFile);

    // Update modal information
    modalTitle.textContent = title || "Certificate";
    modalIssuer.textContent = issuer || "";

    // Load PDF inside the preview frame
    modalPdf.src = `${pdfUrl}#toolbar=1&navpanes=0&view=FitH`;

    // Configure the open PDF button
    openPdfBtn.href = pdfUrl;
    openPdfBtn.target = "_blank";
    openPdfBtn.rel = "noopener noreferrer";

    // Configure the download button
    downloadBtn.href = pdfUrl;
    downloadBtn.setAttribute("download", pdfFile);

    // Remember focus before opening
    previouslyFocusedElement = document.activeElement;

    // Display modal
    modal.classList.remove("hidden");
    modal.classList.add("flex");

    // Prevent background scrolling
    document.body.style.overflow = "hidden";

    // Focus close button
    closeModalBtn.focus();
  }

  // Close certificate preview
  function closeCertificate() {
    if (modal.classList.contains("hidden")) {
      return;
    }

    modal.classList.add("hidden");
    modal.classList.remove("flex");

    // Stop the PDF preview
    modalPdf.src = "about:blank";

    // Restore background scrolling
    document.body.style.overflow = "";

    // Restore previous focus
    if (previouslyFocusedElement) {
      previouslyFocusedElement.focus();
      previouslyFocusedElement = null;
    }
  }

  // Attach click and keyboard events to all certificate cards
  certificateCards.forEach((card) => {
    card.addEventListener("click", () => {
      openCertificate(card);
    });

    // Support keyboard navigation
    card.addEventListener("keydown", (event) => {
      if (event.key === "Enter" || event.key === " ") {
        event.preventDefault();
        openCertificate(card);
      }
    });
  });

  // Close using CLOSE button
  closeModalBtn.addEventListener("click", closeCertificate);

  // Close when clicking outside the preview
  modal.addEventListener("click", (event) => {
    if (event.target === modal) {
      closeCertificate();
    }
  });

  // Close using Escape key
  document.addEventListener("keydown", (event) => {
    if (event.key === "Escape") {
      closeCertificate();
    }
  });

});
