import clientPromise from "lib/mongodb";


export default async function handler(req, res) {


    if(req.method === 'GET') {
        const client = await clientPromise
        const db = client.db()
        const { coll } = req.query

        console.log(req.query)

        const dataAccounts = await db.collection(coll === "employers" ? 'employers' : 'job_seekers').find({}).toArray()
        res.status(200).json({message: 'Berhasil ambil data accounts', data: dataAccounts})
    }
}