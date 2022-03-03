import useSWR from "swr"
import Modal from "../UI/Modal"
import { useState } from "react"
import { v4 as uuid } from 'uuid'
import { utilFetch } from "utils/utils"
import { useRouter } from "next/router"
import { useAuth } from "context/authContext"

const fetcher = (url) => fetch(url).then((res) => res.json());

const SendMessage = ({postId, candidate, handleClose}) => {

    const router = useRouter()
    const { userLogin } = useAuth()
    const [value, setValue] = useState('')
    const [isLoading, setIsLoading] = useState(false)
    const [isSuccess, setIsSuccess] = useState(false)

    const { data } = useSWR(
        `/api/messages`,
        fetcher
    );
    const { data: dataAccount } = useSWR(
        `/api/account/${userLogin?.email}?coll=employers`,
        fetcher
    );

    const existMessages = data?.data?.find(data => data?.postId === postId && data?.emailTujuan === candidate.email)

    const handleSubmit = async (e) => {
        e.preventDefault()
        const formatValues = {
            createdAt: new Date(),
            msgId: uuid(),
            logoProfileURL: dataAccount.data.logoProfile?.logoProfileURL,
            namaPerusahaan: dataAccount.data.namaPerusahaan,
            email: userLogin?.email,
            pesan: value,
            status: 'unread',
            star: false
        }
        if(!existMessages) {
            setIsLoading(true)
            const resFetch = await utilFetch('messages', 'POST', {
                postId,
                emailTujuan: candidate.email,
                emailPengirim: userLogin.email,
                messages: [
                    formatValues
                ],
            })
            if(resFetch) {
                setIsLoading(false)
                setIsSuccess(true)
            }
        } else {
            const resFetch = await utilFetch(`messages/${existMessages._id}`, 'POST', formatValues)
            if(resFetch) {
                setIsLoading(false)
                setIsSuccess(true)
            }
        }
    }
    const closeSuccessModal = () => {
        setIsSuccess(false)
        handleClose()
        router.replace(router.asPath)
    } 

    return (
        <Modal bigModal>
            {isSuccess && (
                <Modal handleClose={closeSuccessModal}>
                    <h1>Berhasil mengirimkan pesan</h1>
                </Modal>
            )}
            <form onSubmit={handleSubmit}>
                {isLoading && <div className="form-loading"></div>}
                <label htmlFor="message" className="text-gray-600 font-medium">To: {candidate.nama}</label>
                <textarea 
                    id="message"
                    rows="8" value={value} 
                    onChange={e => setValue(e.target.value)} 
                    placeholder="Tulis pesan yang akan disampaikan..." 
                    className="form-input w-full border-dashed border-transparent mt-3 text-sm p-0"></textarea>
                <div className="flex items-center justify-end space-x-3 mt-5">
                    <button type="submit" disabled={!value} className={`btn ${!value && 'cursor-not-allowed bg-gray-400 hover:bg-gray-400'}`}>Submit</button>
                    <button className="btn bg-gray-500 hover:bg-gray-600" onClick={handleClose}>Close</button>
                </div>
            </form>
        </Modal>
    )

}

export default SendMessage