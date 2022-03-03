import moment from 'moment'
import Image from 'next/image'
import { useRouter } from 'next/router'
import { IoTime } from 'react-icons/io5'

const Post = ({data}) => {

    const router = useRouter()
    return (
        <div className="bg-white shadow-lg rounded-md p-4 cursor-pointer group hover:transform hover:-translate-y-1 transition duration-500" onClick={() => router.push(`/post/${data._id}`)}>         
            <div className="flex flex-col">
                <div className="flex items-center space-x-5">
                    <div className="w-12 h-12 relative rounded-full">
                        <Image src={data?.dataEmployer?.logoProfileURL ? data?.dataEmployer?.logoProfileURL : '/images/blank-profile.png'} layout="fill" objectFit='contain' className='rounded'/>
                    </div>
                    <h1 className="text-lg md:text-xl text-[#2C3333] group-hover:text-blue-700 group-hover:underline line-clamp-2">{data.judul}</h1>
                </div>
                <div className="flex items-center mt-5 flex-wrap">
                    <h1 className='text-gray-600 underline mr-3 text-sm'>{data.kategoriPekerjaan}</h1>
                    <div className="flex items-center space-x-1 text-gray-600 text-sm mr-3">
                        <IoTime className='text-blue-600 text-base'/>
                        <p>{moment(data.createdAt).startOf('ss').fromNow()}</p>
                    </div>
                </div>
                <p className='text-gray-500 mt-2 line-clamp-4'>{data.deskripsiPekerjaan}</p>
                <div className="flex flex-col md:flex-row md:justify-between mt-3 space-y-2 md:space-y-0">
                    <div className='flex items-center flex-wrap flex-1'>
                        {data.kemampuan.map((skill) => (
                            <p className='text-box' key={skill}>{skill}</p>
                        ))}
                        <p className='bg-gray-500 text-box text-white ml-auto'>
                            {data.kandidat.length} Kandidat
                        </p>
                    </div>
                </div>
            </div>
        </div>
    )
}


export default Post