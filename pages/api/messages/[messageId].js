import clientPromise from "lib/mongodb"
import { ObjectId } from "mongodb"

export default async function handler(req, res) {

    if(req.method === 'POST') {
        const client = await clientPromise
        const db = client.db()
        const { messageId } = req.query

        await db.collection('messages').updateOne({"_id": ObjectId(messageId)}, { 
            $push: { "messages": {...req.body} }
        })
        res.status(201).json({message: 'Berhasil mengirim pesan'})
    }

    if(req.method === 'PUT') {
        const client = await clientPromise
        const db = client.db()
        const { messageId, star = false } = req.query

        if(star) {
            await db.collection('messages').updateOne({_id: ObjectId(messageId), "messages.msgId": req.body.msgId}, 
                { $set: { "messages.$.star" : req.body.val } }
            )
        } else {
            await db.collection('messages').updateOne({_id: ObjectId(messageId), "messages.msgId": req.body.msgId}, 
            { $set: { "messages.$.status" : "read" } })
        }

        res.status(202).json({message: 'Berhasil update pesan'})
    }

    if(req.method === 'GET'){
        const client = await clientPromise
        const db = client.db()
        const { messageId, q } = req.query

        let messages

        if(q === 'employer') {
            messages = await db.collection('messages').find({emailPengirim: messageId}).toArray()
        } else {
            messages = await db.collection('messages').find({emailTujuan: messageId}).toArray()
        }
        res.status(200).json({message: 'Berhasil mengambil data pesan', data: messages})
    }

    if(req.method === 'DELETE') {
        const client = await clientPromise
        const db = client.db()
        const { messageId, msgId = null } = req.query

        if(msgId) {
            await db.collection('messages').update({"_id": ObjectId(messageId)}, {
                $pull: {"messages": { "msgId" :msgId }}
            }, false, true)
        } else {
            await db.collection('messages').remove({_id: ObjectId(messageId)})
        }
        res.status(202).json({message: 'Berhasil menghapus data'})
    }
}