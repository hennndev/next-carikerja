import Head from "next/head"
import Image from "next/image"
import { useState } from "react"
import { useRouter } from "next/router"
import { utilFetchGet } from "utils/utils"
import { useAuth } from "context/authContext"
import BackPage from "@/components/UI/BackPage"
import LatestJob from "@/components/UI/LatestJob"
import PageHeader from "@/components/UI/PageHeader"
import { BsBoxArrowInUpLeft } from 'react-icons/bs'
import SosmedIcons from "@/components/UI/SosmedIcons"
import ApplyForm from "@/components/PostJob/ApplyForm"
import RightSidebar from "@/components/UI/RightSidebar"
import PageContainer from "@/components/UI/PageContainer"

const PostDetail = ({data}) => {

    const router = useRouter()
    const { userLogin } = useAuth()
    const [isApply, setIsApply] = useState(false)
    const checkCandidateExist = data.kandidat.find(data => data.id === userLogin?._id)

    const handleApply = () => {
        if(!userLogin) {
            router.push('/login')
        } else if(!checkCandidateExist) {
            setIsApply(true)
        }
    }

    return (
        <>
            <Head>
                <title>Post Detail | JobSeeker</title>
                <link rel="icon" href="/favicon.ico" />
            </Head>
            {isApply && <ApplyForm dataPost={data} dataUserLogin={userLogin} handleClose={() => setIsApply(false)}/>}
            <PageContainer>
                <div className='content'>
                    <PageHeader title="Post Detail"/>
                    <div className="px-5 xl:px-10">
                        <BackPage clicked={() => router.back()}/>
                        <div className="mt-5 px-2">
                            <div className="flex items-center space-x-3">
                                <div className="w-16 h-16 relative rounded-full">
                                    <Image src={data?.dataEmployer?.logoProfileURL ? data?.dataEmployer?.logoProfileURL : '/images/blank-profile.png'} layout="fill" objectFit="contain" className="rounded"/>
                                </div>
                                <h1 className="text-lg flex-1 font-medium text-gray-700">{data.dataEmployer.namaPerusahaan}</h1>
                            </div>
                            
                            <div className="flex flex-col space-y-3 mt-5">
                                <h1 className="text-2xl text-gray-600 font-bold">{data.judul}</h1>
                                <p>{data.deskripsiPekerjaan}</p>
                                <div className='mt-5 flex items-center flex-wrap'>
                                    {data.kemampuan.map((skill) => (
                                        <p className='text-box' key={skill}>{skill}</p>
                                    ))}
                                </div>      
                                <p>Tingkatan Kandidat: {' '}
                                    <span className="text-gray-600 font-medium">{data.tingkatanKandidat}</span>
                                </p>
                                <p>Sistem Pekerjaan: {' '}
                                        <span className="text-gray-600 font-medium">{data.sistemPekerjaan}</span>
                                </p>
                                <p>Jangka Waktu: {' '}
                                    <span className="text-gray-600 font-medium">{data.jangkaWaktu.replaceAll('_', ' ')}</span>
                                </p>
                                <p>Range Gaji: <span className="text-green-600 font-medium">{data.rangeGaji}</span></p>
                                {!userLogin?.namaPerusahaan && (
                                    <div className="flex items-center space-x-3">
                                        <button className={`btn ${checkCandidateExist && 'bg-gray-600 hover:bg-gray-600 cursor-not-allowed'} text-white flex items-center text-sm w-max`} onClick={handleApply}>
                                            <BsBoxArrowInUpLeft className="text-xl mr-2"/>
                                            {checkCandidateExist ? 'Anda sudah apply' : !userLogin ? 'Login dulu' : 'Apply Sekarang'}
                                        </button>
                                        <span className="text-gray-400 font-bold">||</span>
                                        <p className="bg-gray-600 p-2 rounded-md text-white text-sm h-max w-max">
                                            {data.kandidat.length} Kandidat
                                        </p>
                                    </div>
                                )}
                            </div>
                            <div className="mt-10">
                                <div className="flex-detail">
                                    <h1 className="text-title-detail">Tentang Perusahaan</h1>
                                    <p className="text-gray-600">{data.dataEmployer.tentangPerusahaan? data.dataEmployer.tentangPerusahaan : '---'}</p>
                                </div>
                                <div className="flex-detail">
                                    <h1 className="text-title-detail">Alamat Perusahaan</h1>
                                    <p className="text-gray-600 mt-1">{data.dataEmployer.alamatPerusahaan ? data.dataEmployer.alamatPerusahaan : '---'}</p>
                                </div>
                                <div className="flex-detail">
                                    <h1 className="text-title-detail">Situs Perusahaan</h1>
                                    <div className="flex flex-col space-y-2">
                                        {data.dataEmployer.situsPerusahaan.length > 0 ? data.dataEmployer.situsPerusahaan.map(situs => (
                                            <p className="mt-1 text-blue-500" key={situs}>{situs}</p>
                                        )) : (
                                            <p className="mt-1">---</p>
                                        )}
                                    </div>
                                </div>
                                <div className="flex flex-col space-y-2">
                                    <h1 className="text-title-detail">Social Media</h1>
                                    <SosmedIcons/>
                                </div>          
                            </div>
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


export const getServerSideProps = async(context) => {
    const data = await utilFetchGet(`jobs`)
    const dataId = data?.data.find(post => post._id === context.query.postId)

    if(!dataId) {
        return {
            notFound: true
        }
    } 
    return {
        props: {
            data: dataId,
        }
    }
}



export default PostDetail