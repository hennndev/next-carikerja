import Image from "next/image"
import { FiMapPin } from 'react-icons/fi'
import SosmedIcons from "../UI/SosmedIcons"
import { AiFillEdit } from 'react-icons/ai'
import { useAuth } from "context/authContext"

const JobSeekerProfile = ({data, handleEdit}) => {

    const { userLogin } = useAuth()
    
    return (
        <div className="profile-container">
            <div className="flex-center flex-col space-y-2">
                <div className="w-32 h-32 relative rounded-full">
                    <Image src={data?.fotoProfile ? data?.fotoProfile?.fotoProfileURL : '/images/blank-profile.png'} layout="fill" objectFit="cover" className="rounded-full"/>
                </div>
                <h1>{data?.username}</h1>
                <div className="text-gray-600 text-[15px] flex-center space-x-2 w-[300px] flex-wrap">
                    {data?.job.map((job, idx) => (
                        <p key={job}>{job} {(idx + 1) !== data.job.length && <span className="ml-1"> | </span>}</p>
                    ))}
                </div>
                <div className="flex items-center space-x-2 text-gray-500 text-[15px]">
                    {data?.alamat && <FiMapPin/>}
                    <p>{data?.alamat ? data.alamat : userLogin?.namaPerusahaan ? '---' : '---Lokasi Kamu---'}</p>
                </div>
                <SosmedIcons/>
            </div>
            {handleEdit && (
                <div className="flex-center mt-4">
                    <button className="btn text-sm flex items-center" onClick={handleEdit}>
                        <AiFillEdit className="mr-2 text-lg"/>
                        Edit Profile
                    </button>
                </div>
            )}


            <div className="mt-10 text-gray-800">
                <div className="mt-3">
                    <h1 className="text-xl">Kemampuan Saya</h1>
                    <div className="flex items-center flex-wrap mt-2">
                        {data?.skills.length > 0 ? data?.skills.map(skill => (
                            <p className='text-box' key={skill}>
                                {skill}
                            </p>
                        )) : (
                            <p className="text-gray-500 mt-2">{userLogin?.namaPerusahaan ? '---' : '-- Skill yang kamu miliki --'}</p>
                        )}
                    </div>
                </div>
                <div className="mt-3">
                    <h1 className="text-xl">Tentang Saya</h1>
                    <p className="mt-1 text-gray-500">
                        {data.tentangSaya ? data.tentangSaya : userLogin?.namaPerusahaan ? '---' : '-- Ceritakan tentang kamu, passion kamu dan lain lain --'}
                    </p>
                </div>
                <div className="mt-3">
                    <h1 className="text-xl">Pendidikan</h1>
                    <p className="mt-1 text-gray-500">
                        {data.riwayatPendidikan ? data.riwayatPendidikan : userLogin?.namaPerusahaan ? '---' : '-- Riwayat pendidikan kamu --'}
                    </p>
                </div>
            </div>
        </div>
    )
}


export default JobSeekerProfile