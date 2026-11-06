import { TeamAvatar } from "@/components/team-avatar";
import { team } from "@/lib/team";
import { site } from "@/lib/site";

/** The five founders posed together — a group "photo" built from the avatars. */
export function TeamGroup({ className = "" }: { className?: string }) {
  // Staggered heights for a candid, posed look.
  const lift = ["translate-y-3", "-translate-y-2", "translate-y-4", "-translate-y-1", "translate-y-2"];

  return (
    <div
      className={`rounded-3xl bg-ink p-6 sm:p-8 ${className}`}
    >
      <span className="inline-flex items-center rounded-full bg-spark px-3 py-1 text-xs font-semibold tracking-[0.12em] text-white uppercase">
        The Bingo team
      </span>

      <div className="mt-10 flex items-end justify-center -space-x-5 sm:-space-x-6">
        {team.map((person, i) => (
          <div key={person.name} className={`${lift[i]} transition-transform`}>
            <TeamAvatar
              who={person.name}
              className="h-16 w-16 rounded-full ring-4 ring-ink sm:h-[4.75rem] sm:w-[4.75rem]"
            />
          </div>
        ))}
      </div>

      <p className="mt-10 text-center text-sm leading-relaxed text-sand-soft">
        Five founders, one studio. The people in the pitch are the people doing
        the work.
      </p>
      <p className="mt-2 text-center text-xs tracking-[0.16em] text-sand-ink uppercase">
        Since {site.founded}
      </p>
    </div>
  );
}
