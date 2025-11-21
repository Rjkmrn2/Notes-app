import React,{useState} from 'react'
import Navbar from '../../components/Navbar/Navbar'
import NoteCard from '../../components/Cards/NoteCard'
import { MdAdd, MdOutlineAlarmAdd } from 'react-icons/md'
import AddEditNotes from './AddEditNotes'
import Modal from 'react-modal';
import { useNavigate } from 'react-router-dom'
import axiosInstance from '../../utils/axiosInstance'
import { useEffect } from 'react'
import moment from 'moment'
import Toast from '../../components/ToastMessage/Toast'
import EmptyCard from '../../components/EmptyCard/EmptyCard'
import AddnotesImg from '../../assets/images/add-notes.svg'
import NoDataImg from '../../assets/images/no-data.svg'


const Home = () => {
  const [openAddEditModal, setOpenAddEditModal] = React.useState({
    isShown:false,
    type:"ADD", 
    data:null
  });

  const [showToastMsg, setShowToastMsg] = useState({
    isShown:false,
    message:"",
    type:"add", 
  });

   const [allNotes,setAllNotes]=useState([]);
  const [userInfo,setUserInfo]=useState(null);
  const [isSearch,setIsSearch]=useState(false);
  
  const navigate=useNavigate();
  const handleEdit=(noteDetails)=>{
    setOpenAddEditModal({isShown:true, type:"edit", data:noteDetails})
  };


  const handleCloseToast=()=>{
    setShowToastMsg({isShown:false, message:""});
  };


  const showToastMessage=(message,type)=>{
    setShowToastMsg({isShown:true, message,type});
  };

  const getUserInfo= async () =>{

      try{
        const response= await axiosInstance.get("/get-user");
        if(response.data && response.data.user){
          setUserInfo (response.data.user); 
      }
  } catch(error){
    if(error.response && error.response.status===401){
      localStorage.clear();
      navigate("/login");
    }
  }
  };

// get all notes
  const getAllNotes= async () =>{
    try{
      const response= await axiosInstance.get("/get-all-notes");
      if(response.data && response.data.notes){
        setAllNotes (response.data.notes);
    }
  }catch(error){
      console.log("Error fetching notes:");
    }
  };
  
//delete

const deleteNote= async (data) =>{
  const noteId= data._id;
    try {
      const response= await axiosInstance.delete("/delete-note/"+noteId);
      if(response.data && !response.data.error){
        showToastMessage("Note deleted successfully","delete");
        getAllNotes();
      }
    } catch (error) {
      if(error.response && error.response.data && error.response.data.message){
        console.log("Error deleting note:");
      }
    }
}


//search

const onSearchNote= async (query) =>{

  try{
    const response= await axiosInstance.get("/search-notes",{
      params:{query},
    });

    if(response.data && response.data.notes){
      setIsSearch(true);
      setAllNotes (response.data.notes); 
  }
}catch(error){
  console.log(error);

}
}


const handleClearSearch=()=>{
  setIsSearch(false);
  getAllNotes();
}


const updateIsPinned= async (noteData) =>{
  const noteId= noteData._id;
    try {
      const response= await axiosInstance.put("/update-note-pinned/"+noteId,{
        "isPinned":!noteData.isPinned,
      });
      if(response.data && response.data.note){
        showToastMessage("Note updated successfully","edit");
        getAllNotes();
        
      }
    } catch (error) {
      console.log(error);
    }
};



  useEffect(()=>{
    getAllNotes();
    getUserInfo();
    return()=>{};
  },[]);


  return ( 
    <>
      <Navbar userInfo ={userInfo} onSearchNote={onSearchNote} handleClearSearch={handleClearSearch}/>

      <div className='container mx-auto '>
        {allNotes.length>0 ? (<div className='grid grid-cols-3 gap-6 mt-8 '>
          
          {allNotes.map((item,index)=>(
          <NoteCard 
          key={item._id}
          title={item.title}
          date={item.createdOn}
          content={item.content}
          tags={item.tags}
          isPinned={item.isPinned}
          onDelete={()=>deleteNote(item)}
          onEdit={()=>handleEdit(item)}
          onPinNote={()=>updateIsPinned(item)}
          />
          ))}
        </div>) :( <EmptyCard  imgSrc={isSearch? NoDataImg:AddnotesImg}  message={isSearch?`No Matching Notes Found`:"Start creating your first note! Click the 'Add' button to jot down your thoughts, reminders, and ideas. Let's get started! "}/>)}
      </div>

      <button className="w-15 h-16 flex items-center justify-center rounded-2xl bg-primary hover:bg-blue-600 absolute right-10 bottom-10" onClick={()=>{
        setOpenAddEditModal({isShown:true, type:"ADD", data:null});
      }}>
        <MdAdd className= "text-[32px] text-white"/>
      </button>

      <Modal 
      isOpen={openAddEditModal.isShown}
      onRequestClose={()=>{}}
      style={{
        overlay:{
          backgroundColor:"rgba(0,0,0,0.5)",},
        }}
        contentLabel=""
        className="w-[45%] max-h-3/4 bg-white rounded-md mx-auto mt-14 p-5 overflow-scroll"
        >
          <AddEditNotes
          type={openAddEditModal.type}
          noteData={openAddEditModal.data}
          onClose={()=>{
            setOpenAddEditModal({isShown:false, type:"ADD", data:null});
          }}
          getAllNotes={getAllNotes}
          showToastMessage={showToastMessage}
          />
        </Modal>
        <Toast
          isShown={showToastMsg.isShown}
          message={showToastMsg.message}
          type={showToastMsg.type}
          onClose={handleCloseToast}
        />
      
    </>
  )
}

export default Home