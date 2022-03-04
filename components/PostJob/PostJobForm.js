import * as Yup from 'yup'
import Modal from '../UI/Modal'
import { useFormik } from "formik"
import { utilFetch } from 'utils/utils'
import SalaryField from './SalaryField'
import { useRouter } from 'next/router'
import { useState, useEffect } from 'react'
import CustomField from '../UI/CustomField'
import { useData } from 'context/appContext'
import InputControl from "../UI/InputControl"
import { utilSistemPekerjaan, utilTingkatanKandidat, utilJangkaWaktu } from 'consts/consts'

const PostJobForm = ({editPost = false, data}) => {

    const router = useRouter()
    const { postTerm } = useData()
    const [isLoading, setIsLoading] = useState(false)
    const [isSuccess, setIsSuccess] = useState(false)

    const formik = useFormik({
        initialValues: {
            judul: '',
            kategoriPekerjaan: '',
            sistemPekerjaan: '',
            tingkatanKandidat: '',
            rangeGaji: '',
            kemampuan: [],
            jangkaWaktu: '',
            deskripsiPekerjaan: '',
        },
        onSubmit: async(values, { resetForm }) => {
            setIsLoading(true)
            if(postTerm && editPost) {
                const resFetch = await utilFetch(`jobs/${postTerm._id}`, 'PUT', values)
                if(resFetch) {
                    setIsLoading(false)
                    setIsSuccess(true)
                    resetForm()
                }
            } else {
                const formatValues = {
                    ...values,
                    kandidat: [],
                }
                const {_id, createdAt, password, logoProfile, ...dataEmployer} = data
                const resFetch = await utilFetch('jobs', 'POST', {...formatValues, dataEmployer: {...dataEmployer, logoProfileURL: logoProfile?.logoProfileURL}})
                if(resFetch) {
                    setIsLoading(false)
                    setIsSuccess(true)
                    resetForm()
                }
            }
        },
        validationSchema: Yup.object({
            judul: Yup.string().required('Judul diperlukan'),
            kategoriPekerjaan: Yup.string().required('Kategori pekerjaan diperlukan'),
            sistemPekerjaan: Yup.string().required('Sistem pekerjaan diperlukan'),
            tingkatanKandidat: Yup.string().required('Tingkatan kandidat diperlukan'),
            rangeGaji: Yup.mixed().required('Range gaji diperlukan').test('notValid', 'Range gaji belum sesuai', value => typeof value === 'string'),
            jangkaWaktu: Yup.string().required('Jangka waktu diperlukan'),
            kemampuan: Yup.mixed().required('Kemampuan diperlukan').test('skillLength', 'Kemampuan yang diperlukan jangan dikosongkan', value => value.length > 0),
            deskripsiPekerjaan: Yup.string().required('Deskripsi pekerjaan diperlukan')
        })
    })

    const closeSuccess = () => {
        setIsSuccess(false)
        router.replace(editPost ? '/my_post' : '/post_job')
    }

    useEffect(() => {
        if(postTerm && editPost) {
            formik.setValues({
                judul: postTerm?.judul,
                kategoriPekerjaan: postTerm?.kategoriPekerjaan,
                sistemPekerjaan: postTerm?.sistemPekerjaan,
                tingkatanKandidat: postTerm?.tingkatanKandidat,
                rangeGaji: postTerm?.rangeGaji,
                kemampuan: postTerm?.kemampuan,
                jangkaWaktu: postTerm?.jangkaWaktu,
                deskripsiPekerjaan: postTerm?.deskripsiPekerjaan, 
            })
        } else if(!postTerm && editPost) {
            router.replace('/my_post')
        }
    }, [postTerm, editPost])


    return (
        <form className="form-box relative" onSubmit={formik.handleSubmit}>
            {isLoading && <div className='form-loading'></div>}
            {isSuccess && (
                <Modal handleClose={closeSuccess}>
                    <h1 className="text-lg text-gray-800">
                        {editPost ? 'Berhasil edit post' : 'Berhasil upload penawaran job!'}
                    </h1>
                </Modal>
            )}
            <InputControl id="judul" label="Judul" placeholder="Judul postingan job" formik={formik}/> 
            <InputControl id="kategoriPekerjaan" label="Kategori Pekerjaan" select formik={formik}>
                <option value="">Pilih Kategori Pekerjaan</option>
                <option value="Programming &amp; Tech">Programming &amp; Tech</option>
                <option value="UI/UX">UI/UX</option>
                <option value="Graphic Design">Graphic Design</option>
                <option value="Digital Marketing">Digital Marketing</option>
                <option value="Graphic Video &amp; Animation">Graphic Video &amp; Animation</option>
                <option value="Writing &amp; Translation">Writing &amp; Translation</option>
                <option value="Voice Over">Voice Over</option>
                <option value="Bussines">Bussines</option>
                <option value="Lifestyle">Lifestyle</option>
                <option value="Trending">Trending</option>
            </InputControl>     
            <InputControl id="sistemPekerjaan" label="Sistem Pekerjaan" select formik={formik}>
                <option value="">Pilih Sistem Pekerjaan</option>
                {utilSistemPekerjaan.map(sistem => (
                    <option value={sistem.id} key={sistem.id}>{sistem.title}</option>
                ))}
            </InputControl>
            <InputControl id="tingkatanKandidat"  label="Tingkatan Kandidat" select formik={formik}>
                <option value="">Pilih tingkatan kandidat</option>
                {utilTingkatanKandidat.map(tingkat => (
                    <option value={tingkat.toLowerCase()} key={tingkat}>{tingkat}</option>
                ))}
            </InputControl>
            <SalaryField formik={formik} postTerm={postTerm} editPost={editPost}/>
            <CustomField formik={formik} id="kemampuan" title="Kemampuan yang dibutuhkan" placeholder="Cantumkan kemampuan yang dibutuhkan untuk pekerjaan ini"/>
            <InputControl id="jangkaWaktu" label="Jangka Waktu"  select formik={formik}>
                <option value="">Pilih jangka waktu kerja</option>
                {utilJangkaWaktu.map(waktu => (
                    <option value={waktu.id} key={waktu.id}>{waktu.title}</option>
                ))}
            </InputControl>
            <InputControl id="deskripsiPekerjaan" label="Deskripsi Pekerjaan" placeholder="Apa saja deskripsi yang dibutuhkan untuk pekerjaan ini" textarea formik={formik}/>
            <div className="flex items-center space-x-5">
                <button className="btn" type="submit">{editPost ? 'Edit Post' : 'Posting'}</button>
                <button className="btn bg-red-500 hover:bg-red-600" onClick={() => formik.resetForm()}>Reset</button>
            </div>
        </form>
    )
}

export default PostJobForm