import useSWR from "swr"
import Head from "next/head"
import nookies from 'nookies'
import { useAuth } from "context/authContext"
import LatestJob from "@/components/UI/LatestJob"
import PageHeader from "@/components/UI/PageHeader"
import RightSidebar from "@/components/UI/RightSidebar"
import PostJobForm from "@/components/PostJob/PostJobForm"
import PageContainer from "@/components/UI/PageContainer"

const fetcher = (url) => fetch(url).then(res => res.json())

const PostJob = () => {
    const { userLogin } = useAuth()
    const { data } = useSWR(
        `/api/account/${userLogin?.email}?coll=employers`,
        fetcher
    )
    return (
        <>
            <Head>
                <title>Post Job | JobSeeker</title>
                <link rel="icon" href="/favicon.ico" />
            </Head>
            <PageContainer>
                <div className='content'>
                    <PageHeader title="Post Loker"/>
                    <div className="px-5 xl:px-10">
                        <PostJobForm data={data?.data}/>
                    </div>
                </div>
                <RightSidebar>
                    <LatestJob/>
                </RightSidebar>
            </PageContainer>
        </>
    )
}


export const getServerSideProps = async(ctx) => {
    const cookies = nookies.get(ctx)

    if(!cookies.userLogin) {
        return {
            redirect: {
                destination: '/'
            }
        }
    }

    return {
        props: {}
    }
}


export default PostJob