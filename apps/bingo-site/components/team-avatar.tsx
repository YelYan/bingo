import type { Member } from "@/lib/team";

const ink = "#24272c";
const spark = "#e2622b";
const lift = "#f4813f";
const gold = "#f2b531";

/** Cute character per founder, drawn in the brand palette. Decorative: the name sits beside it. */
export function TeamAvatar({
  who,
  className = "",
}: {
  who: Member["name"];
  className?: string;
}) {
  const bg = {
    Jimmy: "#f8e3d6",
    Jerry: "#e7dccd",
    Jason: "#b9d2cc",
    Nick: "#fbe7b5",
    Noah: "#d4e4f1",
  }[who];
  const clip = `av-${who}`;

  return (
    <svg
      viewBox="0 0 120 120"
      aria-hidden="true"
      focusable="false"
      className={className}
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <defs>
        <clipPath id={clip}>
          <circle cx="60" cy="60" r="58" />
        </clipPath>
      </defs>
      <circle cx="60" cy="60" r="58" fill={bg} />
      <g clipPath={`url(#${clip})`} stroke={ink} strokeWidth="3.5">
        {who === "Jimmy" && (
          <>
            {/* robot: AI */}
            <rect x="38" y="88" width="44" height="40" rx="12" fill="#b79e8b" />
            <circle cx="60" cy="100" r="4.5" fill={spark} stroke="none" />
            <path d="M60 33V22" strokeWidth="3" />
            <circle cx="60" cy="19" r="5" fill={spark} />
            <rect x="19" y="50" width="10" height="20" rx="5" fill="#b79e8b" />
            <rect x="91" y="50" width="10" height="20" rx="5" fill="#b79e8b" />
            <rect x="27" y="33" width="66" height="54" rx="20" fill="#fff" />
            <rect x="35" y="43" width="50" height="34" rx="14" fill={ink} />
            <circle cx="49" cy="58" r="5" fill={lift} stroke="none" />
            <circle cx="71" cy="58" r="5" fill={lift} stroke="none" />
            <circle cx="50.6" cy="56.2" r="1.6" fill="#fff" stroke="none" />
            <circle cx="72.6" cy="56.2" r="1.6" fill="#fff" stroke="none" />
            <path d="M54 67q6 5 12 0" stroke={lift} strokeWidth="2.6" fill="none" />
          </>
        )}

        {who === "Jerry" && (
          <>
            {/* mouse: strategy */}
            <ellipse cx="60" cy="122" rx="36" ry="24" fill={ink} />
            <circle cx="33" cy="42" r="17" fill="#d9ccbc" />
            <circle cx="87" cy="42" r="17" fill="#d9ccbc" />
            <circle cx="33" cy="42" r="9" fill="#f4b8a0" strokeWidth="0" />
            <circle cx="87" cy="42" r="9" fill="#f4b8a0" strokeWidth="0" />
            <ellipse cx="60" cy="70" rx="31" ry="28" fill="#d9ccbc" />
            <circle cx="48" cy="66" r="9.5" fill="#fff" fillOpacity=".55" strokeWidth="2.6" />
            <circle cx="72" cy="66" r="9.5" fill="#fff" fillOpacity=".55" strokeWidth="2.6" />
            <path d="M57.5 66h5" strokeWidth="2.6" />
            <circle cx="48" cy="67" r="3.4" fill={ink} stroke="none" />
            <circle cx="72" cy="67" r="3.4" fill={ink} stroke="none" />
            <ellipse cx="60" cy="79" rx="4.5" ry="3.4" fill={spark} strokeWidth="0" />
            <path d="M54 85q6 5 12 0" strokeWidth="2.6" fill="none" />
            <path d="M24 78l-9-2M24 84l-9 3M96 78l9-2M96 84l9 3" strokeWidth="2" />
            <circle cx="60" cy="17" r="6.5" fill={gold} strokeWidth="2.6" />
            <path d="M57.5 25h5" strokeWidth="2.6" />
          </>
        )}

        {who === "Jason" && (
          <>
            {/* ram with the golden fleece: Jason and the Argonauts */}
            <ellipse cx="60" cy="122" rx="36" ry="24" fill="#14504a" />
            <path d="M37 50C14 40 8 70 28 76C21 68 26 58 36 58" strokeWidth="6" fill="none" stroke="#b79e8b" />
            <path d="M83 50C106 40 112 70 92 76C99 68 94 58 84 58" strokeWidth="6" fill="none" stroke="#b79e8b" />
            <g fill={gold}>
              <circle cx="42" cy="42" r="10" />
              <circle cx="56" cy="35" r="11" />
              <circle cx="72" cy="36" r="11" />
              <circle cx="82" cy="46" r="9" />
            </g>
            <ellipse cx="60" cy="70" rx="25" ry="27" fill="#f7f2ea" />
            <ellipse cx="60" cy="82" rx="14" ry="11" fill="#efe6da" strokeWidth="0" />
            <ellipse cx="60" cy="78" rx="4.5" ry="3.2" fill={ink} stroke="none" />
            <circle cx="50" cy="66" r="3.4" fill={ink} stroke="none" />
            <circle cx="70" cy="66" r="3.4" fill={ink} stroke="none" />
            <path d="M34 66C32 28 88 28 86 66" fill="none" strokeWidth="3.5" />
            <rect x="29" y="62" width="9" height="16" rx="4.5" fill={ink} />
            <rect x="82" y="62" width="9" height="16" rx="4.5" fill={ink} />
            <path d="M33 77q-1 12 15 11" fill="none" strokeWidth="2.6" />
            <circle cx="50" cy="88" r="3" fill={spark} stroke="none" />
          </>
        )}

        {who === "Nick" && (
          <>
            {/* fox: Nick */}
            <ellipse cx="60" cy="124" rx="36" ry="26" fill="#0e6b5b" />
            <path d="M54 104l6 10 6-10-6-5z" fill={gold} strokeWidth="2.6" />
            <path d="M28 26L50 46 24 58Z" fill={spark} />
            <path d="M92 26L70 46l26 12Z" fill={spark} />
            <path d="M32 38l11 9-12 5Z" fill="#fff" strokeWidth="0" />
            <path d="M88 38L77 47l12 5Z" fill="#fff" strokeWidth="0" />
            <path d="M23 64C23 46 40 41 60 41S97 46 97 64C97 82 76 92 60 100 44 92 23 82 23 64Z" fill={lift} />
            <path d="M38 75C47 70 54 77 60 77S73 70 82 75C77 88 67 94 60 97 53 94 43 88 38 75Z" fill="#fff" strokeWidth="2.6" />
            <ellipse cx="60" cy="82" rx="5" ry="3.6" fill={ink} stroke="none" />
            <ellipse cx="46" cy="63" rx="4" ry="4.8" fill={ink} stroke="none" />
            <ellipse cx="74" cy="63" rx="4" ry="4.8" fill={ink} stroke="none" />
            <circle cx="47.3" cy="61.4" r="1.4" fill="#fff" stroke="none" />
            <circle cx="75.3" cy="61.4" r="1.4" fill="#fff" stroke="none" />
            <path d="M40 53q6-4 12-1M68 52q6-3 12 1" fill="none" strokeWidth="2.6" />
            <path d="M54 89q6 4 12 0" fill="none" strokeWidth="2.4" />
          </>
        )}

        {who === "Noah" && (
          <>
            {/* dove after the flood, in a designer's beret */}
            <path d="M18 74C8 70 6 92 22 94" fill="#fff" strokeWidth="3" />
            <path d="M102 74C112 70 114 92 98 94" fill="#fff" strokeWidth="3" />
            <circle cx="60" cy="70" r="33" fill="#fff" />
            <path d="M52 40q-2-9 4-12M64 39q1-9 8-9" fill="none" strokeWidth="2.6" />
            <circle cx="49" cy="64" r="3.8" fill={ink} stroke="none" />
            <circle cx="71" cy="64" r="3.8" fill={ink} stroke="none" />
            <circle cx="50.3" cy="62.6" r="1.3" fill="#fff" stroke="none" />
            <circle cx="72.3" cy="62.6" r="1.3" fill="#fff" stroke="none" />
            <circle cx="40" cy="74" r="5" fill="#f4b8a0" stroke="none" />
            <circle cx="80" cy="74" r="5" fill="#f4b8a0" stroke="none" />
            <path d="M54 71h12l-6 10Z" fill={lift} strokeWidth="2.6" />
            <ellipse cx="62" cy="44" rx="28" ry="11" fill={spark} transform="rotate(-8 62 44)" />
            <circle cx="66" cy="33" r="3.6" fill={ink} stroke="none" />
            <path d="M80 100c10-2 16 4 16 12-9 1-17-3-16-12Z" fill="#0e6b5b" strokeWidth="2.6" />
            <path d="M80 100q6 6 14 11" fill="none" strokeWidth="2" />
          </>
        )}
      </g>
    </svg>
  );
}
