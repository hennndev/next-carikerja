import { useRouter } from 'next/router'
import { IoArrowUndoOutline, IoClose } from 'react-icons/io5'
import { AiOutlineMore, AiOutlineDelete, AiOutlineMail } from 'react-icons/ai'

const InboxBody = ({messageTerm, isCreateMessage, setIsCreateMessage, dropdown, handleCloseDropdown, handleDropdown, handleDeleteMessage}) => {

    const router = useRouter()
    return (
        <div className="mt-5 xl:mt-7 flex-1 flex justify-between flex-col">
            <div>
                <h1 className='text-gray-500'>Pesan: </h1>
                <h1 className='break-all'>{messageTerm?.pesan}</h1>
            </div>
            <div className="flex-between mt-10">
                <button className="btn flex items-center border border-gray-300 bg-transparent hover:bg-gray-400 text-gray-500 hover:text-white w-max" onClick={() => setIsCreateMessage(!isCreateMessage)}>
                {isCreateMessage ? <IoClose className="mr-2 text-lg"/> : <IoArrowUndoOutline className="mr-2 text-lg"/>}
                    {isCreateMessage ? 'Batal' : 'Balas'}
                </button>
                <div className="relative">
                    {!isCreateMessage && (
                        <AiOutlineMore className="text-gray-500 text-xl cursor-pointer" onClick={(e) => handleDropdown(e, !dropdown)}/>
                    )}
                    {dropdown && (
                        <div className="dropdown w-[230px] mb-10 -top-[30px]">
                            <div className="item" onClick={() => setIsCreateMessage(true)}>
                                <IoArrowUndoOutline className="mr-2 text-lg"/>
                                <p>Balas</p>
                            </div>
                            <div className="item" onClick={handleDeleteMessage}>
                                <AiOutlineDelete className="mr-2 text-lg"/>
                                <p>Hapus pesan ini</p>
                            </div>
                            <div className="item" onClick={() => router.push(`/profile/${messageTerm?.email}`)}>
                                <AiOutlineMail className="mr-2 text-lg"/>
                                <p>Lihat Profile</p>
                            </div>              
                            <div className="item" onClick={handleCloseDropdown}>
                                <IoClose className="mr-2 text-lg"/>
                                <p>Close</p>
                            </div>
                        </div>
                    )}
                </div>
            </div>
        </div>
    )
}

export default InboxBody