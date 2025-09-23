import 'sonner/dist/styles.css';
import '../globals.css'

// Shadcn Sonner to display notification
import { Toaster } from "@/components/ui/sonner"

export default function AuthLayout({ children }) {
   return (
      <html lang="en" className='m-0 w-full h-full '>

         <body className='m-0 w-full h-full flex flex-row justify-center items-center'>
            <main className='w-full h-full flex justify-center items-center'>
               {children}
            </main>
            <Toaster position="top-center" />
         </body>
      </html>
   )
}