import { useState } from 'react'
import { FiSearch } from 'react-icons/fi'
import { AiOutlineCloseCircle } from 'react-icons/ai'

const SearchInput = ({placeholder, btnTitle, handleSearch}) => {

    const [searchTerm, setSearchTerm] = useState('')
    const handleClear = () => {
        setSearchTerm('')
        handleSearch('')
    }
    const handleSubmit = (e) => {
        e.preventDefault()
        handleSearch(searchTerm)
    }

    return (
        <form onSubmit={handleSubmit} className='flex items-center bg-transparent rounded-full pl-3 pr-3 lg:pr-1 w-full shadow-md'>
            <FiSearch className='text-xl text-gray-500 mr-3 cursor-pointer' onClick={handleSubmit}/>
            <input 
                type="text" 
                value={searchTerm}
                placeholder={placeholder} 
                className='py-3 flex-1 outline-none mr-3'
                onChange={e => setSearchTerm(e.target.value)}/>
            {searchTerm && <AiOutlineCloseCircle className='text-red-600 text-xl lg:mr-5 cursor-pointer' onClick={handleClear}/>}
            <button className='btn hidden lg:block rounded-full' type='submit'>{btnTitle}</button>
        </form>
    )
}

export default SearchInput