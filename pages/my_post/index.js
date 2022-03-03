import Head from "next/head"
import nookies from 'nookies'
import { useState } from "react"
import { useRouter } from "next/router"
import Modal from "@/components/UI/Modal"
import Post from "@/components/MyPost/Post"
import LatestJob from "@/components/UI/LatestJob"
import PageHeader from "@/components/UI/PageHeader"
import RightSidebar from "@/components/UI/RightSidebar"
import PageContainer from "@/components/UI/PageContainer"

const MyPost = ({data}) => {

    const router = useRouter()
    const [value, setValue] = useState('')
    const [dropdown, setDropdown] = useState(false)
    const [isSuccess, setIsSuccess] = useState(false)
    const [isLoading, setIsLoading] = useState(false)

    const filteredPosts = data.filter(data => {
        return data.judul.toLowerCase().includes(value.toLowerCase())
    })
    const openDropdown = (e, val) => {
        e.stopPropagation()
        setDropdown(val)
    }
    const closeDropdown = (e) => {
        e.stopPropagation()
        setDropdown(false)
    }
    const closeSuccess = () => {
        setIsSuccess(false)
        router.replace(router.asPath)
    }
    const deletePost = async(e, postId) => {
        e.stopPropagation(e)
        setIsLoading(true)
        setDropdown(false)
        const req = await fetch(`/api/jobs/${postId}`, {
            method: 'DELETE'
        })
        const res = await req.json()
        if(res) {
            setIsLoading(false)
            setIsSuccess(true)
        }
    }

    return (
        <>
            <Head>
                <title>My Post | CariKERJA</title>
                <link rel="icon" href="/favicon.ico" />
            </Head>
            {isSuccess && (
                <Modal handleClose={closeSuccess}>
                    <h1>Berhasil menghapus post</h1>
                </Modal>
            )}
            <PageContainer>
                <div className='content' onClick={closeDropdown}>
                    <PageHeader 
                        title="My Post" 
                        handleSearch={(val) => setValue(val)} 
                        searchPlaceholder="Cari post berdasarkan judul" 
                        searchBtn="Cari Post"/>
                    <div className="px-5 py-5 xl:px-10">
                        <div className="flex flex-col space-y-3">
                            {filteredPosts.length > 0 ? filteredPosts.map((post, idx) => (
                                <Post 
                                    post={post} 
                                    idx={idx + 1} 
                                    key={post._id} 
                                    dropdown={dropdown} 
                                    isLoading={isLoading}
                                    openDropdown={openDropdown}
                                    closeDropdown={closeDropdown}
                                    deletePost={(e) => deletePost(e, post._id)}/>
                            )) : (
                                <div className="text-center text-gray-500">
                                    <h1>Tidak ada post!</h1>
                                </div>
                            )}
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

export const getServerSideProps = async(ctx) => {
    const { userLogin } = nookies.get(ctx) 
    const res = await fetch('http://localhost:3000/api/jobs')
    const data = await res.json()

    if(!userLogin) {
        return {
            redirect: {
                destination: '/'
            }
        }
    }

    if(JSON.parse(userLogin)) {
        const getData = data.data.filter(post => post.dataEmployer?.email === JSON.parse(userLogin)?.email )
        return {
            props: {
                data: getData
            }
        }
    }
}

export default MyPost