import { STAGES, STATUS, totalMs } from '../lib/competition.js'
import { formatMs } from '../lib/format.js'
import { StatusChip } from './ui.jsx'

/*
 * Every team, in queue order, with its three stage times and total.
 * Recorded times are buttons — click one to correct it.
 *
 * The layout follows the panel's own width (a container query), not the
 * viewport's: a fixed-layout table when there's room for it, stacked cards
 * when there isn't. Nothing ever scrolls sideways.
 */
export default function TeamTable({ state, onSelect, onStart, onEditTime, onRequeue, onRemove }) {
  const { teams, run, selectedTeamId } = state

  if (teams.length === 0) {
    return (
      <div className="panel px-6 py-14 text-center">
        <p className="eyebrow-bare text-ink-faint">No teams yet</p>
        <p className="mt-3 text-[15px] text-ink-soft">Teams you add will queue up here in running order.</p>
      </div>
    )
  }

  const rows = teams.map((team, i) => {
    const isRunningTeam = run?.teamId === team.id
    const isSelected = !run && selectedTeamId === team.id
    return {
      team,
      order: String(i + 1).padStart(2, '0'),
      isRunningTeam,
      isSelected,
      highlighted: isRunningTeam || isSelected,
      selectable: team.status === STATUS.queued,
      liveStage: isRunningTeam ? run.stageIndex : null,
      actions: (
        <RowActions
          team={team}
          isSelected={isSelected}
          isRunningTeam={isRunningTeam}
          runActive={run != null}
          onSelect={onSelect}
          onStart={onStart}
          onRequeue={onRequeue}
          onRemove={onRemove}
        />
      ),
    }
  })

  const rowTone = (r) =>
    r.highlighted ? 'bg-flare/[0.07]' : r.selectable ? 'hover:bg-ink/[0.03] cursor-pointer' : ''

  return (
    <div className="panel @container overflow-hidden">
      {/* Wide: table */}
      <table className="hidden @min-[54rem]:table w-full table-fixed text-left">
        <colgroup>
          <col className="w-14" />
          <col />
          <col className="w-32" />
          <col className="w-24" />
          <col className="w-24" />
          <col className="w-24" />
          <col className="w-26" />
          <col className="w-46" />
        </colgroup>
        <thead>
          <tr className="border-b border-rule">
            {['#', 'Team', 'Status', ...STAGES, 'Total', ''].map((h, i) => (
              <th
                key={h || i}
                scope="col"
                className={`eyebrow-bare text-ink-faint font-medium py-4 px-3 first:pl-6 last:pr-6 ${i >= 3 && i <= 6 ? 'text-right' : ''}`}
              >
                {h}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {rows.map((r) => (
            <tr
              key={r.team.id}
              aria-selected={r.isSelected}
              onClick={() => r.selectable && onSelect(r.team.id)}
              className={`border-b border-rule-soft last:border-b-0 transition-colors duration-200 ${rowTone(r)}`}
            >
              <td className={`py-3.5 px-3 pl-6 font-mono tnum text-[12px] text-ink-faint border-l-2 ${r.highlighted ? 'border-flare' : 'border-transparent'}`}>
                {r.order}
              </td>
              <td className="py-3.5 px-3">
                <TeamName team={r.team} />
              </td>
              <td className="py-3.5 px-3">
                <StatusChip status={r.team.status} />
              </td>
              {r.team.stages.map((stage, s) => (
                <td key={STAGES[s]} className="py-3.5 px-3 text-right font-mono tnum text-[13.5px]">
                  <StageCell team={r.team} stage={stage} index={s} live={r.liveStage === s} onEditTime={onEditTime} />
                </td>
              ))}
              <td className="py-3.5 px-3 text-right font-mono tnum text-[14px] font-semibold">
                <TotalCell team={r.team} />
              </td>
              <td className="py-3.5 px-3 pr-6" onClick={(e) => e.stopPropagation()}>
                {r.actions}
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      {/* Narrow: cards */}
      <ul className="@min-[54rem]:hidden">
        {rows.map((r) => (
          <li
            key={r.team.id}
            aria-selected={r.isSelected}
            onClick={() => r.selectable && onSelect(r.team.id)}
            className={`border-b border-rule-soft last:border-b-0 border-l-2 px-5 py-4 transition-colors duration-200 ${
              r.highlighted ? 'border-l-flare' : 'border-l-transparent'
            } ${rowTone(r)}`}
          >
            <div className="flex items-start gap-3">
              <span className="pt-0.5 font-mono tnum text-[12px] text-ink-faint">{r.order}</span>
              <div className="min-w-0 flex-1">
                <TeamName team={r.team} />
              </div>
              <StatusChip status={r.team.status} />
            </div>

            <dl className="mt-3.5 grid grid-cols-4 gap-2 pl-7">
              {r.team.stages.map((stage, s) => (
                <div key={STAGES[s]} className="min-w-0">
                  <dt className="eyebrow-bare text-ink-faint">{STAGES[s]}</dt>
                  <dd className="mt-1.5 font-mono tnum text-[13px]">
                    <StageCell team={r.team} stage={stage} index={s} live={r.liveStage === s} onEditTime={onEditTime} />
                  </dd>
                </div>
              ))}
              <div className="min-w-0">
                <dt className="eyebrow-bare text-ink-faint">Total</dt>
                <dd className="mt-1.5 font-mono tnum text-[13px] font-semibold">
                  <TotalCell team={r.team} />
                </dd>
              </div>
            </dl>

            <div className="mt-3.5 pl-7 empty:hidden" onClick={(e) => e.stopPropagation()}>
              {r.actions}
            </div>
          </li>
        ))}
      </ul>
    </div>
  )
}

function TeamName({ team }) {
  return (
    <>
      <p className="font-semibold text-[15px] tracking-[-0.01em] truncate" title={team.name}>
        {team.name}
      </p>
      {(team.number || team.school) && (
        <p className="mt-0.5 text-[12.5px] text-ink-mute truncate">
          {[team.number && `No. ${team.number}`, team.school].filter(Boolean).join(' · ')}
        </p>
      )}
    </>
  )
}

function StageCell({ team, stage, index, live, onEditTime }) {
  if (live) return <span className="text-flare uppercase text-[11px] tracking-[0.14em]">Live</span>
  if (!stage) return <span className="text-ink-faint">—</span>
  return (
    <button
      type="button"
      onClick={(e) => {
        e.stopPropagation()
        onEditTime(team, index)
      }}
      aria-label={`Correct ${team.name} ${STAGES[index]} time`}
      title="Correct this time"
      className={`ulink ${stage.status === 'dnf' ? 'text-violet' : 'text-ink'}`}
    >
      {stage.status === 'dnf' ? 'DNF' : formatMs(stage.ms)}
    </button>
  )
}

function TotalCell({ team }) {
  const total = totalMs(team)
  if (total != null) return <span className="text-ink">{formatMs(total)}</span>
  if (team.status === STATUS.dnf) return <span className="text-violet">DNF</span>
  return <span className="text-ink-faint">—</span>
}

function RowActions({ team, isSelected, isRunningTeam, runActive, onSelect, onStart, onRequeue, onRemove }) {
  const finished = team.status === STATUS.completed || team.status === STATUS.dnf
  if (isRunningTeam) return null

  return (
    <div className="flex flex-wrap justify-end @max-[54rem]:justify-start gap-1.5">
      {team.status === STATUS.queued && isSelected && (
        <RowButton onClick={() => onStart(team.id)} strong>Start</RowButton>
      )}
      {team.status === STATUS.queued && !isSelected && !runActive && (
        <RowButton onClick={() => onSelect(team.id)}>Select</RowButton>
      )}
      {finished && <RowButton onClick={() => onRequeue(team)}>Re-run</RowButton>}
      <RowButton onClick={() => onRemove(team)}>Remove</RowButton>
    </div>
  )
}

function RowButton({ children, onClick, strong = false }) {
  return (
    <button
      type="button"
      onClick={onClick}
      className={`btn px-3 py-2 text-[10px] tracking-[0.12em] ${strong ? 'btn-flare' : 'btn-ghost'}`}
    >
      {children}
    </button>
  )
}
