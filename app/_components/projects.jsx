import { MotionDiv } from './motionDiv';
import ProjectCard from './projectCard';

const projects = [
  {
    title: 'socoLab',
    description: 'Strona internetowa gdańskiej agencji kreatywnej SocoLab.',
    tech: ['javaScript', 'gatsby.js'],
    url: 'https://www.socolab.com.pl',
    img: '/projects/proj-socolab-2.png',
    alt: 'socoLab - zdjęcie strony projektu',
  },
  {
    title: 'Stowarzyszenie Szeroki Kąt Widzenia',
    description:
      'Strona internetowa projektu realizowanego przez Stowarzyszenie Szeroki Kąt Widzenia.',
    tech: ['javaScript', 'gatsby.js'],
    url: 'https://kolodion.netlify.app/',
    img: '/projects/proj-kolodion.png',
    alt: 'Stowarzyszenie Szeroki Kąt Widzenia - zdjęcie strony projektu',
  },
];
export default function Projects() {
  return (
    <MotionDiv
      className="w-full max-w-3xl md:mb-12"
      initial={{ opacity: 0 }}
      whileInView={{ opacity: 1 }}
      viewport={{ once: true }}
    >
      <article className="card md:bg-base-200 md:shadow-lg">
        <div className="card-body items-center">
          <h3 className="card-title my-4 self-center text-base text-gray-600">
            Kilka z moich projektów...
          </h3>
          <div className="divider" />
          <div className="grid gap-6 md:grid-cols-2">
            {projects.map((project) => (
              <ProjectCard key={project.title} project={project} />
            ))}
          </div>
        </div>
      </article>
    </MotionDiv>
  );
}
