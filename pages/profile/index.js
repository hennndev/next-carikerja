import Head from "next/head"
import nookies from 'nookies'
import { useRouter } from "next/router"
import { utilFetchGet } from "utils/utils"
import { useData } from "context/appContext"
import { useAuth } from "context/authContext"
import LatestJob from "@/components/UI/LatestJob"
import PageHeader from "@/components/UI/PageHeader"
import RightSidebar from "@/components/UI/RightSidebar"
import PageContainer from "@/components/UI/PageContainer"
import EmployerProfile from "@/components/Profile/EmployerProfile"
import JobSeekerProfile from "@/components/Profile/JobSeekerProfile"

const Profile = ({data}) => {

    const router = useRouter()   
    const { userLogin } = useAuth()
    const { handleAccountTerm } = useData()
    const handleEdit = () => {
        handleAccountTerm(data)
        router.push('/profile/edit_profile')
    }   
    return (
        <>
            <Head>
                <title>Profile | JobSeeker</title>
                <link rel="icon" href="/favicon.ico" />
            </Head>
            <PageContainer>
                <div className='content'>
                    <PageHeader title="Profile"/>
                    <div className="px-5 lg:px-10">
                        {userLogin?.username ? <JobSeekerProfile data={data} handleEdit={handleEdit}/> : <EmployerProfile data={data} handleEdit={handleEdit}/>}
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
    if(JSON.parse(userLogin)) {
        const data = await utilFetchGet(`account/${JSON.parse(userLogin).email}?coll=${JSON.parse(userLogin).namaPerusahaan ? 'employers' : 'job_seekers'}`)
        const {password, createdAt, ...dataAccount} = data?.data

        return {
            props: {
                data: dataAccount
            }
        }
    }
}

export default Profile