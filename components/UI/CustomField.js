import { useState } from "react"
import { AiFillCloseCircle } from "react-icons/ai"

const CustomField = ({formik, id, title, placeholder}) => {

    const [valueTerm, setValueTerm] = useState('')

    const addValue = () => {
        const existVal = formik.values[id].find(val => val === valueTerm.toLowerCase().trim())
        if(existVal) {
            window.alert('Kamu sudah menambahkan nilai ini')
        } else {
            if(valueTerm) {
                formik.setValues({
                    ...formik.values,
                    [id]: [...formik.values[id], valueTerm.toLowerCase().trim()]
                })
                setValueTerm('')
            }
        }
    }
    const deleteValue = (value) => {
        const updateValues = formik.values[id].filter(val => val !== value)
        formik.setValues({
            ...formik.values,
            [id]: updateValues
        })
    }

    return (
        <div className="input-control">
            <label htmlFor={id}>{title}</label>
            <div className="flex items-center space-x-2 md:space-x-5">
                <input id={id} type="text" 
                    value={valueTerm} 
                    onChange={e => setValueTerm(e.target.value)} 
                    placeholder={placeholder} 
                    className={`${formik.errors[id] && formik.touched[id] && 'border-red-400 focus:border-red-400'} form-input flex-1`}/>
                <button className="btn text-sm" type="button" onClick={addValue}>Tambah</button>
            </div>
            {formik?.values[id].length > 0 && (
                <div className="flex items-center flex-wrap">
                    {formik?.values[id]?.map(val => (
                        <div className='text-box' key={val}>
                            <p>{val}</p>
                            <AiFillCloseCircle className='absolute -right-1 -top-1 text-red-400 text-lg cursor-pointer' onClick={() => deleteValue(val)}/>
                        </div>
                    ))}
                </div>
            )}
            {formik.errors[id] && formik.touched[id] && <small className='text-error'>{formik.errors[id]}</small>}
        </div>
    )
}


export default CustomField