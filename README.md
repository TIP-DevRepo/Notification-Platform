# Notifyio — Notification Platform

Version: v0.0.01

## Stack

- Next.js 15 (App Router)
- React 18
- Twilio (SMS)
- Paubox (Email)

## Getting Started

```bash
npm install
npm run dev
```

Open http://localhost:3000 in your browser.

## Project Structure

```
notifyio/
├── next.config.js
├── jsconfig.json             # Path alias: @/ → src/
├── package.json
└── src/
    ├── app/                  # Next.js App Router
    │   ├── layout.jsx        # Root HTML shell (replaces index.html)
    │   ├── page.jsx          # Home route — renders <App />
    │   └── globals.css       # CSS reset
    │
    ├── App.jsx               # Root client component: routing + global state
    ├── theme.js              # Design tokens (colors, fonts)
    │
    ├── data/
    │   └── initialData.js    # Seed templates and send history
    │
    ├── icons/
    │   └── index.jsx         # All SVG icon components
    │
    ├── components/
    │   ├── layout/
    │   │   └── Sidebar.jsx   # Navigation sidebar
    │   └── ui/
    │       ├── Badge.jsx     # Channel and status badges
    │       ├── Button.jsx    # Btn (primary/secondary/ghost/danger)
    │       ├── Input.jsx     # Text input + masked credential input
    │       ├── Modal.jsx     # Reusable modal wrapper
    │       ├── Select.jsx    # Dropdown select
    │       ├── StatCard.jsx  # Dashboard metric card
    │       └── Textarea.jsx  # Multiline text input
    │
    └── views/
        ├── Dashboard.jsx     # Overview, stats, recent activity
        ├── Templates/
        │   ├── index.jsx     # Template list with filter tabs
        │   └── TemplateModal.jsx  # Create/edit template form
        ├── Send/
        │   └── index.jsx     # 3-step send flow
        └── Settings/
            └── index.jsx     # Twilio + Paubox config panels
```

## Next.js Notes

- All interactive components are marked `"use client"` at the top.
  Next.js App Router defaults to server components — any file that uses
  React hooks (useState, useEffect) or browser event handlers needs this.
- `src/app/layout.jsx` and `src/app/page.jsx` are server components —
  they just render the `<App />` shell which is itself a client component.
- The `@/` import alias maps to `src/` (configured in jsconfig.json).

## Where to Add Backend Logic

- **Twilio SMS:** `src/views/Send/index.jsx` → `handleSend()` → call a Next.js API route
- **Paubox Email:** same as above, separate route per channel
- **API Routes:** add under `src/app/api/` e.g. `src/app/api/send/sms/route.js`
- **Persist templates/history:** replace useState in `App.jsx` with server fetches
- **API keys:** store in `.env.local`, access only from API routes — never client-side

## Environment Variables

Create a `.env.local` file in the project root (never commit this):

```
TWILIO_ACCOUNT_SID=ACxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx
TWILIO_AUTH_TOKEN=your_auth_token
TWILIO_FROM_NUMBER=+13025550100

PAUBOX_API_KEY=your_paubox_api_key
PAUBOX_DOMAIN=yourcompany.com
PAUBOX_FROM_EMAIL=notifications@yourcompany.com
```