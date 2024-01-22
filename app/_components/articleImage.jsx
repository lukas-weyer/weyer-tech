import Image from 'next/image';

export default function ArticleImage({ mask, src, alt }) {
  return (
    <div className="not-prose my-10 flex justify-center">
      <div className="avatar">
        <div className={mask}>
          <Image
            src={src}
            alt={alt}
            width={200}
            height={200}
            style={{ objectFit: 'contain' }}
          />
        </div>
      </div>
    </div>
  );
}
