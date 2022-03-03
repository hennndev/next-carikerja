import Head from 'next/head'
import Image from 'next/image'
import { useRouter } from 'next/router'
import LatestJob from '@/components/UI/LatestJob'
import PageHeader from '@/components/UI/PageHeader'
import RightSidebar from '@/components/UI/RightSidebar'
import PageContainer from '@/components/UI/PageContainer'

export default function Home() {
    
    const router = useRouter()
    return (
        <>
            <Head>
                <title>Page Not Found</title>
                <link rel="icon" href="/favicon.ico" />
            </Head>
            <PageContainer>
                <div className='content'>
                    <PageHeader title="Error page" />    
                    <div className="px-5 xl:px-10">
                        <div className="flex-center flex-col space-y-5">
                            <div className="relative w-[300px] h-[300px]">
                                <Image src="/images/error-page.jpg" layout='fill' objectFit='contain'/>
                            </div>
                           <button className="btn w-max" onClick={() => router.push('/')}>Back to Home</button>
                        </div>
                    </div>
                </div>
                <RightSidebar>
                    <LatestJob/>
                </RightSidebar>
            </PageContainer>
        </>
    )
}


