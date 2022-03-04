import moment from "moment"
import Head from "next/head"
import nookies from 'nookies'
import { useState } from "react"
import { useAuth } from "context/authContext"
import Msgs from "@/components/Messages/Messages"
import LatestJob from "@/components/UI/LatestJob"
import PageHeader from "@/components/UI/PageHeader"
import RightSidebar from "@/components/UI/RightSidebar"
import PageContainer from "@/components/UI/PageContainer"

const Messages = ({data}) => {

    const { userLogin } = useAuth()
    const [value, setValue] = useState('')
    const [isStar, setIsStar] = useState(false)

    const utilFilter = (val) => val?.toLowerCase()?.replaceAll(' ', '') 
    const utilFilterMsgs = (dataParam) => {
        return dataParam.filter(data => userLogin?.namaPerusahaan ? data.nama : data.namaPerusahaan).filter(data => isStar ? data.star : data)
    }

    const filteredMessages = data.map(data => {
        return {
            ...data,
            messages: data.messages.filter(msg => {
                return utilFilter(msg?.namaPerusahaan)?.includes(utilFilter(value)) ||
                utilFilter(msg?.nama)?.includes(utilFilter(value)) ||
                utilFilter(moment(msg.createdAt).format('l')).includes(utilFilter(value))
            })
        }
    })
    
    const messagesLength = filteredMessages.map(data => {
        return {
            ...data,
            messages: utilFilterMsgs(data.messages)
        }
    }).reduce((currVal, val) => currVal += val.messages.length ,0)


    return (
        <>
            <Head>
                <title>Kotak Masuk | JobSeeker</title>
                <link rel="icon" href="/favicon.ico" />
            </Head>
            <PageContainer>
                <div className='content'>
                    <PageHeader 
                        title="Kotak Masuk" 
                        handleSearch={(val) => setValue(val)}
                        searchPlaceholder="Cari pesan berdasar pengirim dan tanggal" 
                        searchBtn="Cari Pesan"/>
                    <div className="px-5 xl:px-10">
                        <div className="flex items-center justify-around">
                            <h1 className={`${!isStar? 'text-blue-600' : 'text-gray-600 '} hover:text-blue-600 font-medium cursor-pointer`} onClick={() => setIsStar(false)}>Semua Pesan</h1>
                            <h1 className={`${isStar? 'text-orange-600' : 'text-gray-600'} hover:text-orange-600 font-medium cursor-pointer`} onClick={() => setIsStar(true)}>Pesan Berbintang</h1>
                        </div>
                        {messagesLength > 0 ? <Msgs data={filteredMessages} utilFilterMsgs={utilFilterMsgs}/> : (
                            <h1 className="text-center text-gray-500 text-lg font-medium mt-5">
                                {isStar ? 'Tidak ada pesan berbintang!' : 'Tidak ada pesan!'}
                            </h1>
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
    const cookies = nookies.get(ctx)
    if(!cookies.userLogin) {
        return {
            redirect: {
                destination: '/'
            }
        }
    }
    if(JSON.parse(cookies.userLogin)) {
        const res = await fetch(`http://localhost:3000/api/messages/${JSON.parse(cookies.userLogin)?.email}?q=${JSON.parse(cookies.userLogin)?.namaPerusahaan ? 'employer' : 'job_seeker'}`)
        const data = await res.json()

        return {
            props: data
        }
    }
}

export default Messages