'use client'
import FormRegister from '@/components/register/form'
import React from 'react'
import withAuth from '@/hoc/withAuthLogged'
const Register = () => {

  return (
    <>
    <FormRegister/>
    </>
  )
}

export default withAuth(Register)