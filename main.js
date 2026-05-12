// Fallback static articles (used if posts.json isn't available)
const fallbackArticles = [];

let articles = fallbackArticles;

function formatDate(isoDate) {
  try {
    return new Date(isoDate).toLocaleDateString(undefined, {
      year: "numeric",
      month: "short",
      day: "numeric",
    });
  } catch (e) {
    return isoDate || "";
  }
}

function renderArticles() {
  const list = document.getElementById("articles-list");
  if (!list) return;

  if (articles.length === 0) {
    list.innerHTML = `
      <div class="empty-state">
        <p><span class="bilingual"><span class="en">Nothing here yet.</span><span class="pt" lang="pt-BR">Nada aqui ainda.</span></span></p>
        <p class="empty-hint"><span class="bilingual"><span class="en">Check back soon for new notes and reflections.</span><span class="pt" lang="pt-BR">Volte em breve para novas notas e reflexões.</span></span></p>
      </div>
    `;
    return;
  }

  list.innerHTML = articles
    .map((article) => {
      const url = article.url || article.link || (article.slug ? `posts/${article.slug}.html` : "#");
      return `
        <article class="article-item">
          <div class="meta">
            <span>${article.category || "Note"}</span>
            <span>—</span>
            <span>${formatDate(article.date || "")}</span>
          </div>
          <div>
            <h3>${article.title}</h3>
            <p>${article.excerpt || ""}</p>
          </div>
          <a href="${url}" class="read-more"><span class="bilingual"><span class="en">Read note →</span><span class="pt" lang="pt-BR">Ler nota →</span></span></a>
        </article>
      `;
    })
    .join("");
}

async function init() {
  // Try to load a generated posts.json index (created by the build script).
  try {
    const res = await fetch("/posts.json", { cache: "no-store" });
    if (res.ok) {
      const data = await res.json();
      if (Array.isArray(data) && data.length) {
        articles = data.map((p) => ({ ...p, url: p.url || `/posts/${p.slug}.html` }));
      }
    }
  } catch (err) {
    // Silent fallback to the embedded articles
    console.warn("Could not load posts.json — using fallback articles.", err);
  }

  renderArticles();

  // Initialize lightbox behavior for gallery images
  initLightbox();
}

init();

// Lightbox functions
function initLightbox() {
  const lightbox = document.getElementById('lightbox');
  const lightboxImg = document.getElementById('lightbox-img');
  const lightboxCaption = document.getElementById('lightbox-caption');
  const closeBtn = document.getElementById('lightbox-close');

  if (!lightbox) return;

  function open(src, alt, caption) {
    lightboxImg.src = src;
    lightboxImg.alt = alt || '';
    lightboxCaption.textContent = caption || '';
    lightbox.setAttribute('aria-hidden', 'false');
    // trap focus on close button
    closeBtn.focus();
    document.body.style.overflow = 'hidden';
  }

  function close() {
    lightbox.setAttribute('aria-hidden', 'true');
    lightboxImg.src = '';
    lightboxCaption.textContent = '';
    document.body.style.overflow = '';
  }

  // open when clicking on any gallery image
  document.querySelectorAll('.photo-card img, #hero-photo').forEach((img) => {
    img.addEventListener('click', (e) => {
      open(img.src, img.alt, img.dataset.caption || img.getAttribute('alt') || '');
    });
    img.addEventListener('keydown', (e) => {
      if (e.key === 'Enter' || e.key === ' ') {
        e.preventDefault();
        open(img.src, img.alt, img.dataset.caption || img.getAttribute('alt') || '');
      }
    });
    img.setAttribute('tabindex', '0');
  });

  closeBtn.addEventListener('click', close);

  lightbox.addEventListener('click', (e) => {
    if (e.target === lightbox || e.target === closeBtn) close();
  });

  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && lightbox.getAttribute('aria-hidden') === 'false') close();
  });
}

