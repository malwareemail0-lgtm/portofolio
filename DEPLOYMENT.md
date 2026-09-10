# Deploying Sushan Portfolio to GitHub Pages with GitHub Actions and a Custom Domain

This guide walks you step-by-step through deploying this website to **GitHub Pages** using **GitHub Actions** and connecting your own **custom domain** (e.g. `sushan.dev`, `sushanpaudyal.com.np`, or `infra.yourdomain.com`).

---

## 1. Project Pre-requisites

The project builds standard static files into `dist/` using:
```bash
npm install
npm run build
```

---

## 2. Create the GitHub Actions Workflow

In your repository, create a workflow configuration file at:
`.github/workflows/deploy.yml`

```yaml
name: Deploy to GitHub Pages

on:
  push:
    branches:
      - main # Change to 'master' if your default branch is master
  workflow_dispatch:

# Sets permissions of the GITHUB_TOKEN to allow deployment to GitHub Pages
permissions:
  contents: read
  pages: write
  id-token: write

# Allow one concurrent deployment
concurrency:
  group: 'pages'
  cancel-in-progress: true

jobs:
  build:
    runs-on: ubuntu-latest
    steps:
      - name: Checkout repository
        uses: actions/checkout@v4

      - name: Setup Node.js
        uses: actions/setup-node@v4
        with:
          node-version: 20
          cache: 'npm'

      - name: Install dependencies
        run: npm ci

      - name: Build site
        run: npm run build

      - name: Setup Pages
        uses: actions/configure-pages@v5

      - name: Upload artifact
        uses: actions/upload-pages-artifact@v3
        with:
          path: './dist'

  deploy:
    environment:
      name: github-pages
      url: ${{ steps.deployment.outputs.page_url }}
    runs-on: ubuntu-latest
    needs: build
    steps:
      - name: Deploy to GitHub Pages
        id: deployment
        uses: actions/deploy-pages@v4
```

---

## 3. Enable GitHub Pages in Repository Settings

1. Go to your repository on GitHub: `https://github.com/<your-username>/<your-repo>`.
2. Navigate to **Settings** → **Pages** (in the left sidebar under "Code and automation").
3. Under **Build and deployment**:
   - **Source**: Select **GitHub Actions**.

---

## 4. Configuring Your Custom Domain

There are two steps: telling GitHub your domain, and adding DNS records at your registrar (Cloudflare, Namecheap, GoDaddy, Route 53, etc.).

### Step A: Configure Domain in GitHub
In **Settings** → **Pages**:
1. In the **Custom domain** box, enter your domain name:
   - For an apex domain: `yourdomain.com`
   - For a subdomain: `infra.yourdomain.com` or `www.yourdomain.com`
2. Click **Save**.
3. (Optional but recommended) You can also create a file named `public/CNAME` containing just your domain name:
   ```txt
   yourdomain.com
   ```
   *Vite automatically copies files in `public/` into `dist/` on build, ensuring GitHub Pages never loses your custom domain setting on redeploys.*

### Step B: Configure DNS Records at your Domain Registrar

#### Option 1: Using an Apex / Root Domain (`example.com`)
Add four **A** records pointing to GitHub Pages servers:

| Type | Host / Name | Value | TTL |
| :--- | :--- | :--- | :--- |
| **A** | `@` | `185.199.108.153` | 3600 (or Auto) |
| **A** | `@` | `185.199.109.153` | 3600 (or Auto) |
| **A** | `@` | `185.199.110.153` | 3600 (or Auto) |
| **A** | `@` | `185.199.111.153` | 3600 (or Auto) |

*(Optional for IPv6)* Add four **AAAA** records:
| Type | Host / Name | Value |
| :--- | :--- | :--- |
| **AAAA** | `@` | `2606:50c0:8000::153` |
| **AAAA** | `@` | `2606:50c0:8001::153` |
| **AAAA** | `@` | `2606:50c0:8002::153` |
| **AAAA** | `@` | `2606:50c0:8003::153` |

Also add a **CNAME** for `www`:
| Type | Host / Name | Value |
| :--- | :--- | :--- |
| **CNAME** | `www` | `<your-username>.github.io` |

---

#### Option 2: Using a Subdomain (`infra.example.com` or `portfolio.example.com`)
Add a single **CNAME** record:

| Type | Host / Name | Value | TTL |
| :--- | :--- | :--- | :--- |
| **CNAME** | `infra` | `<your-username>.github.io` | 3600 |

---

## 5. Enable HTTPS Enforcement

1. Wait a few minutes for DNS to propagate (check with `dig +short yourdomain.com` or `nslookup yourdomain.com`).
2. Go back to GitHub **Settings** → **Pages**.
3. Under **Custom domain**, verify that DNS check passes with a green checkmark.
4. Check the box: **Enforce HTTPS** (GitHub will automatically provision a free Let's Encrypt TLS certificate).

---

## 6. Verification Commands

From your terminal, verify your DNS resolution:

```bash
# Check Apex A-records
dig +short yourdomain.com A

# Check Subdomain CNAME
dig +short infra.yourdomain.com CNAME

# Test TLS certificate handshake
openssl s_client -connect yourdomain.com:443 -servername yourdomain.com
```

---

## 7. Push & Auto-Deploy

Push your changes to your `main` branch:

```bash
git add .
git commit -m "feat: setup GitHub Actions deployment and custom domain"
git push origin main
```

Navigate to the **Actions** tab in your GitHub repository to watch the build pipeline deploy your site!
