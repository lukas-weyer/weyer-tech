import Link from 'next/link';

export default function Nav() {
  return (
    <div className="navbar bg-base-100">
      <div className="flex-1">
        <Link href="/" className="btn btn-ghost text-xl">
          weyer.tech
        </Link>
      </div>
      <div className="flex-none">
        <ul className="menu menu-horizontal px-1">
          <li>
            <Link href="/">home</Link>
          </li>
          <li>
            <Link href="/about">o mnie</Link>
          </li>
        </ul>
      </div>
    </div>
  );
}
