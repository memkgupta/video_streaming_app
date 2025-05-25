import React, { ReactNode } from 'react'
import Providers from '../providers'

const PagesLayout = ({children}:{children:ReactNode}) => {
  return (
    <Providers>
        {children}
    </Providers>
  )
}

export default PagesLayout