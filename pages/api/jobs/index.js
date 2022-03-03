import clientPromise from "lib/mongodb"


export default async function handler(req, res) {

    if(req.method === 'GET') {
        const client = await clientPromise
        const db = client.db()

        const dataJobs = await db.collection('posts').find({}).toArray()
        res.status(200).json({message: 'Berhasil mengambil data jobs', data: dataJobs})
    }

    if(req.method === 'POST') {
        const client = await clientPromise
        const db = client.db()

        await db.collection('posts').insertOne({createdAt: new Date(), ...req.body})
        res.status(201).json({message: 'Berhasil menambahkan post baru'})
    }

    if(req.method === 'PUT') {
        const client = await clientPromise
        const db = client.db()

        if(!req.query.email) {
            await db.collection('posts').updateMany({"kandidat.id": req.body.id}, 
                {$set : {
                    "kandidat.$[elem].fotoProfileURL": req.body.fotoProfileURL
                }},
                { multi: true, arrayFilters: [{ "elem.id": req.body.id }]}
            )
        } else {
            await db.collection('posts').updateMany({"dataEmployer.email": req.query.email}, 
                {$set: {
                    "dataEmployer.namaPerusahaan": req.body.namaPerusahaan,
                    "dataEmployer.logoProfileURL": req.body.logoProfileURL,
                    "dataEmployer.alamatPerusahaan": req.body.alamatPerusahaan,
                    "dataEmployer.tentangPerusahaan": req.body.tentangPerusahaan,
                    "dataEmployer.situsPerusahaan": req.body.situsPerusahaan,
                }}
            )
        }   
        res.status(200).json({message: 'Berhasil mengubah data jobs', data: req.body})
    }
}