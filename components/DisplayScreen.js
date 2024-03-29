//komponen DisplayScreen dengan prop contacts dan delContact
const DisplayScreen = ({ contacts, delContact }) => {
    console.log(contacts)//tampilkan value contacts ke konsol
    return ( 
        <div className="px-16 bg-gray-100 md:col-span-2 h-screen">
            <h1 className="font-bold text-slate-800">All Contacts</h1>
            {/* menampilkan semua data yang ada di prop contacts dengan map */}
            {
                contacts.map(contact => (
                    <div key={contact.id} className="bg-white rounded-md overflow-hidden shadow p-3 my-3 grid grid-cols-3 gap-3">
                        <div className="md:col-span-2">
                            <h1>{ contact.firstname } { contact.lastname }</h1>
                            <span className="text-sm font-bold">{ contact.email }</span>
                        </div>
                        <div className="md:col-span-1">
                            <button className="bg-red-500 text-white p-2 rounded-md hover:scale-125 hover:opacity-80" onClick={
                                () => delContact(contact.id)
                            }>Del</button>
                        </div>
                    </div>
                ))
            }
        </div>
     );
}
//export komponen DisplayScreen
export default DisplayScreen;