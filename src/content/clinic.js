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
    logo: '/media/logo-mark.png', // cropped from /media/logo.png
    // Seamless-loop hero film. Place files in /public/media/.
    heroVideo: { webm: '/media/hero-loop.webm', mp4: '/media/hero-loop.mp4', poster: '/media/placeholders/hero-poster.jpg' },
    // Sample stock photography (Pexels licence). Replace with the clinic's own photos.
    intro: { main: '/media/placeholders/clinic-interior.jpg', detail: '/media/placeholders/clinic-detail.jpg' },
    consultation: '/media/placeholders/consultation.jpg',
  },
}

export const nav = [
  { label: 'Specialities', href: '#specialities' },
  { label: 'Doctors', href: '#doctors' },
  { label: 'Branches', href: '#branches' },
  { label: 'FAQ', href: '#faq' },
  { label: 'Contact', href: '#contact' },
]

export const trustPoints = [
  { value: '03', label: 'Specialities', detail: 'Skin, hair & dental care' },
  { value: '02', label: 'Branches', detail: 'PM Palem & MVP Colony' },
  { value: 'WhatsApp', label: 'or phone', detail: 'Simple appointment enquiries' },
  { value: '[—]', label: '[Verified credential]', detail: '[Add an approved trust marker]' },
]

export const specialities = [
  {
    id: 'skin',
    index: '01',
    title: 'Skin Care',
    kicker: 'Dermatology',
    summary:
      'Consultation-led care for skin concerns, beginning with a careful assessment and an unhurried conversation about your options.',
    services: ['[Service name]', '[Service name]', '[Service name]', '[Service name]'],
    image: { src: '/media/placeholders/skin.jpg', alt: 'Dermatologist examining skin with a dermatoscope', label: 'Skin consultation · 4:5' },
    tone: 'crimson',
  },
  {
    id: 'hair',
    index: '02',
    title: 'Hair Restoration',
    kicker: 'Hair & Scalp',
    summary:
      'Thoughtful evaluation of hair and scalp concerns, with suitable approaches explained clearly at your consultation.',
    services: ['[Service name]', '[Service name]', '[Service name]', '[Service name]'],
    image: { src: '/media/placeholders/hair.jpg', alt: 'Close-up of healthy hair in soft light', label: 'Hair assessment · 4:5' },
    tone: 'blush',
  },
  {
    id: 'dental',
    index: '03',
    title: 'Dental Care',
    kicker: 'Dentistry',
    summary:
      'Calm, attentive dental care for everyday oral health and smile concerns, in a setting designed to put you at ease.',
    services: ['[Service name]', '[Service name]', '[Service name]', '[Service name]'],
    image: { src: '/media/placeholders/dental.jpg', alt: 'Modern dental treatment room with a navy dental chair', label: 'Dental suite · 4:5' },
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
