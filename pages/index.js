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

    let filteredPost = data?.data?.filter(post => {
        return post?.dataEmployer?.alamatPerusahaan.toLowerCase().includes(utilValSearch(searchVal)) ||
                post?.dataEmployer?.namaPerusahaan.toLowerCase().includes(utilValSearch(searchVal)) || 
                post?.tingkatanKandidat?.toLowerCase().replaceAll('/', '').includes(utilValSearch(searchVal)) ||
                post?.sistemPekerjaan?.replace('-', '').toLowerCase().includes(utilValSearch(searchVal)) ||
                post?.judul?.toLowerCase().replaceAll(' ', '').includes(utilValSearch(searchVal)) ||
                post?.kategoriPekerjaan?.toLowerCase().includes(utilValSearch(searchVal)) ||
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


export const getServerSideProps = async() => {
    let data
    try {
        data =  await utilFetchGet(`jobs`)
    } catch (error) {
        data = {
            data: []
        }
    }
    return {
        props: {
            data
        }
    }
}
