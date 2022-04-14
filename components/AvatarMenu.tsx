import { useContext, useState } from 'react'
import SidebarContext from 'context/SidebarContext'
import {
  SearchIcon,
  MoonIcon,
  SunIcon,
  BellIcon,
  MenuIcon,
  OutlinePersonIcon,
  OutlineCogIcon,
  OutlineLogoutIcon,
} from 'icons'
import { Badge, Input, Dropdown, DropdownItem, WindmillContext } from '@roketid/windmill-react-ui'
import { supabase } from 'lib/supabase'
import Avatar from 'react-avatar';
import { useRouter } from 'next/router'

const AvatarMenu: React.FC<any> = ({ handleProfileClick, isProfileMenuOpen, setIsProfileMenuOpen }: {
  handleProfileClick: any, isProfileMenuOpen: any, setIsProfileMenuOpen: any
}) => {

  const user = supabase.auth.user()
  return (
    <>
      <button
        className="rounded-full focus:shadow-outline-blue focus:outline-none"
        onClick={handleProfileClick}
        aria-label="Account"
        aria-haspopup="true"
      >
        <div className='relative rounded-full overflow-hidden w-8 h-8'>
          <Avatar
            className="align-middle"
            name={user?.user_metadata.fullname}
            size="32"
          />
        </div>
      </button>
      <Dropdown
        align="right"
        isOpen={isProfileMenuOpen}
        onClose={() => setIsProfileMenuOpen(false)}
      >
        <DropdownItem tag="a" href="#">
          <OutlinePersonIcon className="w-4 h-4 mr-3" aria-hidden="true" />
          <span>Profile</span>
        </DropdownItem>
        <DropdownItem tag="a" href="#">
          <OutlineCogIcon className="w-4 h-4 mr-3" aria-hidden="true" />
          <span>Settings</span>
        </DropdownItem>
        <DropdownItem onClick={async () => {
          await supabase.auth.signOut()
        }}>
          <OutlineLogoutIcon className="w-4 h-4 mr-3" aria-hidden="true" />
          <span>Log out</span>
        </DropdownItem>
      </Dropdown>
    </>
  )
}

export default AvatarMenu