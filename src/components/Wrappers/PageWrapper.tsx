import clsx from 'clsx';
import React from 'react'

interface IPageWrapper {
  children: React.ReactNode;
  maxWidth?: number;
  className?: string;
}

function PageWrapper({ children, maxWidth = 1200, className }: IPageWrapper) {
  return (
    <div className={clsx("flex-1 flex mx-auto flex-col w-full", className)} style={{ maxWidth: `${maxWidth}px` }}>
      {children}
    </div>
  )
}

export default PageWrapper