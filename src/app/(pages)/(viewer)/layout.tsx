import ClientLayout from '@/components/layout/ClientLayout'
import React from 'react'

const ViewerLayout = ({children}:{children:React.ReactNode}) => {
  return (
    <ClientLayout>
{children}
    </ClientLayout>
  )
}

export default ViewerLayout