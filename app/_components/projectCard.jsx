import Image from 'next/image';

export default function ProjectCard({ project, ...rest }) {
  const { title, description, tech, url, img, alt } = project;

  return (
    <div className="card bg-base-100 shadow-xl">
      <figure>
        <Image
          {...rest}
          src={img}
          alt={alt}
          width={400}
          height={400}
          style={{
            objectFit: 'contain',
          }}
        />
      </figure>
      <div className="card-body">
        <h3 className="card-title uppercase">{title}</h3>
        <div className="card-actions my-2 justify-end">
          {tech?.map((item) => (
            <div key={item} className="badge badge-outline p-3">
              {item}
            </div>
          ))}
        </div>
        <p>{description}</p>
        <div className="card-actions mt-4 justify-end">
          <a href={url} className="btn btn-neutral">
            Zobacz...
          </a>
        </div>
      </div>
    </div>
  );
}
