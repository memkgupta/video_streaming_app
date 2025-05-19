"use client"
import AccountSettings from '@/components/features/account/AccountSettings'
import { UPDATE_USER_ENDPOINT } from '@/constants'
import { useAuth } from '@/context/AuthContext'
import api from '@/services/api'
import { APIResponse, User } from '@/types'
import React from 'react'

const Account = () => {
  const {user,update} = useAuth()
  return (
    <div>
     {user && <AccountSettings user={user} onUpdate={async(d)=>{
      console.log(d);
      const updatedData = {...user,...d}
      const updateRequest = await api.patch<APIResponse<User>>(
        UPDATE_USER_ENDPOINT(user.id),
        updatedData
      )
      if(updateRequest.data.success)
      {
      update(updatedData)

      }
     }}/>}
    </div>
  )
}

export default Account