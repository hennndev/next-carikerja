import { AiFillFacebook, AiFillInstagram, AiFillTwitterCircle, AiFillLinkedin } from 'react-icons/ai'


const SosmedIcons = () => {
    return (
        <div className="flex items-center mt-2 space-x-3">
            <AiFillFacebook className="text-xl cursor-pointer hover:transform hover:scale-125 transition duration-300 text-blue-600"/>
            <AiFillInstagram className="text-xl cursor-pointer hover:transform hover:scale-125 transition duration-300 text-pink-600"/>
            <AiFillTwitterCircle className="text-xl cursor-pointer hover:transform hover:scale-125 transition duration-300 text-blue-400"/>
            <AiFillLinkedin className="text-xl cursor-pointer hover:transform hover:scale-125 transition duration-300 text-blue-400"/>
        </div>
    )
}



export default SosmedIcons