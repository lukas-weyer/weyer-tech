import Image from 'next/image';

export default function Writing() {
  return (
    <div className="flex items-center">
      <div className="avatar chat-image">
        <div className="w-10 rounded-full lg:w-10">
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
      <span className="chat-header mx-4">Łukasz Weyer pisze</span>
      <span className="loading loading-dots loading-sm" />
    </div>
  );
}
