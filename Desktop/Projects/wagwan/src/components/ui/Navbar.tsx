import Link from 'next/link'
import DesktopNavbar from './DesktopNavbar'
import MobileNavbar from './MobileNavbar'
import { currentUser } from '@clerk/nextjs/server'
import { syncUser } from '@/actions/user.action';

async function Navbar() {
    const user = await currentUser();
    if(user) await syncUser();




  return (
    <nav className="sticky top-0 w-full border-b border-custom-purple-200 dark:border-custom-purple-900 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60 z-50">
      <div className="max-w-7xl mx-auto px-4">
        <div className="flex items-center justify-between h-16">
          <div className="flex items-center">
            <Link 
              href="/" 
              className="text-xl font-bold text-custom-purple-600 dark:text-custom-purple-400 font-mono tracking-wider transition-colors hover:text-custom-purple-700 dark:hover:text-custom-purple-300"
            >
              Wagwan
            </Link>
          </div>
          <DesktopNavbar />
          <MobileNavbar />
        </div>
      </div>
    </nav>
  )
}

export default Navbar