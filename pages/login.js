import * as Yup from 'yup'
import nookies from 'nookies'
import Head from "next/head"
import { useState } from 'react'
import { useFormik } from "formik"
import { utilFetch } from 'utils/utils'
import { useRouter } from "next/router"
import { useAuth } from 'context/authContext'
import LatestJob from "@/components/UI/LatestJob"
import PageHeader from '@/components/UI/PageHeader'
import InputControl from '@/components/UI/InputControl'
import RightSidebar from "@/components/UI/RightSidebar"
import PageContainer from '@/components/UI/PageContainer'
import { HiArrowSmLeft, HiArrowSmRight } from 'react-icons/hi'

const Login = () => {

    const router = useRouter()
    const { handleUserLogin } = useAuth()
    const [isError, setIsError] = useState(null)
    const [isLoading, setIsLoading] = useState(false)
    const [asEmployer, setAsEmployer] = useState(false)

    const formik = useFormik({
        initialValues: {
            email: '',
            password: ''
        },
        onSubmit: async (values) => {
            setIsLoading(true)
            try {
                const resFetch = await utilFetch(`auth/login`, 'POST', {asEmployer, ...values})
                if(resFetch.message) {
                    setIsLoading(false)
                    setIsError(null)
                    handleUserLogin(resFetch)
                    router.replace('/')
                } else {
                    throw new Error(resFetch.error)
                }
            } catch(error) {
                setIsLoading(false)
                setIsError(error.message)
            }
        },
        validationSchema: Yup.object({
            email: Yup.string().required('Email diperlukan').email('Email tidak valid'),
            password: Yup.string().required('Password diperlukan').min(8, 'Minimal panjang karakter 8 atau lebih')
        })
        
    })
    
    return (
        <>
            <Head>
                <title>Login | Job Seekers</title>
            </Head>
            <PageContainer>
                <div className='content'>
                    <PageHeader title="Login"/>     
                    <div className="w-full md:flex-center flex-col px-5 xl:px-10 mt-5">
                        <div>
                            <div className={`flex items-center ${!asEmployer && 'justify-end'} space-x-3 mb-5 text-gray-500 hover:text-orange-500 ${isLoading ? 'cursor-not-allowed' : 'cursor-pointer'}`} onClick={() => !isLoading && setAsEmployer(!asEmployer)}>
                                {asEmployer ? <HiArrowSmRight className="text-xl"/> : <HiArrowSmLeft className="text-xl"/>}
                                <p className="font-medium">
                                    {asEmployer ? 'Login Sebagai Job Seeker' : 'Login Sebagai Employer'}
                                </p>
                            </div>
                            <form className="form-box" onSubmit={formik.handleSubmit}>
                                <h1 className="text-center text-2xl text-blue-500 font-semibold mb-5">
                                    Login <br />
                                    <span className='text-base'>( {asEmployer ? 'Employer' : 'Job Seeker'} )</span>
                                </h1>
                                <InputControl 
                                    id="email"
                                    type='email'
                                    formik={formik} 
                                    label="Email"
                                    placeholder="Email Anda"/>
                                <InputControl 
                                    id="password"
                                    type='password'
                                    formik={formik} 
                                    label="Password"
                                    placeholder=""/>
                                {isError && <p className='text-error font-medium mb-2'>{isError}</p>}
                                <div className="flex-center space-x-3">
                                    <button className={`btn ${isLoading && 'btn-loading'}`} type='submit' disabled={isLoading}>Submit</button>
                                    <button className={`btn ${isLoading ? 'btn-loading' : 'bg-red-500 hover:bg-red-600'}`} type='button' disabled={isLoading} onClick={() => formik.resetForm()}>Reset</button>
                                </div>
                                <div className="mt-4 text-center text-gray-500 text-[15px]">
                                    <p>Belum punya akun ? <span className={`${!isLoading && 'text-blue-600'} cursor-pointer`} onClick={() => !isLoading && router.push('/register')}>Register</span></p>
                                </div>
                            </form>
                        </div>
                    </div>
                </div>
                
                <RightSidebar>
                    <LatestJob/>
                </RightSidebar>
            </PageContainer>
        </>
    )
}

export const getServerSideProps = async(ctx) => {
    const cookies = nookies.get(ctx)
    if(cookies.userLogin) {
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

export default Login