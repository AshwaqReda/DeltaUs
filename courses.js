const searchInput = document.getElementById("searchInput");
const categorySelect = document.getElementById("categorySelect");
const rows = document.querySelectorAll(".courses-row");

function filterCourses() {
  const searchValue = searchInput.value.toLowerCase();
  const selectedTrack = categorySelect.value; // "all" | "programming" | "language"

  rows.forEach(row => {
    const rowTrack = row.dataset.track;
    const showRow = selectedTrack === "all" || selectedTrack === rowTrack;
    row.style.display = showRow ? "block" : "none";

    // Fade non-matching cards instead of removing them,
    // so the scrolling loop's width math stays intact.
    row.querySelectorAll(".course-card").forEach(course => {
      const title = course.querySelector("h3").textContent.toLowerCase();
      const matches = title.includes(searchValue);
      course.style.opacity = matches ? "1" : "0.15";
      course.style.pointerEvents = matches ? "auto" : "none";
    });
  });
}

searchInput.addEventListener("input", filterCourses);
categorySelect.addEventListener("change", filterCourses);

/* ==================== Course Details Modal ==================== */
const modalOverlay = document.getElementById("modalOverlay");
const modalClose = document.getElementById("modalClose");
const modalTitle = document.getElementById("modalTitle");
const modalDesc = document.getElementById("modalDesc");
const modalInstructor = document.getElementById("modalInstructor");
const modalDuration = document.getElementById("modalDuration");
const modalLevel = document.getElementById("modalLevel");

function openModal(course) {
  const title = course.querySelector("h3").textContent;
  modalTitle.textContent = title;
  modalDesc.textContent = course.dataset.desc || "";
  modalInstructor.textContent = course.dataset.instructor || "—";
  modalDuration.textContent = course.dataset.duration || "—";
  modalLevel.textContent = course.dataset.level || "—";

  modalOverlay.classList.add("active");
}

function closeModal() {
  modalOverlay.classList.remove("active");
}

// Event delegation: works for every card, including the duplicated
// set used for the seamless scrolling loop.
document.addEventListener("click", e => {
  const btn = e.target.closest(".course-card button");
  if (!btn) return;
  const card = btn.closest(".course-card");
  if (card) openModal(card);
});

modalClose.addEventListener("click", closeModal);
modalOverlay.addEventListener("click", e => {
  if (e.target === modalOverlay) closeModal();
});
document.addEventListener("keydown", e => {
  if (e.key === "Escape") closeModal();
});