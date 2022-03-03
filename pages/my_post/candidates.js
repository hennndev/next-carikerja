import Head from 'next/head'
import nookies from 'nookies'
import { utilFetch } from 'utils/utils'
import { useRouter } from 'next/router'
import Modal from '@/components/UI/Modal'
import { useState, useEffect } from 'react'
import { useData } from 'context/appContext'
import BackPage from '@/components/UI/BackPage'
import LatestJob from '@/components/UI/LatestJob'
import PageHeader from '@/components/UI/PageHeader'
import Candidate from '@/components/MyPost/Candidate'
import RightSidebar from '@/components/UI/RightSidebar'
import PageContainer from '@/components/UI/PageContainer'


const Candidates = () => {

    const router = useRouter()
    const { dataCandidates } = useData()
    const [dropdown, setDropdown] = useState(false)
    const [isSuccess, setIsSuccess] = useState(false)

    const openDropdown = (val) => {
        setDropdown(val)
    }
    const closeDropdown = () => {
        setDropdown(false)
    }
    const deleteCandidate = async (candidateId) => {
        const resFetch = await utilFetch(`jobs/${dataCandidates.postId}`, 'PUT', {candidateId})
        if(resFetch) {
            setIsSuccess(true)
        }
    }
    const closeSuccessModal = () => {
        setIsSuccess(false)
        router.replace('/my_post')
    }
    useEffect(() => {
        if(!dataCandidates) {
            router.replace('/my_post')
        }
    }, [dataCandidates])

    return (
        <>
            <Head>
                <title>Candidates | CariKERJA</title>
                <link rel="icon" href="/favicon.ico" />
            </Head>
            {isSuccess && (
                <Modal handleClose={closeSuccessModal}>
                    <h1>Berhasil hapus kandidat</h1>
                </Modal>
            )}
            <PageContainer>
                <div className='content'>
                    <PageHeader title="Kandidat"/>
                    <div className="px-5 xl:px-10">
                        <BackPage clicked={() => router.back()}/>
                        {dataCandidates?.candidates?.length > 0 ? dataCandidates?.candidates?.map(candidate => (
                            <Candidate 
                                key={candidate.id} 
                                candidate={candidate} 
                                dropdown={dropdown} 
                                openDropdown={openDropdown} 
                                closeDropdown={closeDropdown} 
                                postId={dataCandidates.postId}
                                deleteCandidate={() => deleteCandidate(candidate.id)}/>
                        )) : (
                            <h1 className='text-gray-500 text-center text-lg'>Belum ada Kandidat</h1>
                        )}
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


export default Candidates