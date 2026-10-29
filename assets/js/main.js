/**
 * OpenTickets front-end interactions.
 * Bootstrap handles navigation/collapse. This file handles the sticky header,
 * Isotope event filtering, and search-results filtering/sorting.
 */
(function () {
  "use strict";

  const header = document.getElementById("siteHeader");
  const updateHeader = () => {
    if (header) header.classList.toggle("is-scrolled", window.scrollY > 24);
  };
  updateHeader();
  window.addEventListener("scroll", updateHeader, { passive: true });

  // Keep the existing Isotope-style filtering behaviour on the event grid.
  const grid = document.querySelector("#eventGrid");
  if (grid && window.Isotope) {
    const iso = new Isotope(grid, {
      itemSelector: ".event-item",
      layoutMode: "fitRows",
      transitionDuration: "0.35s"
    });

    document.querySelectorAll("[data-filter-group] .filter-btn").forEach((button) => {
      button.addEventListener("click", function () {
        document.querySelectorAll("[data-filter-group] .filter-btn").forEach((btn) => btn.classList.remove("active"));
        this.classList.add("active");
        iso.arrange({ filter: this.dataset.filter });
      });
    });
  }

  // Lightweight search and sort for the static search-results template.
  const searchForm = document.getElementById("searchForm");
  const searchInput = document.getElementById("searchInput");
  const sortSelect = document.getElementById("sortSelect");
  const resultsGrid = document.getElementById("resultsGrid");
  const resultCount = document.getElementById("resultCount");

  if (resultsGrid) {
    const items = Array.from(resultsGrid.querySelectorAll(".result-item"));

    const render = () => {
      const term = (searchInput?.value || "").trim().toLowerCase();
      const visible = items.filter(item => {
        const haystack = item.dataset.name.toLowerCase();
        const match = !term || haystack.includes(term);
        item.classList.toggle("d-none", !match);
        return match;
      });

      visible.sort((a, b) => {
        if (sortSelect?.value === "name") return a.dataset.name.localeCompare(b.dataset.name);
        return a.dataset.date.localeCompare(b.dataset.date);
      });

      visible.forEach(item => resultsGrid.appendChild(item));
      if (resultCount) resultCount.textContent = `${visible.length} event${visible.length === 1 ? "" : "s"}`;
    };

    searchForm?.addEventListener("submit", (e) => {
      e.preventDefault();
      render();
    });
    sortSelect?.addEventListener("change", render);
  }
})();