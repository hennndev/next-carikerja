import useSWR from 'swr'
import Image from "next/image"
import { useData } from 'context/appContext'
import { useAuth } from "context/authContext"

const fetcher = (url) => fetch(url).then((res) => res.json());

const RightSidebar = ({children}) => {

    const { openRightSidebar, handleCloseRightSidebar } = useData()
    const { userLogin } = useAuth()
    const { data } = useSWR(
        `/api/account/${userLogin?.email}?coll=${userLogin?.namaPerusahaan ? 'employers' : 'job_seekers'}`,
        fetcher
    );

    let image;

    if(userLogin?.username && data?.data?.fotoProfile?.fotoProfileURL) { 
        image = data?.data?.fotoProfile?.fotoProfileURL
    } else if(userLogin?.namaPerusahaan && data?.data?.logoProfile?.logoProfileURL) { 
        image = data?.data?.logoProfile?.logoProfileURL
    } else {
        image = '/images/blank-profile.png'
    }

    return (
        <>
            <div className={`overlay ${openRightSidebar ? 'block' : 'hidden'} xl:hidden`} onClick={handleCloseRightSidebar}></div>

            <div className={`h-full lg:h-screen ${openRightSidebar ? 'block z-30 shadow-lg lg:shadow-none' : 'hidden'} fixed right-0 bottom-0 xl:block xl:sticky top-0 w-[270px] py-7 px-5 overflow-y-scroll scrollbar-hide bg-white`}>
                <div className="flex items-center space-x-5">
                    <div className="relative h-12 w-12 rounded-full">
                        <Image src={image} layout="fill" objectFit="cover" className="rounded-full"/>
                    </div>
                    <div className="flex flex-1 flex-col text-sm text-gray-500">
                        <p className="text-gray-700 text-base font-medium line-clamp-2">
                            {data?.data?.namaPerusahaan ? 
                                data?.data?.namaPerusahaan : 
                                data?.data?.username ? data?.data?.username : '--Nama--'}</p>
                        <p className="text-gray-400">
                            {data?.data?.namaPerusahaan ? 'Employer' : data?.data?.username ? 'Job Seeker' : '--Job Seeker--'}
                        </p>
                    </div>
                </div>
                {children}
            </div>
        </>
    )
}


export default RightSidebar