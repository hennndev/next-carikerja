import Head from "next/head"
import nookies from 'nookies'
import { useRouter } from 'next/router'
import Modal from '@/components/UI/Modal'
import { useState, useEffect } from "react"
import { useData } from 'context/appContext'
import BackPage from '@/components/UI/BackPage'
import LatestJob from "@/components/UI/LatestJob"
import PageHeader from "@/components/UI/PageHeader"
import RightSidebar from "@/components/UI/RightSidebar"
import InboxBody from "@/components/Messages/InboxBody"
import PageContainer from '@/components/UI/PageContainer'
import InboxHeader from '@/components/Messages/InboxHeader'
import ReplyMessage from '@/components/Messages/ReplyMessage'

const Inbox = () => {

    const router = useRouter()
    const { messageTerm } = useData()
    const [isSuccess, setIsSuccess] = useState(false)
    const [dropdown, setDropdown] = useState(false)
    const [isCreateMessage, setIsCreateMessage] = useState(false)

    const fetchDelete = async(url) => {
        const req = await fetch(`/api/messages/${url}`, {
            method: 'DELETE'
        })
        const res = await req.json()
        if(res) {
            setIsSuccess(true)
        }
    }

    const handleDeleteMessage = async() => {
        if(messageTerm.msgsLength > 1) {
            await fetchDelete(`${messageTerm.id}?msgId=${messageTerm.msgId}`)
        } else {
            await fetchDelete(`${messageTerm.id}`)
        }
    }

    const closeSuccessModal = () => {
        setIsSuccess(false)
        router.replace('/messages')
    }
    const handleDropdown = (e, val) => {
        e.stopPropagation()
        setDropdown(val)
    }
    const handleCloseDropdown = () => setDropdown(false)
    useEffect(() => {
        if(!messageTerm) {
            router.replace('/messages')
        }
    }, [messageTerm])

    return (
        <>
            <Head>
                <title>Inbox | JobSeeker</title>
                <link rel="icon" href="/favicon.ico" />
            </Head>
            {isSuccess && <Modal handleClose={closeSuccessModal}>
                <h1>Berhasil menghapus pesan ini</h1>
            </Modal>}
            <PageContainer>
                <div className='px-5 xl:px-10 content' onClick={handleCloseDropdown}>
                    <PageHeader title="Inbox"/>
                    <BackPage clicked={() => router.back()}/>
                    <div className="shadow-sm border border-gray-300 rounded w-full min-h-[300px] p-5 flex flex-col">
                        <InboxHeader messageTerm={messageTerm}/>
                        {messageTerm ? <InboxBody 
                            messageTerm={messageTerm} 
                            isCreateMessage={isCreateMessage} 
                            dropdown={dropdown} 
                            handleDropdown={handleDropdown} 
                            setIsCreateMessage={setIsCreateMessage} 
                            handleCloseDropdown={handleCloseDropdown}
                            handleDeleteMessage={handleDeleteMessage}/> : (
                            <p className="flex-center text-gray-500 mt-5">No Data...</p>
                        )}
                    </div>
                    {isCreateMessage && <ReplyMessage setIsCreateMessage={setIsCreateMessage} messageTerm={messageTerm}/>}
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


export default Inbox