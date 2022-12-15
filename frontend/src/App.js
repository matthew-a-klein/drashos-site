import React from 'react'

import axios from 'axios';
import Drashah from './Drashah';


export default function App() {

  const [drashosList, setDrashosList] = React.useState([])

  React.useEffect(() => {
    axios.get('api/drashos').then(function (response) {
      setDrashosList(response.data)
    })
  }, [])

  const drashahItems = drashosList.map(function (drashah) {
    return (
      <Drashah title={drashah.title} description={drashah.description} />)
  })

  return (
    <div>
      <h1 className="text-xl text-red-600">
        Hello world!
        {drashahItems}
      </h1>
    </div>
  )
}
