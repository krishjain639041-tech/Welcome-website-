# MCC Contingent Leader Welcome Website

A lightweight, static, mobile-first welcome microsite for Contingent Leaders visiting Mulund College of Commerce. It reuses the local Spectrum artwork and event data in a dedicated MCC welcome experience.

## Features
- Cinematic welcome intro with 3D-style shield/title treatment, CSS confetti burst, skip option, and reduced-motion support
- Responsive cosmic-inspired design using local CSS and artwork
- Compact event cards showing artwork, event name, and venue only
- Square-cornered, independently scrollable event detail panels with description and event-head Call/WhatsApp actions
- Live countdown to the next scheduled event; after all scheduled times pass, the display changes to a welcome message
- Static CL, event coordinator, and event co-head contact cards with separate Call and WhatsApp links
- No registration links or buttons, backend, database, login, admin panel, or live-update system
- No remote fonts or image dependencies; suitable for low-bandwidth mobile access

## Run locally
1. Extract the ZIP.
2. Open `index.html` in a modern browser, or serve the folder using any static file server.
3. Deploy the `spectrum_build` folder to Vercel, GitHub Pages, or another static host.
4. Test all event cards, phone links, and WhatsApp links on a mobile device.
5. Generate the QR code only after confirming the final deployed URL.

## Update event details
Event names, descriptions, countdown dates, event-head names and phone numbers, and artwork filenames are stored in `content/site-data.js`. Venue labels are set in `cl.js`: On the Spot — Auditorium; Rangrezza — Auditorium; Mehendi Mania — Auditorium; Forge — Turf; Rush 1V1 — Turf; The Curse of Tumbbad — Auditorium. The separate general contact cards are in `index.html`.

## Important
The site is fully static and contains no registration links in its data or interface. Verify the event schedule, venue labels, contact numbers, and deployed URL before sharing the QR code.
