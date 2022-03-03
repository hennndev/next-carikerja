import Image from "next/image"
import { useState } from "react"
import { FiUpload } from "react-icons/fi"
import { useDropzone } from "react-dropzone"
import { AiOutlineCloseCircle } from "react-icons/ai"

const ImageField = ({formik, oldData, id}) => {

    const [previewImage, setPreviewImage] = useState(null)

    const handlePreviewImage = (image) => {
        const imgReader = new FileReader()
        imgReader.readAsDataURL(image)
        imgReader.onloadend = () => {
            setPreviewImage(imgReader.result)
        }
    }
    const onDrop = (acceptedFile) => {
        if(acceptedFile[0]?.size < 1000000) {
            handlePreviewImage(acceptedFile[0])
            formik.setValues({
                ...formik.values,
                [id]: acceptedFile[0]
            })
        } else {
            setPreviewImage(null)
            window.alert('Ukuran image terlalu besar')
        }
    }
    const {getRootProps, getInputProps, isDragActive} = useDropzone({onDrop, accept: "image/*"})

    const deleteImg = () => {
        formik.setValues({
            ...formik.values,
            [id]: null
        })
        setPreviewImage(null)
    }

    let image;

    if(!previewImage && oldData?.fotoProfile?.fotoProfileURL && formik?.values?.fotoProfile?.fotoProfileURL) {
        image = (
            <div className="relative w-[100px] h-[100px]">
                <Image src={formik?.values?.fotoProfile?.fotoProfileURL} layout="fill" objectFit="contain"/>
                <AiOutlineCloseCircle className='absolute -right-1 -top-1 text-red-400 text-xl cursor-pointer' onClick={deleteImg}/>
            </div>
        )
    } else if(!previewImage && oldData?.logoProfile?.logoProfileURL && formik?.values?.logoProfile?.logoProfileURL) {
        image = (
            <div className="relative w-[100px] h-[100px]">
                <Image src={formik?.values?.logoProfile?.logoProfileURL} layout="fill" objectFit="contain"/>
                <AiOutlineCloseCircle className='absolute -right-1 -top-1 text-red-400 text-xl cursor-pointer' onClick={deleteImg}/>
            </div>
        )
    }

    return (
        <div className="input-control">
            <label htmlFor={id} className=''>Image</label>
            <div {...getRootProps()} className={`border-2 ${isDragActive ? 'border-blue-400 text-blue-500' : 'border-gray-400 text-gray-500'} border-dashed px-5 py-20 text-center`}>
                <input {...getInputProps()} id={id}/>
                {
                    isDragActive ?
                    <div className='flex-center flex-col space-y-3'>
                        <FiUpload className='text-2xl animate-bounce'/>
                        <p>Drag file here...</p>
                    </div> :
                    <div className='flex-center flex-col space-y-3 text-gray-500'>
                        <FiUpload className='text-2xl animate-bounce'/>
                        <p>Drag and drop some files here, or click to select files</p>
                    </div>
                }
            </div>
            {previewImage && (
                <div className="relative w-[100px] h-[100px]">
                    <Image src={previewImage} layout="fill" objectFit="contain"/>
                    <AiOutlineCloseCircle className='absolute -right-1 -top-1 text-red-400 text-xl cursor-pointer' onClick={deleteImg}/>
                </div>
            )}
            {image}
            <small>{formik?.values?.fotoProfile?.name || formik?.values?.logoProfile?.name}</small>
            {formik.errors[id] && formik.touched[id] && <small className='text-red-500 text-[14px]'>{formik.errors[id]}</small>}
        </div>
    )
}


export default ImageField