import React, { useEffect, useState } from 'react'
import { listBooks, downloadBook } from '../api'

export default function Library(){
  const [books, setBooks] = useState([]);

  useEffect(()=>{ listBooks().then(setBooks); },[]);

  async function handleDownload(name){
    const res = await downloadBook(name);
    if (res.status === 200) {
      const blob = await res.blob(