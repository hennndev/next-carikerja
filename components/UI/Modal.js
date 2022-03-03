

const Modal = ({handleClose, children, bigModal, scroll}) => {
    return (
        <div className="fixed bg-[rgba(0,0,0,0.1)] z-20 w-full h-full top-0 left-0 right-0 bottom-0 flex-center px-5">
            <div className={`bg-white p-5 rounded shadow-md ${bigModal ? 'w-full md:w-max md:min-w-[500px] relative overflow-y-scroll' : 'w-[380px]'} max-h-[550px] ${scroll && 'overflow-y-scroll md:w-[500px]'}`}>
                {children}
                {!bigModal && <div className="flex justify-end">
                    <button className="btn text-sm bg-gray-500 hover:bg-gray-600 mt-5" onClick={handleClose}>Close</button>
                </div>}
            </div>
        </div>
    )
}


export default Modal