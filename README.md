Bangalore Tourism (Static)
A fast, accessible, SEO-friendly static site showcasing Bengaluru’s highlights.

How to run:

Download all files to a folder.

Open index.html in a browser.

No build step or server required.

Customize:

Colors and fonts: edit CSS variables in styles.css (:root).

Content: edit each HTML page and data/attractions.json for attractions.

Images: replace external Unsplash URLs with your own royalty-free images. Ensure descriptive alt text and responsive attributes (srcset/sizes).

Structure:

index.html (home)

attractions.html (filterable cards; loads data/attractions.json)

itineraries.html (1/2/3-day plans)

food-culture.html

plan.html

about.html (static contact form demo)

styles.css, main.js, site.webmanifest, favicon.svg

components/ (header/footer patterns)

data/attractions.json

Accessibility:

Semantic landmarks, skip link, focus styles, ARIA where appropriate.

Keyboard operable nav toggle, FAQs, and back-to-top.

Color contrast tuned for readability.

Performance:

Minimal JS, lazy-loaded images, critical CSS inlined on home.

No frameworks or analytics. Aim for 95+ Lighthouse across categories.

SEO:

Unique meta titles/descriptions, Open Graph tags.

JSON-LD on home (WebSite + TouristDestination context).

Notes:

Hours/fees can change; verify before publishing.

For includes, copy header/footer into each page or use server-side includes.

