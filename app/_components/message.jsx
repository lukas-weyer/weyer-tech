import Image from 'next/image';

export default function Message({ children }) {
  return (
    <div className="chat chat-start mb-4">
      <div className="avatar chat-image">
        <div className="w-10 rounded-full">
          <Image
            src="/lukasz_weyer.jpeg"
            width={80}
            height={80}
            alt="Picture of the author"
            priority={true}
            // placeholder="blur"
            // blurDataURL="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAYAAAAfFcSJAAAADUlEQVR42mNkYPhfDwAChwGA60e6kgAAAABJRU5ErkJggg=="
          />
        </div>
      </div>
      <div className="chat-header mb-1">Łukasz Weyer</div>
      <div className="chat-bubble max-w-md p-4 text-base">{children}</div>
    </div>
  );
}
