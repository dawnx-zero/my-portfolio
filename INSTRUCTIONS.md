# INSTRUCTIONS — How to Customize & Deploy Your Portfolio

---

## 1. CONTENT — Edit index.html

Every section that needs editing is marked with a comment like:
```html
<!-- EDIT: your name -->
```

Work through `index.html` top to bottom. Here's what to change in each section:

### `<head>`
- `<title>` — your name and tagline
- `<meta name="description">` — one-line bio for search engines
- `og:image` — path to a 1200×630px preview image

### Navigation
- `.nav__logo` — your initials or short name (e.g. "JS" or "Jane")

### Hero
- `hero__badge` — your current city, or delete the whole badge div
- `hero__name` — your full name
- `hero__title` — your role(s), e.g. "Designer · Developer"
- `hero__bio` — 2–3 sentences about what you do
- Resume link — change `href="assets/resume.pdf"` to your actual PDF path
- Email link — change `you@email.com` to your address
- Social links — update the three `<a>` tags, or remove ones you don't use
- `hero__avatar` — replace `src="assets/avatar.jpg"` with your photo

### Projects
- Each `<article class="project-card">` is one project
- Change the tag, title, description, image src, and link
- To add a project: copy the whole `<article>` block and paste after the last one
- To remove a project: delete the entire `<article>` block

### About
- Update the greeting with your name
- Replace the two `<p>` paragraphs with your own bio
- Change the blockquote to your favorite quote (or delete it)
- Replace `about-1.jpg`, `about-2.jpg`, `about-3.jpg` with your photos

### Skills
- Each `<div class="skill-group">` is one column
- Change the title and list items
- Add a column: copy a `skill-group` block and paste inside `.skills__grid`

### Experience
- Each `<div class="experience__item">` is one job
- Change period, role, company, description
- Add/remove items the same way as projects

### Testimonials
- Each `<div class="testimonial-card">` is one testimonial
- Update quote, name, title, and avatar image

### Contact
- Update the subtitle text
- See Section 4 below to make the form actually send emails

### Footer
- Update your name and social links

---

## 2. IMAGES

Place all your images in the `assets/` folder.

| File                | What it's for               | Recommended size |
|---------------------|-----------------------------|-----------------|
| `avatar.jpg`        | Your photo in the hero      | 400 × 500 px    |
| `project-1.jpg`     | Project thumbnail           | 800 × 500 px    |
| `project-2.jpg`     | Project thumbnail           | 800 × 500 px    |
| `project-3.jpg`     | Project thumbnail           | 800 × 500 px    |
| `about-1.jpg`       | Tall photo in About section | 500 × 660 px    |
| `about-2.jpg`       | Small photo in About        | 400 × 320 px    |
| `about-3.jpg`       | Small photo in About        | 400 × 320 px    |
| `testimonial-1.jpg` | Reviewer headshot           | 80 × 80 px      |
| `testimonial-2.jpg` | Reviewer headshot           | 80 × 80 px      |
| `testimonial-3.jpg` | Reviewer headshot           | 80 × 80 px      |
| `resume.pdf`        | Your resume PDF             | —               |
| `og-image.jpg`      | Social share preview        | 1200 × 630 px   |

**Image tips:**
- JPG for photos, PNG for logos/screenshots with transparency
- Compress images at [squoosh.app](https://squoosh.app) before uploading (keeps the site fast)
- Images without a file will be hidden automatically — no broken image icons

---

## 3. THEMING — Edit style.css

Open `style.css`. The very first block is the theme variables:

```css
:root {
  --bg:          #FAFAF8;   /* main background */
  --bg-alt:      #F2F1EE;   /* alternate section background */
  --text:        #141414;   /* primary text */
  --text-muted:  #88887A;   /* secondary text */
  --border:      #E6E5E0;   /* borders */
  --accent:      #141414;   /* button / highlight colour */
  --accent-fg:   #FAFAF8;   /* text on accent buttons */
  ...
}
```

Change only these values to completely retheme the site. The dark mode block below it follows the same pattern.

### Changing fonts

1. Go to [fonts.google.com](https://fonts.google.com) and pick your fonts
2. Replace the `<link>` in `<head>` of `index.html` with the new embed URL
3. In `style.css`, update:
   ```css
   --font-display: 'Your Display Font', serif;
   --font-body:    'Your Body Font', sans-serif;
   ```

---

## 4. CONTACT FORM — Making it Actually Send Emails

The form currently simulates a send. Choose one option:

### Option A — Netlify Forms (easiest, free)
1. In `index.html`, find the `<form>` tag and add `data-netlify="true"`:
   ```html
   <form class="contact-form" id="contactForm" data-netlify="true" novalidate>
   ```
2. In `script.js`, find this line and **delete** it:
   ```js
   e.preventDefault(); // ← Remove this line if using Netlify Forms or Formspree
   ```
3. Deploy to Netlify. Messages will appear in your Netlify dashboard → Forms.

### Option B — Formspree (works anywhere, free tier available)
1. Sign up at [formspree.io](https://formspree.io)
2. Create a new form — you'll get an endpoint like `https://formspree.io/f/xabc1234`
3. In `index.html`, update the `<form>` tag:
   ```html
   <form class="contact-form" action="https://formspree.io/f/xabc1234" method="POST">
   ```
4. In `script.js`, **delete** the `e.preventDefault()` line (same as above)
5. Done — submissions go to your email

### Option C — EmailJS (no backend, works on GitHub Pages)
1. Sign up at [emailjs.com](https://www.emailjs.com) (free tier: 200 emails/month)
2. Follow their JavaScript SDK setup
3. Replace the "Simulated send" block in `script.js` with their `emailjs.send()` call

---

## 5. DEPLOYMENT

### GitHub Pages (free)
1. Create a GitHub account if you don't have one
2. Create a new repository (e.g. `my-portfolio`)
3. Upload all files (or use `git push`)
4. Go to **Settings → Pages → Source** and select `main` branch, `/root` folder
5. Click Save — your site is live at:
   `https://yourusername.github.io/my-portfolio`

**Custom domain on GitHub Pages:**
1. Buy a domain at Namecheap, Porkbun, etc.
2. In GitHub → Settings → Pages → Custom domain, enter `yourname.com`
3. Add a CNAME DNS record pointing to `yourusername.github.io`

### Netlify (recommended — easiest custom domain, free forms)
1. Go to [app.netlify.com/drop](https://app.netlify.com/drop)
2. Drag your entire portfolio folder into the browser
3. You get a live URL like `https://random-name-123.netlify.app`
4. Rename it in Site Settings → Domain Management
5. To connect GitHub for auto-deploy:
   - Site Settings → Build & Deploy → Link to Git
   - Netlify rebuilds on every push to main

**Custom domain on Netlify:**
1. Site Settings → Domain Management → Add custom domain
2. Follow the DNS instructions — Netlify walks you through it

---

## 6. REMOVING SECTIONS

To remove a whole section, find it in `index.html` between the matching comments:
```html
<!-- ═══ TESTIMONIALS SECTION ══════ -->
<section ...>
  ...
</section>
```
Delete from the opening `<section>` to its closing `</section>`.

Also remove the corresponding nav link in both the desktop `<ul class="nav__links">` and the `<div class="mobile-menu">` list.

---

## 7. ADDING A FAVICON

1. Create a small square image (512×512px) of your logo or initials
2. Convert it at [favicon.io](https://favicon.io)
3. Put the generated files in the root folder
4. Add to `<head>` in `index.html`:
   ```html
   <link rel="icon" type="image/png" href="favicon-32x32.png" sizes="32x32" />
   <link rel="apple-touch-icon" href="apple-touch-icon.png" />
   ```

---

## 8. ADDING ANALYTICS

Paste your analytics snippet just before `</body>` in `index.html`.

- **Plausible** (privacy-friendly, no cookie banner): `<script defer data-domain="yourdomain.com" src="https://plausible.io/js/script.js"></script>`
- **Google Analytics 4**: Use the snippet from your GA4 property

---

That's everything. Good luck with the launch! 🚀
