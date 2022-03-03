import Image from "next/image"
import { FiMapPin } from 'react-icons/fi'
import SosmedIcons from "../UI/SosmedIcons"
import { AiFillEdit } from 'react-icons/ai'
import { useAuth } from "context/authContext"

const EmployerProfile = ({data, handleEdit}) => {

    const { userLogin } = useAuth()

    return (
        <div className="profile-container">
            <div className="flex-center flex-col space-y-2">
                <div className="w-32 h-32 relative rounded-full">
                    <Image src={data?.logoProfile ? data?.logoProfile?.logoProfileURL : '/images/blank-profile.png'} layout="fill" objectFit="cover" className="rounded-full"/>
                </div>
                <h1>{data?.namaPerusahaan}</h1>
                <div className="flex items-center space-x-2 text-gray-500 text-[15px]">
                    {data?.alamatPerusahaan && <FiMapPin/>}
                    <p>
                        {data?.alamatPerusahaan ? data.alamatPerusahaan : '---Alamat Perusahaan Anda---'}
                    </p>
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
                <div>
                    <h1 className="text-xl">Situs Perusahaan</h1>
                    {data?.situsPerusahaan?.length > 0 ? data.situsPerusahaan.map(situs => (
                        <p className="text-blue-500 mt-1" key={situs}>{situs}</p>
                    )) : (
                        <p className="text-gray-500 mt-1">{userLogin?.namaPerusahaan ? '-- Anda bisa menambahkan situs perusahaan anda --' : '---'}</p>
                    )}
                </div>
                <div className="mt-3">
                    <h1 className="text-xl">Tentang Perusahaan</h1>
                    <p className="mt-1 text-gray-500">
                        {data?.tentangPerusahaan ? data?.tentangPerusahaan : '---Definisikan perusahaan anda bergerak di bidang apa---'}
                    </p>
                </div>
            </div>
        </div>
    )
}


export default EmployerProfile