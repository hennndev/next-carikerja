import clientPromise from "lib/mongodb"
import { genSalt, hash } from "bcryptjs"


export default async function handler(req, res) {

    if(req.method === 'POST') {
        const client = await clientPromise
        const db = client.db()
        const { jobSeeker = false, data: {password, ...dataRegister} } = req.body

        let dataAccount = {
            job: [],
            alamat: '',
            skills: [],
            tentangSaya: '',
            fotoProfile: null,
            riwayatPendidikan: ''
        }

        if(!jobSeeker) {
            dataAccount = {
                logoProfile: null,
                situsPerusahaan: []
            }
        }

        let checkExistingUser = await db.collection(jobSeeker ? 'job_seekers' : 'employers').findOne({email: dataRegister.email})
        if(checkExistingUser) {
            res.status(422).json({error: 'Email sudah terdaftar, silahkan coba lagi'})
        } else {
            const salt = await genSalt(10)
            const newAccount = {
                createdAt: new Date(),
                password: await hash(password, salt),
                ...dataRegister,
                ...dataAccount
            }
            await db.collection(jobSeeker ? 'job_seekers' : 'employers').insertOne(newAccount)
            res.status(201).json({message: `Sukses membuat akun baru sebagai ${jobSeeker ? 'job seeker' : 'employeer'}, silahkan login`})
        }
    }
}