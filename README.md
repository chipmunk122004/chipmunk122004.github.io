# How to change your website (simple guide)

This folder is a **small personal website**. You do **not** need to be a programmer to update the words and pictures. You only need to open a few files on your computer, change text inside them, and save.

If anything goes wrong, **undo** in your editor (Command+Z on Mac, Control+Z on Windows) or put the file back from a backup copy.

---

## What each main file does

| File | What it is for |
|------|----------------|
| **index.html** | The page layout. You usually **do not** need to edit this. |
| **site-content.js** | **Start here.** Your name, intro paragraph, contact info, about text, footer line, and portfolio images are listed here. |
| **styles.css** | Colors, spacing, borders, fonts. Only open this if you want to change how things *look*. |
| **script.js** | Behaviors (menus, lightbox). You usually **do not** need to edit this. |
| **GITHUB-PAGES.md** | How to host the site on GitHub Pages and connect your own domain. |

Your **photos and images** live in the **assets** folder (for example `assets/art/` and `assets/advertising/`).

---

## Step 1 — Open the right file

1. Go to the project folder on your computer (`amWebsite3.0` or whatever you named it).
2. Find the file named **`site-content.js`**.
3. Open it with any text program:
   - **Mac:** TextEdit (set it to plain text if it offers “Rich Text”), or VS Code if you have it.
   - **Windows:** Notepad, or VS Code.

You will see lines of text with labels like `firstName:` and words inside **straight quote marks** `"like this"`.

---

## Step 2 — Change your name (the big heading)

Inside **`site-content.js`**, find the block that starts with `profile:`.

Change only the text **inside the quotes**:

- `firstName` — first name (shows in the large title at the top).
- `lastName` — last name.

Example:

```js
firstName: "Aidan",
lastName: "McCauley",
```

Save the file. Open **`index.html`** in your web browser (double-click it, or drag it into Chrome / Safari / Edge) and refresh the page to see the new name.

---

## Step 3 — Change the gray/green intro paragraph under your name

Still in **`site-content.js`**, find:

- **`heroIntroText`**

This is one long line or several lines between quote marks. Replace that text with your own introduction. You can use an apostrophe inside a sentence (for example `I'm`) — that is normal and allowed.

If you prefer, you can also use the name **`headerText`** instead of `heroIntroText` — both work the same way.

---

## Step 4 — Change the Contact section (labels, handle, links, email)

In the same **`profile`** block:

| Setting | What visitors see |
|--------|-------------------|
| `instagramLabel` | The word before your handle (often **Instagram**). |
| `emailLabel` | The word before your email (often **Email**). |
| `instagramHandle` | The `@handle` text. |
| `instagramUrl` | The full link when someone clicks Instagram. It should start with `https://` |
| `email` | Your email address (used for the mail link). |

**Important:** Keep the quotes around each value. Do **not** remove the commas at the end of lines.

---

## Step 5 — Change the About section

Find **`aboutText`** in **`site-content.js`**.

Replace everything between the opening and closing quote marks with your biography or statement. It can be one long paragraph.

---

## Step 6 — Change the footer line (copyright or thank-you)

Find **`footerNote`**.

Change the text inside the quotes. Example:

```js
footerNote: "© 2026 Your Name. All rights reserved.",
```

The **©** symbol is optional; you can type plain text if you prefer.

---

## Step 7 — Add or change portfolio images (Art and Advertising)

There are **two lists** in **`site-content.js`**:

1. **`artPortfolioItems`** — the row labeled **Art**.
2. **`advertisingPortfolioItems`** — the row labeled **Advertising**.

Each picture is one **block** that looks like this:

```js
{
  src: "assets/art/your-photo.jpg",
  caption: "Short title under the image",
  alt: "A clear description of the image for people who use screen readers"
}
```

- **`src`** — path to your image file. Put new files in **`assets/art/`** or **`assets/advertising/`** (or a subfolder you create), then point `src` to that path. Use forward slashes `/`, not backslashes.
- **`caption`** — short label shown under the thumbnail and in the pop-up viewer.
- **`alt`** — describes what is in the picture (accessibility). Write it like you are explaining the image to someone on the phone.

**To add a picture:** copy a whole `{ ... }` block, paste it in the list, add a **comma** after the previous block, and edit `src`, `caption`, and `alt`.

**To remove a picture:** delete that whole `{ ... }` block. Make sure you do not leave an extra comma at the end of the list (the last item should not have a comma after it, depending on how your file is formatted — if the site stops working, compare your commas to the original file).

---

## Rules that prevent “breaking” the file

1. **Do not delete** the curly braces `{` `}` that wrap each section.
2. **Do not delete** the commas between items in a list — except sometimes after the *last* item in a list (your file already follows a safe pattern; when in doubt, match the examples above).
3. **Keep straight quotes** for text: `"` not smart quotes like `“` `”` (some word processors change these; plain Notepad / TextEdit in plain text is safer).
4. Change **one section at a time**, save, refresh the browser, and check. That way you know what caused a problem if something looks wrong.

---

## If the page looks blank or broken

- Open the browser’s **developer console** only if you are comfortable; otherwise, restore **`site-content.js`** from a backup.
- Check that every line in a list of `{ ... }` blocks is separated by commas.
- Make sure **`site-content.js`** is still saved in the **same folder** as **`index.html`**, and that **`index.html`** still contains the two script lines at the bottom loading `site-content.js` then `script.js`.

---

## Changing colors and borders (optional)

Open **`styles.css`**. At the very top, **`:root { ... }`** holds simple color and border settings you can experiment with. Save and refresh the page after each change.

---

## Changing the font (optional)

The site uses two font “slots”: **body text** (paragraphs, links, most UI) and **headings** (big titles like your name and section titles).

### Easiest change (same file only)

1. Open **`styles.css`**.
2. Near the top, inside **`:root { ... }`**, find:
   - **`--font-body`** — used for normal text.
   - **`--font-heading`** — used for large headings.
3. Replace the **first** font name in quotes with another font you like. Examples of fonts that are already on most computers:
   - `"Georgia", serif` — classic, book-like.
   - `"Verdana", sans-serif` — round, easy to read on screens.
   - `"Trebuchet MS", sans-serif` — informal sans-serif.

Always keep a **fallback** after your choice (the list after the comma), for example:

```css
--font-body: Georgia, "Times New Roman", serif;
```

Save and refresh the page.

### Using Google Fonts (free web fonts)

1. In your browser, open [Google Fonts](https://fonts.google.com).
2. Pick a font. Click it, then click **“Get font”** (or similar) until you see code to add to your site.
3. Copy the **`<link href="https://fonts.googleapis.com/...">`** line.
4. Open **`index.html`**. Find the old Google Fonts `<link ... fonts.googleapis.com ...>` line (near the top) and **replace** it with the new one you copied. If you pick **two** fonts (one for body, one for titles), the instructions on Google Fonts may give you one combined link — that is fine.
5. Open **`styles.css`**. In **`:root`**, set **`--font-body`** and/or **`--font-heading`** to the **exact** family name Google shows (including quote marks if the name has spaces), for example:

```css
--font-body: "Work Sans", Arial, Helvetica, sans-serif;
--font-heading: "Archivo Black", "Arial Black", Arial, sans-serif;
```

6. Save both files and refresh the page.

If the font does not change, double-check that the name in **`styles.css`** matches Google’s spelling **exactly**, and that you saved **`index.html`** with the new `<link>`.

---

## Going live on GitHub Pages + your own domain

**Full step-by-step instructions** (uploading the site, turning on Pages, DNS, HTTPS, and troubleshooting) are in **[GITHUB-PAGES.md](GITHUB-PAGES.md)**. That file is written for readers with **low to medium** computer experience.

**Shortcuts for this project:**

- **`index.html`** must stay at the **root** of the repo, with **`assets/`** uploaded too.
- **Sharing previews** (Facebook, iMessage, etc.): after your real **`https://…`** address works, you can set **`og:image`** and **`twitter:image`** in **`index.html`** to full URLs like `https://www.yoursite.com/assets/AM.svg` for the most reliable previews.
- **`404.html`:** GitHub Pages uses it for missing URLs. The “Back to home” link is **`/`**, which fits a **custom domain at the root**. If you only use **`https://username.github.io/repository-name/`**, open **`404.html`** and change that link to **`/repository-name/`**.

---

## Launch checklist (quick)

Use this right before or right after you share the live link.

- [ ] All files pushed to GitHub, including the **`assets/`** folder (images, favicon).
- [ ] GitHub **Pages** is on and the site opens at the GitHub URL or your domain.
- [ ] **Custom domain** (if any) works; **Enforce HTTPS** is on when GitHub allows it.
- [ ] Click through **Contact** links (Instagram opens correctly, email opens the mail app).
- [ ] Open a few **portfolio** images and the lightbox on phone and desktop.
- [ ] Visit a fake address like `yoursite.com/this-page-does-not-exist` — you should see **`404.html`**, not a generic GitHub error.
- [ ] (Optional) Put full **`https://…`** URLs in **`og:image`** and **`twitter:image`** in **`index.html`** for nicer link previews.

---

## Summary checklist

- [ ] Name: `profile.firstName`, `profile.lastName`
- [ ] Intro under name: `heroIntroText` (or `headerText`)
- [ ] Contact: `profile` labels, handle, URL, email
- [ ] About: `aboutText`
- [ ] Footer: `footerNote`
- [ ] Pictures: `artPortfolioItems` and `advertisingPortfolioItems` (`src`, `caption`, `alt`)
- [ ] Image files placed under **`assets/`** with paths that match `src`
- [ ] (Optional) Fonts: **`--font-body`** / **`--font-heading`** in **`styles.css`** and Google Fonts `<link>` in **`index.html`**
- [ ] (Going live) Follow **[GITHUB-PAGES.md](GITHUB-PAGES.md)** — repo, Pages, custom domain, HTTPS

You are done when the site looks right in your browser after a refresh. There is no separate “build” step — it is a static site.
