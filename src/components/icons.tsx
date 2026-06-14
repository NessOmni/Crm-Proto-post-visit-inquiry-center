/* Minimal inline icons — no icon kit, offline-safe. */
import type { SVGProps } from "react";

const base = (props: SVGProps<SVGSVGElement>) => ({
  width: 18,
  height: 18,
  viewBox: "0 0 24 24",
  fill: "none",
  stroke: "currentColor",
  strokeWidth: 1.6,
  strokeLinecap: "round" as const,
  strokeLinejoin: "round" as const,
  ...props,
});

export const IconSearch = (p: SVGProps<SVGSVGElement>) => (
  <svg {...base({ width: 16, height: 16, ...p })}>
    <circle cx="11" cy="11" r="7" />
    <path d="m20 20-3.2-3.2" />
  </svg>
);

export const IconSliders = (p: SVGProps<SVGSVGElement>) => (
  <svg {...base({ width: 16, height: 16, ...p })}>
    <path d="M4 7h10M18 7h2M4 12h2M10 12h10M4 17h7M15 17h5" />
    <circle cx="16" cy="7" r="2" />
    <circle cx="8" cy="12" r="2" />
    <circle cx="13" cy="17" r="2" />
  </svg>
);

export const IconFilter = (p: SVGProps<SVGSVGElement>) => (
  <svg {...base({ width: 15, height: 15, ...p })}>
    <path d="M4 5h16l-6 7v6l-4 2v-8L4 5Z" />
  </svg>
);

export const IconPlus = (p: SVGProps<SVGSVGElement>) => (
  <svg {...base({ width: 15, height: 15, ...p })}>
    <path d="M12 5v14M5 12h14" />
  </svg>
);

export const IconChevronDown = (p: SVGProps<SVGSVGElement>) => (
  <svg {...base({ width: 14, height: 14, ...p })}>
    <path d="m6 9 6 6 6-6" />
  </svg>
);

export const IconChevronUp = (p: SVGProps<SVGSVGElement>) => (
  <svg {...base({ width: 14, height: 14, ...p })}>
    <path d="m6 15 6-6 6 6" />
  </svg>
);

export const IconBiens = (p: SVGProps<SVGSVGElement>) => (
  <svg {...base(p)}>
    <path d="M3 10.5 12 4l9 6.5" />
    <path d="M5 9.5V20h14V9.5" />
    <path d="M10 20v-6h4v6" />
  </svg>
);

/* Nav icons */
export const IconHome = (p: SVGProps<SVGSVGElement>) => (
  <svg {...base(p)}>
    <path d="M3 10.5 12 4l9 6.5" />
    <path d="M5 9.8V20h14V9.8" />
    <path d="M9.5 20v-5.5h5V20" />
  </svg>
);

export const IconActivity = (p: SVGProps<SVGSVGElement>) => (
  <svg {...base(p)}>
    <path d="M3 12h4l2.5-7 4 14 2.5-7H21" />
  </svg>
);

export const IconBuilding2 = (p: SVGProps<SVGSVGElement>) => (
  <svg {...base(p)}>
    <path d="M3 21h18" />
    <path d="M5 21V5a1 1 0 0 1 1-1h6a1 1 0 0 1 1 1v16" />
    <path d="M13 21V9a1 1 0 0 1 1-1h4a1 1 0 0 1 1 1v12" />
    <path d="M8 7h2M8 11h2M8 15h2M16 12h.01M16 16h.01" />
  </svg>
);

export const IconHandshake = (p: SVGProps<SVGSVGElement>) => (
  <svg {...base(p)}>
    <path d="m11 17 2 2a1 1 0 1 0 3-3" />
    <path d="m14 14 2.5 2.5a1 1 0 1 0 3-3l-3.88-3.88a3 3 0 0 0-4.24 0l-.88.88a1 1 0 1 1-3-3l2.81-2.81a5.8 5.8 0 0 1 7.06-.87l.47.28a2 2 0 0 0 1.42.25L21 4" />
    <path d="m21 3 1 11h-2" />
    <path d="M3 3 2 14l6.5 6.5a1 1 0 1 0 3-3" />
    <path d="M3 4h8" />
  </svg>
);

export const IconContacts = (p: SVGProps<SVGSVGElement>) => (
  <svg {...base(p)}>
    <circle cx="12" cy="8" r="3.4" />
    <path d="M5 19.5a7 7 0 0 1 14 0" />
  </svg>
);

export const IconAgenda = (p: SVGProps<SVGSVGElement>) => (
  <svg {...base(p)}>
    <rect x="4" y="5" width="16" height="16" rx="2.5" />
    <path d="M4 9.5h16M8 3.5v3M16 3.5v3" />
  </svg>
);

export const IconPerformance = (p: SVGProps<SVGSVGElement>) => (
  <svg {...base(p)}>
    <path d="M4 19.5h16" />
    <path d="M7 19.5v-6M12 19.5V8M17 19.5v-9" />
  </svg>
);

export const IconMic = (p: SVGProps<SVGSVGElement>) => (
  <svg {...base({ width: 20, height: 20, ...p })}>
    <rect x="9" y="3" width="6" height="11" rx="3" />
    <path d="M5.5 11a6.5 6.5 0 0 0 13 0M12 17.5V21" />
  </svg>
);

export const IconSend = (p: SVGProps<SVGSVGElement>) => (
  <svg {...base(p)}>
    <path d="M5 12h13M12 5.5 18.5 12 12 18.5" />
  </svg>
);

export const IconReplay = (p: SVGProps<SVGSVGElement>) => (
  <svg {...base({ width: 14, height: 14, ...p })}>
    <path d="M4 12a8 8 0 1 0 2.4-5.7" />
    <path d="M4 4v4h4" />
  </svg>
);

export const IconCheck = (p: SVGProps<SVGSVGElement>) => (
  <svg {...base({ width: 14, height: 14, ...p })}>
    <path d="M4.5 12.5 9.5 17.5 19.5 6.5" />
  </svg>
);

export const IconClose = (p: SVGProps<SVGSVGElement>) => (
  <svg {...base({ width: 16, height: 16, ...p })}>
    <path d="M6 6l12 12M18 6 6 18" />
  </svg>
);

export const IconArrow = (p: SVGProps<SVGSVGElement>) => (
  <svg {...base({ width: 15, height: 15, ...p })}>
    <path d="M5 12h13M12 5.5 18.5 12 12 18.5" />
  </svg>
);

export const IconUsers = (p: SVGProps<SVGSVGElement>) => (
  <svg {...base(p)}>
    <circle cx="9" cy="8" r="3" />
    <path d="M3.5 19a5.5 5.5 0 0 1 11 0M16 6a3 3 0 0 1 0 5.6M16.5 13.4A5.5 5.5 0 0 1 20.5 19" />
  </svg>
);

/* Workflow icons — one fixed icon per workflow (work-type channel). */
export const IconFileText = (p: SVGProps<SVGSVGElement>) => (
  <svg {...base(p)}>
    <path d="M14 3H7a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h10a2 2 0 0 0 2-2V8z" />
    <path d="M14 3v5h5" />
    <path d="M9 13h6M9 17h6" />
  </svg>
);

export const IconFileSignature = (p: SVGProps<SVGSVGElement>) => (
  <svg {...base(p)}>
    <path d="M14 3H7a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h10a2 2 0 0 0 2-2V8z" />
    <path d="M14 3v5h5" />
    <path d="M8 16c1-1.3 2-1.3 3 0s2 1.3 3 0" />
  </svg>
);

export const IconGauge = (p: SVGProps<SVGSVGElement>) => (
  <svg {...base(p)}>
    <path d="M4 15a8 8 0 1 1 16 0" />
    <path d="M12 15l4-3" />
    <circle cx="12" cy="15" r="1.1" />
  </svg>
);

export const IconPhone = (p: SVGProps<SVGSVGElement>) => (
  <svg {...base(p)}>
    <path d="M5 4h3l1.5 4-2 1.5a11 11 0 0 0 5 5l1.5-2 4 1.5v3a2 2 0 0 1-2.2 2A16 16 0 0 1 3 6.2 2 2 0 0 1 5 4Z" />
  </svg>
);

export const IconBellRing = (p: SVGProps<SVGSVGElement>) => (
  <svg {...base(p)}>
    <path d="M10.3 21a2 2 0 0 0 3.4 0" />
    <path d="M22 8c0-2.3-.8-4.3-2-6" />
    <path d="M3.26 15.33A1 1 0 0 0 4 17h16a1 1 0 0 0 .74-1.67C19.41 14 18 12.5 18 8A6 6 0 0 0 6 8c0 4.5-1.41 6-2.74 7.33" />
    <path d="M4 2C2.8 3.7 2 5.7 2 8" />
  </svg>
);

export const IconSpark = (p: SVGProps<SVGSVGElement>) => (
  <svg {...base({ width: 12, height: 12, ...p })}>
    <path d="M12 3l1.6 5.4L19 10l-5.4 1.6L12 17l-1.6-5.4L5 10l5.4-1.6L12 3Z" />
  </svg>
);

export const IconSparkles = (p: SVGProps<SVGSVGElement>) => (
  <svg {...base(p)}>
    <path d="M12 4l1.4 3.9L17 9.2l-3.6 1.3L12 14l-1.4-3.5L7 9.2l3.6-1.3L12 4Z" />
    <path d="M18.5 14l.7 1.9 1.8.6-1.8.7-.7 1.8-.7-1.8-1.8-.7 1.8-.6.7-1.9Z" />
  </svg>
);

export const IconMail = (p: SVGProps<SVGSVGElement>) => (
  <svg {...base(p)}>
    <rect x="3" y="5" width="18" height="14" rx="2" />
    <path d="m3.5 7 8.5 6 8.5-6" />
  </svg>
);

export const IconEdit = (p: SVGProps<SVGSVGElement>) => (
  <svg {...base({ width: 12, height: 12, ...p })}>
    <path d="M12 20h9" />
    <path d="M16.5 3.5a2 2 0 0 1 3 3L7 19l-4 1 1-4Z" />
  </svg>
);

export const IconUpload = (p: SVGProps<SVGSVGElement>) => (
  <svg {...base({ width: 16, height: 16, ...p })}>
    <path d="M12 15V4M8 8l4-4 4 4" />
    <path d="M5 16v2a2 2 0 0 0 2 2h10a2 2 0 0 0 2-2v-2" />
  </svg>
);

export const IconWaveform = (p: SVGProps<SVGSVGElement>) => (
  <svg {...base(p)}>
    <path d="M5 9v6M9 5v14M12 8v8M15 6v12M19 10v4" />
  </svg>
);

export const IconSidebar = (p: SVGProps<SVGSVGElement>) => (
  <svg {...base(p)}>
    <rect x="3.5" y="5" width="17" height="14" rx="2.5" />
    <path d="M9.5 5v14" />
  </svg>
);

export const IconChevronLeft = (p: SVGProps<SVGSVGElement>) => (
  <svg {...base({ width: 16, height: 16, ...p })}>
    <path d="M14.5 6 8.5 12l6 6" />
  </svg>
);

export const IconBold = (p: SVGProps<SVGSVGElement>) => (
  <svg {...base({ width: 15, height: 15, ...p })}>
    <path d="M7 5h6a3.5 3.5 0 0 1 0 7H7zM7 12h7a3.5 3.5 0 0 1 0 7H7z" />
  </svg>
);

export const IconItalic = (p: SVGProps<SVGSVGElement>) => (
  <svg {...base({ width: 15, height: 15, ...p })}>
    <path d="M14 5h-4M14 19h-4M14.5 5 9.5 19" />
  </svg>
);

export const IconList = (p: SVGProps<SVGSVGElement>) => (
  <svg {...base({ width: 15, height: 15, ...p })}>
    <path d="M9 7h11M9 12h11M9 17h11M4.5 7h.01M4.5 12h.01M4.5 17h.01" />
  </svg>
);

export const IconLink = (p: SVGProps<SVGSVGElement>) => (
  <svg {...base({ width: 15, height: 15, ...p })}>
    <path d="M10 14a4 4 0 0 0 5.66 0l2.5-2.5a4 4 0 0 0-5.66-5.66L11 7.3" />
    <path d="M14 10a4 4 0 0 0-5.66 0l-2.5 2.5a4 4 0 0 0 5.66 5.66L13 16.7" />
  </svg>
);

/* Citation source markers */
export const IconQuote = (p: SVGProps<SVGSVGElement>) => (
  <svg {...base({ width: 12, height: 12, ...p })}>
    <path d="M9 7H6a2 2 0 0 0-2 2v3a2 2 0 0 0 2 2h1.5L6 17M20 7h-3a2 2 0 0 0-2 2v3a2 2 0 0 0 2 2h1.5L17 17" />
  </svg>
);

export const IconWaveSrc = (p: SVGProps<SVGSVGElement>) => (
  <svg {...base({ width: 12, height: 12, ...p })}>
    <path d="M5 10v4M9 7v10M12 4v16M15 8v8M19 11v2" />
  </svg>
);

export const IconRecordSrc = (p: SVGProps<SVGSVGElement>) => (
  <svg {...base({ width: 12, height: 12, ...p })}>
    <rect x="4" y="5" width="16" height="14" rx="2" />
    <path d="M4 9h16" />
  </svg>
);
