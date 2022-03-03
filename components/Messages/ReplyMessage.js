import useSWR from "swr"
import Modal from "../UI/Modal"
import { useState } from "react"
import { v4 as uuid } from 'uuid'
import { utilFetch } from "utils/utils"
import { useAuth } from "context/authContext"
import { IoArrowUndoOutline } from "react-icons/io5"

const fetcher = (url) => fetch(url).then((res) => res.json());

const ReplyMessage = ({setIsCreateMessage, messageTerm}) => {

    const { userLogin } = useAuth()
    const [value, setValue] = useState('')
    const [isLoading, setIsLoading] = useState(false)
    const [isSuccess, setIsSuccess] = useState(false)

    const { data } = useSWR(
        `/api/account/${userLogin?.email}?coll=${userLogin?.namaPerusahaan ? 'employers' : 'job_seekers'}`,
        fetcher
    );
        
    const handleSubmit = async(e) => {
        e.preventDefault()
        let values
        if(userLogin?.namaPerusahaan) {
            values = {
                logoProfileURL: data.data.logoProfile?.logoProfileURL,
                namaPerusahaan: data.data.namaPerusahaan,
                email: userLogin?.email
            }
        } else {
            values = {
                nama: data.data.username,
                fotoProfileURL: data.data.fotoProfile?.fotoProfileURL,
                email: userLogin?.email
            }
        }
        const formatValues = {
            createdAt: new Date(),
            msgId: uuid(),
            pesan: value,
            status: 'unread',
            star: false,
            ...values
        }
        if(value) {
            setIsLoading(true)
            const resFetch = await utilFetch(`messages/${messageTerm.id}`, 'POST' ,formatValues)
            if(resFetch) {
                setIsLoading(false)
                setIsSuccess(true)
            }
        } else {
            alert('Harap diisi kolom tulis pesannya!')
        }
    }
    const closeSuccessModal = () => {
        setIsSuccess(false)
        setIsCreateMessage(false)
    }

    return (
        <form className="mt-5 bg-white border border-gray-300 rounded w-full min-h-[100px] shadow-sm p-5 relative" onSubmit={handleSubmit}>
            {isLoading && <div className="form-loading"></div>}
            {isSuccess && (
                <Modal handleClose={closeSuccessModal}>
                    <h1>Berhasil membalas pesan</h1>
                </Modal>
            )}
            <h1 className="text-gray-500 text-[15px] flex items-center">
                <IoArrowUndoOutline className="mr-3"/> 
                {messageTerm.namaPerusahaan ? messageTerm.namaPerusahaan : messageTerm.nama}
            </h1>
            <textarea rows="4" placeholder="Tulis pesan" className="p-2 rounded w-full mt-3 outline-none" value={value} onChange={e => setValue(e.target.value)}></textarea>
            <div className="flex-between mt-5">
                <button className="btn text-sm" type="submit">Kirim</button>
                <div className="flex items-center space-x-3">
                    <button type="button" className="btn bg-gray-500 hover:bg-gray-600 text-sm" onClick={() => setIsCreateMessage(false)}>Cancel</button>
                    <button type="button" onClick={() => setValue('')} className="btn bg-red-500 hover:bg-red-600 text-sm">Clear</button>
                </div>
            </div>
        </form>
    )
}


export default ReplyMessage