import Head from "next/head"
import nookies from 'nookies'
import { useRouter } from "next/router"
import { useAuth } from "context/authContext"
import BackPage from "@/components/UI/BackPage"
import LatestJob from "@/components/UI/LatestJob"
import PageHeader from "@/components/UI/PageHeader"
import RightSidebar from "@/components/UI/RightSidebar"
import PageContainer from "@/components/UI/PageContainer"
import EditProfileForm from "@/components/Profile/EditProfileForm"
import EmployerEditProfile from "@/components/Profile/EmployerEditProfile"

const EditProfile = () => {
    const router = useRouter()
    const { userLogin } = useAuth()
    
    return (
        <>
            <Head>
                <title>Edit Profile | JobSeeker</title>
                <link rel="icon" href="/favicon.ico" />
            </Head>
            <PageContainer>
                <div className='content'>
                    <PageHeader title="Edit Profile" />
                    <div className="px-5 lg:px-10 mt-5">
                        <BackPage clicked={() => router.push('/profile')}/>
                        {userLogin?.username ? <EditProfileForm/> : <EmployerEditProfile/>}
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
    const { userLogin } = nookies.get(ctx)

    if(!userLogin) {
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





export default EditProfile