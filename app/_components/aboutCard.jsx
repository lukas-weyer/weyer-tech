import Image from 'next/image';
import Link from 'next/link';

export default function AboutCard() {
  return (
    <Link
      href="/about"
      className="flex flex-col items-center rounded-2xl border border-gray-200 bg-base-200 shadow hover:bg-base-100 md:max-w-xl md:flex-row"
    >
      <Image
        className="h-96 w-full rounded-t-lg object-cover md:h-auto md:w-48 md:rounded-none md:rounded-s-lg"
        src="/lukasz_weyer_zrm.jpeg"
        width={400}
        height={400}
        alt=""
      />
      <div className="flex flex-col justify-between p-4 leading-normal">
        <h5 className="mb-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-white">
          Więcej o mnie...
        </h5>
        <p className="mb-3 font-normal text-gray-700 dark:text-gray-400">
          Tu znajdziesz więcej informacji o tym kim jestem i czym się zajmuję.
        </p>
      </div>
    </Link>
  );
}
