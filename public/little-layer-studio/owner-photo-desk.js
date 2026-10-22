const form = document.querySelector("#photo-prep-form");
const output = document.querySelector("#owner-output");
const status = document.querySelector("#owner-status");
const objectUrls = [];

function cleanUpUrls() {
  while (objectUrls.length) URL.revokeObjectURL(objectUrls.pop());
}

function escapeHtml(value) {
  return value.replace(/[&<>"']/g, character => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" })[character]);
}

async function loadImage(file) {
  const source = URL.createObjectURL(file);
  try {
    const image = new Image();
    image.src = source;
    await image.decode();
    return image;
  } finally {
    URL.revokeObjectURL(source);
  }
}

async function resize(image, maxWidth) {
  const scale = Math.min(1, maxWidth / image.naturalWidth);
  const width = Math.max(1, Math.round(image.naturalWidth * scale));
  const height = Math.max(1, Math.round(image.naturalHeight * scale));
  const canvas = document.createElement("canvas");
  canvas.width = width;
  canvas.height = height;
  canvas.getContext("2d", { alpha: false }).drawImage(image, 0, 0, width, height);
  const blob = await new Promise(resolve => canvas.toBlob(resolve, "image/webp", .88));
  if (!blob) throw new Error("This browser could not create a WebP copy.");
  return { blob, width, height };
}

function setDownload(link, blob, filename) {
  const url = URL.createObjectURL(blob);
  objectUrls.push(url);
  link.href = url;
  link.download = filename;
}

form.addEventListener("submit", async event => {
  event.preventDefault();
  cleanUpUrls();
  output.hidden = true;
  status.textContent = "Preparing two web-friendly copies…";
  try {
    const file = document.querySelector("#owner-photo").files[0];
    if (!file) throw new Error("Choose a photo first.");
    const slug = document.querySelector("#photo-slug").value.trim();
    if (!/^[a-z0-9]+(?:-[a-z0-9]+)*$/.test(slug)) throw new Error("Use lowercase words separated by hyphens for the filename.");
    const title = document.querySelector("#photo-title").value.trim();
    const category = document.querySelector("#photo-category").value.trim();
    const description = document.querySelector("#photo-description").value.trim();
    const alt = document.querySelector("#photo-alt").value.trim();
    const image = await loadImage(file);
    const [small, large] = await Promise.all([resize(image, 640), resize(image, 1280)]);
    setDownload(document.querySelector("#download-small"), small.blob, `${slug}-640.webp`);
    setDownload(document.querySelector("#download-large"), large.blob, `${slug}-1280.webp`);
    const snippet = `        <figure class="print-card">
          <a class="print-photo" href="assets/prints/${slug}-1280.webp" data-photo-title="${escapeHtml(title)}" aria-label="Enlarge photo: ${escapeHtml(title)}">
            <img src="assets/prints/${slug}-640.webp" srcset="assets/prints/${slug}-640.webp ${small.width}w, assets/prints/${slug}-1280.webp ${large.width}w" sizes="(max-width:359px) calc(100vw - 36px), (max-width:1050px) 45vw, 270px" width="${small.width}" height="${small.height}" loading="lazy" decoding="async" alt="${escapeHtml(alt)}">
            <span class="photo-zoom" aria-hidden="true">View photo ↗</span>
          </a><figcaption><span class="photo-category">${escapeHtml(category)}</span><h3>${escapeHtml(title)}</h3><p>${escapeHtml(description)}</p></figcaption>
        </figure>
`;
    setDownload(document.querySelector("#download-snippet"), new Blob([snippet], { type: "text/plain;charset=utf-8" }), `${slug}-gallery-card.txt`);
    const preview = document.querySelector("#owner-preview");
    preview.src = document.querySelector("#download-large").href;
    preview.alt = alt;
    output.hidden = false;
    output.scrollIntoView({ behavior: matchMedia("(prefers-reduced-motion: reduce)").matches ? "auto" : "smooth", block: "start" });
    status.textContent = "Ready. Download all three files, then follow the GitHub steps.";
  } catch (error) {
    status.textContent = error instanceof Error ? error.message : "The photo could not be prepared.";
  }
});

window.addEventListener("pagehide", cleanUpUrls);
