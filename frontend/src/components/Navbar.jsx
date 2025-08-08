import React from 'react'
import { Link } from 'react-router-dom'

export default function Navbar({ isMember, onLogout }){
  return (
    <nav style={{ display: 'flex', gap: 16, alignItems: 'center' }}>
      <h3>فضاء العبقري الصغير</h3>
      <Link to="/">الرئيسية</Link>
      <Link to="/library">مكتبتي</Link>
      <Link to="/drawings">رسوماتي</Link>
      <div style={{ marginLeft: 'auto' }}>
        {isMember ? (
          <button onClick={onLogout}>تسجيل الخروج</button>
        ) : (
          <span>زائر</span>
        )}
      </div>
    </nav>
  )
}