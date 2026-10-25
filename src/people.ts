// The people behind the practice. Read by the About page (the People
// section), the article bylines and the structured data, so a person's name
// and credential are written once.
//
// Facts here are the owner's own: the CV in Notion ("CV Mansur Kothambawala",
// checked 25 October 2026) and his email signature ("FCCA – Director"). The
// bio names no employer and quotes no client figure — it describes the work,
// not the people it was done for.

import type { ImageMetadata } from 'astro';
import mansurPhoto from './assets/people/mansur-kothambawala.jpg';

export type Person = {
  /** Anchor on /about/ — bylines link to /about/#<id>. */
  id: string;
  name: string;
  /** Post-nominal letters, as the person uses them. */
  credential: string;
  /** What the credential stands for, spelled out once for readers. */
  credentialLong: string;
  role: string;
  photo: ImageMetadata;
  /** Two or three short paragraphs. */
  bio: string[];
  focus: string[];
  languages: string[];
  linkedin?: string;
};

export const PEOPLE: Person[] = [
  {
    id: 'mansur-kothambawala',
    name: 'Mansur Kothambawala',
    credential: 'FCCA',
    credentialLong: 'Fellow of the Association of Chartered Certified Accountants',
    role: 'Founder',
    photo: mansurPhoto,
    bio: [
      'Mansur has more than nine years in accounting, audit and finance, much of it in the UAE: IFRS financial reporting, external audit, and the VAT and Corporate Tax compliance of small and mid-sized businesses — at one point fifteen to twenty clients at a time.',
      'His work has taken in fund administration, producing net asset values and audit files for hedge funds, and running finance functions end to end: month-end close, budgeting and cash flow, board reporting, and the audit through to sign-off.',
      'He builds the systems as well as using them. The habit of automating the mechanical parts of the close, and keeping a trail behind every figure, is where the NUMARATECH platform came from.',
    ],
    focus: [
      'UAE Corporate Tax and VAT',
      'IFRS financial statements',
      'Audit preparation',
      'Finance systems and automation',
    ],
    languages: ['English', 'Hindi', 'Gujarati'],
    linkedin: 'https://www.linkedin.com/in/accamansur',
  },
];

export const findPerson = (id: string) => PEOPLE.find((person) => person.id === id);

/** "Mansur Kothambawala, FCCA" — the byline form. */
export const bylineOf = (person: Person) => `${person.name}, ${person.credential}`;
