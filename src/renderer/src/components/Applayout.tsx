import { ComponentProps, forwardRef } from 'react'
import { twMerge } from 'tailwind-merge'

export const RootLayout = ({ className, children, ...props }: ComponentProps<'main'>) => {
  return (
    <main {...props} className={twMerge('flex flex-row h-screen ')}>
      {children}
    </main>
  )
}

export const Sidebar = ({ className, children, ...props }: ComponentProps<'aside'>) => {
  return (
    <aside
      className={twMerge('w-[250px]  h-[100vh+10px] overflow-auto', className)}
      {...props}
    >
      {children}
    </aside>
  )
}

export const Content = forwardRef<HTMLDivElement, ComponentProps<'div'>>(
  ({ children, className, ...props }, ref) => (
    <div ref={ref} className={twMerge('flex-1 h-full  overflow-auto', className)} {...props}>
      {children}
    </div>
  )
)

Content.displayName = 'Content'
