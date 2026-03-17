# NEW_FEATURES_PLAN.md — Product Roadmap

This roadmap is now aligned with the clarified product direction:

- This repository contains the **landing page**, the **free version** of the CV builder, and **reusable components**
- The **paid version** will be developed separately in a **private repository**
- **Authorization is not required for the free version** for now

---

## DONE

These items are already implemented in this repository.

### 1. Reset Button
- Reset modal added
- Reset layout / styling
- Reset CV data
- Reset everything

### 2. Cookie Consent
- GDPR-friendly cookie consent added
- Analytics are gated by consent

### 3. Layout 2 — US/Canada Single Column
- Layout switching is implemented
- US single-column layout is available
- Mobile defaults to the US layout

### 4. CV Language Selection
- CV language selector added
- Default section titles supported for:
  - `en`
  - `pl`
  - `de`
  - `es`
  - `fr`
  - `it`
  - `pt`

### 5. Analytics
- Analytics integration is present
- Key product events are tracked
- Consent rules are respected

### 6. UI Internationalization
- UI translations added for:
  - `en`
  - `pl`
  - `de`
  - `es`
  - `fr`
  - `it`
  - `pt`
- Browser language auto-detection added
- Toolbar language switcher added

### 7. Defects Already Fixed
- Sidebar spacing issue after hiding contact items
- Sidebar text resize issue for email / LinkedIn
- Body spacing minimum value
- Sidebar spacing minimum value
- Section title max value
- Mobile drawer tab labels
- About Me list rendering issue

### 8. Custom Sections in Elements Drawer
- Custom sections now appear in the Elements drawer
- Custom sections can be drag-reordered alongside built-in sections
- Custom section order is persisted in settings state
- Rendering is synced between `cvStore` data and `settingsStore` order state
- New custom sections start empty and use inline `Add text` / `Add point` actions
- Legacy custom-section content is migrated to the new item-based model

### 9. List vs Plain Text Toggle per Main Section
- Main sections now use inline `Add text` / `Add point` actions instead of drawer controls
- Content items can mix plain text blocks and bullet-style points within the same section
- Existing saved CV data is migrated to the new item-based model
- Mixed text/point rendering is applied in both classic and US layouts

### 10. Landing Page + App Routing
- Pre-rendered static landing page added at `/`
- Pre-rendered localized landing pages added at:
  - `/pl`
  - `/de`
  - `/es`
  - `/fr`
  - `/it`
  - `/pt`
- Editor moved to `/app`
- Sticky marketing header added with logo, language links, and `Create CV` CTA
- Warm multilingual landing copy added for:
  - `en`
  - `pl`
  - `de`
  - `es`
  - `fr`
  - `it`
  - `pt`
- Hero, features, workflow, FAQ, and CTA sections added
- HTML-first metadata, canonical URLs, and alternate language links added for landing pages

---

## FREE VERSION PLAN

Goal: ship a **complete, polished, SEO-ready free product** in this repository.

These are the items still needed to finish the free version.

### 0. ATS Friendly CV Structure - audit, update, and landing page messaging
**Priority:** Highest
**Why:** ATS compatibility is a key product value and should be audited and improved if needed before the free version launch. It also deserves clear communication on the landing page.

- Audit Current CV Data Model
  -   Analyze the current CV data model used in the application.
  -   Verify whether it supports a structure compatible with ATS
    (Applicant Tracking Systems).
  -   Identify required vs optional sections.
  -   Detect potential ATS parsing issues (unclear section naming, overly
    nested structures).
  -   Suggest simplifications that make exporting ATS‑friendly CVs easier.  
- Align Data Model with ATS Standards
  - Update the CV schema so it supports common ATS‑recognized sections.
  - Core sections: - personalInformation - summary - experience - skills - education
  - Optional sections: - projects - certifications - publications - languages - awards - volunteering
  - Requirements: - all sections must be optional - structure should remain flat and easy to serialize - use clear ATS‑friendly field names  
- Standardize Experience and Skills
  - Update the model of professional experience:
    -   jobTitle
    -   company   -   location
    -   startDate
    -   endDate
    -   responsibilities (array of bullet points)
    -   achievements (optional)
  - Update the skills structure:
    -   skills should be stored as a simple array of strings
    -   avoid levels, percentages, or graphical indicators
    -   optional grouping allowed
  - Example: 
    ```json
    skills: [
      "React",
      "TypeScript",
      "REST API",
      "Git"
    ]
    ```
- Ensure ATS‑Friendly CV Export and Validation
  - Implement export logic that generates ATS‑compatible CV documents:
    -   single‑column layout
    -   no tables or complex layout structures
    -   standard section headers:
      -   Personal Information
      -   Summary
      -   Experience
      -   Skills
      -   Education
      -   Projects
      -   Certifications
      -   Publications
      -   Languages
      -   Awards
      -   Volunteering
  - Validate the exported CVs with popular ATS parsers to ensure compatibility
  - Update landing page messaging to highlight ATS compatibility as a key feature
  - Add a section in the landing page that explains what ATS is and why it matters for job seekers
  - Use clear, benefit-focused language to communicate that CVs created with this tool will be optimized for ATS parsing, increasing the chances of getting noticed by recruiters and hiring managers.
  

### 1. SEO Basics
**Priority:** High  
**Why:** The landing page needs strong SEO foundations from the start.

- ✅ Finalize `title`, `meta description`, OG tags, and `twitter:card`
- ✅ Add or refine `sitemap.xml` and `robots.txt`
- ✅ Add structured data (`WebPage`, `WebApplication`, `FAQPage` via `@graph`)
- ✅ Add a social preview image in `/public` (`og-image.png` 1200×630)
- ✅ Canonical URLs, hreflang alternate links, www→non-www 301 redirect
- ✅ Target keywords in localized meta descriptions
- Perform a Lighthouse SEO/content pass (remaining)

### 2. Export Flow: Print or Direct PDF Download
**Priority:** High  
**Why:** Export is a core value moment in the free product, and a clearer flow can improve UX while creating a natural place for future monetization messaging.

- Keep a single toolbar button: `Export PDF`
- Open a modal where the user chooses:
  - `Print`
  - `Download PDF`
- Keep `Print` on the current browser print flow
- Implement `Download PDF` as a real direct PDF file download, not a print-dialog workaround
- Show a short loading/progress modal while the PDF is being prepared
- Use that waiting state for lightweight messaging such as:
  - future premium upgrade teaser
  - voluntary contribution prompt
- Keep promotional messaging subtle, skippable, and non-blocking
- Add analytics for:
  - export modal opened
  - print chosen
  - PDF download chosen
  - PDF generation/download completed
- Validate PDF fidelity carefully:
  - layout parity with preview
  - pagination
  - fonts
  - spacing
  - mobile behavior

### 3. Free Version Final Polish Pass
**Priority:** Medium  
**Why:** Before calling the free version done, the whole flow should feel production-ready.

- Review mobile experience end-to-end
- Review print/PDF fidelity end-to-end
- Review local persistence/reset flows
- Review empty states and default content
- Review landing page → app conversion flow

### 4.Footer with Contact, Policies and Links
**Priority:** Low  
**Why:** A footer with contact info, policies, and links can enhance credibility and provide users with ways to connect, but it’s not critical for the initial free version launch.

- Add a simple footer to the landing page and app with:
  - Contact email
  - Links to Privacy Policy and Terms of Service
  - Optional links (e.g. GitHub)

### Free Version Completion Definition

The free version can be considered complete when:

- the landing page is live
- the editor lives at `/app`
- SEO basics are in place
- export supports both print and direct PDF download from one clear flow
- the current free editing experience is polished and consistent
- custom sections and inline text/point section content behave correctly
- no login is required for normal usage

---

## PAID VERSION PLAN

Goal: define what belongs in the future **private paid repository**, not in the core free app roadmap.

These items are intentionally separated from the free version scope.

### 1. User Registration & Auth
**Why paid/private:** account-based functionality belongs to the paid ecosystem, not the free MVP.

- Email/password auth
- OAuth providers
- Session handling
- Protected paid features
- Account UI

### 2. Multiple CVs + Retention
**Why paid/private:** requires backend storage and account ownership.

- Multiple CV management
- Dashboard/list view
- Persistence beyond local browser storage
- Retention / expiry rules if needed

### 3. Payments
**Why paid/private:** this is the commercial layer and should live outside the free repository.

- Stripe integration
- Subscription lifecycle handling
- Plan management / billing portal
- Upgrade prompts and entitlement checks

### 4. Send PDF via Email
**Why paid/private:** needs backend generation, delivery, and likely paid gating.

- Server-side PDF generation
- Email delivery integration
- Limits / quotas
- Paid feature exposure

### 5. Paid-Only Layouts 3 & 4
**Why paid/private:** these were originally planned as paid differentiators.

- Layout 3: Top Header + Two Columns
- Layout 4: Creative / Accent Line
- Feature gating based on subscription

### 6. Paid-Product Integration Layer
**Why paid/private:** the paid product will be separate, but it may still consume shared building blocks from this repository.

- Reuse shared UI components where possible
- Define clean boundaries between free and paid surfaces
- Keep free app independent even if paid product is loaded separately

---

## OUT OF SCOPE FOR FREE VERSION (FOR NOW)

- Mandatory user accounts
- Backend database for standard usage
- Payment flows
- Paid entitlements
- Email sending features
- Subscription-gated layouts

---

## RECOMMENDED EXECUTION ORDER

### Free Version
1. SEO Basics
2. Export flow: print or direct PDF download
3. Final polish pass

### Paid Version (separate repository)
1. Auth
2. Multiple CVs
3. Payments
4. Paid-only layouts
5. Send PDF via Email

---

## Notes

- This roadmap intentionally removes auth/backend requirements from the free version path
- The free product should remain valuable and complete even without any account system
- Reusable components created here should make future paid-version work easier, but should not force paid architecture into this repository too early
