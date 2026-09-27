const $ = (selector, parent = document) => parent.querySelector(selector);
const $$ = (selector, parent = document) => [...parent.querySelectorAll(selector)];

document.body.classList.add('js-ready');
const motionPreference = window.matchMedia('(prefers-reduced-motion: reduce)');
const motionButton = $('.motion-toggle');
function setMotionPaused(paused) {
  document.body.classList.toggle('motion-paused', paused);
  motionButton.setAttribute('aria-pressed', String(paused));
  motionButton.setAttribute('aria-label', `${paused ? 'Resume' : 'Pause'} decorative animations`);
  motionButton.title = `${paused ? 'Resume' : 'Pause'} animations`;
  motionButton.textContent = paused ? '▷' : 'Ⅱ';
}
setMotionPaused(motionPreference.matches);
motionButton.disabled = motionPreference.matches;
motionPreference.addEventListener('change', () => {
  setMotionPaused(motionPreference.matches);
  motionButton.disabled = motionPreference.matches;
});
motionButton.addEventListener('click', () => setMotionPaused(!document.body.classList.contains('motion-paused')));
const revealObserver = new IntersectionObserver((entries) => {
  entries.forEach((entry) => {
    if (entry.isIntersecting) {
      entry.target.classList.add('visible');
      revealObserver.unobserve(entry.target);
    }
  });
}, { threshold: 0.08 });
$$('.reveal').forEach((element) => revealObserver.observe(element));

const themeButton = $('.theme-toggle');
const colorPreference = window.matchMedia('(prefers-color-scheme: light)');
function setTheme(light, persist = false) {
  document.documentElement.dataset.theme = light ? 'light' : 'dark';
  themeButton.textContent = light ? '☾' : '☼';
  themeButton.setAttribute('aria-label', `Switch to ${light ? 'dark' : 'light'} theme`);
  themeButton.setAttribute('aria-pressed', String(light));
  $('meta[name="theme-color"]').content = light ? '#faf7f2' : '#141414';
  if (persist) {
    try {
      localStorage.setItem('portfolio-theme', light ? 'light' : 'dark');
    } catch (error) {
      console.warn('Could not save theme preference:', error);
      toast('Theme changed for this visit. Your browser did not allow saving the preference.');
    }
  }
}
setTheme(document.documentElement.dataset.theme === 'light');
themeButton.addEventListener('click', () => setTheme(document.documentElement.dataset.theme !== 'light', true));
colorPreference.addEventListener('change', () => {
  try {
    if (!localStorage.getItem('portfolio-theme')) setTheme(colorPreference.matches);
  } catch (error) {
    console.warn('Could not read theme preference:', error);
  }
});
window.addEventListener('storage', (event) => {
  if (event.key === 'portfolio-theme' || event.key === null) {
    setTheme(event.newValue === 'light' || (event.newValue !== 'dark' && colorPreference.matches));
  }
});

const menuButton = $('.menu-toggle');
const nav = $('.site-header nav');
window.matchMedia('(max-width: 60rem)').addEventListener('change', closeMenu);
function closeMenu() {
  nav.classList.remove('open');
  menuButton.setAttribute('aria-expanded', 'false');
  menuButton.setAttribute('aria-label', 'Open navigation');
}
menuButton.addEventListener('click', () => {
  const open = nav.classList.toggle('open');
  menuButton.setAttribute('aria-expanded', String(open));
  menuButton.setAttribute('aria-label', `${open ? 'Close' : 'Open'} navigation`);
});
$$('a', nav).forEach((link) => link.addEventListener('click', closeMenu));
document.addEventListener('keydown', (event) => {
  if (event.key === 'Escape' && nav.classList.contains('open')) {
    closeMenu();
    menuButton.focus();
  }
});

function updateTime() {
  $('#dublin-time').textContent = new Intl.DateTimeFormat('en-GB', {
    timeZone: 'Europe/Dublin', hour: '2-digit', minute: '2-digit', hour12: false,
  }).format(new Date());
}
updateTime();
setInterval(updateTime, 60000);
$('#year').textContent = new Date().getFullYear();

$$('.filter').forEach((button) => button.addEventListener('click', () => {
  $$('.filter').forEach((filter) => {
    filter.classList.toggle('active', filter === button);
    filter.setAttribute('aria-pressed', String(filter === button));
  });
  $$('.project-card').forEach((card) => {
    card.hidden = button.dataset.filter !== 'all' && card.dataset.category !== button.dataset.filter;
    if (!card.hidden) card.classList.add('visible');
  });
}));

const art = $('.hero-art');
art.addEventListener('pointermove', (event) => {
  if (motionPreference.matches || document.body.classList.contains('motion-paused') || event.pointerType !== 'mouse') return;
  const box = art.getBoundingClientRect();
  const x = (event.clientX - box.left - box.width / 2) / 25;
  const y = (event.clientY - box.top - box.height / 2) / 25;
  $('.sculpture').style.translate = `${x}px ${y}px`;
});
art.addEventListener('pointerleave', () => { $('.sculpture').style.translate = ''; });

let toastTimer;
function toast(message) {
  const element = $('#toast');
  clearTimeout(toastTimer);
  element.textContent = message;
  element.classList.add('show');
  toastTimer = setTimeout(() => element.classList.remove('show'), 4000);
}
$('#copy-email').addEventListener('click', async () => {
  try {
    await navigator.clipboard.writeText('hannahwynnesamantha@gmail.com');
    toast('Email copied. A good conversation is one paste away.');
  } catch (error) {
    console.error('Could not copy email to clipboard:', error);
    toast('Couldn’t copy automatically. Select the email address above, or click it to send a message.');
  }
});

const projects = {
  traffic: {
    title: 'Making every signal count.',
    description: 'A functional traffic-light management system built with Raspberry Pi and Python. This project applies programming logic and embedded systems concepts to a familiar, real-world problem: managing the sequence of a traffic signal.',
    tags: ['Python', 'Raspberry Pi', 'Programming logic', 'Embedded systems'],
    demo: `<div class="demo-heading">TRY THE SIGNAL <span>Interactive concept demo</span></div><div class="traffic-demo"><div class="live-signal" aria-hidden="true"><div class="signal on" data-color="red"></div><div class="signal" data-color="amber"></div><div class="signal" data-color="green"></div></div><div class="traffic-demo-copy"><div role="status" aria-live="polite"><strong id="signal-title">Stop.</strong><p id="signal-description">A moment to pause. The red signal is on.</p></div><div class="demo-controls"><button class="demo-button" id="signal-step">Next signal →</button><button class="demo-button secondary" id="signal-auto" aria-pressed="false">Auto cycle</button></div></div></div>`,
    note: 'An illustrative browser simulation created for this portfolio, not a connection to the original Raspberry Pi hardware.',
  },
  expense: {
    title: 'A clearer picture of the everyday.',
    description: 'An application designed to organise and manage expense data. The idea is straightforward: make everyday spending easier to record, understand, and keep track of.',
    tags: ['Application development', 'Expense management', 'Data organisation'],
    demo: `<div class="demo-heading">MAKE IT ADD UP <span>Interactive concept demo</span></div><form class="expense-form"><label>Expense<input id="expense-name" name="expense" placeholder="e.g. Coffee" maxlength="60" required /></label><label>Amount (€)<input id="expense-amount" name="amount" type="number" min="0.01" max="1000000" step="0.01" placeholder="4.50" required /></label><button class="demo-button" type="submit">Add expense ↗</button></form><p id="expense-error" class="demo-error" role="alert"></p><ul class="expense-list" aria-label="Demo expenses"></ul><div class="expense-total" role="status" aria-live="polite"><span>Total</span><strong id="expense-total"></strong></div>`,
    note: 'Try adding or removing an expense. Sample data is for demonstration only; nothing is saved or sent anywhere.',
  },
  ravaged: {
    url: 'https://samantha-hannah-wynne.github.io/Ravaged/',
    linkLabel: 'Play Ravaged',
    title: 'Your choices. Your consequences.',
    description: 'Ravaged is a choice-driven horror game with branching narratives and interactive gameplay. It explores how the decisions a player makes can shape the way a story unfolds.',
    tags: ['Python', 'Interactive storytelling', 'Branching narratives', 'Game development'],
    demo: `<div class="demo-heading">TAKE THE FIRST STEP <span>Original portfolio micro-story</span></div><div id="story" aria-live="polite"></div><button class="demo-button secondary" id="story-reset" style="margin-top:20px">↺ Start again</button>`,
    note: 'A short, original branching story created to illustrate the project’s concept, not an excerpt or playable build of Ravaged.',
  },
  web: {
    url: 'https://samantha-hannah-wynne.github.io/Portfolio-WebPage/index.html',
    linkLabel: 'Visit the original website',
    title: 'Made for the people using it.',
    description: 'A website designed and developed with usability in mind, applying client-side development, accessibility, and basic SEO principles. Because a good website should not just look right—it should work for the people using it.',
    tags: ['HTML', 'CSS', 'Client-side development', 'Accessibility', 'SEO'],
    demo: `<div class="demo-heading">A DIFFERENT POINT OF VIEW <span>Interactive visual study</span></div><div class="web-demo-preview" data-style="warm"><span>form®</span><h3>Good design.<br /><em>Great feeling.</em></h3><p>One layout. A few different personalities. Explore how colour and space change the feeling of a page.</p></div><div class="web-theme-controls" role="group" aria-label="Preview palette"><button class="demo-button secondary" data-style="warm" aria-pressed="true">Warm paper</button><button class="demo-button secondary" data-style="night" aria-pressed="false">Night mode</button><button class="demo-button secondary" data-style="citrus" aria-pressed="false">Citrus</button></div><label class="demo-width-toggle"><input type="checkbox" id="preview-narrow" /> Preview a narrow layout</label>`,
    note: 'A new visual study for this portfolio, not a screenshot of the original website. All preview controls work with a keyboard.',
  },
};

const dialog = $('#project-dialog');
let cleanupDemo = () => {};
function openProject(id) {
  const project = projects[id];
  if (!project) return;
  cleanupDemo();
  $('#dialog-content').innerHTML = `<h2 id="dialog-title">${project.title}</h2><p>${project.description}</p><div class="tags dialog-tags">${project.tags.map((tag) => `<span>${tag}</span>`).join('')}</div><div class="demo-panel">${project.demo}</div><p class="demo-note">${project.note}</p>`;
  if (project.url) {
    const link = document.createElement('a');
    link.className = 'button button-lime project-live-link';
    link.href = project.url;
    link.textContent = `${project.linkLabel} ↗`;
    $('.demo-panel', dialog).before(link);
  }
  document.body.classList.add('modal-open');
  dialog.showModal();
  dialog.scrollTop = 0;
  if (id === 'traffic') initTraffic();
  if (id === 'expense') initExpenses();
  if (id === 'ravaged') initStory();
  if (id === 'web') initWebPreview();
}
$$('button.project-card, .project-details').forEach((button) => {
  button.addEventListener('click', () => openProject(button.dataset.project));
});
$('.close-dialog').addEventListener('click', () => dialog.close());
dialog.addEventListener('click', (event) => {
  if (event.target !== dialog) return;
  const rect = dialog.getBoundingClientRect();
  if (event.clientX < rect.left || event.clientX > rect.right || event.clientY < rect.top || event.clientY > rect.bottom) dialog.close();
});
dialog.addEventListener('close', () => {
  cleanupDemo();
  cleanupDemo = () => {};
  document.body.classList.remove('modal-open');
});

function initTraffic() {
  const states = [
    { color: 'red', title: 'Stop.', description: 'A moment to pause. The red signal is on.' },
    { color: 'green', title: 'Go.', description: 'The way is clear. The green signal is on.' },
    { color: 'amber', title: 'Prepare to stop.', description: 'The cycle is changing. The amber signal is on.' },
  ];
  let index = 0;
  let timer;
  const step = () => {
    index = (index + 1) % states.length;
    const state = states[index];
    $$('.signal', dialog).forEach((signal) => signal.classList.toggle('on', signal.dataset.color === state.color));
    $('#signal-title').textContent = state.title;
    $('#signal-description').textContent = state.description;
  };
  $('#signal-step').addEventListener('click', step);
  $('#signal-auto').addEventListener('click', (event) => {
    const button = event.currentTarget;
    if (timer) {
      clearInterval(timer);
      timer = undefined;
    } else {
      step();
      timer = setInterval(step, 2400);
    }
    button.textContent = timer ? 'Pause cycle' : 'Auto cycle';
    button.setAttribute('aria-pressed', String(Boolean(timer)));
    $('#signal-step').disabled = Boolean(timer);
  });
  cleanupDemo = () => clearInterval(timer);
}

function initExpenses() {
  let nextId = 3;
  let expenses = [{ id: 1, name: 'Coffee & a good idea', cents: 450 }, { id: 2, name: 'Bus to campus', cents: 200 }];
  const currency = new Intl.NumberFormat('en-IE', { style: 'currency', currency: 'EUR' });
  const render = () => {
    const list = $('.expense-list');
    list.replaceChildren();
    expenses.forEach((expense) => {
      const li = document.createElement('li');
      const name = document.createElement('span');
      name.textContent = expense.name;
      const amount = document.createElement('span');
      amount.textContent = currency.format(expense.cents / 100);
      const remove = document.createElement('button');
      remove.className = 'remove-expense';
      remove.textContent = '×';
      remove.setAttribute('aria-label', `Remove ${expense.name}`);
      remove.addEventListener('click', () => {
        expenses = expenses.filter((item) => item.id !== expense.id);
        render();
        $('#expense-name').focus();
      });
      amount.append(remove);
      li.append(name, amount);
      list.append(li);
    });
    $('#expense-total').textContent = currency.format(expenses.reduce((sum, expense) => sum + expense.cents, 0) / 100);
  };
  $('.expense-form').addEventListener('submit', (event) => {
    event.preventDefault();
    const name = $('#expense-name').value.trim();
    const amount = Number($('#expense-amount').value);
    const error = $('#expense-error');
    if (!name || !Number.isFinite(amount) || amount < 0.01 || amount > 1000000) {
      error.textContent = 'Enter an expense name and an amount between €0.01 and €1,000,000.';
      return;
    }
    error.textContent = '';
    expenses.push({ id: nextId++, name, cents: Math.round(amount * 100) });
    render();
    event.currentTarget.reset();
    $('#expense-name').focus();
  });
  render();
}

function initStory() {
  const scenes = {
    start: { label: 'THE EDGE OF THE WOODS', text: 'Your phone goes dark. Somewhere beyond the trees, a radio plays a song you recognise. Behind you, the last bus disappears into the fog.', choices: [['Follow the music', 'radio'], ['Stay on the road', 'road']] },
    radio: { label: 'A FAMILIAR MELODY', text: 'The music leads to an empty cabin. On the table: a radio, a brass key, and a note in your handwriting. “Don’t turn it off.”', choices: [['Take the key', 'key'], ['Turn off the radio', 'silence']] },
    road: { label: 'THE LONG WAY HOME', text: 'A streetlight flickers ahead. Beneath it stands a figure holding an umbrella. They wave as if they have been waiting for you.', choices: [['Ask for directions', 'escape'], ['Return to the woods', 'radio']] },
    key: { label: 'ENDING 01 / THE DOOR', text: 'The key fits a door you hadn’t noticed. On the other side: morning light and the sound of traffic. You step through. The song finally ends.', choices: [] },
    silence: { label: 'ENDING 02 / THE QUIET', text: 'The radio clicks off. For a moment, everything is still. Then, from somewhere under the floorboards, the same melody begins again. This time, someone is singing.', choices: [] },
    escape: { label: 'ENDING 03 / A SMALL KINDNESS', text: '“You missed the last bus,” the stranger says, handing you the umbrella. “But the station is just around the corner.” Not every shadow hides a monster.', choices: [] },
  };
  const render = (id) => {
    const scene = scenes[id];
    const story = $('#story');
    story.replaceChildren();
    const label = document.createElement('p');
    label.className = 'story-label';
    label.textContent = scene.label;
    const text = document.createElement('p');
    text.className = 'story-scene';
    text.tabIndex = -1;
    text.textContent = scene.text;
    const choices = document.createElement('div');
    choices.className = 'story-choices';
    scene.choices.forEach(([title, target]) => {
      const button = document.createElement('button');
      button.className = 'demo-button';
      button.textContent = `${title} →`;
      button.addEventListener('click', () => {
        render(target);
        $('.story-scene').focus();
      });
      choices.append(button);
    });
    story.append(label, text, choices);
  };
  $('#story-reset').addEventListener('click', () => {
    render('start');
    $('.story-scene').focus();
  });
  render('start');
}

function initWebPreview() {
  $$('.web-theme-controls button').forEach((button) => button.addEventListener('click', () => {
    $('.web-demo-preview').dataset.style = button.dataset.style;
    $$('.web-theme-controls button').forEach((control) => control.setAttribute('aria-pressed', String(control === button)));
  }));
  $('#preview-narrow').addEventListener('change', (event) => {
    $('.web-demo-preview').classList.toggle('narrow', event.target.checked);
  });
}
