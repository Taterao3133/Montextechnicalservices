export function Icon({ name }) {
  const paths = {
    ac: (
      <>
        <path d="M24 4v40M10 12l28 24M38 12 10 36" />
        <path d="M15 6l9 9 9-9M15 42l9-9 9 9" />
      </>
    ),
    electric: <path d="M27 3 10 28h13l-3 17 18-27H25l2-15Z" />,
    plumbing: (
      <>
        <path d="M13 12h22M18 12V7h12v5M24 12v12M12 32h24" />
        <path d="M12 32a6 6 0 1 0 12 0M36 32a6 6 0 1 1-12 0" />
      </>
    ),
    paint: <path d="M8 10h25a7 7 0 0 1 0 14H20v7h-7v-7H8V10ZM16 31v12" />,
    ceiling: <path d="M7 12h34v20H7V12ZM13 18h22M13 25h22M18 32l-4 8M30 32l4 8" />,
    cleaning: <path d="M10 40h28M14 40V22l10-12 10 12v18M20 40V27h8v13M34 8v10M29 13h10" />,
    users: <path d="M17 24a7 7 0 1 0 0-14 7 7 0 0 0 0 14ZM31 23a6 6 0 1 0 0-12M5 41c1-8 6-13 12-13s11 5 12 13M28 31c5 1 9 5 10 10" />,
    building: <path d="M12 42V8h24v34M18 16h4M26 16h4M18 24h4M26 24h4M18 32h4M26 32h4M8 42h32" />,
    worker: <path d="M14 21a10 10 0 0 1 20 0M12 21h24M17 21v-5M31 21v-5M18 26a8 8 0 0 0 12 0M16 42v-5a8 8 0 0 1 16 0v5" />,
    shield: <path d="M24 5 39 11v11c0 10-6 17-15 21C15 39 9 32 9 22V11l15-6ZM18 24l4 4 8-9" />,
    phone: <path d="M15 8 9 14c1 13 12 24 25 25l6-6-9-8-5 4c-4-2-7-5-9-9l4-5-6-7Z" />,
    chat: (
      <>
        <path d="M24 7a17 17 0 0 0-14 27l-2 7 8-2A17 17 0 1 0 24 7Z" />
        <path d="M18 17c1 7 6 12 13 13l3-4-5-3-2 2c-3-1-5-3-6-6l2-2-3-5-2 5Z" />
      </>
    ),
    check: <path d="M10 25 19 34 38 14" />
  };

  return (
    <svg className="icon" viewBox="0 0 48 48" aria-hidden="true">
      {paths[name]}
    </svg>
  );
}
