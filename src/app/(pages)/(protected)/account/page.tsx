"use client"
import AccountSettings from '@/components/features/account/AccountSettings'
import { useAuth } from '@/context/AuthContext'
import React from 'react'

const Account = () => {
  const {user} = useAuth()
  return (
    <div>
     {user && <AccountSettings user={user} onUpdate={(d)=>{
      console.log(d)
     }}/>}
    </div>
  )
}

export default Account