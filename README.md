# SERVING Beta Tester Waitlist Landing Page

Landing page and email signup for **SERVING**—a local services marketplace connecting people who have skills and availability with people who need those services. Currently recruiting early testers for the Google Play closed test.

---

## 🚀 Live Demo & Deployment

- **Live Landing Page URL**: [http://serving-beta-waitlist-916923735465.s3-website-us-east-1.amazonaws.com](http://serving-beta-waitlist-916923735465.s3-website-us-east-1.amazonaws.com)
- **GitHub Repository**: [https://github.com/si3mshady/serving-beta-waitlist](https://github.com/si3mshady/serving-beta-waitlist)
- **Hosting Platform**: AWS S3 Static Website Hosting (`us-east-1`)

---

## 📂 Repository Structure

```
serving-beta-waitlist/
├── .github/
│   └── workflows/
│       └── deploy.yml            # CI/CD pipeline for automated build & deployment to S3
├── google-apps-script/
│   └── Code.gs                   # Google Apps Script code for Google Sheet integration
├── src/
│   ├── components/
│   │   ├── Header.tsx            # Navigation header & brand identity
│   │   ├── Hero.tsx              # Hero headline & primary CTA
│   │   ├── Problem.tsx           # Economic context & earnings problem statement
│   │   ├── ServingSolution.tsx   # Marketplace solution (Provider & Client cards)
│   │   ├── BetaContext.tsx       # Google Play closed test details & evaluation criteria
│   │   ├── SignupForm.tsx        # Email capture form with validation & status states
│   │   └── Footer.tsx            # Footer notice & GitHub link
│   ├── test/
│   │   └── setup.ts              # Vitest test setup
│   ├── App.tsx                   # Main React layout component
│   ├── App.test.tsx              # Comprehensive Vitest component & form integration tests
│   ├── config.ts                 # App configuration & script URL loader
│   ├── main.tsx                  # React entry point
│   ├── types.ts                  # TypeScript interfaces
│   └── vite-env.d.ts             # Vite & environment type definitions
├── index.html                    # Base HTML page template
├── vite.config.ts                # Vite & Vitest configuration
├── tsconfig.json                 # TypeScript compiler options
├── package.json                  # Scripts & dependencies
├── .env.example                  # Environment variables template
└── README.md                     # Project documentation
```

---

## 🛠️ Local Development

### 1. Prerequisites
- Node.js 18+ or 20+
- npm 9+

### 2. Installation
```bash
git clone git@github.com:si3mshady/serving-beta-waitlist.git
cd serving-beta-waitlist
npm install
```

### 3. Running Locally
Start the local development server:
```bash
npm run dev
```
Open [http://localhost:5173](http://localhost:5173) in your browser.

### 4. Running Tests
Run the Vitest test suite:
```bash
npm run test
```

### 5. Building for Production
Create an optimized static build in `dist/`:
```bash
npm run build
```

---

## 📊 Google Sheets Integration Setup

Submissions are stored directly in **Google Sheets** using Google Apps Script as a zero-cost, lightweight datastore.

### Step 1: Create a Google Sheet
1. Go to [Google Sheets](https://sheets.new) and create a blank spreadsheet.
2. Title it **`SERVING Beta Waitlist Submissions`**.

### Step 2: Add Google Apps Script
1. In your Google Sheet, click **Extensions > Apps Script**.
2. Replace any existing code in `Code.gs` with the code in `google-apps-script/Code.gs` of this repository.
3. Click **Save** (💾 icon).

### Step 3: Deploy as Web App
1. Click **Deploy > New deployment** in the top right.
2. Click the gear icon next to "Select type" and select **Web app**.
3. Configure the deployment parameters:
   - **Description**: `SERVING Waitlist API v1`
   - **Execute as**: `Me`
   - **Who has access**: `Anyone`
4. Click **Deploy**.
5. Grant permissions if prompted by Google (click *Advanced* > *Go to SERVING Waitlist (unsafe)*).
6. Copy the generated **Web App URL** (looks like `https://script.google.com/macros/s/AKfycb.../exec`).

### Where Submissions Appear
The script automatically formats column headers upon the first submission:
- **Timestamp** (ISO string)
- **Name**
- **Email**
- **Role / Interest** (`provider`, `client`, or `both`)
- **Signup Source** (`serving-beta-landing-page`)

Duplicate emails are automatically flagged by Google Apps Script and rejected with a friendly message.

---

## ⚙️ Environment Configuration

To point the landing page to your live Google Apps Script deployment URL:

### Local `.env` File
Create a `.env` file in the root directory:
```env
VITE_GOOGLE_SCRIPT_URL=https://script.google.com/macros/s/YOUR_APPS_SCRIPT_ID/exec
```

---

## 🚀 Deployment Guide

### Option 1: Direct Deploy to S3 (Recommended & Currently Live)
To manually deploy or update the live AWS S3 static website:

```bash
# 1. Build the production site
npm run build

# 2. Sync to S3 bucket
aws s3 sync dist/ s3://serving-beta-waitlist-916923735465 --delete
```

### Option 2: Automated GitHub Actions CI/CD
Whenever you push to the `main` branch, `.github/workflows/deploy.yml` can automatically build and sync updates to S3.

Configure the following secrets in **GitHub Repository Settings > Secrets and variables > Actions**:
- `VITE_GOOGLE_SCRIPT_URL`: Your Google Apps Script Web App URL
- `AWS_ACCESS_KEY_ID`: AWS Access Key
- `AWS_SECRET_ACCESS_KEY`: AWS Secret Key

---

## ✏️ How to Modify Copy or Configuration

### Changing Landing Page Copy
- **Hero Headline & Supporting Text**: Modify `src/components/Hero.tsx`.
- **Problem Statement**: Modify `src/components/Problem.tsx`.
- **Marketplace Provider/Client Breakdown**: Modify `src/components/ServingSolution.tsx`.
- **Closed Beta Details**: Modify `src/components/BetaContext.tsx`.
- **Form Heading & Success/Duplicate Messages**: Modify `src/components/SignupForm.tsx`.

### Changing Google Apps Script Endpoint
Update `VITE_GOOGLE_SCRIPT_URL` in `.env` (for local development) or in your deployment environment variables.

---

## 🔒 Security Principles
- No secret API keys or service account credentials are required or exposed in the frontend.
- Submissions call Google Apps Script via plain web requests.
- No passwords or sensitive personal identification numbers are requested or stored.
