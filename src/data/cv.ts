export interface Contact {
  position: string;
  location: string;
  email: string;
  phone: string;
  webpage: string;
  github: string;
  linkedin: string;
}

export type MainSectionItemType = 'text' | 'point';

export interface TextPointItem {
  id: string;
  type: MainSectionItemType;
  content: string;
}

export interface ExperienceEntry {
  id: string;
  company: string;
  role: string;
  period: string;
  location: string;
  bullets: TextPointItem[];
}

export interface EducationEntry {
  id: string;
  type: MainSectionItemType;
  institution: string;
  degree: string;
  period: string;
}

export interface CourseEntry {
  id: string;
  type: MainSectionItemType;
  name: string;
  provider: string;
  year: string;
}

export interface SectionTitles {
  technologies: string;
  aboutMe: string;
  experience: string;
  education: string;
  languages: string;
  courses: string;
}

export type CvLanguage = 'en' | 'pl' | 'de' | 'es' | 'fr' | 'it' | 'pt' | 'ro';

export const TITLE_DEFAULTS: Record<CvLanguage, string> = {
  en: 'Senior Software Engineer',
  pl: 'Starszy Inżynier Oprogramowania',
  de: 'Senior Softwareentwickler',
  es: 'Ingeniero de Software Senior',
  fr: 'Ingénieur logiciel senior',
  it: 'Ingegnere software senior',
  pt: 'Engenheiro de software sénior',
  ro: 'Inginer software senior',
};

export const SECTION_TITLE_DEFAULTS: Record<CvLanguage, SectionTitles> = {
  en: { technologies: 'Skills',       aboutMe: 'Summary',        experience: 'Experience',      education: 'Education',      languages: 'Languages',   courses: 'Certifications' },
  pl: { technologies: 'Umiejętności', aboutMe: 'Podsumowanie',   experience: 'Doświadczenie',  education: 'Wykształcenie',  languages: 'Języki',      courses: 'Certyfikaty'    },
  de: { technologies: 'Fähigkeiten',  aboutMe: 'Zusammenfassung',experience: 'Berufserfahrung',education: 'Ausbildung',     languages: 'Sprachen',    courses: 'Zertifikate'    },
  es: { technologies: 'Habilidades',  aboutMe: 'Resumen',        experience: 'Experiencia',     education: 'Educación',      languages: 'Idiomas',     courses: 'Certificaciones'},
  fr: { technologies: 'Compétences',  aboutMe: 'Résumé',         experience: 'Expérience',      education: 'Formation',      languages: 'Langues',     courses: 'Certifications' },
  it: { technologies: 'Competenze',   aboutMe: 'Profilo',        experience: 'Esperienza',      education: 'Formazione',     languages: 'Lingue',      courses: 'Certificazioni' },
  pt: { technologies: 'Competências', aboutMe: 'Resumo',         experience: 'Experiência',     education: 'Educação',       languages: 'Idiomas',     courses: 'Certificações'  },
  ro: { technologies: 'Competențe',  aboutMe: 'Rezumat',        experience: 'Experiență',      education: 'Educație',      languages: 'Limbi',       courses: 'Certificări'   },
};

export const PRESENT_DEFAULTS: Record<CvLanguage, string> = {
  en: 'Present',
  pl: 'Obecnie',
  de: 'Heute',
  es: 'Actualidad',
  fr: 'Présent',
  it: 'Presente',
  pt: 'Presente',
  ro: 'Prezent',
};

export interface PlaceholderTexts {
  company: string;
  role: string;
  periodRange: string;
  location: string;
  institution: string;
  degree: string;
  courseName: string;
  provider: string;
  year: string;
  sectionTitle: string;
}

export const PLACEHOLDER_DEFAULTS: Record<CvLanguage, PlaceholderTexts> = {
  en: { company: 'Company', role: 'Role', periodRange: 'Year – Year', location: 'Location', institution: 'Institution', degree: 'Degree', courseName: 'Course name', provider: 'Provider', year: 'Year', sectionTitle: 'Section Title' },
  pl: { company: 'Firma', role: 'Stanowisko', periodRange: 'Rok – Rok', location: 'Lokalizacja', institution: 'Uczelnia', degree: 'Kierunek', courseName: 'Nazwa kursu', provider: 'Organizator', year: 'Rok', sectionTitle: 'Tytuł sekcji' },
  de: { company: 'Unternehmen', role: 'Position', periodRange: 'Jahr – Jahr', location: 'Standort', institution: 'Hochschule', degree: 'Abschluss', courseName: 'Kursname', provider: 'Anbieter', year: 'Jahr', sectionTitle: 'Abschnittstitel' },
  es: { company: 'Empresa', role: 'Puesto', periodRange: 'Año – Año', location: 'Ubicación', institution: 'Institución', degree: 'Título', courseName: 'Nombre del curso', provider: 'Proveedor', year: 'Año', sectionTitle: 'Título de sección' },
  fr: { company: 'Entreprise', role: 'Poste', periodRange: 'Année – Année', location: 'Lieu', institution: 'Établissement', degree: 'Diplôme', courseName: 'Nom du cours', provider: 'Organisme', year: 'Année', sectionTitle: 'Titre de section' },
  it: { company: 'Azienda', role: 'Ruolo', periodRange: 'Anno – Anno', location: 'Sede', institution: 'Istituto', degree: 'Titolo', courseName: 'Nome del corso', provider: 'Ente', year: 'Anno', sectionTitle: 'Titolo sezione' },
  pt: { company: 'Empresa', role: 'Cargo', periodRange: 'Ano – Ano', location: 'Localização', institution: 'Instituição', degree: 'Grau', courseName: 'Nome do curso', provider: 'Instituição', year: 'Ano', sectionTitle: 'Título da secção' },
  ro: { company: 'Companie', role: 'Rol', periodRange: 'An – An', location: 'Locație', institution: 'Instituție', degree: 'Diplomă', courseName: 'Numele cursului', provider: 'Furnizor', year: 'An', sectionTitle: 'Titlul secțiunii' },
};

export interface CustomSection {
  id: string;
  title: string;
  items: TextPointItem[];
}

export interface CvData {
  photo: string | null;
  name: string;
  title: string;
  contact: Contact;
  technologies: string[];
  languages: string[];
  sectionTitles: SectionTitles;
  aboutMe: TextPointItem[];
  experience: ExperienceEntry[];
  education: EducationEntry[];
  courses: CourseEntry[];
  sidebarCustom: CustomSection[];
  mainCustom: CustomSection[];
}

export const DEFAULT_ABOUT_ME: TextPointItem[] = [
  {
    id: 'about-1',
    type: 'text',
    content: 'Passionate about building scalable and maintainable web applications. 8+ years of experience across full-stack development and cloud architecture. Strong communicator who thrives in cross-functional agile teams. Open-source contributor and continuous learner.',
  },
];

export const cvData: CvData = {
  photo: null,
  name: 'John Doe',
  title: TITLE_DEFAULTS.en,

  contact: {
    position: 'Software Engineer at Acme Corp',
    location: 'Warsaw, Poland',
    email: 'john.doe@example.com',
    phone: '+48 123 456 789',
    webpage: 'https://johndoe.dev',
    github: 'https://github.com/johndoe',
    linkedin: 'https://linkedin.com/in/johndoe',
  },

  technologies: [
    'JavaScript', 'TypeScript', 'React', 'Node.js',
    'Python', 'Docker', 'PostgreSQL', 'GraphQL',
  ],

  languages: [
    'English — C1',
    'Polish — Native',
  ],

  sectionTitles: {
    technologies: 'Skills',
    aboutMe: 'Summary',
    experience: 'Experience',
    education: 'Education',
    languages: 'Languages',
    courses: 'Certifications',
  },

  aboutMe: DEFAULT_ABOUT_ME,

  experience: [
    {
      id: 'experience-1',
      company: 'Acme Corp',
      role: 'Senior Software Engineer',
      period: '2021 – Present',
      location: 'Warsaw, Poland',
      bullets: [
        { id: 'experience-1-bullet-1', type: 'point', content: 'Led migration of monolithic backend to microservices, reducing deployment time by 60%.' },
        { id: 'experience-1-bullet-2', type: 'point', content: 'Architected React component library adopted across 4 product teams.' },
        { id: 'experience-1-bullet-3', type: 'point', content: 'Mentored 3 junior developers through pair programming and code reviews.' },
      ],
    },
    {
      id: 'experience-2',
      company: 'Beta Tech',
      role: 'Software Engineer',
      period: '2018 – 2021',
      location: 'Kraków, Poland',
      bullets: [
        { id: 'experience-2-bullet-1', type: 'point', content: 'Built RESTful APIs consumed by 200k+ monthly active users.' },
        { id: 'experience-2-bullet-2', type: 'point', content: 'Introduced TypeScript across the frontend codebase, cutting runtime errors by 40%.' },
      ],
    },
    {
      id: 'experience-3',
      company: 'Startup XYZ',
      role: 'Junior Developer',
      period: '2016 – 2018',
      location: 'Remote',
      bullets: [
        { id: 'experience-3-bullet-1', type: 'point', content: 'Developed features for an e-commerce platform using React and Node.js.' },
        { id: 'experience-3-bullet-2', type: 'point', content: 'Improved CI pipeline scripts, cutting build times in half.' },
      ],
    },
  ],

  education: [
    {
      id: 'education-1',
      type: 'text',
      institution: 'Warsaw University of Technology',
      degree: 'M.Sc. Computer Science',
      period: '2014 – 2016',
    },
    {
      id: 'education-2',
      type: 'text',
      institution: 'Warsaw University of Technology',
      degree: 'B.Sc. Computer Science',
      period: '2010 – 2014',
    },
  ],

  courses: [
    {
      id: 'course-1',
      type: 'text',
      name: 'AWS Certified Solutions Architect – Associate',
      provider: 'Amazon Web Services',
      year: '2023',
    },
    {
      id: 'course-2',
      type: 'text',
      name: 'Advanced React Patterns',
      provider: 'Frontend Masters',
      year: '2022',
    },
    {
      id: 'course-3',
      type: 'text',
      name: 'Docker & Kubernetes: The Practical Guide',
      provider: 'Udemy',
      year: '2021',
    },
  ],

  sidebarCustom: [],
  mainCustom: [],
};
