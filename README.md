# Givaldo Batista Homepage

A static personal homepage with a monochrome style, adapted as a personal profile and short-article hub.

## What’s included

- `index.html` — homepage structure
- `styles.css` — layout, aesthetic, and responsive behavior
- `main.js` — article card rendering
- `assets/portrait-*.svg` — stylized photo placeholders you can replace with your own images

## How to customize

1. Replace the placeholder portraits in `assets/` with your own photos.
2. Edit the profile and bio text in `index.html`.
3. Update the article list in `main.js` (title, date, category, excerpt, and links).
4. Change the site title and contact details.

## Publishing articles (Quick start)

See the **Markdown posts and build workflow** section below for the full guide.

## Deploy on Ubuntu with Nginx

1. Install Nginx:

```bash
sudo apt update
sudo apt install -y nginx
```

2. Copy project files to web root:

```bash
sudo mkdir -p /var/www/givaldo-homepage
sudo cp -r ./* /var/www/givaldo-homepage/
```

3. Create server config at `/etc/nginx/sites-available/givaldo-homepage`:

```nginx
server {
	listen 80;
	server_name _;

	root /var/www/givaldo-homepage;
	index index.html;

	location / {
		try_files $uri $uri/ =404;
	}
}
```

4. Enable and reload:

```bash
sudo ln -s /etc/nginx/sites-available/givaldo-homepage /etc/nginx/sites-enabled/givaldo-homepage
sudo nginx -t
sudo systemctl reload nginx
```

5. (Optional) Add HTTPS later with Certbot when your domain is ready.

## Markdown posts and build workflow

This is how you publish articles. You write markdown files, run a build command, and the site displays them.

### Setup (one-time)

Install Node and dependencies:

```bash
cd /home/lapeio/WebstormProjects/untitled1
npm install
```

### How to post a new article

1. Create a new markdown file in the `posts/` folder:

```bash
# Example: posts/2026-05-my-first-article.md
```

2. Add content with YAML frontmatter (metadata). Minimum required fields: `title`, `date`, `slug`, `excerpt`. Example:

```markdown
---
title: "The art of curious learning"
date: "2026-05-11"
category: "Learning"
slug: "curious-learning"
excerpt: "Why staying curious is one of the best skills in engineering."
---

# Main heading (optional)

Your article content goes here. You can write as much as you want — the site supports long-form articles.

Use **markdown** for formatting:
- Lists
- **Bold text**
- *Italic text*
- [Links](https://example.com)
- Code blocks, images, etc.
```

3. Build the posts (generates `posts.json` and `posts/{slug}.html`):

```bash
npm run build-posts
```

4. Preview locally:

```bash
python3 -m http.server 8000
# open http://localhost:8000 and check the "Recent Notes" section
```

5. Once happy, deploy to your Ubuntu server (copy the generated files and rebuild on the server).

### Deployment workflow

**Local development → Ubuntu server:**

```bash
# On your development machine:
npm run build-posts

# Copy files to server (edit with your server details):
scp -r /home/lapeio/WebstormProjects/untitled1/* user@your-server:/var/www/givaldo-homepage/

# On the Ubuntu server, if needed:
cd /var/www/givaldo-homepage
npm install
npm run build-posts
sudo nginx -t && sudo systemctl reload nginx
```

**Or, if building directly on the server:**

```bash
# On Ubuntu server:
cd /var/www/givaldo-homepage
npm install --production=false
npm run build-posts
sudo nginx -t && sudo systemctl reload nginx
```

### Notes

- The build script uses `gray-matter` to parse frontmatter and `marked` to convert markdown to HTML.
- Always run `npm run build-posts` after adding or editing markdown files so `posts.json` and the static HTML stay in sync.
- Articles are displayed in reverse chronological order (newest first).
- The design is intentionally monochrome, but you can add colors later if you want.


