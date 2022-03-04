import { AiFillFacebook, AiFillInstagram, AiFillTwitterCircle, AiFillLinkedin } from 'react-icons/ai'


const SosmedIcons = () => {
    return (
        <div className="flex items-center mt-2 space-x-3">
            <AiFillFacebook className="sosmed-icon text-blue-600"/>
            <AiFillInstagram className="sosmed-icon text-pink-600"/>
            <AiFillTwitterCircle className="sosmed-icon text-blue-400"/>
            <AiFillLinkedin className="sosmed-icon text-blue-400"/>
        </div>
    )
}



export default SosmedIcons