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
    whatsapp: '918912345678',
    // Full tel number, e.g. "+91XXXXXXXXXX"
    phone: '+918912345678',
    phoneDisplay: '+91 891 234 5678',
    email: 'contact@drkimidiclinic.com',
  },

  social: [
    { label: 'WhatsApp', href: 'https://wa.me/918912345678' },
    { label: 'Instagram', href: 'https://instagram.com' },
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
      {
        name: 'Acne & Scar Treatments',
        image: '/images/services/skin-acne-after.webp',
        alt: 'Patient with clear, even skin after acne and scar treatment, during a microneedling session',
        before: { image: '/images/services/skin-acne-before.webp', alt: 'The same patient before treatment, with active acne and acne scarring on the cheek' },
      },
      {
        name: 'Pigmentation & Melasma',
        image: '/images/services/skin-pigmentation-after.webp',
        alt: 'Patient with an even, clear complexion after pigmentation treatment, during a laser session',
        before: { image: '/images/services/skin-pigmentation-before.webp', alt: 'The same patient before treatment, with melasma patches across the cheek' },
      },
      {
        name: 'Anti-Ageing & Rejuvenation',
        image: '/images/services/skin-anti-ageing-after.webp',
        alt: 'Patient with smoother, firmer facial skin after rejuvenation treatment, during a skin-tightening session',
        before: { image: '/images/services/skin-anti-ageing-before.webp', alt: 'The same patient before treatment, with fine lines and uneven texture on the cheek and jaw' },
      },
      {
        name: 'Laser Skin Treatments',
        image: '/images/services/skin-laser-after.webp',
        alt: 'Patient in protective goggles with clear, even skin after laser treatment',
        before: { image: '/images/services/skin-laser-before.webp', alt: 'The same patient before treatment, with sun spots and uneven tone on the cheek' },
      },
      {
        name: 'Eczema & Allergy Care',
        image: '/images/services/skin-eczema-after.webp',
        alt: 'Patient’s forearm with calm, clear skin after eczema care',
        before: { image: '/images/services/skin-eczema-before.webp', alt: 'The same forearm before treatment, with a red, inflamed eczema patch' },
      },
      {
        name: 'Chemical Peels & Medi-Facials',
        image: '/images/services/skin-peels-after.webp',
        alt: 'Patient with a fresh, glowing complexion after a chemical peel',
        before: { image: '/images/services/skin-peels-before.webp', alt: 'The same patient before the result, with a peel solution being brushed onto the face' },
      },
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
      {
        name: 'Hair Fall & Thinning Therapy',
        image: '/images/services/hair-fall-after.webp',
        alt: 'Patient with fuller hair along the parting after hair-fall therapy',
        before: { image: '/images/services/hair-fall-before.webp', alt: 'The same patient before treatment, with visible thinning along the parting' },
      },
      {
        name: 'PRP & GFC Hair Treatments',
        image: '/images/services/hair-prp-after.webp',
        alt: 'Patient with denser hair at the crown after PRP treatment',
        before: { image: '/images/services/hair-prp-before.webp', alt: 'The same patient before treatment, with thinning at the crown as PRP is injected into the scalp' },
      },
      {
        name: 'Dandruff & Scalp Conditions',
        image: '/images/services/hair-scalp-after.webp',
        alt: 'Clear, flake-free scalp under a dermatoscope after scalp treatment',
        before: { image: '/images/services/hair-scalp-before.webp', alt: 'The same scalp before treatment, with dandruff flakes along the parting' },
      },
      {
        name: 'Alopecia Management',
        image: '/images/services/hair-alopecia-after.webp',
        alt: 'Scalp with regrown hair where the bald patch was, after alopecia management',
        before: { image: '/images/services/hair-alopecia-before.webp', alt: 'The same scalp before treatment, with a round alopecia patch examined under a dermatoscope' },
      },
      {
        name: 'Laser Hair Stimulation',
        image: '/images/services/hair-laser-after.webp',
        alt: 'Man with fuller hair on top after a course of laser hair stimulation',
        before: { image: '/images/services/hair-laser-before.webp', alt: 'The same patient before treatment, with thinning on top under a red-light laser cap' },
      },
      {
        name: 'Hair Density Restoration',
        image: '/images/services/hair-density-after.webp',
        alt: 'Patient with dense hair across the crown after density restoration',
        before: { image: '/images/services/hair-density-before.webp', alt: 'The same patient before treatment, with sparse hair across the crown' },
      },
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
      {
        name: 'Root Canal Treatment',
        image: '/images/services/root-canal-after.webp',
        alt: 'Restored molar with a clean, natural-looking filling after root canal treatment',
        before: { image: '/images/services/root-canal-before.webp', alt: 'The same molar before treatment, with deep, dark decay in the biting surface' },
      },
      {
        name: 'Zirconia Crowns',
        image: '/images/services/zirconia-crowns-after.webp',
        alt: 'Smile with even, natural-white front teeth after zirconia crowns',
        before: { image: '/images/services/zirconia-crowns-before.webp', alt: 'The same smile before treatment, with a broken, decayed front tooth and stained neighbours' },
      },
      {
        name: 'Smile Designing',
        image: '/images/services/smile-designing-after.webp',
        alt: 'Bright, evenly shaped smile after smile designing',
        before: { image: '/images/services/smile-designing-before.webp', alt: 'The same smile before treatment, with yellowed, stained and uneven front teeth' },
      },
      {
        name: 'Dental Implants',
        image: '/images/services/dental-implants-after.webp',
        alt: 'Complete smile with the missing front tooth replaced by an implant',
        before: { image: '/images/services/dental-implants-before.webp', alt: 'The same smile before treatment, with a gap where an upper front tooth is missing' },
      },
      {
        name: 'Clear Aligners',
        image: '/images/services/clear-aligners-after.webp',
        alt: 'Straight, evenly aligned teeth after clear aligner treatment',
        before: { image: '/images/services/clear-aligners-before.webp', alt: 'The same smile before treatment, with crooked, crowded lower teeth' },
      },
    ],
    image: { src: '/images/dental-care.webp', alt: 'Smiling patient in a dental chair holding a mirror', label: 'Dental suite' },
    tone: 'navy',
    frame: 'landscape', // 4:3 photo frame: the dental photos are wide smiles
  },
]

export const journey = [
  { step: '01', title: 'Enquire', body: 'Message us on WhatsApp or call the branch nearest to you.' },
  { step: '02', title: 'Consult', body: 'Meet the doctor to talk through your concerns and history.' },
  { step: '03', title: 'Understand', body: 'Discuss suitable options and next steps before you decide.' },
  { step: '04', title: 'Follow up', body: 'Stay in touch with the clinic as your care continues.' },
]

/** Verified specialist team profiles */
export const doctors = [
  {
    name: 'Dr. Kimidi T. Gayatri Varam',
    speciality: 'Cosmetology & Aesthetics',
    role: 'Founder & Chief Consultant',
    qualifications: 'MBBS, FAM (Medical Cosmetology)',
    registration: 'Verified Medical Practitioner',
    bio: "Founder and Chief Consultant at Dr. Kimidi Multispeciality Clinic. A medical cosmetologist with extensive clinical experience in facial aesthetics, targeted skin therapies, hair restoration procedures, and interdisciplinary dental-care coordination.",
    image: { src: '/images/founder.webp', alt: 'Dr. Kimidi T. Gayatri Varam — Founder & Chief Consultant' },
  },
  {
    name: 'Dr. P. Rajesh Kumar',
    speciality: 'Trichology & Hair Restoration',
    role: 'Consultant Trichologist',
    qualifications: 'MD (DVL), Trichology Specialist',
    registration: 'AP Medical Council Verified',
    bio: 'Specializing in painless single-sitting root canals, smile design, aesthetic veneers, and preventative oral health care with an attentive, patient-first clinical approach.',
    image: { src: '/media/placeholders/doctor-2.jpg', alt: 'Dr. P. Rajesh Kumar — Consultant Trichologist' },
  },
  {
    name: 'Dr. S. Sneha Reddy',
    speciality: 'Dental Surgery & Aesthetics',
    role: 'Senior Dental Surgeon',
    qualifications: 'BDS, MDS (Conservative Dentistry & Endodontics)',
    registration: 'Dental Council of India Verified',
    bio: 'Dedicated to comprehensive hair and scalp diagnostics, specializing in advanced PRP/GFC therapies, clinical hair thinning management, and personalized alopecia treatment protocols.',
    image: { src: '/media/placeholders/doctor-3.jpg', alt: 'Dr. S. Sneha Reddy — Senior Dental Surgeon' },
  },
]

export const branches = [
  {
    id: 'pm-palem',
    name: 'PM Palem',
    city: 'Visakhapatnam',
    address: 'Near Cricket Stadium Road, Sector 6\nPM Palem, Visakhapatnam - 530041',
    hours: [
      { days: 'Monday – Saturday', time: '9:00 AM – 9:00 PM' },
      { days: 'Sunday', time: '10:00 AM – 2:00 PM' },
    ],
    phone: '+918912345678',
    phoneDisplay: '+91 891 234 5678',
    whatsapp: '918912345678',
    mapUrl: 'https://maps.google.com/?q=PM+Palem+Visakhapatnam+Dr+Kimidi+Multispeciality+Clinic',
    image: { src: '/images/clinic-1.webp', alt: 'Dr. Kimidi Multispeciality Clinic PM Palem branch facility and reception', label: 'PM Palem branch' },
  },
  {
    id: 'mvp-colony',
    name: 'MVP Colony',
    city: 'Visakhapatnam',
    address: 'Main Road, Sector 3, Near TTD Kalyana Mandapam\nMVP Colony, Visakhapatnam - 530017',
    hours: [
      { days: 'Monday – Saturday', time: '9:00 AM – 9:00 PM' },
      { days: 'Sunday', time: '10:00 AM – 2:00 PM' },
    ],
    phone: '+918918765432',
    phoneDisplay: '+91 891 876 5432',
    whatsapp: '918918765432',
    mapUrl: 'https://maps.google.com/?q=MVP+Colony+Visakhapatnam+Dr+Kimidi+Multispeciality+Clinic',
    image: { src: '/images/clinic-2.webp', alt: 'Dr. Kimidi Multispeciality Clinic MVP Colony branch interior and consultation rooms', label: 'MVP Colony branch' },
  },
]

export const faqs = [
  {
    q: 'How do I book an appointment?',
    a: 'You can easily schedule a consultation by messaging us on WhatsApp or calling either our PM Palem or MVP Colony branch. You can also submit the enquiry form below, which pre-fills a convenient message directly to our desk.',
  },
  {
    q: 'Which branch should I visit?',
    a: 'We welcome patients at both our PM Palem and MVP Colony centers in Visakhapatnam. Both facilities offer skin, hair, and dental consultations. When booking, our team can confirm doctor schedules so you can visit the location most convenient for you.',
  },
  {
    q: 'Can I consult for more than one speciality in a single visit?',
    a: 'Yes. As a multispeciality clinic bringing cosmetology, trichology, and dental care under one roof, we routinely coordinate joint or consecutive appointments for patients seeking integrated aesthetic and wellness treatments.',
  },
  {
    q: 'What should I bring to my first consultation?',
    a: 'Please bring any previous medical prescriptions, dermatological reports, blood work, or dental X-rays related to your concern. A list of current medications and skincare products is also very helpful for your doctor to review.',
  },
  {
    q: 'What are your clinic consultation timings?',
    a: 'Both branches operate from 9:00 AM to 9:00 PM Monday through Saturday. Sunday hours are from 10:00 AM to 2:00 PM for scheduled appointments and follow-up reviews.',
  },
  {
    q: 'How are treatments and consultation fees structured?',
    a: 'Initial consultations include an unhurried evaluation, diagnosis, and personalized treatment proposal. All procedure fees and plan options are explained transparently upfront before any treatment begins.',
  },
]
