import ProjectSection from './projectSection';

const projects = [
  {
    title: 'socoLab',
    description:
      'Strona internetowa gdańskiej agencji kreatywnej SocoLab. Nowoczesny design z płynnymi animacjami i responsywnym layoutem.',
    tech: ['JavaScript', 'Gatsby.js'],
    url: 'https://www.socolab.com.pl',
    img: '/projects/proj-socolab-2.webp',
    alt: 'socoLab — strona agencji kreatywnej',
    gradient:
      'bg-[radial-gradient(ellipse_at_20%_50%,rgba(255,45,99,0.12),transparent_60%),radial-gradient(ellipse_at_80%_80%,rgba(168,85,247,0.08),transparent_50%)]',
  },
  {
    title: 'ivobeauty',
    description:
      'Strona internetowa salonu kosmetycznego ivobeauty.co.uk. Elegancki design dopasowany do branży beauty.',
    tech: ['TypeScript', 'Astro'],
    url: 'https://ivobeauty.co.uk',
    img: '/projects/proj-ivobeauty.webp',
    alt: 'ivobeauty — salon kosmetyczny',
    gradient:
      'bg-[radial-gradient(ellipse_at_80%_30%,rgba(168,85,247,0.12),transparent_60%),radial-gradient(ellipse_at_20%_70%,rgba(59,130,246,0.08),transparent_50%)]',
  },
  {
    title: 'Szeroki Kąt Widzenia',
    description:
      'Strona projektu realizowanego przez Stowarzyszenie Szeroki Kąt Widzenia. Platforma prezentująca działalność artystyczną.',
    tech: ['JavaScript', 'Gatsby.js'],
    url: 'https://kolodion.netlify.app/',
    img: '/projects/proj-kolodion.webp',
    alt: 'Szeroki Kąt Widzenia — stowarzyszenie',
    gradient:
      'bg-[radial-gradient(ellipse_at_50%_50%,rgba(34,211,238,0.1),transparent_60%),radial-gradient(ellipse_at_10%_30%,rgba(99,102,241,0.08),transparent_50%)]',
  },
];

export default function Projects() {
  return (
    <div id="projects">
      {projects.map((project, index) => (
        <ProjectSection key={project.title} project={project} index={index} />
      ))}
    </div>
  );
}
