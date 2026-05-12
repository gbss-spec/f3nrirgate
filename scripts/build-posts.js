#!/usr/bin/env node
// Build script: reads markdown files from /posts, generates HTML pages and posts.json
const fs = require('fs').promises;
const path = require('path');
const matter = require('gray-matter');
const { marked } = require('marked');

const POSTS_DIR = path.join(__dirname, '..', 'posts');
const OUT_JSON = path.join(__dirname, '..', 'posts.json');

function slugify(text) {
  return (
    (text || '')
      .toString()
      .trim()
      .toLowerCase()
      .replace(/[^a-z0-9 -]/g, '')
      .replace(/\s+/g, '-')
      .replace(/-+/g, '-')
  );
}

async function build() {
  try {
    const files = await fs.readdir(POSTS_DIR);
    const posts = [];

    for (const file of files) {
      if (!file.endsWith('.md')) continue;
      const full = path.join(POSTS_DIR, file);
      const raw = await fs.readFile(full, 'utf8');
      const { data, content } = matter(raw);

      const title = data.title || 'Untitled';
      const date = data.date || new Date().toISOString();
      const category = data.category || 'Note';
      const excerpt = data.excerpt || content.split('\n').find(Boolean) || '';
      const slug = data.slug || slugify(title) || path.basename(file, '.md');

      const html = marked.parse(content);

      const outHtml = `<!doctype html>
<html lang="en">
  <head>
    <meta charset="utf-8" />
    <meta name="viewport" content="width=device-width,initial-scale=1" />
    <title>${title} — Givaldo Batista</title>
    <link rel="stylesheet" href="/styles.css" />
  </head>
  <body class="post-page">
    <main class="container">
      <article class="post">
        <header>
          <p class="meta">${category} — ${new Date(date).toLocaleDateString()}</p>
          <h1>${title}</h1>
        </header>
        <section class="post-content">${html}</section>
        <footer>
          <p><a href="/">← Back</a></p>
        </footer>
      </article>
    </main>
  </body>
</html>`;

      const outPath = path.join(POSTS_DIR, `${slug}.html`);
      await fs.writeFile(outPath, outHtml, 'utf8');

      posts.push({ title, date, category, excerpt: String(excerpt).slice(0, 200), slug, url: `/posts/${slug}.html` });
    }

    // sort newest first
    posts.sort((a, b) => new Date(b.date) - new Date(a.date));

    await fs.writeFile(OUT_JSON, JSON.stringify(posts, null, 2), 'utf8');
    console.log(`Built ${posts.length} post(s). posts.json written to ${OUT_JSON}`);
  } catch (err) {
    console.error('Error building posts:', err);
    process.exit(1);
  }
}

build();

