import { Phone } from 'lucide-react'
import { linkProps, telHref, whatsappHref } from '../lib/links'
import { WhatsAppIcon } from './ui/primitives'

/** Persistent appointment actions on small screens. */
export default function MobileActionBar() {
  return (
    <div className="fixed inset-x-0 bottom-0 z-30 px-3 pb-[max(0.75rem,env(safe-area-inset-bottom))] md:hidden">
      <div className="grid grid-cols-2 gap-2 rounded-full border border-navy-900/[0.08] bg-paper-50/90 p-1.5 shadow-lift backdrop-blur-xl">
        <a {...linkProps(telHref())} className="btn-outline min-h-12 border-transparent">
          <Phone className="size-4" aria-hidden="true" /> Call
        </a>
        <a {...linkProps(whatsappHref())} className="btn-primary min-h-12 shadow-none">
          <WhatsAppIcon className="size-4" /> WhatsApp
        </a>
      </div>
    </div>
  )
}
