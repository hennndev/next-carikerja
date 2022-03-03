import Head from 'next/head'
import nookies from 'nookies'
import { utilFetch } from 'utils/utils'
import { useRouter } from 'next/router'
import { useAuth } from 'context/authContext'
import BackPage from '@/components/UI/BackPage'
import LatestJob from '@/components/UI/LatestJob'
import PageHeader from '@/components/UI/PageHeader'
import RightSidebar from '@/components/UI/RightSidebar'
import PageContainer from '@/components/UI/PageContainer'
import JobSeekerProfile from '@/components/Profile/JobSeekerProfile'
import EmployerProfile from '@/components/Profile/EmployerProfile'


const UsersProfile = ({data}) => {
    const router = useRouter()
    const { userLogin } = useAuth()
    return (
        <>
            <Head>
                <title>{data?.namaPerusahaan ? 'Employer' : 'Job Seeker'} Profile | CariKERJA</title>
                <link rel="icon" href="/favicon.ico" />
            </Head>
            <PageContainer>
                <div className='pb-10 flex-1 lg:border-x lg:border-gray-200'>
                    <PageHeader title={data?.namaPerusahaan ? 'Employer Profile' : 'Job Seeker Profile'}/>
                    <div className="px-5 xl:px-10">
                        <BackPage clicked={() => router.back()}/>
                        {!userLogin?.namaPerusahaan ? <EmployerProfile data={data}/> : <JobSeekerProfile data={data}/>}
                    </div>
                </div>
                <RightSidebar>
                    <LatestJob/>
                </RightSidebar>
            </PageContainer>
        </>
    )
}


export const getServerSideProps = async(req, res) => {
    const { profileId } = req.query
    const { userLogin } = nookies.get(req)

    const data = await utilFetch(`account/${profileId}?coll=${!JSON.parse(userLogin)?.namaPerusahaan ? 'employers': 'job_seekers'}`)

    if(!data.data) {
        return {
            notFound: true
        }
    } else {
        const {password, createdAt, ...dataAccount} = data?.data
        return {
            props: {
                data: dataAccount
            }
        }
    }
}


export default UsersProfile