import clientPromise from "lib/mongodb"
import { compare } from "bcryptjs"


export default async function handler(req, res) {


    if(req.method === 'POST') {
        const client = await clientPromise
        const db = client.db()
        const { email, asEmployer, password } = req.body

        const checkExistingUser = await db.collection(asEmployer ? 'employers' : 'job_seekers').findOne({email: email})

        if(checkExistingUser) {
            const checkPassword = await compare(password, checkExistingUser.password)
            if(checkPassword) {
                const {password, email, _id, ...dataJobSeeker} = checkExistingUser
                if(checkExistingUser.username) {
                    res.status(200).json({message: 'Berhasil login', data: {username: checkExistingUser.username, email, _id}}) 
                }
                else {
                    res.status(200).json({
                        message: 'Berhasil login', 
                        data: {
                            namaPerusahaan: checkExistingUser.namaPerusahaan, 
                            logoProfileURL: checkExistingUser?.logoProfile?.logoProfileURL || null,
                            alamatPerusahaan: checkExistingUser.alamatPerusahaan,
                            tentangPerusahaan: checkExistingUser.tentangPerusahaan,
                            situsPerusahaan: checkExistingUser.situsPerusahaan,
                            email, 
                            _id
                        }
                    }) 
                }
            } else {
                res.status(401).json({error: 'Password salah'})
            }
        } else {
            res.status(401).json({error: 'Email yang kamu masukan belum terdaftar'})
        }
    }
}