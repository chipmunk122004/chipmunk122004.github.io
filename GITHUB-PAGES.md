# Hosting your site on GitHub Pages (and using your own domain)

This guide is for people who are **not** GitHub experts. Follow the steps in order. If you get stuck, pause and come back later — **DNS changes can take up to a full day** to work everywhere.

**Official reference (for advanced checks):**  
[GitHub Docs — GitHub Pages](https://docs.github.com/en/pages) and [Managing a custom domain](https://docs.github.com/en/pages/configuring-a-custom-domain-for-your-github-pages-site/managing-a-custom-domain-for-your-github-pages-site).

---

## Words you will see in this guide

| Word | Meaning |
|------|--------|
| **Repository (“repo”)** | A folder of your project on GitHub’s servers. |
| **Branch** | A saved version of your files; this site uses **`main`**. |
| **Root** | The **top level** of the repo (not inside another folder). **`index.html` must live here.** |
| **Registrar** | The company where you **bought** your domain (GoDaddy, Namecheap, Cloudflare, Google Domains successor, etc.). |
| **DNS** | The “phone book” that tells the internet where your domain should send visitors. You edit DNS at your **registrar** (or at Cloudflare if you use it in front). |

---

## Part 1 — What you need before you start

1. A **GitHub account** (free): sign up at [github.com](https://github.com).
2. Your **website files** on your computer — the same folder as **`index.html`**, **`styles.css`**, **`script.js`**, **`site-content.js`**, **`404.html`**, and the **`assets`** folder with all images.
3. (Optional, for your own address) A **domain name** you already own, e.g. `example.com`.

You do **not** need to install special software if you use GitHub in the **web browser** to upload files (fine for small sites). Many people later use the **Git** app or command line; that is optional.

---

## Part 2 — Put your site on GitHub

### 2.1 Create a new repository

1. Log in to **GitHub**.
2. Click the **+** menu (top right) → **New repository**.
3. Choose a **Repository name** (letters, numbers, hyphens). Example: `my-portfolio`.
4. Leave it **Public** (GitHub **free** hosting for Pages usually needs the repo to be **public**, unless you use a paid GitHub plan that allows private Pages).
5. **Do not** add a README if you already have files on your computer — you want to **upload your real site** next.
6. Click **Create repository**.

### 2.2 Upload your files

1. Open your new empty repo on GitHub.
2. Use **“uploading an existing file”** (or drag-and-drop) and add **everything**:
   - `index.html` at the **root** (not inside a random subfolder)
   - `styles.css`, `script.js`, `site-content.js`, `404.html`, `README.md`, `GITHUB-PAGES.md`, etc.
   - The whole **`assets`** folder and everything inside it
3. Scroll down, type a short commit message (e.g. “Add website files”), click **Commit changes**.

**Important:** The live site will not show images if **`assets`** never got uploaded. Double-check the repo on GitHub: you should see `assets` as a folder when you browse the code.

---

## Part 3 — Turn on GitHub Pages

1. In the repo, click **Settings**.
2. In the left sidebar, click **Pages** (under “Code and automation”).
3. Under **Build and deployment** → **Source**, choose **Deploy from a branch**.
4. **Branch:** select **`main`** (or **`master`** if that is what your repo uses).  
   **Folder:** **`/ (root)`**.
5. Click **Save**.

After a minute or two, GitHub will show a **site URL**, usually:

`https://YOUR-USERNAME.github.io/YOUR-REPO-NAME/`

Open that link in your browser. You should see your homepage.  
If you see an error or old page, wait a few minutes and refresh — the first publish can be slow.

---

## Part 4 — Special case: `username.github.io` repository

If your repository name is **exactly** `yourusername.github.io` (your GitHub username in lowercase, then `.github.io`), GitHub often serves the site at:

`https://YOUR-USERNAME.github.io/`

…**without** the extra repo name in the path. That is optional; a normal named repo (Part 3) is perfectly fine for a personal site.

---

## Part 5 — Point your **custom domain** at GitHub Pages

You either use:

- **A “www” address** (e.g. `www.example.com`) — a bit simpler with GitHub, **or**
- **The naked domain** (e.g. `example.com` with **no** `www`)

Many people set up **both** so visitors land on one and the other still works. Your registrar may have a “redirect” option from `example.com` → `www.example.com` (or the reverse).

### 5.1 Tell GitHub what domain you want

1. Repo → **Settings** → **Pages**.
2. Under **Custom domain**, type your domain. Examples:
   - `www.example.com`, **or**
   - `example.com` (apex / root domain)
3. **Save**.  
   GitHub may show a message to configure DNS — that is normal.

GitHub may add or suggest a **`CNAME`** file in your repo. If GitHub creates it automatically, **leave it** unless you know you need to change it.

### 5.2 Add DNS records at your registrar

Log in where your **domain’s DNS** is managed. Open **DNS settings** for your domain.

**Always verify IP addresses in GitHub’s own help** in case they change. As of recent GitHub documentation, **apex** domains often use **four A records**:

| Type | Name / Host | Value / Points to |
|------|-------------|-------------------|
| **A** | `@` (or blank, or your root — depends on provider) | `185.199.108.153` |
| **A** | `@` | `185.199.109.153` |
| **A** | `@` | `185.199.110.153` |
| **A** | `@` | `185.199.111.153` |

Optional **IPv6** (AAAA) records also exist in GitHub’s docs; use them only if your registrar explains how.

For **`www`** as a **subdomain**, GitHub typically wants a **CNAME**:

| Type | Name / Host | Value / Points to |
|------|-------------|-------------------|
| **CNAME** | `www` | `YOUR-USERNAME.github.io` |

Replace **`YOUR-USERNAME`** with your real GitHub username (**no** `https://`).

**Note:** Some registrars use different labels (“Host”, “Name”, “Points to”). If unsure, search their help for “add CNAME” or “add A record”.

### 5.3 Wait, then check

- DNS can take **minutes to many hours** (occasionally up to **24–48 hours**).
- In **Settings → Pages**, GitHub may show whether the domain is verified or if something is wrong.

When it works, visiting your domain should show **your** site.

---

## Part 6 — Turn on HTTPS (secure padlock)

1. Repo → **Settings** → **Pages**.
2. After the custom domain is working, find **Enforce HTTPS** and **enable** it when GitHub allows (sometimes you must wait until the certificate is ready).

Visitors should then use **`https://`** links.

---

## Part 7 — Small fixes on this project after you know your final URL

1. **`404.html`**  
   If you use a **custom domain at the root**, the “Back to home” link as **`/`** is correct.  
   If you **do not** use a custom domain and your site only lives at  
   `https://YOUR-USERNAME.github.io/YOUR-REPO/`,  
   change that link to **`/YOUR-REPO/`** (see comments in **`README.md`**).

2. **Social previews (optional)**  
   In **`index.html`**, `og:image` and `twitter:image` can be updated to full URLs like  
   `https://www.yourdomain.com/assets/AM.svg`  
   so apps like Messages or Facebook show a reliable preview.

---

## Part 8 — When you change the site later

- Edit files on your computer, then **upload the changed files** to the same repo (or use Git to push).
- GitHub Pages **rebuilds** after each update; give it a minute and hard-refresh the site (**Ctrl+F5** or **Cmd+Shift+R**).

---

## If something goes wrong

1. **Did every file (especially `assets`) get uploaded?** Missing images often mean missing files in the repo.
2. **Is `index.html` at the repo root?** If it is buried inside another folder, Pages will not find it at the URL you expect.
3. **DNS:** If the domain is new or you just changed records, **wait** and try again later.
4. **Compare your setup** to GitHub’s current Pages and custom domain docs (linked at the top).

You can also ask a friend to open your GitHub URL (`yourusername.github.io/...`) — if that works but the custom domain does not, the problem is usually **DNS**, not your HTML.
