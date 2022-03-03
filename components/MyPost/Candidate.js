import Image from 'next/image'
import Modal from '../UI/Modal'
import { useState } from 'react'
import SendMessage from './SendMessage'
import { useRouter } from 'next/router'
import { IoClose} from 'react-icons/io5'
import { FiMoreVertical } from 'react-icons/fi'
import { AiOutlineProfile, AiOutlineUser, AiOutlineDelete, AiOutlineMessage } from 'react-icons/ai'

const Candidate = ({postId, candidate, dropdown, openDropdown, closeDropdown, deleteCandidate}) => {

    const router = useRouter()
    const [isMessage, setIsMessage] = useState(false)
    const [isApplyForm, setIsApplyForm] = useState(false)

    const handleApplyForm = () => {
        setIsApplyForm(true)
        closeDropdown()
    }
    const handleSendMessage = () => {
        setIsMessage(true)
        closeDropdown()
    }
    const handleSeeProfile = () => {
        router.push(`/profile/${candidate.email}`)
        closeDropdown()
    }

    console.log(candidate)

    return (
        <div className='flex-between shadow-sm p-3 text-gray-600'>
            <div className="flex items-center space-x-2">
                <div className="relative w-12 h-12">
                    <Image src={candidate?.fotoProfileURL ? candidate?.fotoProfileURL : "/images/blank-profile.png"} layout='fill' objectFit='contain'/>
                </div>
                <div className="flex flex-col flex-1">
                    <h1 className='text-[17px] md:text-lg font-medium line-clamp-1'>{candidate.nama}</h1>
                    <h1 className='text-sm line-clamp-1'>{candidate.job}</h1>
                </div>
            </div>
            {isMessage && <SendMessage postId={postId} candidate={candidate} handleClose={() => setIsMessage(false)}/>}
            {isApplyForm && (
                <Modal handleClose={() => setIsApplyForm(false)} scroll>
                    <div className='flex flex-col mb-2'>
                        <p>Nama:</p>
                        <h1 className='font-medium'>{candidate.nama}</h1>
                    </div>
                    <div className='flex flex-col mb-2'>
                        <p>Job:</p>
                        <h1 className='font-medium'>{candidate.job}</h1>
                    </div>
                    <div className='flex flex-col mb-2'>
                        <p>Email Aktif:</p>
                        <h1 className='font-medium'>{candidate.emailAktif}</h1>
                    </div>
                    <div className='flex flex-col mb-2'>
                        <p>No Telp:</p>
                        <h1 className='font-medium'>{candidate.noTelp}</h1>
                    </div>
                    <div className='flex flex-col mb-2'>
                        <p>Alasan Apply:</p>
                        <h1 className='font-medium'>{candidate.alasanApply}</h1>
                    </div>
                </Modal>
            )}
            <div className="flex items-center space-x-8">
                <h1 className='hidden sm:inline'>{candidate.emailAktif}</h1>
                <div className="relative ml-2">
                    <FiMoreVertical className="text-xl cursor-pointer" onClick={() => !dropdown ? openDropdown(candidate.id) : closeDropdown()}/>
                    {dropdown === candidate.id && (
                        <div className="dropdown">
                            <div className="item" onClick={handleApplyForm}>
                                <AiOutlineProfile/>
                                <p>Lihat Apply Form</p>
                            </div>
                            <div className="item" onClick={handleSeeProfile}>
                                <AiOutlineUser/>
                                <p>Lihat Profile</p>
                            </div>
                            <div className="item" onClick={handleSendMessage}>
                                <AiOutlineMessage/>
                                <p>Kirim Pesan</p>
                            </div>
                            <div className="item" onClick={deleteCandidate}>
                                <AiOutlineDelete/>
                                <p>Hapus Kandidat</p>
                            </div>
                            <div className="item" onClick={closeDropdown}>
                                <IoClose/>
                                <p>Close</p>
                            </div>
                        </div>
                    )}
                </div>
            </div>
        </div>
    )
}


export default Candidate