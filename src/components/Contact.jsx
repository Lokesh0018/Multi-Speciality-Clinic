import { useState } from 'react'
import { ArrowRight, Phone, ShieldCheck } from 'lucide-react'
import { branches, clinic, specialities } from '../content/clinic'
import { linkProps, telHref, whatsappHref } from '../lib/links'
import { WhatsAppIcon } from './ui/primitives'

const initial = { name: '', phone: '', speciality: '', branch: '', date: '', note: '' }

export default function Contact() {
  const [form, setForm] = useState(initial)
  const [errors, setErrors] = useState({})
  const [notice, setNotice] = useState('')

  const set = (k) => (e) => setForm((f) => ({ ...f, [k]: e.target.value }))

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

  return (
    <section id="contact" aria-labelledby="contact-title" className="px-3 pb-3 md:px-5 md:pb-5">
      <div className="relative isolate overflow-hidden rounded-[2rem] bg-navy-900 text-paper-50 md:rounded-[2.5rem]">
        <div className="grain absolute inset-0 -z-10" />
        <div className="absolute -left-40 -top-40 -z-10 size-[36rem] rounded-full bg-[radial-gradient(circle,rgb(96_134_214/0.18),transparent_65%)]" aria-hidden="true" />
        <div className="container-x grid gap-14 py-20 md:py-28 lg:grid-cols-12 lg:gap-20">
          <div className="lg:col-span-5">
            <div data-reveal>
              <p className="eyebrow text-blush-300">Appointments</p>
              <h2 id="contact-title" className="display-lg mt-5 text-balance">
                Begin with a <em className="text-blush-200">conversation.</em>
              </h2>
              <p className="mt-6 max-w-md text-lg leading-relaxed text-paper-200/80">
                Tell us a little about what you are looking for and the team will help arrange the right consultation.
              </p>
            </div>
            <div data-reveal className="mt-10 flex flex-col gap-3 sm:flex-row lg:flex-col xl:flex-row">
              <a {...linkProps(whatsappHref())} className="btn-light">
                <WhatsAppIcon /> Chat on WhatsApp
              </a>
              <a {...linkProps(telHref())} className="btn-ghost-light">
                <Phone className="size-[18px]" aria-hidden="true" /> {clinic.contact.phoneDisplay}
              </a>
            </div>
            <p data-reveal className="mt-10 flex max-w-md gap-3 text-sm leading-relaxed text-paper-200/70">
              <ShieldCheck className="size-5 shrink-0 text-blush-300" aria-hidden="true" />
              For your privacy, please avoid sharing detailed medical information over chat. Your doctor will discuss this with you in person.
            </p>
          </div>

          <form data-reveal onSubmit={submit} noValidate className="rounded-[1.75rem] bg-paper-50 p-6 text-navy-900 shadow-lift md:p-10 lg:col-span-7" aria-describedby="form-note">
            <h3 className="font-display text-3xl">Appointment enquiry</h3>
            <p id="form-note" className="mt-2 text-sm text-muted">
              This prepares a WhatsApp message for you to review — nothing is sent until you press send.
            </p>
            <div className="mt-8 grid gap-5 sm:grid-cols-2">
              <div>
                <label htmlFor="f-name" className="field-label">
                  Full name <span aria-hidden="true" className="text-crimson-600">*</span>
                </label>
                <input id="f-name" className="field" autoComplete="name" required value={form.name} onChange={set('name')} aria-invalid={!!errors.name} aria-describedby={errors.name ? 'e-name' : undefined} />
                {errors.name && <p id="e-name" className="mt-2 text-sm font-medium text-[#9a3b2e]">{errors.name}</p>}
              </div>
              <div>
                <label htmlFor="f-phone" className="field-label">
                  Phone number <span aria-hidden="true" className="text-crimson-600">*</span>
                </label>
                <input id="f-phone" type="tel" inputMode="tel" className="field" autoComplete="tel" required value={form.phone} onChange={set('phone')} aria-invalid={!!errors.phone} aria-describedby={errors.phone ? 'e-phone' : undefined} />
                {errors.phone && <p id="e-phone" className="mt-2 text-sm font-medium text-[#9a3b2e]">{errors.phone}</p>}
              </div>
              <div>
                <label htmlFor="f-spec" className="field-label">Speciality</label>
                <select id="f-spec" className="field cursor-pointer" value={form.speciality} onChange={set('speciality')}>
                  <option value="">Not sure yet</option>
                  {specialities.map((s) => (
                    <option key={s.id}>{s.title}</option>
                  ))}
                </select>
              </div>
              <div>
                <label htmlFor="f-branch" className="field-label">Preferred branch</label>
                <select id="f-branch" className="field cursor-pointer" value={form.branch} onChange={set('branch')}>
                  <option value="">Either branch</option>
                  {branches.map((b) => (
                    <option key={b.id}>{b.name}</option>
                  ))}
                </select>
              </div>
              <div className="sm:col-span-2">
                <label htmlFor="f-date" className="field-label">Preferred date <span className="font-normal text-muted">(optional)</span></label>
                <input id="f-date" type="date" className="field" value={form.date} onChange={set('date')} />
              </div>
              <div className="sm:col-span-2">
                <label htmlFor="f-note" className="field-label">Anything we should know? <span className="font-normal text-muted">(optional)</span></label>
                <textarea id="f-note" rows={3} className="field resize-y" value={form.note} onChange={set('note')} />
              </div>
            </div>
            <button type="submit" className="btn-primary mt-8 w-full sm:w-auto">
              Continue on WhatsApp <ArrowRight className="size-4" aria-hidden="true" />
            </button>
            <p role="status" aria-live="polite" className="mt-4 min-h-6 text-sm text-navy-700">
              {notice}
            </p>
          </form>
        </div>
      </div>
    </section>
  )
}
