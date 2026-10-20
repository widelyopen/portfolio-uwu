# Portfolio

React + TypeScript + Vite. Live Discord presence through [Lanyard](https://github.com/Phineas/lanyard).

## Setup

1. Join the Lanyard server (discord.gg/lanyard) with your account. Lanyard only tracks people who are in it.
2. Put your numeric Discord ID in `src/config.ts` (`discordId`), and edit the copy, projects and links there.
3. `npm install && npm run dev`

## Deploy to Vercel

Push to GitHub, import the repo on Vercel. It detects Vite on its own (build `npm run build`, output `dist`).
Or from the CLI: `npx vercel --prod`.
