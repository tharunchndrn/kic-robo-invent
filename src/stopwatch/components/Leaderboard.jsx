import { STAGES } from '../lib/competition.js'
import { formatMs } from '../lib/format.js'
import { RANK_BY_TOTAL, rankTeams } from '../lib/ranking.js'
import { ArenaTag } from './ui.jsx'

const RANK_OPTIONS = [
  { value: RANK_BY_TOTAL, label: 'Total' },
  ...STAGES.map((name, i) => ({ value: String(i), label: name })),
]

export function RankTabs({ by, onChange }) {
  return (
    <div role="tablist" aria-label="Rank by" className="inline-flex flex-wrap gap-1 rounded-full border border-rule p-1">
      {RANK_OPTIONS.map((opt) => (
        <button
          key={opt.value}
          type="button"
          role="tab"
          aria-selected={by === opt.value}
          onClick={() => onChange(opt.value)}
          className={`font-mono text-[10px] tracking-[0.14em] uppercase rounded-full px-3.5 py-2 transition-colors duration-300 ${
            by === opt.value ? 'bg-ink text-paper' : 'text-ink-mute hover:text-ink'
          }`}
        >
          {opt.label}
        </button>
      ))}
    </div>
  )
}

// Per-size classes. `md` sits in a panel on the console; `lg` is the
// standings screen; `compact` is the strip under an arena display's clock,
// scaled to the screen's height so it fits any board.
const sizes = {
  md: {
    list: 'panel px-2 sm:px-3 py-1', empty: 'panel px-6 py-14 text-center', row: 'px-3 sm:px-4 py-3.5',
    rank: 'w-9 text-2xl', name: 'text-[15px]', note: 'text-[12.5px]', value: 'text-[15px]',
  },
  lg: {
    list: '', empty: 'py-10', row: 'py-4 lg:py-5',
    rank: 'w-12 text-3xl xl:w-16 xl:text-5xl', name: 'text-xl xl:text-3xl', note: 'text-base', value: 'text-xl xl:text-4xl',
  },
  compact: {
    inline: true, list: '', empty: 'py-4', row: 'py-[0.9vh]',
    rank: 'w-[3.5vh] text-[clamp(1.1rem,3vh,2.25rem)]', name: 'text-[clamp(1rem,2.4vh,1.75rem)]',
    note: 'text-[clamp(0.75rem,1.6vh,1.1rem)]', value: 'text-[clamp(1rem,2.6vh,2rem)]',
  },
}

/*
 * Ranked results. `limit` / `from` take a slice of the ranking, for screens
 * that can't scroll.
 */
export default function Leaderboard({ teams, by = RANK_BY_TOTAL, size = 'md', limit, from = 0, emptyText }) {
  const rows = rankTeams(teams, by)
  const shown = rows.slice(from, limit ? from + limit : undefined)
  const c = sizes[size] ?? sizes.md
  const stage = by === RANK_BY_TOTAL ? null : STAGES[Number(by)]

  if (shown.length === 0) {
    if (from > 0) return null
    return (
      <div className={c.empty}>
        <p className="eyebrow-bare text-ink-faint">No results yet</p>
        <p className="mt-3 text-[15px] text-ink-soft">
          {emptyText ?? (stage ? 'Teams appear here once they finish their run.' : 'Finished runs are ranked here by total time.')}
        </p>
      </div>
    )
  }

  return (
    <ol className={c.list}>
      {shown.map(({ team, rank, value, completed, cleared }) => {
        const lead = rank === 1
        const note =
          rank == null ? `DNF ${stage}`
          : !completed ? `DNF · ${cleared}/${STAGES.length} stages`
          : null

        return (
          <li
            key={team.id}
            className={`flex items-center gap-3 sm:gap-6 border-b border-rule-soft last:border-b-0 ${c.row}`}
          >
            <span
              className={`shrink-0 font-display font-semibold tnum tracking-[-0.04em] text-right ${c.rank} ${lead ? 'text-flare' : rank == null ? 'text-ink-faint' : 'text-ink-soft'}`}
            >
              {rank == null ? '–' : String(rank).padStart(2, '0')}
            </span>
            <div className="min-w-0 flex-1">
              <p className={`font-semibold tracking-[-0.02em] truncate ${c.name}`}>
                {team.arena && <ArenaTag id={team.arena} big={size === 'lg'} />}
                {team.name}
                {c.inline && (note || team.school) && (
                  <span className={`ml-3 font-normal tracking-normal ${c.note} ${note ? 'text-violet' : 'text-ink-mute'}`}>
                    {note ?? team.school}
                  </span>
                )}
              </p>
              {!c.inline && (note || team.school) && (
                <p className={`mt-0.5 truncate ${c.note} ${note ? 'text-violet' : 'text-ink-mute'}`}>
                  {note ?? team.school}
                </p>
              )}
            </div>
            <span
              className={`shrink-0 font-mono tnum ${c.value} ${
                value == null ? 'text-ink-faint' : completed ? (lead ? 'text-flare' : 'text-ink') : 'text-ink-mute'
              }`}
            >
              {value == null ? '—' : formatMs(value)}
            </span>
          </li>
        )
      })}
    </ol>
  )
}
