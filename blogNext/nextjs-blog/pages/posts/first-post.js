import Link from 'next/link';
import { getSortedPostsData } from '../../lib/posts';
import styles from './styles.module.scss';


export async function getStaticProps() {
    const allPostsData = getSortedPostsData();
    return {
        props: {
            allPostsData,
        }
    }
}
export default function FirstPost({ allPostsData }) {
    return (
        <>
            <div style={{ height: '200px', width: '30vw' }}>
                <h1>First Post</h1>
                <Link href={'/'}>Go Back</Link>
                <span>Href navigate</span>
                <a href={'/'}></a>
            </div>
            <>
                {allPostsData.map(({ title, id, date }) => {
                    return <div className={styles.card} key={id}>
                        <span className={styles.title}>{title}  <span className={styles.date}>{date}</span> </span>
                    </div>
                })
                }
            </>
        </>
    )
}