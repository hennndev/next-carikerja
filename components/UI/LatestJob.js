import { FiMapPin } from 'react-icons/fi'
import useSWR from 'swr'
import Image from 'next/image';
import { useRouter } from 'next/router';

const fetcher = (url) => fetch(url).then((res) => res.json());

const LatestJob = () => {
    const { data, error } = useSWR(
        `/api/jobs`,
        fetcher
    );
    const router = useRouter()

    return (
        <div className="mt-8">
            <h1 className="font-semibold text-blue-400 text-xl">Terakhir di Post</h1>
            <div className="flex flex-col space-y-5 border-t-2 border-gray-200 mt-5 pt-5">  
            {data?.data.length > 0 ? data?.data.map(post => (
                <div className="flex space-x-2 group cursor-pointer" key={post._id} onClick={() => router.push(`/post/${post._id}`)}>
                    <div className="w-7 h-7 relative rounded-full">
                        <Image src={post?.dataEmployer?.logoProfileURL ? post?.dataEmployer?.logoProfileURL : '/images/blank-profile.png'} layout="fill" objectFit='contain' className='rounded'/>
                    </div>

                    <div className="flex-1 -mt-[2px]">
                        <h1 className="line-clamp-2 text-gray-900 text-[15px] leading-5 group-hover:text-blue-700 transition duration-200 hover:underline">{post.judul}</h1>
                        <h1 className="text-gray-600 text-sm line-clamp-2 mt-1">{post?.dataEmployer?.namaPerusahaan}</h1>
                        <div className="flex items-center space-x-1 text-sm text-gray-400 mt-1">
                            <FiMapPin/>
                            <p>{post?.dataEmployer?.alamatPerusahaan}</p>
                        </div>
                        <h1 className='text-green-600 text-sm mt-1 font-medium'>{post.rangeGaji}</h1>
                        <div className='flex items-center mt-2'>
                            {post?.kemampuan.slice(0, 2).map(skill => (
                                <p className='bg-gray-200 border border-gray-500 py-1 px-2 rounded-sm text-gray-600 text-[13px] mr-2 mb-2' key={skill}>{skill}</p>
                            ))}
                        </div>
                    </div>
                </div> 
            )) : (
                <h1 className='text-center text-gray-500'>Belum ada post untuk saat ini!</h1>
            )}
            </div>
        </div>
    )
}

export default LatestJob