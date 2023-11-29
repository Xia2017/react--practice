
import styles from './layout.module.scss';
import { clsx } from 'clsx';
import { useRouter } from 'next/router'

// common component to layout
export default function Layout({ children }) {
    const router = useRouter();
    const isHome = router.pathname === '/' ? true : false
    return <div className={clsx({ [styles.container]: isHome === false, [styles.home]: isHome === true })}>
        <div className={styles.contentConainer}>{children}</div>
    </div>
}