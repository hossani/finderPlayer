"use client"
import PageOfListMessage from '@/components/messages/pageOfListMessage'
import React from 'react'
import withAuth from '@/hoc/withAuth'

const Messages = () => {

  return (
    <PageOfListMessage/>
  )
}

export default withAuth(Messages);