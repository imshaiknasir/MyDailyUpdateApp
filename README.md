# Daily Update Generator

A modern web application built with Next.js and shadcn/ui to generate professional daily update emails.

## Features

- Modern, clean UI with shadcn/ui components
- Date selection
- Dynamic update fields
- AI-powered email generation using Groq
- Copy to clipboard functionality

## Setup

1. Clone the repository
2. Install dependencies:
   ```bash
   npm install
   ```
3. Create a `.env.local` file and add your Groq API key:
   ```
   GROQ_API_KEY=your_groq_api_key_here
   ```
4. Run the development server:
   ```bash
   npm run dev
   ```

## Usage

1. Select the date for your update
2. Add your daily update points using the "Add Update" button
3. Click "Generate Email" to create a professional email
4. Use the "Copy to Clipboard" button to copy the generated email

## Dependencies

- Next.js
- React
- shadcn/ui
- Groq
- date-fns
- Tailwind CSS 