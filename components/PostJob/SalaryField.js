import { useState, useEffect } from "react"
import { BsArrowRightShort } from 'react-icons/bs'

const SalaryField = ({formik, postTerm, editPost}) => {

    const [salaryFirst, setSalaryFirst] = useState('')
    const [salarySecond, setSalarySecond] = useState('')

    const doneSalary = () => {   
        formik.setValues({
            ...formik.values,
            rangeGaji: salaryFirst > salarySecond ? -1 : `${salaryFirst.toLocaleString()} - ${salarySecond?.toLocaleString()}`
        })
    }

    useEffect(() => {
        if(formik.values.rangeGaji && postTerm && editPost) {
            const rangeGaji = formik?.values?.rangeGaji.split(' - ').map(gaji => gaji.replaceAll('.',''))
            setSalaryFirst(+rangeGaji[0])
            setSalarySecond(+rangeGaji[1])
        }
    }, [postTerm, editPost, formik.values.rangeGaji ])

    return (
        <div className="input-control">
            <label htmlFor="salary">
                Range Gaji 
                <span className='text-sm text-gray-500'> (Contoh: 5jt - 7jt)</span>
            </label>
            <div className="flex md:items-center space-y-2 md:space-y-0 md:space-x-2 flex-col md:flex-row">
                <div className="flex md:items-center space-y-2 md:space-y-0 md:space-x-2 flex-1 flex-col md:flex-row">
                    <input type="number" id="salary" 
                        className={`${formik.errors.rangeGaji && formik.touched.rangeGaji && 'border-red-400'} form-input flex-1`}
                        value={salaryFirst} 
                        onChange={e => setSalaryFirst(+e.target.value)}/>
                    <BsArrowRightShort className='text-lg text-gray-700'/>
                    <input type="number" 
                        className={`${formik.errors.rangeGaji && formik.touched.rangeGaji && 'border-red-400'} form-input flex-1`}
                        value={salarySecond} 
                        onChange={e => setSalarySecond(+e.target.value)}/>
                </div>
                <button className="btn text-sm w-max" type="button" onClick={doneSalary}>Done</button>
            </div>
            {formik.errors.rangeGaji && formik.touched.rangeGaji && <small className='text-error'>{formik.errors.rangeGaji}</small>}
        </div>
    )
}


export default SalaryField