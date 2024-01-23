import { PrismaClient } from "@prisma/client";//import PrismaClient dari @prisma/client

//inisiasi PrismaClient ke objek prisma
const prisma = new PrismaClient();

export default async (req, res) => {
  const data = req.body;//mengambil data dari request
  try {
    //mengambil semua data dari table contact dan kembalikan
    const result = await prisma.contact.findMany();
    res.status(200).json(result);
  } catch (err) {
    //jika terjadi error maka kembalikan pesan Error occured. dan tampilkan error di log
    console.log(err);
    res.status(403).json({ err: "Error occured." });
  }
};