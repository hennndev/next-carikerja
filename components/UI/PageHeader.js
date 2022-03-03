import SearchInput from './SearchInput'
import { useData } from 'context/appContext'
import { AiOutlineAppstore } from 'react-icons/ai'
import { HiOutlineMenuAlt3 } from 'react-icons/hi'

const PageHeader = ({title, searchPlaceholder, searchBtn, handleSearch, noSticky = null}) => {

    const { handleOpenSidebar, handleOpenRightSidebar } = useData()

    return (
        <div className={`${!noSticky && 'sticky top-0'} py-5 lg:py-7 px-5 xl:px-10 bg-white z-10`}>
            <div className={`xl:flex-center flex-between mb-8`}>
                <AiOutlineAppstore className='text-gray-500 lg:hidden text-2xl cursor-pointer' onClick={handleOpenSidebar}/>
                <h1 className='text-2xl md:text-3xl text-blue-500 font-semibold text-center'>{title}</h1>
                <HiOutlineMenuAlt3 className='text-gray-500 xl:hidden text-2xl cursor-pointer' onClick={handleOpenRightSidebar}/>
            </div>
            {searchPlaceholder && <SearchInput handleSearch={handleSearch} placeholder={searchPlaceholder} btnTitle={searchBtn}/>}
        </div>
    )
}


export default PageHeader