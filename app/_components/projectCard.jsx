import Image from 'next/image';

export default function ProjectCard({ project }) {
  const { title, description, tech, url, img, alt } = project;

  return (
    <a
      href={url}
      target="_blank"
      rel="noopener noreferrer"
      className="group block overflow-hidden rounded-2xl border border-base-content/5 bg-base-100 shadow-sm transition-all duration-300 hover:-translate-y-1 hover:shadow-xl hover:shadow-primary/5"
    >
      <div className="relative overflow-hidden">
        <Image
          src={img}
          alt={alt}
          width={600}
          height={400}
          className="aspect-video w-full object-cover transition-transform duration-500 group-hover:scale-105"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent opacity-0 transition-opacity duration-300 group-hover:opacity-100" />
      </div>
      <div className="p-6">
        <h3 className="mb-2 text-lg font-bold tracking-tight">{title}</h3>
        <p className="mb-4 text-sm leading-relaxed text-base-content/60">
          {description}
        </p>
        <div className="flex flex-wrap gap-2">
          {tech?.map((item) => (
            <span
              key={item}
              className="rounded-full bg-base-200 px-3 py-1 text-xs font-medium text-base-content/70"
            >
              {item}
            </span>
          ))}
        </div>
      </div>
    </a>
  );
}
