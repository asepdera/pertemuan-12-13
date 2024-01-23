import { PrismaClient } from "@prisma/client"//import PrismaClient dari @prisma/client

//inisiasi PrismaClient ke objek prisma
const prisma = new PrismaClient();

export default async function handler(req, res) {
  //jika method request bukan post maka kembalikan pesan Method not allowed
  if (req.method !== 'POST') {
    return res.status(405).json({ message: 'Method not allowed' });
  }
  try {
    //mengambil data id dari request
    const { id } = req.body //JSON.parse(req.body);
    // console.log(req.body)
    //menghapus data table contact berdasarkan id dari request 
    const delContact = await prisma.contact.delete({
      where: {
        id: id,
      },
    })
    //lalu kembalikan data yang sudah di hapus
    res.status(200).json(delContact)
  } catch (err) {
    //jika terjadi error maka kembalikan pesan Something went wrong dan tampilkan error di log
    console.log("from API error", err)
    res.status(400).json({ message: 'Could not delete contact' });
  }
}