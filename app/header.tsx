"use client"
import { useEffect, useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { usePathname } from 'next/navigation';
import styles from './Header.module.css';

const NavBar: React.FC = () => {
  const [isMounted, setIsMounted] = useState(false);
  const pathname = usePathname();
  // const router = useRouter();

  useEffect(() => {
    setIsMounted(true);
  }, []);

  if (!isMounted) return null;

  return (
    <nav className={styles.navbar}>
      <Link href="/" className={pathname === "/" ? styles.active : ""}>
        Home
      </Link>
      <Link href="/about" className={pathname === "/about" ? styles.active : ""}>
        About
      </Link>
      <Link href="/analyze" className={pathname === "/analyze" ? styles.active : ""}>
        Analyze
      </Link>
      <Link href="/description" className={pathname === "/description" ? styles.active : ""}>
        Data-Description
      </Link>
      <Link href="/predictcod" className={pathname === "/predictcod" ? styles.active : ""}>
        COD Pred
      </Link>
    </nav>
  );
};

export default NavBar;