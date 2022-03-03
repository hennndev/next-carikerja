import Post from './Post'

const Posts = ({posts}) => {
    return (
        <div className="flex flex-col space-y-5">
            {posts.length > 0 ? posts.map(post => (
                <Post key={post._id} data={post}/>
            )) : (
                <h1 className='text-gray-500 text-center font-medium text-lg'>Job tidak ditemukan!</h1>
            )}
        </div>
    )
}


export default Posts