import Head from 'next/head'
import { useState } from 'react'
import Posts from '@/components/Homepage/Posts'
import PageHeader from '@/components/UI/PageHeader'
import RightSidebar from '@/components/UI/RightSidebar'
import PageContainer from '@/components/UI/PageContainer'
import { utilFetchGet, utilValSearch } from 'utils/utils'
import FilteredJob from '@/components/Homepage/FilteredJob'

export default function Home({data}) {

    const [searchVal, setSearchVal] = useState('')
    const [sistemValues, setSistemValues] = useState([])
    const [kategoriValues, setKategoriValues] = useState([])

    replaceAll

    let filteredPost = data?.data?.filter(post => {
        return post?.dataEmployer?.alamatPerusahaan.toLowerCase().includes(searchVal?.toLowerCase()?.trim()?.replaceAll(' ', '')) ||
                post?.dataEmployer?.namaPerusahaan.toLowerCase().includes(searchVal?.toLowerCase()?.trim()?.replaceAll(' ', '')) || 
                post?.tingkatanKandidat?.toLowerCase()?.replaceAll('/', '').includes(searchVal?.toLowerCase()?.trim()?.replaceAll(' ', '')) ||
                post?.sistemPekerjaan?.replace('-', '').toLowerCase().includes(searchVal?.toLowerCase()?.trim()?.replaceAll(' ', '')) ||
                post?.judul?.toLowerCase()?.replaceAll(' ', '').includes(searchVal?.toLowerCase()?.trim()?.replaceAll(' ', '')) ||
                post?.kategoriPekerjaan?.toLowerCase().includes(searchVal?.toLowerCase()?.trim()?.replaceAll(' ', '')) ||
                [].concat.apply([], post?.kemampuan?.map(skill => skill.split(' '))).some(skill => searchVal.split(' ').includes(skill))
    })

    if(kategoriValues.length > 0) {
        filteredPost = filteredPost.filter(data => kategoriValues.includes(data.kategoriPekerjaan))
    }

    return (
        <>
            <Head>
                <title>Home | CariKERJA</title>
                <link rel="icon" href="/favicon.ico" />
            </Head>
            <PageContainer>
                <div className='content'>
                    <PageHeader 
                        title="Cari Kerja" 
                        handleSearch={(val) => setSearchVal(val)}
                        searchPlaceholder="Cari pekerjaan atau kata kunci" 
                        searchBtn="Cari Pekerjaan"/>
                    <div className="px-5 xl:px-10">
                        {data?.data?.length > 0 ? <Posts posts={sistemValues.length < 1 ? filteredPost : filteredPost.filter(post => sistemValues.includes(post.sistemPekerjaan))}/> : (
                            <h1 className='text-gray-500 text-center font-medium text-lg'>Tidak ada post untuk saat ini!</h1>
                        )}
                    </div>
                </div>
                <RightSidebar>
                    <FilteredJob 
                        kategoriValues={kategoriValues} setKategoriValues={setKategoriValues}
                        sistemValues={sistemValues} setSistemValues={setSistemValues}/>
                </RightSidebar>
            </PageContainer>
        </>
    )
}


export const getStaticProps = async() => {
    let data = []
    try {
        data = await utilFetchGet(`jobs`)
    } catch (error) {
        data = []
    }
    return {
        props: {
            data
        }
    }
}
