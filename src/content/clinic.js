/**
 * Single source of truth for all clinic content.
 *
 * Anything in [square brackets] or left as an empty string is a PLACEHOLDER.
 * Replace only with information verified by the clinic — do not publish
 * invented contact details, qualifications, reviews or treatment claims.
 */

export const clinic = {
  name: 'Dr. Kimidi Multispeciality Clinic',
  wordmark: { primary: 'Dr. Kimidi', secondary: 'Multispeciality Clinic' },
  specialities: 'Skin · Hair · Dental',
  city: 'Visakhapatnam',

  contact: {
    // E.164 digits without "+" for WhatsApp, e.g. "91XXXXXXXXXX"
    whatsapp: '',
    // Full tel number, e.g. "+91XXXXXXXXXX"
    phone: '',
    phoneDisplay: '[Phone number]',
    email: '[Email address]',
  },

  social: [
    // { label: 'Instagram', href: '' },
  ],

  media: {
    logo: '/media/logo-mark.webp', // transparent webp
    // Hero film: encoded from /public/videos/hero-intro.webm (clinic-supplied),
    // played forward then reversed so it loops without a cut (~19.8 s, no audio).
    heroVideo: {
      webm: '/videos/clinic-hero.webm',
      mp4: '/videos/clinic-hero.mp4',
      mp4Mobile: '/videos/clinic-hero-720.mp4',
      poster: '/images/clinic-hero-poster.webp',
    },
    // Clinic photography
    intro: { main: '/images/clinic-about.webp', detail: '/images/about-sub.webp' },
    consultation: '/images/visit.webp',
  },
}

export const nav = [
  { label: 'About', href: '#about' },
  { label: 'Specialities', href: '#specialities' },
  { label: 'Doctors', href: '#doctors' },
  { label: 'Locations', href: '#branches' },
  { label: 'FAQ', href: '#faq' },
  { label: 'Contact', href: '#contact' },
]

export const about = {
  eyebrow: 'The clinic',
  headline: 'One clinic. Three disciplines.',
  headlineAccent: 'A single standard of care.',
  lede: 'Dr. Kimidi Multispeciality Clinic brings skin, hair and dental care together, so patients in Visakhapatnam can find the right specialist in one familiar place.',
  story: 'Founded with a vision to deliver unhurried, patient-first healthcare, our clinic unites clinical expertise with advanced diagnostic and treatment technology.',
  quote: {
    text: 'True medical care begins with listening. Our commitment is to offer every patient the personal attention, transparency, and clinical excellence they deserve.',
    author: 'Dr. Kimidi',
    title: 'Chief Medical Consultant',
  },
}

/** Hero copy and the three specialty panels (stock photography, Pexels licence). */
export const hero = {
  eyebrow: 'Skin · Hair · Dental',
  headline: ['Expert Care.', 'Healthier You.'],
  accentWord: 'You.',
  copy: 'Comprehensive skin, hair and dental care with a personal approach to your well-being.',
  primaryCta: 'Book an Appointment',
  secondaryCta: 'Explore Our Services',
  secondaryHref: '#specialities',
  location: 'PM Palem & MVP Colony, Visakhapatnam',
  panels: [
    { id: 'skin', label: 'Skin Care', icon: 'face', src: '/images/skin-care.webp', alt: 'Dermatologist examining a patient’s face in a clinic', position: '52% 38%' },
    { id: 'hair', label: 'Hair Care', icon: 'follicle', src: '/images/hair-care.webp', alt: 'Clinician examining a patient’s scalp and hair', position: '55% 28%' },
    { id: 'dental', label: 'Dental Care', icon: 'tooth', src: '/images/dental-care.webp', alt: 'Smiling patient in a dental chair holding a mirror', position: '72% 42%' },
  ],
}

/** Scrolling marquee under the hero. `icon` keys map to Lucide icons in TrustMarquee. */
export const trustPoints = [
  { icon: 'specialities', title: 'Three specialties', detail: 'Skin, hair and dental care in one clinic.' },
  { icon: 'branches', title: 'Two branches', detail: 'PM Palem and MVP Colony, Visakhapatnam.' },
  { icon: 'hours', title: 'Open every day', detail: '9:00 AM – 9:00 PM, seven days a week.' },
  { icon: 'contact', title: 'Easy to reach', detail: 'Enquire on WhatsApp or call the clinic.' },
]

/**
 * Each service has its own photo (Pexels licence, replaceable) shown when the
 * service is selected in the Specialities section.
 */
export const specialities = [
  {
    id: 'skin',
    index: '01',
    title: 'Skin Care',
    kicker: 'Dermatology',
    summary:
      'Consultation-led care for skin concerns, beginning with a careful assessment and an unhurried conversation about your options.',
    services: [
      { name: 'Acne & Scar Treatments', image: '/images/services/skin-acne.webp', alt: 'Young woman with acne receiving a targeted skin treatment' },
      { name: 'Pigmentation & Melasma', image: '/images/services/skin-pigmentation.webp', alt: 'Close-up of facial skin with pigmentation marks' },
      { name: 'Anti-Ageing & Rejuvenation', image: '/images/services/skin-anti-ageing.webp', alt: 'Clinician assessing a mature patient’s face for rejuvenation' },
      { name: 'Laser Skin Treatments', image: '/images/services/skin-laser.webp', alt: 'Patient in protective goggles receiving a laser skin treatment' },
      { name: 'Eczema & Allergy Care', image: '/images/services/skin-eczema.webp', alt: 'Dermatologist examining a patient’s skin at a consultation' },
      { name: 'Chemical Peels & Medi-Facials', image: '/images/services/skin-peels.webp', alt: 'Patient receiving a professional facial treatment' },
    ],
    image: { src: '/images/skin-care.webp', alt: 'Dermatologist examining a patient’s face in a clinic', label: 'Dermatology suite' },
    tone: 'crimson',
  },
  {
    id: 'hair',
    index: '02',
    title: 'Hair Restoration',
    kicker: 'Hair & Scalp',
    summary:
      'Thoughtful evaluation of hair and scalp concerns, with suitable approaches explained clearly at your consultation.',
    services: [
      { name: 'Hair Fall & Thinning Therapy', image: '/images/services/hair-fall.webp', alt: 'Hands holding a hairbrush with shed hair' },
      { name: 'PRP & GFC Hair Treatments', image: '/images/services/hair-prp.webp', alt: 'Clinician administering an injection treatment' },
      { name: 'Dandruff & Scalp Conditions', image: '/images/services/hair-scalp.webp', alt: 'Scalp serum being applied with a dropper' },
      { name: 'Alopecia Management', image: '/images/services/hair-alopecia.webp', alt: 'Woman checking her hair in a hand mirror' },
      { name: 'Laser Hair Stimulation', image: '/images/services/hair-laser.webp', alt: 'Patient receiving a scalp treatment at a clinic' },
      { name: 'Hair Density Restoration', image: '/images/services/hair-density.webp', alt: 'Woman with long, dense, healthy hair' },
    ],
    image: { src: '/images/hair-care.webp', alt: 'Clinician examining a patient’s scalp and hair', label: 'Trichology care' },
    tone: 'blush',
  },
  {
    id: 'dental',
    index: '03',
    title: 'Dental Care',
    kicker: 'Dentistry',
    summary:
      'Calm, attentive dental care for everyday oral health and smile concerns, in a setting designed to put you at ease.',
    services: [
      { name: 'Root Canal Treatment', image: '/images/services/dental-root-canal.webp', alt: 'Dentist performing a procedure on a patient' },
      { name: 'Smile Design & Veneers', image: '/images/services/dental-veneers.webp', alt: 'Dentist matching a veneer shade guide to a smiling patient' },
      { name: 'Teeth Whitening & Cleaning', image: '/images/services/dental-whitening.webp', alt: 'Close-up of a bright, healthy smile' },
      { name: 'Dental Implants & Crowns', image: '/images/services/dental-implants.webp', alt: 'Model of a dental implant beside natural teeth' },
      { name: 'Orthodontics & Aligners', image: '/images/services/dental-ortho.webp', alt: 'Close-up of braces being adjusted' },
      { name: 'Preventive Oral Healthcare', image: '/images/services/dental-preventive.webp', alt: 'Patient at a routine dental check-up' },
    ],
    image: { src: '/images/dental-care.webp', alt: 'Smiling patient in a dental chair holding a mirror', label: 'Dental suite' },
    tone: 'navy',
  },
]

export const journey = [
  { step: '01', title: 'Enquire', body: 'Message us on WhatsApp or call the branch nearest to you.' },
  { step: '02', title: 'Consult', body: 'Meet the doctor to talk through your concerns and history.' },
  { step: '03', title: 'Understand', body: 'Discuss suitable options and next steps before you decide.' },
  { step: '04', title: 'Follow up', body: 'Stay in touch with the clinic as your care continues.' },
]

/** Publish a profile only once every field has been verified by the clinic. */
export const doctors = [
  {
    name: '[Doctor full name]',
    speciality: '[Speciality]',
    qualifications: '[Verified qualifications]',
    registration: '[Medical council registration no.]',
    bio: '[Short, approved biography — areas of focus and years in practice, as verified.]',
    image: { src: '/media/placeholders/doctor-1.jpg', alt: 'Sample portrait — replace with the doctor photograph', sample: true },
  },
  {
    name: '[Doctor full name]',
    speciality: '[Speciality]',
    qualifications: '[Verified qualifications]',
    registration: '[Medical council registration no.]',
    bio: '[Short, approved biography — areas of focus and years in practice, as verified.]',
    image: { src: '/media/placeholders/doctor-2.jpg', alt: 'Sample portrait — replace with the doctor photograph', sample: true },
  },
  {
    name: '[Doctor full name]',
    speciality: '[Speciality]',
    qualifications: '[Verified qualifications]',
    registration: '[Medical council registration no.]',
    bio: '[Short, approved biography — areas of focus and years in practice, as verified.]',
    image: { src: '/media/placeholders/doctor-3.jpg', alt: 'Sample portrait — replace with the doctor photograph', sample: true },
  },
]

export const branches = [
  {
    id: 'pm-palem',
    name: 'PM Palem',
    city: 'Visakhapatnam',
    address: '[Street address, landmark]\nPM Palem, Visakhapatnam [PIN]',
    hours: [
      { days: '[Days]', time: '[Opening hours]' },
      { days: '[Days]', time: '[Opening hours]' },
    ],
    phone: '',
    phoneDisplay: '[Branch phone]',
    whatsapp: '',
    mapUrl: '',
    image: { src: '/media/placeholders/branch-pm-palem.jpg', alt: 'Bright, clean treatment room (sample image)', label: 'PM Palem branch · 16:10' },
  },
  {
    id: 'mvp-colony',
    name: 'MVP Colony',
    city: 'Visakhapatnam',
    address: '[Street address, landmark]\nMVP Colony, Visakhapatnam [PIN]',
    hours: [
      { days: '[Days]', time: '[Opening hours]' },
      { days: '[Days]', time: '[Opening hours]' },
    ],
    phone: '',
    phoneDisplay: '[Branch phone]',
    whatsapp: '',
    mapUrl: '',
    image: { src: '/media/placeholders/branch-mvp-colony.jpg', alt: 'Dental chair in a modern clinic (sample image)', label: 'MVP Colony branch · 16:10' },
  },
]

export const faqs = [
  {
    q: 'How do I book an appointment?',
    a: 'Send us a message on WhatsApp or call your preferred branch. You can also use the enquiry form on this page — it prepares a WhatsApp message with your details for you to review and send.',
  },
  {
    q: 'Which branch should I visit?',
    a: 'We have two branches in Visakhapatnam — PM Palem and MVP Colony. Choose whichever is most convenient; when you enquire, the team can confirm which doctor and speciality is available at each location.',
  },
  {
    q: 'Can I consult for more than one speciality?',
    a: '[Answer to be provided by the clinic.]',
  },
  {
    q: 'What should I bring to my first consultation?',
    a: '[Answer to be provided by the clinic — e.g. previous reports, prescriptions, ID.]',
  },
  {
    q: 'What are your consultation timings?',
    a: 'Timings for each branch are listed in the Branches section. [Confirm holiday and Sunday timings with the clinic.]',
  },
  {
    q: 'How are consultation fees handled?',
    a: '[Answer to be provided by the clinic.]',
  },
]
