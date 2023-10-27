import Script from 'next/script';
import Head from 'next/head';



export default function TryScriptComponent() {

    return (
        <>
            <Head>
                <title>Next Script Component</title>
            </Head>
            <Script src='https://connect.facebook.net/en_US/sdk.js' strategy='lazyload' onLoad={()=>{console.log('script loaded')}}>
            </Script>
        </>
    )
}