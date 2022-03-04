import Head from "next/head"
import { useState } from "react"
import LatestJob from "@/components/UI/LatestJob"
import PageHeader from "@/components/UI/PageHeader"
import RightSidebar from "@/components/UI/RightSidebar"
import PageContainer from "@/components/UI/PageContainer"
import RegisterForm from "@/components/Register/RegisterForm"

const Register = () => {

    const [isEmployer, setIsEmployer] = useState(false)
    const [isJobSeeker, setIsJobSeeker] = useState(false)

    const handleBack = () => isJobSeeker ? setIsJobSeeker(false) : setIsEmployer(false)
    return (
        <>
            <Head>
                <title>Register | Job Seekers</title>
            </Head>
            <PageContainer>
                <div className='content'>
                    <PageHeader title="Register"/>
                    <div className={`w-full ${isEmployer ? 'w-full' : 'md:flex-center'} px-5 xl:px-10 mt-5`}>
                        {!isEmployer && !isJobSeeker && (
                            <div className="bg-white p-10 shadow-lg flex flex-col space-y-5 rounded-md">
                                <button className="btn" onClick={() => setIsEmployer(true)}>Daftar Sebagai Employer</button>
                                <button className="btn" onClick={() => setIsJobSeeker(true)}>Daftar Sebagai Job Seeker</button>
                            </div>
                        )}
                        {(isJobSeeker || isEmployer) && (
                            <RegisterForm 
                                isJobSeeker={isJobSeeker} 
                                isEmployer={isEmployer} 
                                handleBack={handleBack}/>
                        )}
                    </div>
                </div>
                <RightSidebar>
                    <LatestJob/>
                </RightSidebar>
            </PageContainer>
        </>
    )
}


export default Register