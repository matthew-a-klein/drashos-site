import React from "react"
import axios from 'axios'
import Drashah from "../components/Drashah"
import ViewAllButton from "../components/ViewAllButton"

export default function ViewDrashos() {

    const [drashosList, setDrashosList] = React.useState([])
  
    React.useEffect(() => {
      axios.get('api/drashos/retrieve/').then(function (response) {
        setDrashosList(response.data)
      })
    }, [])
  
    const drashahItems = drashosList.map(function (drashah) {
      return (
        <Drashah key={drashah.id} title={drashah.title} description={drashah.description} />)
    })
  
    return (
      <div>
        <ul>
          {drashahItems}
        </ul>
        <ViewAllButton />
      </div>
    )
  }