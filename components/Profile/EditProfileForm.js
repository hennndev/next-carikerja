import nookies from 'nookies'
import Modal from '../UI/Modal'
import { useFormik } from "formik"
import { useRouter } from 'next/router'
import ImageField from '../UI/ImageField'
import { useState, useEffect } from 'react'
import CustomField from '../UI/CustomField'
import { useData } from 'context/appContext'
import InputControl from "../UI/InputControl"

const EditProfileForm = () => {

    const router = useRouter()
    const { accountTerm } = useData()
    const [isLoading, setIsLoading] = useState(false)
    const [isSuccess, setIsSuccess] = useState(false)

    const fetchJobs = async({fotoURL, username}) => {
        const req = await fetch('/api/jobs', {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                id: accountTerm._id,
                fotoProfileURL: fotoURL,
                nama: username
            })
        })
        const res = await req.json()
        return res
    }
    const fetchMsgs = async({fotoURL, username}) => {
        const req = await fetch(`/api/messages?email=${accountTerm.email}`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                id: accountTerm._id,
                fotoProfileURL: fotoURL,
                nama: username
            })
        })
        const res = await req.json()
        if(res) {
            setIsSuccess(true)
            setIsLoading(false)
            formik.resetForm()   
        }
    }

    const formik = useFormik({
        initialValues: {
            username: '',
            job: [],
            alamat: '',
            skills: [],
            fotoProfile: null,
            tentangSaya: '',
            riwayatPendidikan: '',
        },
        onSubmit: async (values) => {
            setIsLoading(true)

            if(values.fotoProfile && !values.fotoProfile?.fotoProfileURL) {
                const formDataImage = new FormData()
                formDataImage.append('file', values.fotoProfile)
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
                            fotoProfile: {
                                fotoProfileURL: res.url,
                                fotoProfileId: res.public_id
                            },
                            oldFotoProfile: accountTerm?.fotoProfile?.fotoProfileId
                        })
                    }).then((res) => res.json()).then(async(res) => {
                        const resFetchJobs = await fetchJobs({fotoURL:res.data?.fotoProfile?.fotoProfileURL, username: values.username})
                        if(resFetchJobs) {
                            await fetchMsgs({fotoURL: resFetchJobs.data.fotoProfileURL, username: resFetchJobs.data.nama})
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
                        oldFotoProfile: !values.fotoProfile && accountTerm?.fotoProfile?.fotoProfileId ? accountTerm?.fotoProfile?.fotoProfileId : null, //Jika ingin foto profile kosong    
                        ...values
                    })
                }).then(res => res.json()).then(async(res) => {
                    const resFetchJobs = await fetchJobs({fotoURL:res.data?.fotoProfile?.fotoProfileURL, username: values.username})
                    if(resFetchJobs) {
                        await fetchMsgs({fotoURL: resFetchJobs.data.fotoProfileURL, username: resFetchJobs.data.nama})
                    }
                }).catch(() => {
                    setIsLoading(false)
                })
            }
        }
    })

    useEffect(() => {
        if(accountTerm) {
            formik.setValues({
                username: accountTerm.username,
                job: accountTerm.job,
                alamat: accountTerm.alamat,
                skills: accountTerm.skills,
                fotoProfile: accountTerm.fotoProfile,
                tentangSaya: accountTerm.tentangSaya,
                riwayatPendidikan: accountTerm.riwayatPendidikan,
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
                    <h1>Profil kamu berhasil di edit</h1>
                </Modal>
            )}
            {isLoading && <div className='form-loading'></div>}

            <InputControl  id="username" label="Username" placeholder="Username kamu"  formik={formik}/>      
            <InputControl  id="alamat" label="Alamat" placeholder="Alamat kamu"  formik={formik}/>  
            <CustomField 
                formik={formik}
                id="job"
                title="Job"
                placeholder="Tambahkan job yang kamu tekuni"/>  
            <CustomField 
                formik={formik}
                id="skills"
                title="Skills yang kamu miliki"
                placeholder="Tambahkan skill yang kamu miliki"/>         
            <InputControl id="tentangSaya" label="Tentang Saya" placeholder="Tentang passion pada bidang yang kamu tekuni" textarea formik={formik}/>
            <InputControl id="riwayatPendidikan" label="Riwayat Pendidikan" placeholder="Riwayat pendidikan kamu" textarea formik={formik}/>
            <ImageField formik={formik} oldData={accountTerm} id="fotoProfile"/>
            <div className="flex items-center space-x-5">
                <button className="btn" type="submit">Edit</button>
                <button className="btn bg-red-500 hover:bg-red-600" onClick={() => formik.resetForm()}>Reset</button>
            </div>
        </form>
    )
}


export const getServerSideProps = (ctx) => {
    const cookies = nookies.get(ctx)

    if(!cookies) {
        return {
            redirect: {
                destination: '/'
            }
        }
    }
    return {
        props: {}
    }
}


export default EditProfileForm
