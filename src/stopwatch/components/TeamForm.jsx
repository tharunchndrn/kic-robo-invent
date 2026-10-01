import { useState } from 'react'
import { isDuplicateName, normaliseName } from '../lib/competition.js'

const empty = { name: '', number: '', school: '' }

export default function TeamForm({ teams, onAdd }) {
  const [form, setForm] = useState(empty)
  const [error, setError] = useState('')

  const handleChange = (e) => {
    setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }))
    setError('')
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    const name = normaliseName(form.name)
    if (!name) return setError('Team name is required.')
    if (isDuplicateName(teams, name)) return setError(`“${name}” is already in the list.`)
    onAdd({ ...form, name })
    setForm(empty)
    e.currentTarget.elements.name.focus()
  }

  return (
    <form onSubmit={handleSubmit} className="panel p-5 sm:p-7" noValidate>
      <p className="eyebrow-bare text-ink-mute">
        Add a team to the queue <span className="text-ink-faint">&middot; number and school optional</span>
      </p>
      <div className="mt-5 grid sm:grid-cols-[2fr_1fr_2fr_auto] gap-x-6 gap-y-5 items-end">
        <label className="block">
          <span className="field-label">Team name</span>
          <input
            name="name"
            value={form.name}
            onChange={handleChange}
            placeholder="e.g. Circuit Breakers"
            autoComplete="off"
            aria-invalid={error ? true : undefined}
            aria-describedby={error ? 'team-form-error' : undefined}
            className="field mt-2"
          />
        </label>
        <label className="block">
          <span className="field-label">Team no.</span>
          <input name="number" value={form.number} onChange={handleChange} placeholder="07" autoComplete="off" className="field mt-2 tnum" />
        </label>
        <label className="block">
          <span className="field-label">School</span>
          <input name="school" value={form.school} onChange={handleChange} placeholder="Kingswood College" autoComplete="off" className="field mt-2" />
        </label>
        <button type="submit" className="btn btn-solid">
          Add team
        </button>
      </div>
      {error && (
        <p id="team-form-error" role="alert" className="mt-4 text-[13.5px] text-violet">
          {error}
        </p>
      )}
    </form>
  )
}
