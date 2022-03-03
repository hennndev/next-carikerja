import * as Yup from 'yup'
import { useState } from 'react'
import { useFormik } from "formik"
import BackPage from '../UI/BackPage'
import { useRouter } from "next/router"
import InputControl from '../UI/InputControl'
import { HiArrowSmLeft } from 'react-icons/hi'

const RegisterForm = ({handleBack, isJobSeeker, isEmployer}) => {

    const [isLoading, setIsLoading] = useState(false)
    const [isError, setIsError] = useState(null)
    const [isSuccess, setIsSuccess] = useState(null)

    const formik = useFormik({
        initialValues: {
            namaPerusahaan: '',
            alamatPerusahaan: '',
            tentangPerusahaan: '',
            username: '',
            email: '',
            password: '',
            passwordConfirmation: '',
        },
        onSubmit: async (values, {resetForm}) => {
            setIsLoading(true)
            try {
                const jobSeekerValues = {
                    username: values.username,
                    email: values.email,
                    password: values.password,
                }
                const { passwordConfirmation, username, ...employerValues} = values
                const res = await fetch('/api/auth/register', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify({jobSeeker: isJobSeeker, data: isJobSeeker ? jobSeekerValues : employerValues})
                })
                const data = await res.json()
                if(data.message) {
                    setIsLoading(false)
                    setIsError(null)
                    setIsSuccess(data.message)
                    resetForm()
                } else {
                    throw new Error(data.error)
                }
            } catch(error) {
                setIsLoading(false)
                setIsSuccess(null)
                setIsError(error.message)
            }
        },
        validationSchema: Yup.object({
            namaPerusahaan: isEmployer && Yup.string().required('Nama perusahaan diperlukan'),
            alamatPerusahaan: isEmployer && Yup.string().required('Alamat perusahaan diperlukan'),
            tentangPerusahaan: isEmployer && Yup.string().required('Tentang perusahaan diperlukan'),
            username: isJobSeeker && Yup.string().required('Username diperlukan'),
            email: Yup.string().required('Email diperlukan').email('Email tidak valid'),
            password: Yup.string().required('Password diperlukan').min(8, 'Minimal panjang karakter 8 atau lebih'),
            passwordConfirmation: Yup.string()
                                    .oneOf([Yup.ref('password'), null], 'Password konfirmasi tidak cocok!').required('Password konfirmasi diperlukan')
        })     
    })
    const router = useRouter()

    return (
        <div>
            <BackPage clicked={() => !isLoading && handleBack()}/>
            <form className="form-box relative" onSubmit={formik.handleSubmit}>
                {isLoading && <div className="form-loading"></div>}
                <h1 className="text-center text-2xl text-blue-500 font-semibold mb-5">
                    Register <br />
                    <span className='text-base'>( {isJobSeeker ? 'Job Seeker' : 'Employer'} )</span>
                </h1>
                {isEmployer && (
                    <>
                        <div className="flex lg:items-center flex-col md:flex-row md:space-x-3">
                            <InputControl 
                                id="namaPerusahaan"
                                placeholder="Nama perusahaan anda"
                                label="Nama Perusahaan"
                                formik={formik}/>
                            <InputControl 
                                id="alamatPerusahaan"
                                placeholder="Alamat perusahaan anda"
                                label="Alamat Perusahaan"
                                formik={formik}/>
                        </div>
                        <InputControl 
                            id="tentangPerusahaan"
                            placeholder="Tentang perusahaan anda"
                            label="Tentang Perusahaan"
                            textarea
                            formik={formik}/>
                    </>
                )}
                {isJobSeeker && (
                    <InputControl 
                        id="username"
                        label="Username"
                        placeholder="Username kamu"
                        formik={formik}/>
                )}
                <InputControl 
                    id="email"
                    type='email'
                    placeholder={`${isEmployer ? 'Email perusahaan anda' : 'Email Kamu'}`}
                    label="Email"
                    formik={formik}/>
                <InputControl 
                    id="password"
                    type='password'
                    placeholder=""
                    label="Password"
                    formik={formik}/>
                <InputControl 
                    id="passwordConfirmation"
                    type='password'
                    placeholder=""
                    label="Password Konfirmasi"
                    formik={formik}/>
                {isSuccess && <p className='mb-2 text-green-500 font-medium'>{isSuccess}</p>}
                {isError && <p className="text-error font-medium mb-2">{isError}</p>}
                <div className="flex-center space-x-3">
                    <button className={`btn ${isLoading && 'btn-loading'}`} type='submit'>Submit</button>
                    <button className={`btn ${isLoading ? 'btn-loading' : 'bg-red-500 hover:bg-red-600'}`} type='button' onClick={() => formik.resetForm()}>Reset</button>
                </div>
                <div className="mt-4 text-center text-gray-500 text-[15px]">
                    <p>Sudah ada akun ? <span className={`${!isLoading && 'text-blue-600'} cursor-pointer`} onClick={() => !isLoading && router.push('/login')}>Login</span></p>
                </div>
            </form>
            
        </div>
    )
}


export default RegisterForm