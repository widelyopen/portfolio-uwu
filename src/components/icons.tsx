import type { ReactNode, SVGProps } from "react";

// Hand-drawn 24x24 line icons. They inherit the text colour via currentColor.
function Svg({ children, ...rest }: SVGProps<SVGSVGElement> & { children: ReactNode }) {
  return (
    <svg
      viewBox="0 0 24 24"
      width="22"
      height="22"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.75"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
      {...rest}
    >
      {children}
    </svg>
  );
}

export function HomeIcon(props: SVGProps<SVGSVGElement>) {
  return (
    <Svg {...props}>
      <path d="M3 11.5 12 4l9 7.5" />
      <path d="M5.5 10v9.5a.5.5 0 0 0 .5.5h4v-5.5h4V20h4a.5.5 0 0 0 .5-.5V10" />
    </Svg>
  );
}

export function MusicIcon(props: SVGProps<SVGSVGElement>) {
  return (
    <Svg {...props}>
      <path d="M9 18V5.5l10-2V16" />
      <circle cx="6.5" cy="18" r="2.5" />
      <circle cx="16.5" cy="16" r="2.5" />
    </Svg>
  );
}

export function FolderIcon(props: SVGProps<SVGSVGElement>) {
  return (
    <Svg {...props}>
      <path d="M3.5 7.5A1.5 1.5 0 0 1 5 6h4l2 2.5h8a1.5 1.5 0 0 1 1.5 1.5v8a1.5 1.5 0 0 1-1.5 1.5H5A1.5 1.5 0 0 1 3.5 18Z" />
    </Svg>
  );
}

export function ChatIcon(props: SVGProps<SVGSVGElement>) {
  return (
    <Svg {...props}>
      <path d="M5 5h14a2 2 0 0 1 2 2v8a2 2 0 0 1-2 2h-7l-4.5 3.5V17H5a2 2 0 0 1-2-2V7a2 2 0 0 1 2-2Z" />
      <path d="M8 10h8M8 13h5" />
    </Svg>
  );
}

export function ChevronIcon(props: SVGProps<SVGSVGElement>) {
  return (
    <Svg strokeWidth="2" {...props}>
      <path d="m9 6 6 6-6 6" />
    </Svg>
  );
}

// A simple filled drop, used as the "stains" mark.
export function StainIcon(props: SVGProps<SVGSVGElement>) {
  return (
    <Svg {...props} fill="currentColor" stroke="none">
      <path d="M12 2.8c3.6 4.3 6.2 7.5 6.2 10.8a6.2 6.2 0 0 1-12.4 0c0-3.3 2.6-6.5 6.2-10.8Z" />
    </Svg>
  );
}

export function SocialIcon(props: SVGProps<SVGSVGElement>) {
  return (
    <Svg {...props}>
      <circle cx="8" cy="9" r="2.5" />
      <circle cx="16" cy="9" r="2.5" />
      <path d="M3.5 18c.6-2.4 2.4-3.5 4.5-3.5s3.9 1.1 4.5 3.5" />
      <path d="M11.5 18c.6-2.4 2.4-3.5 4.5-3.5s3.9 1.1 4.5 3.5" />
    </Svg>
  );
}

export function DiscordIcon(props: SVGProps<SVGSVGElement>) {
  return (
    <Svg {...props} stroke="none" fill="currentColor">
      <path d="M19.3 5.4A16.4 16.4 0 0 0 15.3 4l-.2.4a15 15 0 0 1 3.7 1.8 14.2 14.2 0 0 0-12.6 0A15 15 0 0 1 9.9 4.4L9.7 4a16.4 16.4 0 0 0-4 1.4C2.9 9 2.2 12.5 2.5 16a16.7 16.7 0 0 0 5 2.5l.7-1.1a10.8 10.8 0 0 1-1.7-.8l.4-.3a11.8 11.8 0 0 0 10.2 0l.4.3c-.5.3-1.1.6-1.7.8l.7 1.1a16.7 16.7 0 0 0 5-2.5c.4-4 .1-7.5-1.2-10.6ZM9.1 13.9c-.8 0-1.5-.8-1.5-1.7s.7-1.7 1.5-1.7 1.5.8 1.5 1.7-.7 1.7-1.5 1.7Zm5.8 0c-.8 0-1.5-.8-1.5-1.7s.7-1.7 1.5-1.7 1.5.8 1.5 1.7-.7 1.7-1.5 1.7Z" />
    </Svg>
  );
}

export function TelegramIcon(props: SVGProps<SVGSVGElement>) {
  return (
    <Svg {...props} stroke="none" fill="currentColor">
      <path d="M20.7 4.3c.4-.2.8.2.7.6l-2.8 14.2c-.1.5-.6.7-1 .5l-5-2.5-2.5 2.4c-.3.3-.9.1-.9-.3V15l9-8.2c.2-.2 0-.5-.2-.4L7.3 13.4 3.6 12c-.5-.2-.5-.9.1-1.1l17-6.6Z" />
    </Svg>
  );
}

export function WspIcon(props: SVGProps<SVGSVGElement>) {
  return (
    <Svg {...props}>
      <circle cx="12" cy="12" r="8.5" />
      <path d="M8.5 12.5 11 15l4.5-5.5" />
    </Svg>
  );
}