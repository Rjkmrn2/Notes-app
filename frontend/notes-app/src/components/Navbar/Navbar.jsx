import React from 'react'
import '../../index.css'
import ProfileInfo from "../Cards/ProfileInfo"
import { useNavigate } from 'react-router-dom'
import SearchBar from '../SearchBar/SearchBar';
const Navbar = ({userInfo,onSearchNote,handleClearSearch}) => {
  const [searchQuery,setSearchQuery]=React.useState("");
   const navigate=useNavigate();

   
   const onLogout=()=>{
    localStorage.clear();
    navigate("/login");
   };
    const onClearSearch=()=>{
      setSearchQuery("");
      handleClearSearch();
    };

    const handleSearch=()=>{
      if(searchQuery){
        onSearchNote(searchQuery);
      }
    }
  return (
    <div className=' flex items-center justify-between px-6 py-2 drop-shadow' style={{ backgroundColor: 'var(--component-bg)' }}>
      <div className='text-xl font-medium text-blue py-2'><h2>Notes</h2></div>

      <SearchBar value={searchQuery}
      onChange={({target})=>{
        setSearchQuery(target.value);
      
      }}
      handleSearch={handleSearch}
      onClearSearch={onClearSearch}
      />

      <ProfileInfo userInfo={userInfo} onLogout={onLogout}/>
    </div>
  );
};

export default Navbar