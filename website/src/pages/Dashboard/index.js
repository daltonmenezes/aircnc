import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import api from '../../services/api'

import './styles.css'

export default () => {
  const [spots, setSpots] = useState([])

  useEffect(() => {
    (async () => {
      const user_id = localStorage.getItem('user')

      const response =
        await api.get('/dashboard', {
          headers: { user_id }
        })

      setSpots(response.data)
    })()
  }, [])

  return (
    <>
      <ul className="spot-list">
        {spots.map(spot => (
          <li key={spot._id}>
            <header style={{backgroundImage: `url('${spot.thumbnail_url}')`}} />
            <strong>{spot.company}</strong>
            <span>{
              spot.price
                ? `$${spot.price}/day`
                : `FREE`
            }</span>
          </li>
        ))}
      </ul>

      <Link to="/new">
        <button className="btn">Add new spot</button>
      </Link>
    </>
  )
}
