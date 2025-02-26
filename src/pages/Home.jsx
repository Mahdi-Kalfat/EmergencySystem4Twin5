import React from 'react'
import '../App.css'
import Header from '../components/Header'
import SideBar from '../components/SideBar'
export default function Home() {
  return (
     <div className="app-container">
      <div className="sidebar-container">
        <SideBar />
      </div>
      <div className="content-container">
        <Header />
      </div>
    </div>
  )
}
