# 📄 MyCeeVee — Free Online CV & Resume Builder

**[myceevee.com](https://myceevee.com)** — Create a professional CV or resume in minutes, directly in your browser. No account required, no data sent to any server. Your CV stays on your device.

---

## 🤔 What is MyCeeVee?

MyCeeVee is a free, open-source CV and resume builder that runs entirely in the browser. Click any field to edit it, drag sections to reorder them, tweak colors and fonts — then export a pixel-perfect PDF with one click.

Everything you type is saved locally in your browser (localStorage). Nothing is uploaded anywhere.

> 🎓 **Built for learning** — This project was created as a hands-on exercise in modern front-end development. It's a playground for exploring React, TypeScript, Vite, Tailwind CSS, state management with Zustand, internationalization, print-accurate CSS layouts, and real-world SEO. Contributions, feedback, and ideas are welcome!

---

## ✨ Features

### 📐 Two professional layouts
- **Classic** — two-column European-style CV with a dark sidebar. Great for designers, developers, and anyone in creative or tech fields.
- **US Resume** — clean single-column layout, ATS-optimized. Ideal for job applications and recruiter workflows in the US and Canada.

### ✏️ Click-to-edit
Edit your CV directly on the page — click any text to change it. No forms, no sidebars, no separate edit view.

### 📝 Full content control
- Personal info: name, job title, location, email, website, GitHub, LinkedIn
- Professional summary
- Work experience with role, company, location, period, and bullet points
- Education
- Languages
- Certifications
- Skills
- Custom sections — add as many as you need

### 🤖 ATS-friendly design
Applicant Tracking Systems (ATS) are the software recruiters use to filter resumes before a human ever reads them. MyCeeVee is built with ATS compatibility in mind:

- **Single-column US Resume layout** keeps all content in a single, linear reading order — exactly what ATS parsers expect
- **Standard section headings** (Experience, Education, Skills …) match the labels ATS engines look for
- **Plain-text skills & languages** — no icons, no progress bars, no charts that confuse parsers
- **Semantic HTML structure** — headings, lists, and paragraphs are used correctly so parsers can extract data reliably
- **PDF export via browser print** — produces a real text-based PDF (not an image), so every word is selectable and searchable

> 💡 **Tip:** If you're applying through an online portal that scans resumes, use the **US Resume** layout for the best ATS results. The **Classic** layout is perfect for direct sends, portfolios, and personal websites.

### 🎨 Customization
- **Colors** — primary and accent color pickers
- **Typography** — choose from 5 typefaces (System UI, Inter, Lato, Merriweather, Playfair Display)
- **Font sizes** — separate controls for sidebar/header, section titles, body text, and your name
- **Spacing** — line height controls per zone
- **Photo** — upload a profile photo, control its size and shape (square → circle)
- **Visibility** — show or hide any element (photo, title, contact items, entire sections)
- **Element order** — drag and drop to reorder sidebar/header items and main sections
- **Contact icons** — show or hide icons next to contact details (US layout)

### 📤 Export
- One-click **Export PDF** via the browser's print-to-PDF dialog
- PDF is automatically named after you — `your-name-cv.pdf`
- Print layout matches the on-screen preview exactly

### 📱 Mobile friendly
- Scales to fit any screen width
- Defaults to the single-column US Resume layout on mobile for easier editing

### 🌍 Internationalization
- UI available in **English, Polish, German, Spanish, French, Italian, and Portuguese**
- CV section title defaults can also be switched between those languages

### 🔒 Privacy first
- Zero backend — all data lives in your browser's localStorage
- No cookies for tracking (GDPR-compliant cookie consent included)
- No login, no account, no email required

---

## 🛠️ Tech stack

React · TypeScript · Vite · Tailwind CSS · Zustand · Font Awesome

---

## 🚀 Development

```bash
npm install
npm run dev
```

Build for production:

```bash
npm run build
```

---

## 📜 License

Open source. Feel free to fork, learn from, and build upon it.
