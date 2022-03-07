import React from 'react'
import { Route, Routes as RouterRoutes } from 'react-router-dom'
import { Event, Home } from 'pages'

export const Routes = () => (
  <RouterRoutes>
    <Route path='/' element={<Home />} />
    <Route path='/event/:id' element={<Event />} />
  </RouterRoutes>
)
