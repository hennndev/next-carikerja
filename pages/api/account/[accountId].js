import clientPromise from "lib/mongodb"
import { ObjectId } from "mongodb"
const cloudinary = require('cloudinary').v2


export default async function handler(req, res) {

    if(req.method === 'GET') {
        const client = await clientPromise
        const db = client.db()
        const { accountId, coll } = req.query

        const data = await db.collection(coll === 'employers' ? 'employers' : 'job_seekers').findOne({email: accountId})
        res.status(200).json({message: 'Sukses mengambil data account', data})
    }

    if(req.method === 'PUT') {
        const client = await clientPromise
        const db = client.db()
        const { accountId } = req.query
       
        cloudinary.config({ 
            cloud_name: process.env.CLOUD_NAME, 
            api_key: process.env.CLOUD_API_KEY, 
            api_secret: process.env.CLOUD_API_SECRET 
        });

        if(req.body.namaPerusahaan) {
            const {namaPerusahaan, alamatPerusahaan, tentangPerusahaan, logoProfile, situsPerusahaan, oldLogoProfile } = req.body

            if(oldLogoProfile) {
                cloudinary.uploader.destroy(oldLogoProfile, function(error, result) { })
            }
            await db.collection('employers').updateOne({"_id": ObjectId(accountId)}, { 
                $set: { 
                    "namaPerusahaan" : namaPerusahaan, 
                    "alamatPerusahaan" : alamatPerusahaan, 
                    "logoProfile": logoProfile,
                    "tentangPerusahaan": tentangPerusahaan,
                    "situsPerusahaan": situsPerusahaan,
                 }
            })
            res.status(200).json({message: 'Berhasil edit', data: req.body})     

        } else {
            const {username, alamat, job, skills, tentangSaya, fotoProfile, riwayatPendidikan, oldFotoProfile = null } = req.body

            if(oldFotoProfile) {
                cloudinary.uploader.destroy(oldFotoProfile, function(error, result) { })
            }
            await db.collection('job_seekers').updateOne({"_id": ObjectId(req.query.accountId)}, { 
                $set: { 
                    "username" : username, 
                    "alamat" : alamat, 
                    "job": job,
                    "skills": skills,
                    "fotoProfile": fotoProfile,
                    "tentangSaya": tentangSaya,
                    "riwayatPendidikan": riwayatPendidikan,
                 }
            })
            res.status(200).json({message: 'Berhasil edit', data: req.body})     
        }
        
        

        
    }
}