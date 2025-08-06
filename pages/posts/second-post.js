/**get data from local file by getStaticProps before component init */

import Link from 'next/link';
import { getPostDataFromDB } from '../../lib/posts';
import styles from './styles.module.scss';


export async function getStaticProps() {
    try {
        // 先尝试从数据库获取数据
        const allPostsData = await getPostDataFromDB();
        
        if (allPostsData && allPostsData.result && allPostsData.result.length > 0) {
            return {
                props: {
                    allPostsData
                }
            }
        }
        
        // 如果数据库数据为空，尝试 API
        const res = await fetch('http://localhost:3000/api/post');
        
        // 检查响应状态
        if (!res.ok) {
            console.error(`API 请求失败: ${res.status} ${res.statusText}`);
            throw new Error(`HTTP error! status: ${res.status}`);
        }
        
        // 检查 Content-Type
        const contentType = res.headers.get('content-type');
        if (!contentType || !contentType.includes('application/json')) {
            console.error('API 返回的不是 JSON 格式:', contentType);
            const text = await res.text();
            console.error('实际返回内容:', text.substring(0, 200));
            throw new Error('API 返回的不是 JSON 格式');
        }
        
        const apiData = await res.json();
        return {
            props: {
                allPostsData: apiData
            }
        }
    } catch (err) {
        console.error('获取数据时出错:', err.message);
        
        // 返回默认数据
        return {
            props: {
                allPostsData: { 
                    result: [
                        {
                            _id: '1',
                            title: '示例文章',
                            context: '这是一个示例文章内容',
                            date: new Date().toISOString()
                        }
                    ]
                }
            }
        }
    }
}
export default function SecondPost({ allPostsData }) {
    // 安全检查数据结构
    const posts = allPostsData?.result || [];
    
    return (
        <>
            <div style={{ height: '200px', width: '30vw' }}>
                <h1>Second Post</h1>
                <Link href={'/'}>Go Back</Link>
                <span>Href navigate</span>
                <a href={'/'}></a>
            </div>
            <div>
                {posts.length > 0 ? (
                    posts.map(({ title, _id, date, context }) => {
                        return (
                            <div className={styles.card} key={_id}>
                                <span className={styles.title}>
                                    {title}  
                                    <span className={styles.date}>
                                        {new Date(date).toLocaleDateString()}
                                    </span> 
                                </span>
                                <div className={styles.content}>{context}</div>
                            </div>
                        )
                    })
                ) : (
                    <div className={styles.card}>
                        <p>暂无文章数据</p>
                    </div>
                )}
            </div>
        </>
    )
}