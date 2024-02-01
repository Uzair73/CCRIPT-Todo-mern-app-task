import React from 'react'
import Form from './Form'

const Home = (props) => {
  const {showAlert} = props
  return (
    <>
      <div className="container my-3">
      <Form showAlert={showAlert}/>
      </div>
    </>
  )
}

export default Home
