# OpenTickets Front-End Theme

## Structure
- index.html — home / featured events
- faqs.html — FAQ page
- event-detail.html — event detail and booking card
- search-results.html — searchable/sortable event listing
- assets/css/style.css — custom theme styles and CSS variables
- assets/js/main.js — sticky header, Isotope filtering, search/sort
- assets/images/ — local placeholder artwork

## Dependencies
Bootstrap 5.3.3, Bootstrap Icons 1.11.3, and Isotope 3 are loaded from jsDelivr.
For a fully self-hosted production deployment, download/pin these assets locally and change the `<link>`/`<script>` paths.

## Important integration note
The live OpenTickets site currently exposes event listings, FAQs and event-detail content, but its production source/CSS and original event image assets are not publicly exposed through the HTML crawl. This package therefore preserves the familiar information architecture and event-filter pattern while using a clean custom visual system. Replace placeholder artwork with licensed production assets and connect the booking buttons/forms to the real checkout endpoints.
