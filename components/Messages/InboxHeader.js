import moment from "moment"
import Image from "next/image"

const InboxHeader = ({messageTerm}) => {
    return (
        <div className="flex-between">
            <div className="flex items-center space-x-3">
                <div className="w-10 h-10 relative">
                    <Image src={messageTerm?.logoProfileURL ? messageTerm?.logoProfileURL : messageTerm?.fotoProfileURL ? messageTerm?.fotoProfileURL : '/images/blank-profile.png'} layout="fill" objectFit='contain'/>
                </div>  
                <div className="flex flex-col space-y-1 flex-1">
                    <h1 className="text-black font-medium text-[15px] flex-1 line-clamp-1">{messageTerm?.namaPerusahaan ? messageTerm?.namaPerusahaan : messageTerm?.nama}</h1>
                    <p className="text-gray-500 text-sm lg:hidden">{moment(messageTerm?.createdAt).format('LLL')}</p>
                </div>
            </div>
            <p className="text-gray-500 text-sm hidden lg:inline-flex">{moment(messageTerm?.createdAt).format('LLL')}</p>
        </div>
    )
}


export default InboxHeader