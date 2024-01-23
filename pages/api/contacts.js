import { PrismaClient } from "@prisma/client"//import PrismaClient dari @prisma/client

//inisiasi PrismaClient ke objek prisma
const prisma = new PrismaClient();

export default async function handler(req, res) {

    //jika method request bukan post maka kembalikan pesan Method not allowed
    if (req.method !== 'POST') {
        return res.status(405).json({ message: 'Method not allowed' });
    }

    try {
        //mengambil data dari request
        const contactData = req.body //JSON.parse(req.body);
        //memasukan data dari request ke table contact
        await prisma.contact.create({
            data: contactData
        })
        //lalu kembalikan data dari request
        res.status(200).json(contactData)
    } catch (err) {
        //jika terjadi error maka kembalikan pesan Something went wrong dan tampilkan error di log
        console.log("from API error", err)
        res.status(400).json({ message: 'Something went wrong' });
    }
}