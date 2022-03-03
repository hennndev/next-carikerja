import { useRouter } from "next/router"
import { IoClose} from 'react-icons/io5'
import { useData } from "context/appContext"
import { FiMoreVertical } from 'react-icons/fi'
import { AiOutlineUnorderedList, AiOutlineEdit, AiOutlineDelete } from 'react-icons/ai'

const Post = ({idx, post, dropdown, openDropdown, closeDropdown, isLoading, deletePost}) => {

    const router = useRouter()
    const { handleCandidate, handlePostTerm } = useData()

    const handleCandidateRoute = (e) => {
        e.stopPropagation()
        handleCandidate({postId: post._id, candidates: post.kandidat})
        router.push('/my_post/candidates')
    }
    const handleEditPost = (e) => {
        e.stopPropagation()
        handlePostTerm(post)
        router.push('/my_post/edit_post')

    }
    
    return (
        <div className="flex-between space-x-4 bg-white py-3 px-4 rounded-md cursor-pointer border border-gray-200 text-gray-600 hover:bg-blue-500 hover:text-white relative" onClick={() => !isLoading && router.push(`/post/${post._id}`)}>
            {isLoading && <div className="form-loading"></div>}
            <div className="flex items-center space-x-3">
                <p>{idx}</p>
                <h1 className="line-clamp-1">{post.judul}</h1>
            </div>
            <div className="relative z-10">
                {!isLoading && <FiMoreVertical className="text-xl" onClick={(e) => dropdown ? closeDropdown(e) : openDropdown(e, post._id)}/>}
                {dropdown === post._id && (
                    <div className="dropdown">
                        <div className="item" onClick={(e) => handleCandidateRoute(e)}>
                            <AiOutlineUnorderedList/>
                            <p>Lihat Kandidat ({post.kandidat.length})</p>
                        </div>
                        <div className="item" onClick={(e) => handleEditPost(e)}>
                            <AiOutlineEdit/>
                            <p>Edit Post</p>
                        </div>
                        <div className="item" onClick={(e) => deletePost(e)}>
                            <AiOutlineDelete/>
                            <p>Hapus Post</p>
                        </div>
                        <div className="item" onClick={closeDropdown}>
                            <IoClose/>
                            <p>Close</p>
                        </div>
                    </div>
                )}
            </div>
        </div>
    )
}


export default Post