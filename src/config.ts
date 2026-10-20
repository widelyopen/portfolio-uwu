// Everything you'd want to edit lives here.

export const config = {
  // Your numeric Discord user ID (Settings > Advanced > Developer Mode, then right-click yourself > Copy User ID).
  // You also have to be in the Lanyard server (discord.gg/lanyard) or it can't see your presence.
  discordId: "244738370213773313",

  name: "Qio",
  tagline: "I build Discord bots and run the servers they live in.",

  // Optional banner image URL for the profile card. Leave empty for the default dusk gradient.
  banner: "",

  about: [
    "Mostly Python with discord.py and PostgreSQL, hosted on an Ubuntu VPS. I manage a handful of Discord communities, so most of what I build starts as something one of them needed.",
  ],

  stack: ["Python", "discord.py", "PostgreSQL", "Ubuntu", "TypeScript", "React"],

  projects: [
    {
      name: "Miami",
      description: "User-installable Discord bot. Slash commands only, works in any server or DM.",
      tags: ["Python", "discord.py"],
      href: "",
    },
    {
      name: "qiodb",
      description: "A discord.py bot with its data kept in PostgreSQL.",
      tags: ["Python", "PostgreSQL"],
      href: "",
    },
    {
      name: "Username drop detector",
      description: "Watches for Discord usernames that are about to become available.",
      tags: ["Python", "Discord"],
      href: "",
    },
    {
      name: "Hebik genoeg geslapen vannacht?",
      description: "A Dutch sleep debt calculator.",
      tags: ["Web"],
      href: "https://hebikgenoeggeslapenvannacht.nl",
    },
  ],

  links: [
    { label: "Discord", href: "https://discord.com/users/244738370213773313" },
    { label: "GitHub", href: "https://github.com/your-username" },
  ],
};
