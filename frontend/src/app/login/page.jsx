'use client'
import FormLogin from '@/components/login/formLogin'
import React from 'react'
import withAuth from '@/hoc/withAuthLogged'

const Login = () => {

  return (
    <FormLogin/>
  )
}

export default withAuth(Login);