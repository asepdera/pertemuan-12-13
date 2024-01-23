import { PrismaClient } from '@prisma/client'//import PrismaClient dari @prisma/client
import Head from 'next/head'//import Head dari next
import { useState } from 'react'//import useState dari react
import AddScreen from '../components/AddScreen'//import AddScreen dari file AddScreen.js
import DisplayScreen from '../components/DisplayScreen'//import DisplayScreen dari file DisplayScreen.js

//inisiasi PrismaClient ke objek prisma
const prisma = new PrismaClient()

//mengambil prop sebelum client ditampilkan
export const getServerSideProps = async () => {
  //mengambil semua data dari table contact dan kembalikan dalam bentuk objek
  const contacts = await prisma.contact.findMany()
  return {
    props: {
      initialContacts: contacts
    }
  }
}





//komponen Home dengan prop yang diambil dari fungsi getServerSideProps
export default function Home({ initialContacts }) {
  //menggunakan useState untuk menyimpan data contact
  const [contacts, setContacts] = useState(initialContacts)

  //ambil data contact dari api di folder api/getAllContacts
  const getContacts = async () => {
    const resp = await fetch('/api/getAllContacts', {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json; charset=utf8'
      }
    })
    //mengubah data response menjadi format json
    const data = await resp.json();
    //tampilkan data di log
    console.log(data)
    //simpan data ke state contact
    setContacts(data)
  }

  //memasukan data contact menggunakan api yang ada di folder api/contacts
  const saveContact = async (contact) => {
    const response = await fetch('/api/contacts', {
      method: 'POST',
      body: JSON.stringify(contact),
      headers: {
        'Content-Type': 'application/json; charset=utf8'
      }
    })
    //jika ada error saat memasukan data maka tampilkan error dari api ke log
    if (!response.ok) {
      throw new Error(response.statusText)
    }
    //jika berhasil maka jalankan fungsi getContacts
    await getContacts()
    //dan kembalikan data dari response
    return await response.json()

  }
  //menghapus data contact menggunakan api dari folder api/deleteContact berdasarkan contactId yang ada di parameter
  const delContact = async (contactId) => {
    //tampilkan contactId ke konsol
    console.log("contact to delete: "+contactId)
    //cek apakah user benar-benar akan menghapus data
    if (window.confirm("Do you want to delete this food?")) {
      //jika ya maka hapus data
      await fetch('/api/deleteContact', {
        method: 'POST',
        body: JSON.stringify({
          id: contactId
        }),
        headers: {
          'Content-Type': 'application/json; charset=utf8'
        }
      })
    }
    //lalu jalankan fungsi getContacts()
    await getContacts()

  }


  return (
    <div className="">
      <Head>
        <title>Contact App</title>
        <meta name="description" content="Created by Connelblaze" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <div className="grid md:grid-cols-3">
      {/* tampilkan komponen AddScreen dan masukan data contacts ke prop contacts lalu masukan juga fungsi ke prop AddContactFormProps */}
        <AddScreen contacts = { contacts } AddContactFormProps = {async (data, e) => {
          try {
            await saveContact(data)
            e.target.reset()
          } catch (error) {
            console.log(error);
          }
        }} />
        {/* tampilkan komponen DisplayScreen dan masukan data contacts ke prop contacts lalu masukan juga fungsi delContact ke prop delContact */}
        <DisplayScreen contacts = { contacts } delContact = { delContact } />
      </div>
    </div>
  )
}
