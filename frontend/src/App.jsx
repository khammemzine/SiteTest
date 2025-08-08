import React, { useEffect, useState } from 'react'
import Navbar from './components/Navbar'
import { checkAuth, logout } from './api'

export default function App({ children }){
  const [isMember, setIsMember] = useState(false);

  useEffect(()=>{
    checkAuth().then(data => setIsMember(data.isMember));
  },[]);

  async function handleLogout(){
    await logout();
    setIsMember(false);
    window.location.href = '/';
  }

  return (
    <div style={{ padding: 20 }}>
      <Navbar isMember={isMember} onLogout={handleLogout} />
      <div style={{ marginTop: 20 }}>{children}</div>
    </div>
  )
}