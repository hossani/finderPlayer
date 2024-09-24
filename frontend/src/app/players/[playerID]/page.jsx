'use client'
import ProfilePlayer from '@/components/players/profilePlayer'
import React from 'react'
import withAuth from '@/hoc/withAuth'

const PlayersDetails = ({params}) => {
console.log(params)
  return (
    <ProfilePlayer playerID={params.playerID}/>
  )
}

export default withAuth(PlayersDetails)