import moment from 'moment'
import { utilFetch } from 'utils/utils'
import { useRouter } from 'next/router'
import { AiFillStar } from 'react-icons/ai'

const Message = ({id, data, handleMessageTerm}) => {

    const router = useRouter()
    const handleClick = async () => {
        handleMessageTerm()
        const fetchMsgs = await utilFetch(`messages/${id}`, 'PUT', {msgId: data.msgId})
        if(fetchMsgs) {
            router.push('/messages/inbox')
        }
    }
    const handleStar = async (e) => {
        e.stopPropagation()
        const fetchMsgs = await utilFetch(`messages/${id}?star=true`, 'PUT', {msgId: data.msgId, val: !data.star ? true : false})
        if(fetchMsgs) {
            router.replace('/messages')
        } 
    }
 
    return (
        <div className="flex items-center py-3 px-4 rounded-full cursor-pointer shadow-md relative hover:shadow-lg" onClick={handleClick}>
            {data.status === 'unread' && (
                <div className='w-3 h-3 bg-red-500 rounded-full absolute right-0 top-0'/>
            )}
            <div className="flex items-center mr-3 space-x-1 md:space-x-3 text-gray-700">
                <AiFillStar onClick={e => handleStar(e)} className={`cursor-pointer hover:text-orange-700 ${data.star && 'text-orange-700'}`}/>
                <h1 className="text-sm line-clamp-1 flex-1 text-gray-500">{data?.namaPerusahaan ? data?.namaPerusahaan : data?.nama}</h1>
            </div>
            <div className="flex-between flex-1 space-x-2 text-sm text-gray-500">
                <p className="line-clamp-1 text-sm w-[100px] sm:w-[200px] md:w-[400px] text-gray-700">{data.pesan}</p>
                <p className="text-gray-700 text-xs">{moment(data?.createdAt).format('l')}</p>
            </div>
        </div>
    )
}

export default Message