import clsx from 'clsx';
import React from 'react'

interface IPageWrapper {
  children: React.ReactNode;
  maxWidth?: string | number;
  className?: string;
}

function PageWrapper({ children, maxWidth = 1200, className }: IPageWrapper) {
  return (
    <div className={clsx("flex-1 flex mx-auto flex-col w-full", className)} style={{ maxWidth: typeof maxWidth === 'number' ? `${maxWidth}px` : maxWidth }}>
      {children}
    </div>
  )
}

export default PageWrapper