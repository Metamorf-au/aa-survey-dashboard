# Animals Australia Survey Dashboard

A React-based analytics dashboard for displaying survey results.

## Sections

- **Overview** - Executive summary (Coming Soon)
- **About You** (Q1-3) - Demographics, discovery channels, political leanings ✓
- **Your Values & Views** (Q4-9) - Causes & priorities (Q4 complete, Q5-9 coming soon)
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

1. Run `npm install && npm run build`
2. Drag the `build` folder to [app.netlify.com/drop](https://app.netlify.com/drop)

## Project Structure

```
aa-survey-dashboard/
├── src/
│   ├── sections/
│   │   ├── AboutYouSection.jsx    (Q1-3) ✓
│   │   └── ValuesViewsSection.jsx (Q4-9) - Q4 complete
│   ├── App.js
│   └── index.js
├── public/index.html
├── netlify.toml
└── package.json
```
