import { HiArrowSmLeft } from 'react-icons/hi'

const BackPage = ({clicked}) => {

    return (
        <div className="flex items-center space-x-3 text-gray-500 cursor-pointer hover:text-blue-500 hover:underline mb-5" onClick={clicked}>
            <HiArrowSmLeft className="text-xl"/>
            <p className="text-lg font-medium">Kembali</p>
        </div>
    )
}


export default BackPage