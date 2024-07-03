"use client";
import { useEffect, useState } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import styles from './Header.module.css';

const NavBar: React.FC = () => {
  const [isMounted, setIsMounted] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const pathname = usePathname();

  useEffect(() => {
    setIsMounted(true);
  }, []);

  if (!isMounted) return null;

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  return (
    <nav className={styles.navbar}>
      <div className={styles.hamburger} onClick={toggleMobileMenu}>
        &#x22EE; {/* Three vertical dots */}
      </div>
      <div className={`${styles.menu} ${isMobileMenuOpen ? styles.show : ''}`}>
        <Link href="/" className={pathname === "/" ? styles.active : ""}>
          Home
        </Link>
        <Link href="/about" className={pathname === "/about" ? styles.active : ""}>
          View-Download Data
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
        <Link href="/aboutapp" className={pathname === "/aboutapp" ? styles.active : ""}>
          About-App
        </Link>
      </div>
    </nav>
  );
};

export default NavBar;
