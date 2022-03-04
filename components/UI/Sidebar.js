import useSWR from "swr"
import { useRouter } from 'next/router'
import { FiUsers } from 'react-icons/fi'
import { useData } from 'context/appContext'
import { useAuth } from 'context/authContext'
import { IoLogoLinkedin } from 'react-icons/io'
import { IoSettingsOutline } from 'react-icons/io5'
import { BiHome, BiMessageDetail, BiUser } from 'react-icons/bi'
import { MdLogin, MdOutlinePowerSettingsNew, MdWorkOutline } from 'react-icons/md'

const fetcher = (url) => fetch(url).then(res => res.json())

const Sidebar = () => {
    const router = useRouter()
    const { userLogin, handleLogout } = useAuth()
    const { openSidebar, handleCloseSidebar } = useData()
    const { data } = useSWR('/api/messages', fetcher)
    
    const handleClick = (route) => {
        handleCloseSidebar()
        router.push(route)
    }
    const logout = () => {
        handleCloseSidebar()
        handleLogout()
    } 

    const messagesNotif = data?.data?.filter(data => {
        return userLogin?.namaPerusahaan ? 
            data.emailPengirim === userLogin?.email : 
            data?.emailTujuan === userLogin?.email
    }).map(data => {
        return {
            ...data,
            messages: data.messages.filter(msg => {
                return userLogin?.namaPerusahaan ? 
                    msg.nama && msg.status === 'unread' : 
                    msg.namaPerusahaan && msg.status === 'unread'
            })
        }
    }).reduce((currVal, val) => currVal + val.messages.length, 0)

    return (
        <>
            <div className={`overlay ${openSidebar ? 'block' : 'hidden'} lg:hidden`} onClick={handleCloseSidebar}/>       
            <div className={`w-[200px] md:w-[250px] ${openSidebar ? 'block z-30 shadow-lg lg:shadow-none' : 'hidden'} fixed left-0 bottom-0 lg:block lg:sticky h-full lg:h-screen top-0 py-7 px-5 bg-white`}>
                <div className="flex-center space-x-2 text-blue-500 cursor-pointer" onClick={() => handleClick('/')}>
                    <IoLogoLinkedin className='text-3xl md:text-4xl'/>
                    <p className='text-xl md:text-2xl font-bold'>CariKERJA</p>
                </div>

                <div className="mt-16 ml-4 md:ml-8 font-semibold text-gray-500">
                    <div className={`link-container group ${router.pathname === '/' && 'text-blue-400'}`} onClick={() => handleClick('/')}>
                        <BiHome className='icon-link'/>
                        <p className='link-text'>Homepage</p>
                    </div>
                    {userLogin && (
                        <div className={`relative link-container group ${router.pathname === '/messages' && 'text-blue-400'}`} onClick={() => handleClick('/messages')}>
                            <BiMessageDetail className='icon-link'/>
                            <p className='link-text'>Kotak Masuk</p>
                            {messagesNotif > 0 && (
                                <div className='bg-red-500 py-[2px] px-2 rounded-full text-[11px] text-white flex-center absolute -left-6 -top-2 overflow-hidden'>
                                    <p>{messagesNotif}</p>
                                </div>
                            )}
                        </div>
                    )}
                    {userLogin?.namaPerusahaan && (
                        <div className={`link-container group ${router.pathname === '/post_job' && 'text-blue-400'}`} onClick={() => handleClick('/post_job')}>
                            <MdWorkOutline className='icon-link'/>
                            <p className='link-text'>Tawarkan Job</p>
                        </div>
                    )}
                    {userLogin?.namaPerusahaan && (
                        <div className={`link-container group ${router.pathname === '/my_post' && 'text-blue-400'}`} onClick={() => handleClick('/my_post')}> 
                            <FiUsers className='icon-link'/>
                            <p className='link-text'>My Post</p>
                        </div>
                    )}
                    {userLogin && (
                        <div className={`link-container group ${router.pathname === '/profile' && 'text-blue-400'}`} onClick={() => handleClick('/profile')}>
                            <BiUser className='icon-link'/>
                            <p className='link-text'>Profile</p>
                        </div>
                    )}
                    {!userLogin && (
                        <div className={`link-container group ${router.pathname === '/login' && 'text-blue-400'}`} onClick={() => handleClick('/login')}>
                            <MdLogin className='icon-link'/>
                            <p className='link-text'>Login</p>
                        </div>
                    )}
                    <div className={`link-container group ${router.pathname === '/settings' && 'text-blue-400'}`} onClick={() => handleClick('/settings')}>
                        <IoSettingsOutline className='icon-link'/>
                        <p className='link-text'>Pengaturan</p>
                    </div>
                    {userLogin && (
                        <div className="link-container group text-red-400 hover:text-red-500" onClick={logout}>
                            <MdOutlinePowerSettingsNew className='icon-link'/>
                            <p className='link-text'>Logout</p>
                        </div>
                    )}
                </div>
            </div>
        </>
    )
}

export default Sidebar