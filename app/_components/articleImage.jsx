import Image from 'next/image';

export default function ArticleImage({ mask, src, alt }) {
  return (
    <div className="not-prose my-10 flex justify-center">
      <div className="avatar">
        <div className={`mask mask-${mask} w-60`}>
          <Image
            src={src}
            alt={alt}
            width={400}
            height={400}
            style={{ objectFit: 'contain' }}
          />
        </div>
      </div>
    </div>
  );
}
