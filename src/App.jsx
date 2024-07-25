
import React from 'react'
import './App.css'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import Header from './components/Header'
import Banner from './components/Banner'
import Body from './components/Body'

function App() {

  return (
    <BrowserRouter basename='wellness-retreats'>
      <Routes>
        <Route path='/' element={
          <React.Fragment>
            <Header />
            <Banner />
            <Body />
          </React.Fragment>
        } />
      </Routes>
    </BrowserRouter>
  )
}

export default App
