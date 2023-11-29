/**get data from local file by getStaticProps before component init */

import Link from 'next/link';
import { getPostDataFromDB } from '../../lib/posts';
import styles from './styles.module.scss';


export async function getStaticProps() {
    try {
        // const allPostsData = await getPostDataFromDB(); // get data from db
        const res = await fetch('http://localhost:3000/api/post'); // get data from api
        const allPostsData = await res.json();
        return {
            props: {
                allPostsData
            }
        }
    } catch (err) {
        console.log('error---', err)
    }

}
export default function SecondPost({ allPostsData }) {
    return (
        <>
            <div style={{ height: '200px', width: '30vw' }}>
                <h1>Second Post</h1>
                <Link href={'/'}>Go Back</Link>
                <span>Href navigate</span>
                <a href={'/'}></a>
            </div>
            <>
                {allPostsData.result.map(({ title, _id, date, context }) => {
                    return <div className={styles.card} key={_id}>
                        <span className={styles.title}>{title}  <span className={styles.date}>{date}</span> </span>
                        <div className={styles.content}>{context}</div>
                    </div>
                })
                }
            </>
        </>
    )
}