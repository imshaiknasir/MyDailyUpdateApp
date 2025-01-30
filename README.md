# Daily Update Generator

A modern web application built with Next.js and shadcn/ui to generate professional daily update emails.

## Features

- Modern, clean UI with shadcn/ui components
- Date selection
- Dynamic update fields
- AI-powered email generation using Groq
- Copy to clipboard functionality
- Automated deployment to GitHub Pages

## Tech Stack

- Next.js 14.1.0
- React 18.2.0
- TypeScript 5.3.3
- Tailwind CSS 3.4.1
- shadcn/ui
- Groq SDK 0.13.0
- date-fns 4.1.0

## Setup

1. Clone the repository
2. Install dependencies:
   ```bash
   npm ci
   ```
3. Create a `.env.local` file and add your Groq API key:
   ```
   GROQ_API_KEY=your_groq_api_key_here
   ```
4. Run the development server:
   ```bash
   npm run dev
   ```

## Development

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run start` - Start production server
- `npm run lint` - Run ESLint

## Deployment

The app automatically deploys to GitHub Pages via GitHub Actions when changes are pushed to the main branch. The workflow:

1. Builds the Next.js app
2. Deploys to GitHub Pages using the `peaceiris/actions-gh-pages@v3` action
3. Requires `GROQ_API_KEY` secret to be set in repository settings

Visit the deployed app at: https://imshaiknasir.github.io/MyDailyUpdateApp

## Usage

1. Select the date for your update
2. Add your daily update points using the "Add Update" button
3. Click "Generate Email" to create a professional email
4. Use the "Copy to Clipboard" button to copy the generated email 