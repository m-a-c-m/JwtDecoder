# 🔓 Decodificador JWT Online Gratis

**Free JWT Decoder.** Decode any JSON Web Token instantly. View header and payload as formatted JSON with syntax highlighting, check standard claims (exp, iat, sub, iss, aud), verify token expiry with exact date. No sign-up, no ads, 100% client-side.

🌐 **Demo en vivo / Live demo:** [miguelacm.es/tools/jwt-decoder](https://miguelacm.es/tools/jwt-decoder)

[![Next.js](https://img.shields.io/badge/Next.js-16-black?logo=next.js)](https://nextjs.org)
[![TypeScript](https://img.shields.io/badge/TypeScript-5-blue?logo=typescript)](https://www.typescriptlang.org)
[![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS-4-06B6D4?logo=tailwindcss)](https://tailwindcss.com)
[![License: MIT](https://img.shields.io/badge/License-MIT-green)](LICENSE)

---

## ✨ Features

- **Decodificación base64url / base64url decoding:** Decodes header and payload from base64url format
- **JSON formateado / Formatted JSON:** Color syntax highlighting for keys (blue), strings (green), numbers (yellow), booleans (orange)
- **Verificación exp / Expiry check:** Automatically detects exp claim and shows if token is expired with exact date
- **Claims estándar / Standard claims:** Highlights sub, iss, aud, iat, exp, nbf, jti with human-readable dates
- **Copiar partes / Copy parts:** Copy header or payload JSON formatted with one click
- **Ejemplo incluido / Sample included:** Load a sample JWT to test the tool instantly
- **Sin servidor / Zero server:** All decoding happens in the browser — nothing sent to a server
- **Open source:** MIT license, use it freely

---

## 🚀 Quick start

```bash
git clone https://github.com/m-a-c-m/JwtDecoder.git
cd JwtDecoder
npm install
npm run dev
```

Open [http://localhost:3000](http://localhost:3000).

### Environment variables (optional)

```env
NEXT_PUBLIC_SITE_URL=https://miguelacm.es/tools/jwt-decoder
NEXT_PUBLIC_EMBED_URL=https://miguelacm.es/embed/jwt-decoder
```

---

## 📦 Embed on your website

### Iframe (plug & play)

```html
<iframe
  src="https://miguelacm.es/embed/jwt-decoder"
  width="100%"
  height="700"
  style="border:none;border-radius:12px;"
  title="JWT Decoder — miguelacm.es"
  loading="lazy"
></iframe>
```

### Link with attribution (recommended for backlink)

```html
<a href="https://miguelacm.es/tools/jwt-decoder" target="_blank" rel="noopener">
  Decodificador JWT gratis por MACM
</a>
```

> 💡 The link option generates a real backlink that benefits the project. Recommended if your platform supports custom HTML.

---

## 🛠 Tech Stack

| Technology | Version | Purpose |
|---|---|---|
| [Next.js](https://nextjs.org) | 16 | React framework + SSG |
| [TypeScript](https://www.typescriptlang.org) | 5 | Type safety |
| [Tailwind CSS](https://tailwindcss.com) | 4 | Styling |
| [react-icons](https://react-icons.github.io/react-icons/) | 5 | Icons |

---

## 📄 License

MIT © [Miguel Ángel Colorado Marin (MACM)](https://miguelacm.es)

Built with ❤️ by **[MACM](https://miguelacm.es)** — Full Stack Developer & Cybersecurity Specialist from Guadalajara, Spain.

- 🌐 Portfolio: [miguelacm.es](https://miguelacm.es)
- 💼 LinkedIn: [linkedin.com/in/macm](https://www.linkedin.com/in/macm/)
- 🐙 GitHub: [github.com/m-a-c-m](https://github.com/m-a-c-m)
