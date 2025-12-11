# Animals Australia Survey Dashboard

A React-based analytics dashboard for displaying survey results.

## Sections

- **Overview** - Executive summary (Coming Soon)
- **About You** (Q1-3) - Demographics, discovery channels, political leanings ✓
- **Your Values & Views** (Q4-9) - Coming Soon
- **Your Support** (Q10-13) - Coming Soon
- **Your Satisfaction** (Q14-18) - Coming Soon

## Local Development

```bash
# Install dependencies
npm install

# Start development server
npm start
```

The app will run at `http://localhost:3000`

## Deployment to Netlify

### Option 1: Deploy via Git (Recommended)

1. Push this folder to a GitHub/GitLab repository
2. Connect the repo to Netlify
3. Netlify will auto-detect the settings from `netlify.toml`

### Option 2: Manual Deploy

1. Run `npm run build` locally
2. Drag and drop the `build` folder to Netlify

## Tech Stack

- React 18
- React Router 6
- Recharts (for visualisations)
- Hosted on Netlify

## Project Structure

```
aa-survey-dashboard/
├── public/
│   └── index.html
├── src/
│   ├── sections/
│   │   └── AboutYouSection.jsx
│   ├── App.js
│   └── index.js
├── netlify.toml
├── package.json
└── README.md
```
