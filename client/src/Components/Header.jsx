import {FaGoogleDrive} from 'react-icons/fa'
import { Link } from 'react-router-dom'
export const Header = () => {
  return (
    <div className='border-b-1 border-black p-4 pr-20'>
      <div className='flex items-center gap-2 text-3xl justify-between'>
        <div className='flex items-center'>
        <FaGoogleDrive />
        <Link>Drive Clone</Link>
        </div>
        <Link to={'/'} className='text-xl'>My Drive</Link>
      </div>
    </div>
  )
}
