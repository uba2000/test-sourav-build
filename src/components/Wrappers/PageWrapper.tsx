import React from 'react'

interface IPageWrapper {
  children: React.ReactNode;
  maxWidth?: number;
}

function PageWrapper({ children, maxWidth = 1200 }: IPageWrapper) {
  return (
    <div className="flex-1 flex mx-auto flex-col w-full" style={{ maxWidth: `${maxWidth}px` }}>
      {children}
    </div>
  )
}

export default PageWrapper