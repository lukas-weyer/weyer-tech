import { MotionDiv } from './motionDiv';
import ProjectCard from './projectCard';

const projects = [
  {
    title: 'socoLab',
    description: 'Strona internetowa gdańskiej agencji kreatywnej SocoLab.',
    tech: ['JavaScript', 'Gatsby.js'],
    url: 'https://www.socolab.com.pl',
    img: '/projects/proj-socolab-2.png',
    alt: 'socoLab - zdjęcie strony projektu',
  },
  {
    title: 'Stowarzyszenie Szeroki Kąt Widzenia',
    description:
      'Strona internetowa projektu realizowanego przez Stowarzyszenie Szeroki Kąt Widzenia.',
    tech: ['JavaScript', 'Gatsby.js'],
    url: 'https://kolodion.netlify.app/',
    img: '/projects/proj-kolodion.png',
    alt: 'Stowarzyszenie Szeroki Kąt Widzenia - zdjęcie strony projektu',
  },
];

const stagger = {
  visible: { transition: { staggerChildren: 0.15 } },
  hidden: {},
};

const fadeUp = {
  visible: { opacity: 1, y: 0 },
  hidden: { opacity: 0, y: 30 },
};

export default function Projects() {
  return (
    <section className="bg-base-200/50 py-24">
      <div className="section-container">
        <MotionDiv
          variants={stagger}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '-100px' }}
        >
          <MotionDiv
            variants={fadeUp}
            transition={{ duration: 0.5 }}
            className="mb-16 text-center"
          >
            <span className="mb-4 inline-block rounded-full bg-primary/10 px-4 py-1.5 text-xs font-semibold uppercase tracking-widest text-primary">
              Portfolio
            </span>
            <h2 className="mt-4 text-3xl font-bold tracking-tight md:text-4xl">
              Wybrane projekty
            </h2>
          </MotionDiv>

          <div className="grid gap-8 md:grid-cols-2">
            {projects.map((project) => (
              <MotionDiv
                key={project.title}
                variants={fadeUp}
                transition={{ duration: 0.5 }}
              >
                <ProjectCard project={project} />
              </MotionDiv>
            ))}
          </div>
        </MotionDiv>
      </div>
    </section>
  );
}
