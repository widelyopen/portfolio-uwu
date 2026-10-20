export interface Badge {
  icon: string;
  label: string;
}

const icon = (hash: string) => `https://cdn.discordapp.com/badge-icons/${hash}.png`;

// Discord public_flags bit -> badge. Lanyard includes public_flags on the user.
// Nitro, Server Booster and Quest-type badges aren't flags, so they only show up
// when the profile lookup in useBadges answers.
const FLAG_BADGES: { bit: number; label: string; hash: string }[] = [
  { bit: 1 << 0, label: "Discord Staff", hash: "5e74e9b61934fc1f67c65515d1f7e60d" },
  { bit: 1 << 1, label: "Partnered Server Owner", hash: "3f9748e53446a137a052f3454e2de41e" },
  { bit: 1 << 2, label: "HypeSquad Events", hash: "bf01d1073931f921909045f3a39fd264" },
  { bit: 1 << 3, label: "Discord Bug Hunter", hash: "2717692c7dca7289b35297368a940dd0" },
  { bit: 1 << 6, label: "HypeSquad Bravery", hash: "8a88d63823d8a71cd5e390baa45efa02" },
  { bit: 1 << 7, label: "HypeSquad Brilliance", hash: "011940fd013da3f7fb926e4a1cd2e618" },
  { bit: 1 << 8, label: "HypeSquad Balance", hash: "3aa41de486fa12454c3761e8e223442e" },
  { bit: 1 << 9, label: "Early Supporter", hash: "7060786766c9c840eb3019e725d2b358" },
  { bit: 1 << 14, label: "Discord Bug Hunter Gold", hash: "848f79194d4be5ff5f81505cbd0ce1e6" },
  { bit: 1 << 17, label: "Early Verified Bot Developer", hash: "6df5892e0f35b051f8b61eace34f4967" },
  { bit: 1 << 18, label: "Moderator Programs Alumni", hash: "fee1624003e2fee35cb398e125dc479b" },
  { bit: 1 << 22, label: "Active Developer", hash: "6bdc42827a38498929a4920da12695d9" },
];

export function flagBadges(flags: number): Badge[] {
  return FLAG_BADGES.filter((b) => (flags & b.bit) !== 0).map((b) => ({
    icon: icon(b.hash),
    label: b.label,
  }));
}

export const badgeIcon = icon;
