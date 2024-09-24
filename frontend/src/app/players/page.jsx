"use client"

import PagePlayers from '@/components/players/pagePlayer'
import React from 'react'
import withAuth from '@/hoc/withAuth'

const Players = () => {

  return (
   <PagePlayers/>
  
  )
}

export default withAuth(Players)