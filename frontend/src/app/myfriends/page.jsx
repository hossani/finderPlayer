"use client"

import PageOfFriends from '@/components/friends/pageListOfFriends'
import React from 'react'
import withAuth from '@/hoc/withAuth'

const Friends = () => {

  return (
    <PageOfFriends/>
  )
}

export default withAuth(Friends);