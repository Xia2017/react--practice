import Image from 'next/image';
import Head from 'next/head';

export default function TryNextImage() {
    const imageLoader = () => {
        return `https://cc.tvbs.com.tw/img/upload/2022/05/20/20220520170357-1298d211.jpg`;
    }
    return (
        <>
            <Head>
                <title> Next Image</title>
            </Head>
            {/* basic usage */}
            <div>
                <Image src='/images/profile.jpg' height={100} width={200} alt='next/image' />
            </div>
            {/* with loader */}
            <div>
                <Image loader={imageLoader} alt='cat from loader' src="20220520170357-1298d211.jpg" width={200} height={200}></Image>
            </div>

            {/* with size */}
            <div style={{position:'relative',height:300,width:300}}>
                <Image src='/images/monkey.jpg' fill sizes='(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw' alt='size'
                style={{objectFit:'contain'}}></Image>
            </div>

        </>
    )
}