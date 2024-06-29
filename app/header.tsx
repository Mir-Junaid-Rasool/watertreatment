"use client"
import { useEffect, useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import styles from './Header.module.css';

const NavBar: React.FC = () => {
  const [isMounted, setIsMounted] = useState(false);
  const router = useRouter();

  useEffect(() => {
    setIsMounted(true);
  }, []);

  if (!isMounted) return null;

  return (
    <nav className={styles.navbar}>
      <Link href="/" className={router.pathname === "/" ? styles.active : ""}>
        Home
      </Link>
      <Link href="/about" className={router.pathname === "/about" ? styles.active : ""}>
        About
      </Link>
    </nav>
  );
};

export default NavBar;