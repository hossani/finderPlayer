"use client"
import Profile from '@/components/profile/myprofile'
import React from 'react'
import withAuth from '@/hoc/withAuth'

const ProfilePage = () => {

  return (
<>
<Profile/>
</>
  )
}

export default withAuth(ProfilePage)