import Head from "next/head"
import nookies from 'nookies'
import LatestJob from "@/components/UI/LatestJob"
import PageHeader from "@/components/UI/PageHeader"
import RightSidebar from "@/components/UI/RightSidebar"
import PostJobForm from "@/components/PostJob/PostJobForm"
import PageContainer from "@/components/UI/PageContainer"

const EditPost = () => {
    return (
        <>
            <Head>
                <title>Edit Post | JobSeeker</title>
                <link rel="icon" href="/favicon.ico" />
            </Head>
            <PageContainer>
                <div className='content'>
                    <PageHeader title="Edit Post"/>
                    <div className="px-5 xl:px-10">
                        <PostJobForm editPost/>
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


export default EditPost