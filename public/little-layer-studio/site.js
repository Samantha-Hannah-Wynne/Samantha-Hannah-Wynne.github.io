const products = [
  { id: "keyring", name: "Name Keyring", category: "personalised", price: 3, unit: "each", description: "One name, a little everyday personality. Hardware included. Two examples shown; sold individually." },
  { id: "bagtag", name: "Bag Charm", category: "personalised", price: 4, unit: "each", description: "One name or initials charm, in your colour combination. Two examples shown; sold individually." },
  { id: "bookmark", name: "One More Chapter", category: "personalised", price: 4, unit: "each", description: "One personalised bookmark for the just-one-more-page person. Two examples shown." },
  { id: "nameplate", name: "Own Your Desk", category: "personalised", price: 8, unit: "each", description: "One freestanding mini name sign. A little corner that’s properly yours." },
  { id: "coasters", name: "Yours & Mine", category: "personalised", price: 8, unit: "pair", description: "Two personalised cold-drink coasters. Two names, one thoughtful little pair." },
  { id: "placeNames", name: "A Place For Everyone", category: "personalised", price: 12, unit: "set of 6", description: "Six mini table-place names for your next celebration." },
  { id: "pumpkins", name: "Pumpkin Patch", category: "halloween", price: 6, unit: "set of 3", description: "Three colourful mini pumpkin decorations for a cheerful little shelf display." },
  { id: "ghosts", name: "Boo Buddies", category: "halloween", price: 5, unit: "pair", description: "Two friendly ghost decorations. A pair of happy little haunts." },
  { id: "bats", name: "Batty Little Bunch", category: "halloween", price: 6, unit: "set of 4", description: "Four flat hanging bat ornaments for your Halloween display." },
  { id: "spookyGarland", name: "The Boo Crew", category: "halloween", price: 9, unit: "garland", description: "Five decorative motifs on one strand. A colourful welcome for spooky season." },
  { id: "booSign", name: "Say It With BOO!", category: "halloween", price: 8, unit: "each", description: "One freestanding BOO shelf sign. Big colour, little fright." },
  { id: "pumpkinTag", name: "Your Name, Pumpkin", category: "halloween", price: 4, unit: "each", description: "One personalised pumpkin bag tag. Two examples shown; bag not included." },
  { id: "stencil", name: "Rangoli Starter", category: "diwali", price: 5, unit: "set of 3", description: "Three reusable pattern stencils. Rangoli powders are not included." },
  { id: "lotus", name: "Lotus Glow", category: "diwali", price: 8, unit: "pair", description: "Two lotus LED tealight holders. LED lights not included. Never use real flames." },
  { id: "ornament", name: "Little Diya Charms", category: "diwali", price: 6, unit: "set of 4", description: "Four flat hanging ornaments. Small details, big festive feeling." },
  { id: "garland", name: "Festival Garland", category: "diwali", price: 9, unit: "garland", description: "Five decorative motifs on one strand. A lovely little welcome." },
  { id: "festiveName", name: "Family Diwali Sign", category: "diwali", price: 10, unit: "each", description: "One personalised, non-illuminated display plaque. Name up to 14 characters." },
  { id: "petals", name: "Lotus Table Details", category: "diwali", price: 5, unit: "set of 4", description: "Four decorative lotus motifs. Not intended for food contact." },
  { id: "safari", name: "Safari Squad", category: "toys", price: 8, unit: "set of 4", description: "Four animal-figure concepts. A tiny wild bunch with lots of personality." },
  { id: "dino", name: "Dino Discovery", category: "toys", price: 9, unit: "set of 3", description: "Three dinosaur-figure concepts. Meet the little prehistoric crew." },
  { id: "ocean", name: "Ocean Crew", category: "toys", price: 8, unit: "set of 4", description: "Four sea-creature concepts. A little ocean of imagination." },
  { id: "farm", name: "Farm Friends", category: "toys", price: 10, unit: "set of 5", description: "Five farm-animal concepts. A whole lot of countryside cute." },
  { id: "stamps", name: "Squish & Stamp", category: "toys", price: 6, unit: "set of 4", description: "Four play-dough stamp concepts. Dough not included." },
  { id: "colour", name: "Colour-Me Dinos", category: "toys", price: 6, unit: "set of 3", description: "Three flat dinosaur colouring-shape concepts. Pens not included." }
];
const categories = { personalised: "Personalised", halloween: "Halloween", diwali: "Diwali", toys: "Playful ideas" };
const whatsappNumber = "919840684483";
const grid = document.querySelector("#product-grid");
const dialog = document.querySelector("#image-dialog");
const bundle = new Map();
const euro = new Intl.NumberFormat("en-IE", { style: "currency", currency: "EUR" });
let estimateInView = false;

function syncEstimateDock() {
  document.querySelector("#estimate-dock").hidden = bundle.size === 0 || estimateInView;
}

function whatsappUrl(message) {
  const url = new URL(`https://wa.me/${whatsappNumber}`);
  url.searchParams.set("text", message);
  return url.href;
}

function bundleTotal() {
  return products.reduce((total, product) => total + product.price * 100 * (bundle.get(product.id) || 0), 0);
}

function unitPrice(product) {
  return `${euro.format(product.price)} ${product.unit === "each" ? "each" : `per ${product.unit}`}`;
}

function element(tag, className, content) {
  const node = document.createElement(tag);
  if (className) node.className = className;
  if (content !== undefined) node.textContent = content;
  return node;
}

function openPreview(trigger, image, title, isPhoto = false) {
  const dialogImage = document.querySelector("#dialog-image");
  dialogImage.src = isPhoto ? trigger.href : image.src;
  dialogImage.alt = image.alt;
  dialogImage.width = image.width;
  dialogImage.height = image.height;
  dialog.classList.toggle("photo-preview", isPhoto);
  document.querySelector("#dialog-title").textContent = title;
  document.querySelector("#dialog-description").textContent = isPhoto
    ? "My own photo of a finished print. Past project shown for inspiration, not a sale listing."
    : "Original digital mockup, not a photo of a finished print.";
  trigger.focus({ preventScroll: true });
  dialog.showModal();
}

function createCard(product) {
  const card = element("article", "product-card");
  card.dataset.category = product.category;
  const picture = element("button", "product-image-button");
  picture.type = "button";
  picture.setAttribute("aria-label", `Enlarge ${product.name} digital mockup`);
  const image = element("img");
  image.src = `assets/${product.id}.png`;
  image.alt = `${product.name}: original digital mockup, not a finished-print photograph`;
  image.width = 1200;
  image.height = 560;
  image.loading = "lazy";
  const enlarge = element("span", "enlarge", "＋");
  enlarge.setAttribute("aria-hidden", "true");
  picture.append(image, enlarge);
  picture.addEventListener("click", () => openPreview(picture, image, product.name));
  const body = element("div", "product-body");
  body.append(element("p", "product-category", `${categories[product.category]} / concept`), element("h3", "", product.name), element("p", "product-description", product.description));
  const footer = element("div", "product-footer");
  const price = element("div", "indicative-price", `€${product.price}`);
  price.append(element("small", "", `Indicative · ${product.unit}`));
  const enquire = element("a", "enquire-link", "Ask about this ↗");
  enquire.href = `contact.html?item=${encodeURIComponent(product.id)}`;
  footer.append(price, enquire);
  body.append(footer);
  const add = element("button", "add-to-bundle", "+ Add to my bundle");
  add.type = "button";
  add.dataset.addProduct = product.id;
  add.setAttribute("aria-label", `Add ${product.name} to my bundle`);
  add.addEventListener("click", () => updateQuantity(product, (bundle.get(product.id) || 0) + 1));
  body.append(add);
  card.append(picture, body);
  return card;
}

function updateQuantity(product, quantity, action) {
  const total = bundleTotal() + (quantity - (bundle.get(product.id) || 0)) * product.price * 100;
  if (!Number.isSafeInteger(quantity) || quantity < 0 || !Number.isSafeInteger(total)) {
    document.querySelector("#estimate-status").textContent = "That quantity is too large to calculate reliably. Please contact Samantha about a larger request.";
    return;
  }
  if (quantity === 0) bundle.delete(product.id);
  else bundle.set(product.id, quantity);
  renderEstimate();
  document.querySelector("#estimate-status").textContent = `${product.name}: ${quantity === 0 ? "removed" : `quantity ${quantity}`}. Estimated item total ${euro.format(bundleTotal() / 100)}.`;
  if (action) {
    const target = document.querySelector(`[data-bundle-product="${product.id}"] [data-action="${action}"]`)
      || document.querySelector("#estimate-items button")
      || document.querySelector("#estimate-heading");
    target.focus({ preventScroll: true });
  }
}

function renderEstimate() {
  const list = document.querySelector("#estimate-items");
  list.replaceChildren();
  let picks = 0;
  for (const product of products) {
    const quantity = bundle.get(product.id);
    if (!quantity) continue;
    picks += quantity;
    const row = element("li", "estimate-item");
    row.dataset.bundleProduct = product.id;
    const image = element("img");
    image.src = `assets/${product.id}.png`;
    image.alt = "";
    image.width = 80;
    image.height = 48;
    const description = element("div", "estimate-item-description");
    description.append(element("h4", "", product.name), element("p", "", unitPrice(product)));
    const controls = element("div", "quantity-controls");
    controls.setAttribute("role", "group");
    controls.setAttribute("aria-label", `${product.name} quantity`);
    for (const [action, symbol, label, next] of [
      ["decrease", "−", "Decrease", quantity - 1],
      ["increase", "+", "Increase", quantity + 1]
    ]) {
      const button = element("button", "", symbol);
      button.type = "button";
      button.dataset.action = action;
      button.setAttribute("aria-label", `${label} ${product.name} quantity`);
      button.addEventListener("click", () => updateQuantity(product, next, action));
      controls.append(button);
      if (action === "decrease") controls.append(element("span", "quantity-value", String(quantity)));
    }
    const remove = element("button", "remove-estimate-item", "Remove");
    remove.type = "button";
    remove.dataset.action = "remove";
    remove.setAttribute("aria-label", `Remove ${product.name} from my bundle`);
    remove.addEventListener("click", () => updateQuantity(product, 0, "remove"));
    const lineTotal = element("strong", "estimate-line-total", euro.format(product.price * quantity));
    row.append(image, description, controls, lineTotal, remove);
    list.append(row);
  }
  const total = euro.format(bundleTotal() / 100);
  const count = `${picks} ${picks === 1 ? "pick" : "picks"} · ${bundle.size} ${bundle.size === 1 ? "design" : "designs"}`;
  document.querySelector("#estimate-count").textContent = `(${picks})`;
  document.querySelector("#estimate-total").textContent = total;
  document.querySelector("#estimate-empty").hidden = bundle.size > 0;
  document.querySelector("#clear-estimate").disabled = bundle.size === 0;
  document.querySelector("#estimate-enquire").disabled = bundle.size === 0;
  syncEstimateDock();
  document.querySelector("#estimate-dock-count").textContent = `${count} · estimate only`;
  document.querySelector("#estimate-dock-total").textContent = total;
  document.body.classList.toggle("has-bundle", bundle.size > 0);
  document.querySelectorAll("[data-add-product]").forEach(button => {
    const quantity = bundle.get(button.dataset.addProduct) || 0;
    button.textContent = quantity ? `+ Add another (${quantity} picked)` : "+ Add to my bundle";
    button.classList.toggle("has-picks", quantity > 0);
  });
}

function filterProducts(category) {
  if (category !== "all" && !Object.hasOwn(categories, category)) return;
  let count = 0;
  for (const card of grid.children) {
    card.hidden = category !== "all" && card.dataset.category !== category;
    if (!card.hidden) count++;
  }
  document.querySelectorAll("[data-filter]").forEach(button => {
    const selected = button.dataset.filter === category;
    button.classList.toggle("active", selected);
    button.setAttribute("aria-pressed", String(selected));
  });
  document.querySelector("#result-count").textContent = `${count} design concepts${category === "all" ? " across four collections" : ` in ${categories[category]}`}`;
}

if (grid) {
  grid.append(...products.map(createCard));
  filterProducts("all");
  document.querySelectorAll("[data-filter]").forEach(button => button.addEventListener("click", () => filterProducts(button.dataset.filter)));
  document.querySelectorAll("[data-collection]").forEach(link => link.addEventListener("click", () => filterProducts(link.dataset.collection)));
  document.querySelector("#estimate").hidden = false;
  document.querySelector("#estimate-shortcut").hidden = false;
  renderEstimate();
  new IntersectionObserver(([entry]) => {
    estimateInView = entry.isIntersecting;
    syncEstimateDock();
  }).observe(document.querySelector("#estimate"));
  document.querySelector("#clear-estimate").addEventListener("click", () => {
    bundle.clear();
    document.querySelector("#estimate-form").reset();
    renderEstimate();
    document.querySelector("#estimate-status").textContent = "Your bundle is cleared. Choose a new favourite to start again.";
    document.querySelector("#estimate-heading").focus({ preventScroll: true });
  });
  document.querySelector("#estimate-form").addEventListener("submit", event => {
    event.preventDefault();
    if (bundle.size === 0) {
      document.querySelector("#estimate-status").textContent = "Add a design to your bundle before making an enquiry.";
      return;
    }
    const lines = [
      "Hi Samantha! I've put together a little bundle on Little Layer Studio.",
      "",
      ...products.filter(product => bundle.has(product.id)).map(product => `${bundle.get(product.id)} x ${product.name} (${unitPrice(product)}): ${euro.format(product.price * bundle.get(product.id))}`),
      "",
      `Estimated item total: ${euro.format(bundleTotal() / 100)}`,
      "Indicative prices only. No bundle discounts applied. Delivery and custom changes are not included.",
      `Collection/delivery preference: ${document.querySelector("#estimate-fulfilment").value}`
    ];
    const note = document.querySelector("#estimate-note").value.trim();
    if (note) lines.push("", `Names, colours or notes: ${note}`);
    lines.push("", "Could you confirm what is possible, the final price and timing? I understand this is an enquiry, not an order, and designs, availability and applicable product-safety requirements need confirming.");
    window.location.assign(whatsappUrl(lines.join("\n")));
  });
}

if (dialog) {
  document.querySelectorAll(".print-photo").forEach(link => link.addEventListener("click", event => {
    if (event.button !== 0 || event.metaKey || event.ctrlKey || event.shiftKey || event.altKey) return;
    event.preventDefault();
    openPreview(link, link.querySelector("img"), link.dataset.photoTitle, true);
  }));
  document.querySelector(".dialog-close").addEventListener("click", () => dialog.close());
  dialog.addEventListener("click", event => {
    if (event.target !== dialog) return;
    const bounds = dialog.getBoundingClientRect();
    if (event.clientX < bounds.left || event.clientX > bounds.right || event.clientY < bounds.top || event.clientY > bounds.bottom) dialog.close();
  });
}

const enquiryForm = document.querySelector("#enquiry-form");
if (enquiryForm) {
  const interest = document.querySelector("#interest");
  for (const [category, label] of Object.entries(categories)) {
    const optgroup = element("optgroup");
    optgroup.label = label;
    products.filter(product => product.category === category).forEach(product => {
      const option = element("option", "", product.name);
      option.value = product.id;
      optgroup.append(option);
    });
    interest.append(optgroup);
  }
  const selectedId = new URLSearchParams(window.location.search).get("item");
  if (products.some(product => product.id === selectedId)) interest.value = selectedId;
  enquiryForm.hidden = false;
  const message = document.querySelector("#message");
  message.addEventListener("input", () => message.setCustomValidity(""));
  enquiryForm.addEventListener("submit", event => {
    event.preventDefault();
    const question = message.value.trim();
    if (!question) {
      message.setCustomValidity("Please add a little detail about your idea or question.");
      message.reportValidity();
      return;
    }
    const name = document.querySelector("#your-name").value.trim();
    const product = products.find(item => item.id === interest.value);
    const lines = ["Hi Samantha! I found Little Layer Studio.", name ? `My name is ${name}.` : "", product ? `I'm interested in ${product.name}.` : "I'd like to ask about a custom idea.", "", question, "", "I understand this is an enquiry, not a confirmed order."].filter((line, index, all) => line || all[index - 1]);
    window.location.assign(whatsappUrl(lines.join("\n")));
  });
}
