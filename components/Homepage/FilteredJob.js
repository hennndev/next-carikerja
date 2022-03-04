import { sistemJobs } from '../../consts/consts.js'

const FilteredJob = ({kategoriValues, setKategoriValues, sistemValues, setSistemValues}) => {

    const kategoriChange = (e) => {
        if(e.target.checked) {
            setKategoriValues([
                ...kategoriValues,
                e.target.name
            ])
        } else {
            setKategoriValues(kategoriValues.filter(val => val !== e.target.name))
        }
    }

    const jenisChange = (e) => {
        if(e.target.checked) {
            setSistemValues([
                ...sistemValues,
                e.target.name
            ])
        } else {
            setSistemValues(sistemValues.filter(val => val !== e.target.name))
        }
    }

    return (
        <>
            <div className="mt-8">
                <h1 className="font-semibold text-blue-500 text-xl">Filter Job</h1>
                <div className="border-t-2 border-gray-100 mt-5 pt-5">
                    <h2 className="font-medium text-blue-400 text-lg">Kategori</h2>
                    <div className="mt-3 flex flex-col space-y-4">
                        <div className="flex items-center space-x-3">
                            <input type="checkbox" id="programming-tech" name="Programming &amp; Tech" onChange={kategoriChange}/>
                            <label htmlFor="programming-tech" className="text-[15px] text-[#325288]">Programming &amp; Tech</label>
                        </div>
                        <div className="flex items-center space-x-3">
                            <input type="checkbox" id="graphic-design" name="Graphic Design" onChange={kategoriChange}/>
                            <label htmlFor="graphic-design" className="text-[15px] text-gray-500">Graphic Design</label>
                        </div>
                        <div className="flex items-center space-x-3">
                            <input type="checkbox" id="digital-marketing" name="Digital Marketing" onChange={kategoriChange}/>
                            <label htmlFor="digital-marketing" className="text-[15px] text-gray-500">Digital Marketing</label>
                        </div>
                        <div className="flex items-center space-x-3">
                            <input type="checkbox" id="graphic-video" name="Graphic Video &amp; Animation" onChange={kategoriChange}/>
                            <label htmlFor="graphic-video" className="text-[15px] text-gray-500">Graphic Video &amp; Animation</label>
                        </div>
                        <div className="flex items-center space-x-3">
                            <input type="checkbox" id="ui/ux" name="UI/UX" onChange={kategoriChange}/>
                            <label htmlFor="ui/ux" className="text-[15px] text-gray-500">UI/UX</label>
                        </div>
                        <div className="flex items-center space-x-3">
                            <input type="checkbox" id="writing-translation" name="Writing &amp; Translation" onChange={kategoriChange}/>
                            <label htmlFor="writing-translation" className="text-[15px] text-gray-500">Writing &amp; Translation</label>
                        </div>
                        <div className="flex items-center space-x-3">
                            <input type="checkbox" id="voice-over" name="Voice Over" onChange={kategoriChange}/>
                            <label htmlFor="voice-over" className="text-[15px] text-gray-500">Voice Over</label>
                        </div>
                        <div className="flex items-center space-x-3">
                            <input type="checkbox" id="bussines" name="Bussines" onChange={kategoriChange}/>
                            <label htmlFor="bussines" className="text-[15px] text-gray-500">Bussines</label>
                        </div>
                        <div className="flex items-center space-x-3">
                            <input type="checkbox" id="lifestyle" name="Lifestyle" onChange={kategoriChange}/>
                            <label htmlFor="lifestyle" className="text-[15px] text-gray-500">Lifestyle</label>
                        </div>
                        <div className="flex items-center space-x-3">
                            <input type="checkbox" id="trending" name="Trending" onChange={kategoriChange}/>
                            <label htmlFor="trending" className="text-[15px] text-gray-500">Trending</label>
                        </div>
                    </div>     
                </div>

                <div className="border-t-2 border-gray-200 mt-5 pt-5">
                    <h2 className="font-medium text-blue-400 text-lg">Jenis Pekerjaan</h2>
                    <div className="mt-3 flex flex-col space-y-4">
                        {sistemJobs.map(sistem => (
                            <div className="flex items-center space-x-3" key={sistem.id}>
                                <input type="checkbox" id={sistem.id} name={sistem.id} onChange={jenisChange}/>
                                <label htmlFor={sistem.id} className="text-[15px] text-gray-500">{sistem.title}</label>
                            </div>
                        ))}
                    </div>          
                </div>
            </div>
        </>
    )
}

export default FilteredJob