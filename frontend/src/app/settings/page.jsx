"use client"
import DetailsSettings from '@/components/settings/detailsSettings';
import React from 'react'
import withAuth from '@/hoc/withAuth'

const PageSettings = () => {

  return (
    <DetailsSettings/>
  )
}

export default withAuth(PageSettings);