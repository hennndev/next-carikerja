

const InputControl = ({formik, id, label, placeholder, children, formModal, type = 'text', select = null, textarea = null}) => {

    let inputType = <input 
                        id={id}
                        type={type} 
                        autoComplete="off"
                        className={`${formik.errors[id] && formik.touched[id] && 'border-red-400'} form-input`}
                        placeholder={placeholder}
                        {...formik.getFieldProps(id)}
                        onBlur={formik.handleBlur}/>
    if(select) {
        inputType = <select
                        id={id}
                        className={`${formik.errors[id] && formik.touched[id] && 'border-red-400'} form-input`}
                        {...formik.getFieldProps(id)}
                        onBlur={formik.handleBlur}>
                            {children}
                        </select>
    }
    if(textarea) {
        inputType = <textarea 
                        id={id}
                        rows={6} 
                        className={`${formik.errors[id] && formik.touched[id] && 'border-red-400'} form-input`}
                        placeholder={`${placeholder}`}
                        {...formik.getFieldProps(id)}
                        onBlur={formik.handleBlur}/>        
    }
    return (
        <div className={`input-control`}>
            <label htmlFor={id}>
                {label}
            </label>
            {inputType}
            {formik.touched[id] && formik.errors[id] && (
                <small className='text-error'>{formik.errors[id]}</small>
            )}
        </div>
    )
}

export default InputControl