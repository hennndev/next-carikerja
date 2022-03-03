import clientPromise from "lib/mongodb";
import { ObjectId } from "mongodb";

export default async function handler(req, res) {
    
    if(req.method === 'POST') {
        const client = await clientPromise
        const db = client.db()
        const { jobId } = req.query

        await db.collection('posts').updateOne({"_id": ObjectId(jobId)}, { 
            $push: { "kandidat": {...req.body} }
        })
        res.status(201).json({message: 'Berhasil menambahkan kandidat'})
    }

    if(req.method === 'DELETE') {
        const client = await clientPromise
        const db = client.db()
        const { jobId } = req.query

        await db.collection('posts').remove({_id: ObjectId(jobId)})
        res.status(202).json({message: 'Post berhasil dihapus'})
    }


    if(req.method === 'PUT') {
        const client = await clientPromise
        const db = client.db()
        const { jobId } = req.query
        
        if(!req.body.candidateId) {
            await db.collection('posts').updateOne({"_id": ObjectId(jobId)}, 
                {$set: {
                    "judul": req.body.judul,
                    "sistemPekerjaan": req.body.sistemPekerjaan,
                    "tingkatanKandidat": req.body.tingkatanKandidat,
                    "rangeGaji": req.body.rangeGaji,
                    "kemampuan": req.body.kemampuan,
                    "jangkaWaktu": req.body.jangkaWaktu,
                    "deskripsiPekerjaan": req.body.deskripsiPekerjaan,
                }}
            )
            res.status(200).json({message: 'Berhasil mengubah post'})
        } else {
            await db.collection('posts').update({"_id": ObjectId(jobId)}, {
                $pull: {"kandidat": { "id" :req.body.candidateId }}
            }, false, true)
            res.status(200).json({message: 'Berhasil menghapus kandidat'})
        }

    }
}