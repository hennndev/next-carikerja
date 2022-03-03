import clientPromise from "lib/mongodb";

export default async function handler(req, res) {

    if(req.method === 'GET') {
        const client = await clientPromise
        const db = client.db()

        const data = await db.collection('messages').find({}).toArray()
        res.status(200).json({message: 'Berhasil mengambil data pesan', data})
    }
    
    if(req.method === 'POST') {
        const client = await clientPromise
        const db = client.db()

        await db.collection('messages').insertOne(req.body)
        res.status(201).json({message: 'Berhasil mengirimkan pesan kepada job seeker terkait'})
    }

    if(req.method === 'PUT') {
        const client = await clientPromise
        const db = client.db()

        if(req.body.namaPerusahaan) {
            await db.collection('messages').updateMany({"messages.email": req.query.email}, 
                {$set: {
                    "messages.$[elem].namaPerusahaan": req.body.namaPerusahaan,
                    "messages.$[elem].logoProfileURL": req.body.logoProfileURL,
                }},
                { multi: true, arrayFilters: [{ "elem.email": req.query.email }]}
            )
        } else {
            await db.collection('messages').updateMany({"messages.email": req.query.email}, 
                {$set: {
                    "messages.$[elem].nama": req.body.nama,
                    "messages.$[elem].fotoProfileURL": req.body.fotoProfileURL,
                }},
                { multi: true, arrayFilters: [{ "elem.email": req.query.email }]}
            )
        }
        res.status(201).json({message: 'Berhasil update data messages'})
    }
}