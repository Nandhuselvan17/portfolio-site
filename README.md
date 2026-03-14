# Murugan Muthu Selvan P – Portfolio

This is a premium, animated developer portfolio for **Murugan Muthu Selvan P**, built with:

- Next.js (App Router)
- TypeScript
- TailwindCSS
- Framer Motion
- OpenAI-powered AI chat assistant

## Running the project

1. Install dependencies:

```bash
npm install
```

2. Create a `.env.local` file in the project root:

```bash
OPENAI_API_KEY=your_openai_api_key_here
```

3. Start the dev server:

```bash
npm run dev
```

Then open `http://localhost:3000` in your browser.

## AI Chat

The floating **Ask About Murugan** chat in the bottom-right corner uses the `/api/chat` route to talk to OpenAI and can answer questions about:

- Skills
- Experience
- Projects
- Contact details

## Resume

Place your resume file at `public/resume.pdf`. The **View Resume** button in the hero section opens a modal that displays this PDF.

