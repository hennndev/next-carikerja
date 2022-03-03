import useSWR from 'swr'
import * as Yup from 'yup'
import Modal from "../UI/Modal"
import { useFormik } from "formik"
import { useRouter } from 'next/router'
import { useState, useEffect } from "react"
import InputControl from "../UI/InputControl"

const fetcher = (url) => fetch(url).then((res) => res.json());

const ApplyForm = ({dataPost, dataUserLogin, handleClose}) => {

    const router = useRouter()
    const [isLoading, setIsLoading] = useState(false)
    const [isSuccess, setIsSuccess] = useState(false)

    const { data, error } = useSWR(
        `/api/account/${dataUserLogin?.email}?coll=job_seekers`,
        fetcher
    );

    const formik = useFormik({
        initialValues: {
            nama: '',
            lokasi: '',
            emailAktif: '',
            noTelp: '',
            job: '',
            alasanApply: ''
        },
        onSubmit: async (values) => {
            setIsLoading(true)
            const formatValues = {
                fotoProfileURL: data?.data?.fotoProfile?.fotoProfileURL ? data?.data?.fotoProfile?.fotoProfileURL : null,
                email: data.data?.email,
                ...values
            }
            try {
                const req = await fetch(`/api/jobs/${dataPost._id}`, {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify({id: dataUserLogin._id, ...formatValues})
                })
                const res = req.json()
                if(res) {
                    setIsLoading(false)
                    setIsSuccess(true)
                }
            } catch (error) {
                setIsLoading(false)
            }
        },
        validationSchema: Yup.object({
            nama: Yup.string().required('Nama harap diisi'),
            lokasi: Yup.string().required('Lokasi harap diisi'),
            job: Yup.string().required('Job kamu harap diisi'),
            emailAktif: Yup.string().required('Email aktif harap diisi').email('Email tidak valid'),
            noTelp: Yup.number().required('No Telpon harap diisi'),
            alasanApply: Yup.string().required('Alasan apply job harap diisi')
        })
    })

    const handleCloseSuccess = () => {
        setIsSuccess(false)
        handleClose()
        router.replace(router.asPath)
    }

    
    useEffect(() => {
       if(data) {
           formik.setValues({
                ...formik.values,
                nama: data.data.username,
                lokasi: data.data.alamat,
                job: data.data.job.map(job => job).join(', ')
           })
       } 
    }, [data])

    console.log(data)


    return (
        <Modal bigModal>
            {isLoading && <div className='form-loading'></div>}
            {isSuccess && <Modal handleClose={handleCloseSuccess}>
                <h1 className="text-lg text-gray-800">Berhasil upload applied form!</h1>
            </Modal>}
            <form onSubmit={formik.handleSubmit}>
                <h1 className="text-center text-lg font-medium text-gray-600 mb-3">Apply ke {dataPost?.dataEmployer?.namaPerusahaan}</h1>
                <div className="flex flex-col md:flex-row md:items-center md:space-x-3">
                    <InputControl
                        id="nama"
                        label="Nama"
                        placeholder="Nama anda"
                        formik={formik}/>
                    <InputControl
                        id="lokasi"
                        label="Lokasi"
                        placeholder="Lokasi anda"
                        formik={formik}/>
                </div>
                <div className="flex flex-col md:flex-row md:items-center md:space-x-3">
                    <InputControl
                        id="emailAktif"
                        type="email"
                        label="Email Aktif"
                        placeholder="Email aktif anda"
                        formik={formik}/>
                    <InputControl
                        id="noTelp"
                        type="number"
                        label="No Telp"
                        placeholder="No Telpon aktif anda"
                        formik={formik}/>
                </div>
                <InputControl
                    id="job"
                    Job="No Telp"
                    label="Job"
                    placeholder="Job yang kamu terkuni"
                    formik={formik}/>
                <InputControl
                    id="alasanApply"
                    label="Alasan Apply"
                    textarea
                    placeholder="Beritahu kita kenapa anda yang terbaik untuk dibutuhkan"
                    formik={formik}/>
                <div className="flex items-center justify-end space-x-3">
                    <button className="btn text-sm" type="submit">Submit</button>
                    <button className="btn bg-gray-500 hover:bg-gray-600 text-sm" onClick={handleClose}>Cancel</button>
                </div>
            </form>   
        </Modal>
    )
}


export default ApplyForm