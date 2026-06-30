# Kashi Trails | Luxury Varanasi Tour Packages & Spiritual Journeys

Welcome to **Kashi Trails**, a premium, high-aesthetic landing page designed to offer luxury pilgrimage tour packages and curated spiritual journeys in Varanasi (Kashi), Sarnath, and Vindhyachal. 

The website features a modern, clean, and highly responsive layout, enriched with smooth micro-animations, custom glassmorphism components, and a custom CSS Grid gallery.

---

## 🌟 Key Features

- **Sticky Navigation Bar**: Dynamic navbar that shrinks and changes background on scroll, with active section highlighting.
- **Responsive Mobile Menu**: Fully interactive hamburger overlay menu for mobile viewports.
- **Ethereal Hero Section**: A stunning introduction with floating statistics badges highlighting customer rating and count.
- **Curated Itineraries**: A day-by-day itinerary planner (Day 1: Arrival & Ghats, Day 2: Temples & BHU, Day 3: Excursion & Sarnath) with local thumbnail imagery.
- **Included Services**: A neat, hover-responsive features grid showing all standard amenities (hotels, guides, cars, pickup options).
- **Aligned CSS Grid Gallery**: A grid gallery utilizing custom height-balancing rows so that images align perfectly along the bottom, preventing uneven gaps.
- **Accordion FAQs**: Smooth collapsible FAQ accordion cards utilizing JavaScript height calculations.
- **Interactive Booking Form**: Client-side form validation with custom modal feedback on successful submission.
- **Scroll Reveal Animations**: Element-reveal animations triggered dynamically on scroll using the browser's `IntersectionObserver` API.

---

## 🛠️ Technology Stack

- **Markup**: Semantic HTML5 structures.
- **Styles**: Custom CSS3 variables, Flexbox, CSS Grid layouts, custom cubic-bezier hover transitions, and responsive media queries (No external CSS frameworks).
- **Logic**: Vanilla JavaScript (ES6+) for UI toggles, DOM manipulation, form validation, and scroll intersection observing.
- **Icons & Fonts**: 
  - [Google Fonts](https://fonts.google.com/) (Outfit / Playfair Display / Inter style family)
  - [Material Symbols Outlined](https://fonts.google.com/icons) for modern UI icons

---

## 📂 Project Structure

```text
KashiTrails/
├── .vscode/
│   └── settings.json         # Workspace local VS Code settings (Live Preview)
├── assets/
│   ├── css/
│   │   └── style.css         # Main stylesheet (Grid, Masonry, Variables, Media queries)
│   ├── js/
│   │   └── app.js            # Client-side scripting (Scroll observer, Toggles, Validation)
│   └── images/
│       ├── Assi Ghat.jpg     # Local gallery images
│       ├── boatRide.jpg
│       ├── dGhat.jpg
│       ├── KashiVishwanath.jpg
│       ├── Namaste.jpg
│       ├── Vindyachal.jpg
│       ├── SankatMochan.webp
│       ├── #varansi.jpg
│       ├── avatar_aditi.png   # Testimonial user avatars
│       ├── avatar_rajesh.png
│       └── avatar_robert.png
├── index.html                # Main landing page markup
└── README.md                 # Project documentation
```

---

## 🚀 Running Locally

Since this is a static frontend website, you can run it locally in a couple of easy ways:

### 1. Using Python (Recommended)
Open a terminal in the project directory and start Python's built-in HTTP server:
```bash
python -m http.server 8000
```
Then, open your web browser and navigate to:
[http://localhost:8000](http://localhost:8000)

### 2. Using VS Code Live Server / Live Preview Extension
1. Open the folder in **VS Code**.
2. Right-click on [index.html](file:///c:/Users/HP/OneDrive/Desktop/KashiTrails/index.html) and select **Open with Live Server** or use the **Live Preview** toggle.
3. The preview will automatically launch in your browser or editor pane.

---

## 📐 Layout Specifications

### Aligned Grid Gallery
The Destination Gallery section is structured with a custom CSS Grid layout defined in [style.css](file:///c:/Users/HP/OneDrive/Desktop/KashiTrails/assets/css/style.css):
- **Desktop (3 Columns)**: Items flow row-by-row and have custom heights set per row (`400px` for Row 1, `300px` for Row 2, `450px` for Row 3) to ensure a dynamic feel while keeping horizontal edges perfectly aligned.
- **Tablet (2 Columns)**: The grid shifts to 2 columns with a uniform item height of `300px`.
- **Mobile (1 Column)**: The grid shifts to a single column with a uniform item height of `250px`.
