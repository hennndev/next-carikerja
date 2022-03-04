import * as Yup from 'yup'
import Modal from '../UI/Modal'
import { useFormik } from "formik"
import { utilFetch } from 'utils/utils'
import { useRouter } from 'next/router'
import ImageField from '../UI/ImageField'
import { useState, useEffect } from 'react'
import CustomField from '../UI/CustomField'
import { useData } from 'context/appContext'
import InputControl from "../UI/InputControl"

const EmployerEditProfile = () => {

    const router = useRouter()
    const { accountTerm } = useData()
    const [isLoading, setIsLoading] = useState(false)
    const [isSuccess, setIsSuccess] = useState(false)

    const formik = useFormik({
        initialValues: {
            namaPerusahaan: '',
            alamatPerusahaan: '',
            situsPerusahaan: [],
            logoProfile: null,
            tentangPerusahaan: '',
        },
        onSubmit: async (values, {resetForm}) => {
            setIsLoading(true)
            if(values.logoProfile && !values.logoProfile?.logoProfileURL) {
                const formDataImage = new FormData()
                formDataImage.append('file', values.logoProfile)
                formDataImage.append('upload_preset', 'qzxb5iq7')
    
                fetch('https://api.cloudinary.com/v1_1/hennnpermanadev/image/upload', {
                    method: 'POST',
                    body: formDataImage
                }).then((res) => res.json()).then((res) => {
                    fetch(`/api/account/${accountTerm._id}`, {
                        method: 'PUT', 
                        headers: {
                            'Content-Type': 'application/json'
                        },
                        body: JSON.stringify({
                            ...values,
                            logoProfile: {
                                logoProfileURL: res.url,
                                logoProfileId: res.public_id
                            },
                            oldLogoProfile: accountTerm?.logoProfile?.logoProfileId
                        })
                    }).then((res) => res.json()).then(async(res) => {    
                        const resFetch = await utilFetch(`jobs?email=${accountTerm.email}`, 'PUT', {logoProfileURL: res.data.logoProfile?.logoProfileURL,...values}) 
                        if(resFetch) {
                            const resFetchMsg = await utilFetch(`messages?email=${accountTerm.email}`, 'PUT', {logoProfileURL: resFetch.data.logoProfileURL, namaPerusahaan: resFetch.data.namaPerusahaan}) 

                            if(resFetchMsg) {
                                setIsSuccess(true)
                                setIsLoading(false)
                                resetForm()   
                            }
                        }
                    })
                })
            } else {
                fetch(`/api/account/${accountTerm._id}`, {
                    method: 'PUT',
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify({
                        oldLogoProfile: !values.logoProfile && accountTerm?.logoProfile?.logoProfileId ? accountTerm?.logoProfile?.logoProfileId : null, //Jika ingin foto profile kosong
                        ...values
                    })
                }).then(res => res.json()).then(async(res) => {
                    const resFetch = await utilFetch(`jobs?email=${accountTerm.email}`, 'PUT', {logoProfileURL: res.data.logoProfile?.logoProfileURL, ...values}) 
                    if(resFetch) {
                        const resFetchMsg = await utilFetch(`messages?email=${accountTerm.email}`, 'PUT', {logoProfileURL: resFetch.data.logoProfileURL, namaPerusahaan: resFetch.data.namaPerusahaan})

                        if(resFetchMsg) {
                            setIsSuccess(true)
                            setIsLoading(false)
                            resetForm()   
                        }
                    }
                }).catch(() => {
                    setIsLoading(false)
                })
            }
        },
        validationSchema: Yup.object({
            namaPerusahaan: Yup.string().required('Nama perusahaan tidak boleh dikosongkan')
        })
    })

    useEffect(() => {
        if(accountTerm) {
            formik.setValues({
                namaPerusahaan: accountTerm.namaPerusahaan,
                alamatPerusahaan: accountTerm.alamatPerusahaan,
                logoProfile: accountTerm.logoProfile,
                tentangPerusahaan: accountTerm.tentangPerusahaan,
                situsPerusahaan: accountTerm.situsPerusahaan,
            })
        } else {
            router.replace('/profile')
        }
    }, [accountTerm])

    const handleCloseSuccess = () => {
        setIsSuccess(false)
        router.replace('/profile')
    }

    
    return (
        <form className="form-box relative" onSubmit={formik.handleSubmit}>
            {isSuccess && (
                <Modal handleClose={handleCloseSuccess}>
                    <h1>Profil anda berhasil di edit</h1>
                </Modal>
            )}
            {isLoading && <div className='form-loading'></div>}
            <InputControl id="namaPerusahaan" label="Nama Perusahaan" placeholder="Nama perusahaan anada"  formik={formik}/>      
            <InputControl id="alamatPerusahaan" label="Alamat Perusahaan" placeholder="Alamat perusahaan anda"  formik={formik}/>  
            <CustomField 
                formik={formik}
                id="situsPerusahaan"
                title="Situs Perusahaan"
                placeholder="Tambahkan situs perusahaan anda jika ada"/>  
            <InputControl id="tentangPerusahaan" label="Tentang Perusahaan" placeholder="Definisikan perusahaan anda bergerak di bidang apa" textarea formik={formik}/>
            <ImageField formik={formik} oldData={accountTerm} id="logoProfile"/>
            <div className="flex items-center space-x-5">
                <button className="btn" type="submit">Edit</button>
                <button className="btn bg-red-500 hover:bg-red-600" type='button' onClick={() => formik.resetForm()}>Reset</button>
            </div>
        </form>
    )
}

export default EmployerEditProfile