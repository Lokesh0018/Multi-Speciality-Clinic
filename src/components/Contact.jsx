import { useState } from 'react'
import { ArrowRight, ArrowUpRight, CalendarDays, Clock, MapPin, MessageSquareText, Phone, ShieldCheck, User } from 'lucide-react'
import { branches, clinic, specialities } from '../content/clinic'
import { linkProps, telHref, whatsappHref } from '../lib/links'
import { WhatsAppIcon } from './ui/primitives'

const initial = { name: '', phone: '', speciality: '', branch: '', date: '', note: '' }

/** ECG trace echoing the heartbeat line in the logo's cross. */
const ECG = 'M0 10 H40 L46 10 L50 3 L55 17 L60 6 L64 10 H120'

/** A contact method row on the navy panel. */
function Method({ href, icon: Icon, title, detail, accent = false, label }) {
  return (
    <a
      {...linkProps(href)}
      aria-label={label}
      className={`group flex min-h-16 cursor-pointer items-center gap-4 rounded-2xl border p-4 transition-[background-color,border-color,transform] duration-300 ease-[var(--ease-cinematic)] hover:-translate-y-0.5 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-paper-50 motion-reduce:hover:translate-y-0 ${
        accent ? 'border-crimson-400/60 bg-crimson-500 hover:bg-crimson-400' : 'border-paper-50/[0.12] bg-paper-50/[0.05] hover:border-paper-50/25 hover:bg-paper-50/[0.09]'
      }`}
    >
      <span className={`grid size-11 shrink-0 place-items-center rounded-xl ${accent ? 'bg-paper-50 text-crimson-600' : 'bg-paper-50/10 text-blush-300 ring-1 ring-paper-50/15'}`}>
        <Icon className="size-5" />
      </span>
      <span className="min-w-0 flex-1">
        <span className="block font-semibold">{title}</span>
        <span className={`mt-0.5 block truncate text-sm ${accent ? 'text-paper-50/85' : 'text-paper-200/75'}`}>{detail}</span>
      </span>
      <ArrowUpRight aria-hidden="true" className="size-5 shrink-0 opacity-70 transition-transform duration-300 group-hover:-translate-y-0.5 group-hover:translate-x-0.5 group-hover:opacity-100" />
    </a>
  )
}

/** Choice chips backed by real radio inputs (keyboard: arrows move within the group). */
function Chips({ legend, name, options, value, onChange }) {
  return (
    <fieldset>
      <legend className="field-label">{legend}</legend>
      <div className="flex flex-wrap gap-2">
        {options.map((o) => {
          const on = value === o.value
          return (
            <label
              key={o.value || 'any'}
              className={`inline-flex min-h-11 cursor-pointer items-center gap-2 rounded-full border px-4 text-sm font-semibold transition-colors duration-200 has-[:focus-visible]:outline-2 has-[:focus-visible]:outline-offset-2 has-[:focus-visible]:outline-crimson-500 ${
                on ? 'border-navy-900 bg-navy-900 text-paper-50' : 'border-navy-900/15 bg-paper-50 text-navy-800 hover:border-crimson-400 hover:text-crimson-600'
              }`}
            >
              <input type="radio" name={name} value={o.value} checked={on} onChange={() => onChange(o.value)} className="sr-only" />
              <span aria-hidden="true" className={`size-1.5 rounded-full transition-colors ${on ? 'bg-crimson-400' : 'bg-navy-900/25'}`} />
              {o.label}
            </label>
          )
        })}
      </div>
    </fieldset>
  )
}

export default function Contact() {
  const [form, setForm] = useState(initial)
  const [errors, setErrors] = useState({})
  const [notice, setNotice] = useState('')

  const set = (k) => (e) => setForm((f) => ({ ...f, [k]: e.target.value }))
  const pick = (k) => (v) => setForm((f) => ({ ...f, [k]: v }))

  const submit = (e) => {
    e.preventDefault()
    const next = {}
    if (!form.name.trim()) next.name = 'Please enter your name.'
    if (!/^[+\d][\d\s-]{7,}$/.test(form.phone.trim())) next.phone = 'Please enter a valid phone number.'
    setErrors(next)
    if (Object.keys(next).length) return

    const msg = [
      `Hello ${clinic.name}, I would like to request an appointment.`,
      `Name: ${form.name}`,
      `Phone: ${form.phone}`,
      form.speciality && `Speciality: ${form.speciality}`,
      form.branch && `Branch: ${form.branch}`,
      form.date && `Preferred date: ${form.date}`,
      form.note && `Note: ${form.note}`,
    ]
      .filter(Boolean)
      .join('\n')

    const href = whatsappHref(msg)
    if (href.startsWith('http')) {
      window.open(href, '_blank', 'noopener,noreferrer')
      setNotice('WhatsApp has opened with your details — please review and send the message.')
    } else {
      setNotice('Online enquiries are not yet connected. Please call the clinic directly.')
    }
  }

  const fieldIcon = 'pointer-events-none absolute left-4 top-1/2 size-[18px] -translate-y-1/2 text-navy-900/40 transition-colors peer-focus:text-crimson-500'

  return (
    <section id="contact" aria-labelledby="contact-title" className="px-3 pb-3 md:px-5 md:pb-5">
      <div className="relative isolate overflow-hidden rounded-[2rem] bg-navy-900 text-paper-50 md:rounded-[2.5rem]">
        <div className="grain absolute inset-0 -z-10" />
        <div className="absolute -left-40 -top-40 -z-10 size-[36rem] rounded-full bg-[radial-gradient(circle,rgb(96_134_214/0.2),transparent_65%)]" aria-hidden="true" />
        <div className="absolute -bottom-48 -right-32 -z-10 size-[34rem] rounded-full bg-[radial-gradient(circle,rgb(214_60_70/0.2),transparent_65%)]" aria-hidden="true" />
        <div aria-hidden="true" className="absolute inset-0 -z-10 opacity-60 [background-image:linear-gradient(rgb(255_255_255/0.035)_1px,transparent_1px),linear-gradient(90deg,rgb(255_255_255/0.035)_1px,transparent_1px)] [background-size:64px_64px] [mask-image:radial-gradient(50%_60%_at_20%_40%,#000,transparent)]" />

        <div className="container-x grid gap-14 py-20 md:py-28 lg:grid-cols-12 lg:gap-16 xl:gap-20">
          {/* Intro + ways to reach the clinic */}
          <div className="lg:col-span-5">
            <div data-reveal>
              <p className="eyebrow text-blush-300">Appointments</p>
              <h2 id="contact-title" className="display-lg mt-5 text-balance">
                Begin with a <em className="text-blush-200">conversation.</em>
              </h2>
              <svg viewBox="0 0 120 20" className="mt-6 h-5 w-28 overflow-visible" aria-hidden="true">
                <path d={ECG} fill="none" stroke="var(--color-crimson-400)" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
              <p className="mt-5 max-w-md text-lg leading-relaxed text-paper-200/80">
                Tell us a little about what you are looking for and the team will help arrange the right consultation.
              </p>
            </div>

            <div data-reveal className="mt-9 grid gap-3">
              <Method accent href={whatsappHref()} icon={WhatsAppIcon} title="Chat on WhatsApp" detail="Quickest way to reach the team" />
              <Method href={telHref()} icon={Phone} title="Call the clinic" detail={clinic.contact.phoneDisplay} label={`Call the clinic, ${clinic.contact.phoneDisplay}`} />
              {clinic.contact.email && (
                <Method href={`mailto:${clinic.contact.email}`} icon={MessageSquareText} title="Email us" detail={clinic.contact.email} label={`Email the clinic, ${clinic.contact.email}`} />
              )}
              <Method href="#branches" icon={MapPin} title="Visit a branch" detail={branches.map((b) => b.name).join(' · ')} />
            </div>

            <div data-reveal className="mt-6 space-y-3 rounded-2xl border border-paper-50/[0.1] bg-paper-50/[0.03] p-4 text-sm leading-relaxed text-paper-200/75">
              <p className="flex gap-3">
                <Clock className="size-5 shrink-0 text-blush-300" aria-hidden="true" />
                Open every day, 9:00 AM – 9:00 PM.
              </p>
              <p className="flex gap-3">
                <ShieldCheck className="size-5 shrink-0 text-blush-300" aria-hidden="true" />
                For your privacy, please avoid sharing detailed medical information over chat. Your doctor will discuss this with you in person.
              </p>
            </div>
          </div>

          {/* Enquiry form */}
          <form
            data-reveal
            onSubmit={submit}
            noValidate
            className="relative rounded-[1.75rem] bg-paper-50 p-6 text-navy-900 shadow-[0_40px_80px_-40px_rgb(0_0_0/0.6)] ring-1 ring-paper-50/20 md:p-10 lg:col-span-7"
            aria-describedby="form-note"
          >
            <span aria-hidden="true" className="absolute inset-x-10 top-0 h-[3px] rounded-b-full bg-gradient-to-r from-crimson-400 via-crimson-500 to-blush-300" />
            <div className="flex items-start justify-between gap-4">
              <div>
                <h3 className="font-display text-3xl md:text-[2.1rem]">Appointment enquiry</h3>
                <p id="form-note" className="mt-2 max-w-md text-sm leading-relaxed text-muted">
                  This prepares a WhatsApp message for you to review — nothing is sent until you press send.
                </p>
              </div>
              <span aria-hidden="true" className="hidden size-12 shrink-0 place-items-center rounded-2xl bg-crimson-100 text-crimson-600 ring-1 ring-crimson-200/70 sm:grid">
                <WhatsAppIcon className="size-5" />
              </span>
            </div>

            <div className="mt-8 grid gap-6 sm:grid-cols-2">
              <div>
                <label htmlFor="f-name" className="field-label">
                  Full name <span aria-hidden="true" className="text-crimson-600">*</span>
                </label>
                <div className="relative">
                  <input id="f-name" className="field peer pl-11" autoComplete="name" required value={form.name} onChange={set('name')} aria-invalid={!!errors.name} aria-describedby={errors.name ? 'e-name' : undefined} />
                  <User className={fieldIcon} aria-hidden="true" />
                </div>
                {errors.name && <p id="e-name" className="mt-2 text-sm font-medium text-crimson-600">{errors.name}</p>}
              </div>
              <div>
                <label htmlFor="f-phone" className="field-label">
                  Phone number <span aria-hidden="true" className="text-crimson-600">*</span>
                </label>
                <div className="relative">
                  <input id="f-phone" type="tel" inputMode="tel" className="field peer pl-11" autoComplete="tel" required value={form.phone} onChange={set('phone')} aria-invalid={!!errors.phone} aria-describedby={errors.phone ? 'e-phone' : undefined} />
                  <Phone className={fieldIcon} aria-hidden="true" />
                </div>
                {errors.phone && <p id="e-phone" className="mt-2 text-sm font-medium text-crimson-600">{errors.phone}</p>}
              </div>

              <div className="sm:col-span-2">
                <Chips
                  legend="Speciality"
                  name="speciality"
                  value={form.speciality}
                  onChange={pick('speciality')}
                  options={[{ value: '', label: 'Not sure yet' }, ...specialities.map((s) => ({ value: s.title, label: s.title }))]}
                />
              </div>
              <div className="sm:col-span-2">
                <Chips
                  legend="Preferred branch"
                  name="branch"
                  value={form.branch}
                  onChange={pick('branch')}
                  options={[{ value: '', label: 'Either branch' }, ...branches.map((b) => ({ value: b.name, label: b.name }))]}
                />
              </div>

              <div className="sm:col-span-2">
                <label htmlFor="f-date" className="field-label">
                  Preferred date <span className="font-normal text-muted">(optional)</span>
                </label>
                <div className="relative">
                  <input id="f-date" type="date" className="field peer pl-11" value={form.date} onChange={set('date')} />
                  <CalendarDays className={fieldIcon} aria-hidden="true" />
                </div>
              </div>
              <div className="sm:col-span-2">
                <label htmlFor="f-note" className="field-label">
                  Anything we should know? <span className="font-normal text-muted">(optional)</span>
                </label>
                <div className="relative">
                  <textarea id="f-note" rows={3} className="field peer resize-y pl-11" value={form.note} onChange={set('note')} />
                  <MessageSquareText className="pointer-events-none absolute left-4 top-[0.95rem] size-[18px] text-navy-900/40 transition-colors peer-focus:text-crimson-500" aria-hidden="true" />
                </div>
              </div>
            </div>

            <div className="mt-8 flex flex-col gap-4 border-t border-navy-900/[0.08] pt-6 sm:flex-row sm:items-center sm:justify-between">
              <button type="submit" className="btn-primary w-full sm:w-auto">
                <WhatsAppIcon className="size-4" /> Continue on WhatsApp <ArrowRight className="size-4" aria-hidden="true" />
              </button>
            </div>
            <p role="status" aria-live="polite" className="mt-4 min-h-6 text-sm text-navy-700">
              {notice}
            </p>
          </form>
        </div>
      </div>
    </section>
  )
}
