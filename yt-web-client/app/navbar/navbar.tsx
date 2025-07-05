import Image from 'next/image';
import Link from 'next/link';
import style from './navbar.module.css';

export default function navbar() {
  return (
    <nav className={style.nav}>
      <Link href="/">
      <span className={style.logoContainer}>
      <Image width={90} height={30} src="/youtube-logo.svg" alt="Youtube logo"/>
      </span>
      </Link>
    </nav>
  );
}