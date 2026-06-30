# Kashi Trails | Luxury Varanasi Tour Packages & Spiritual Journeys

Welcome to **Kashi Trails**, a premium, high-aesthetic web application designed to offer luxury pilgrimage tour packages and curated spiritual journeys in Varanasi (Kashi), Sarnath, and Vindhyachal. 

The website features a modern, clean, and highly responsive layout, enriched with smooth micro-animations, custom glassmorphism components, and a custom CSS Grid gallery, fully integrated with a production-ready Node.js backend.

---

## 🌟 Key Features

- **Integrated Inquiry Booking System**: Customers can submit tour requests directly through the website. Inquiries are instantly saved to a MongoDB database and sent via secure email notifications using Nodemailer.
- **Transactional Consistency (Rollback)**: If database storage succeeds but email notifications fail (e.g. SMTP issues), the database writes are rolled back to keep your records in sync.
- **Sticky Navigation Bar**: Dynamic navbar that shrinks and changes background on scroll, with active section highlighting.
- **Responsive Mobile Menu**: Fully interactive hamburger overlay menu for mobile viewports.
- **Ethereal Hero Section**: A stunning introduction with floating statistics badges highlighting customer rating and count.
- **Curated Itineraries**: A day-by-day itinerary planner (Day 1: Arrival & Ghats, Day 2: Temples & BHU, Day 3: Excursion & Sarnath) with local thumbnail imagery.
- **Included Services**: A neat, hover-responsive features grid showing all standard amenities (hotels, guides, cars, pickup options).
- **Aligned CSS Grid Gallery**: A grid gallery utilizing custom height-balancing rows so that images align perfectly along the bottom, preventing uneven gaps.
- **Accordion FAQs**: Smooth collapsible FAQ accordion cards utilizing JavaScript height calculations.
- **Interactive Booking Form**: Client-side form validation with asynchronous backend integrations, spinner loaders, and custom modal feedback on successful submission.
- **Scroll Reveal Animations**: Element-reveal animations triggered dynamically on scroll using the browser's `IntersectionObserver` API.

---

## 🛠️ Technology Stack

### Frontend
- **Markup**: Semantic HTML5 structures.
- **Styles**: Custom CSS3 variables, Flexbox, CSS Grid layouts, custom cubic-bezier hover transitions, and responsive media queries (No external CSS frameworks).
- **Logic**: Vanilla JavaScript (ES6+) for UI toggles, DOM manipulation, form validation, and asynchronous fetch APIs.

### Backend
- **Runtime Environment**: Node.js
- **Server Framework**: Express.js
- **Database Object Modeling**: Mongoose / MongoDB
- **Mailing Client**: Nodemailer (via SMTP/Gmail App Passwords)
- **Validation**: validator.js

---

## 📂 Project Structure

```text
KashiTrails/
├── config/
│   └── db.js                 # Mongoose connection bootstrap
├── controllers/
│   └── inquiryController.js  # Request processing, server validation & rollback logic
├── models/
│   └── Inquiry.js            # Mongoose Inquiry schema with validation rules
├── routes/
│   └── inquiryRoutes.js      # Express API routes mapping
├── middleware/
│   └── errorHandler.js       # Centralized error handler
├── utils/
│   └── sendEmail.js          # Nodemailer SMTP transporter & templates
├── assets/
│   ├── css/
│   │   └── style.css         # Main stylesheet (Grid, Masonry, Variables, Media queries)
│   ├── js/
│   │   └── app.js            # Client-side scripting (Scroll observer, Toggles, Fetch submissions)
│   └── images/
│       └── ...               # Images & assets
├── index.html                # Main landing page markup
├── server.js                 # Express server root & bootstrapping
├── .env                      # Local environment configuration (Excluded from git)
├── .env.example              # Template environment configuration
├── package.json              # App dependencies and startup scripts
└── README.md                 # Project documentation
```

---

## 🚀 Running Locally

### 1. Prerequisites
Ensure you have the following installed on your machine:
- [Node.js](https://nodejs.org/) (v16+)
- [MongoDB](https://www.mongodb.com/) (Running locally on default port `27017` or a remote Atlas connection URI)

### 2. Configure Environment Variables
Create a `.env` file in the root directory (or copy `.env.example`) and fill in your database and SMTP details:
```env
PORT=5000
MONGODB_URI=mongodb://127.0.0.1:27017/kashitrails
SMTP_HOST=smtp.gmail.com
SMTP_PORT=587
SMTP_SECURE=false
SMTP_USER=kashitrials@gmail.com
SMTP_PASS=your-google-app-password
CONTACT_RECEIVER_EMAIL=kashitrials@gmail.com
```

### 3. Install Dependencies
Open a terminal in the project root directory and run:
```bash
npm install
```

### 4. Start the Application
Start the Express server:
```bash
# To run in production mode
npm start

# To run in development mode (with nodemon reload)
npm run dev
```

Then, open your web browser and navigate to:
[http://localhost:5000](http://localhost:5000)

---

## 📐 Layout Specifications

### Aligned Grid Gallery
The Destination Gallery section is structured with a custom CSS Grid layout defined in `style.css`:
- **Desktop (3 Columns)**: Items flow row-by-row and have custom heights set per row (`400px` for Row 1, `300px` for Row 2, `450px` for Row 3) to ensure a dynamic feel while keeping horizontal edges perfectly aligned.
- **Tablet (2 Columns)**: The grid shifts to 2 columns with a uniform item height of `300px`.
- **Mobile (1 Column)**: The grid shifts to a single column with a uniform item height of `250px`.
