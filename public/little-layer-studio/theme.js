(() => {
  const key = "little-layer-studio-theme";
  let preference;
  try {
    const saved = localStorage.getItem(key);
    if (saved === "light" || saved === "dark") preference = saved;
  } catch (error) {
    console.warn("Little Layer Studio could not read the saved theme preference.", error);
  }

  function applyTheme() {
    const theme = preference || "dark";
    document.documentElement.dataset.theme = theme;
    const meta = document.querySelector('meta[name="theme-color"]');
    if (meta) meta.content = theme === "dark" ? "#171321" : "#fbf7ef";
    document.querySelectorAll("[data-theme-toggle]").forEach(button => {
      button.textContent = theme === "dark" ? "☀ Light" : "☾ Dark";
      button.setAttribute("aria-label", `Switch to ${theme === "dark" ? "light" : "dark"} mode`);
      button.hidden = false;
    });
  }
  applyTheme();
  applyTheme();
  document.addEventListener("DOMContentLoaded", () => {
    applyTheme();
    document.querySelectorAll("[data-theme-toggle]").forEach(button => button.addEventListener("click", () => {
      preference = document.documentElement.dataset.theme === "dark" ? "light" : "dark";
      try {
        localStorage.setItem(key, preference);
      } catch (error) {
        console.warn("Little Layer Studio could not save the theme preference. This choice will apply only to the current page.", error);
      }
      applyTheme();
    }));
  });
})();
