import React from "react";
import { Dropdown, DropdownItem } from "@roketid/windmill-react-ui";
import { OutlineLogoutIcon } from "icons";
import { supabase } from "lib/supabase";
import Avatar from "react-avatar";

const Ava = () => {
  const user = supabase.auth.user();
  const MAvatar = Avatar as React.FC<any>;
  return (
    <MAvatar
      className="align-middle"
      name={user?.email?.split("@")[0]}
      size="32"
    />
  );
};

const AvatarMenu: React.FC<any> = ({
  handleProfileClick,
  isProfileMenuOpen,
  setIsProfileMenuOpen,
}: {
  handleProfileClick: any;
  isProfileMenuOpen: any;
  setIsProfileMenuOpen: any;
}) => {
  return (
    <li className="relative h-8">
      <button
        className="rounded-full focus:shadow-outline-blue focus:outline-none"
        onClick={handleProfileClick}
        aria-label="Account"
        aria-haspopup="true"
      >
        <div className="relative rounded-full overflow-hidden w-8 h-8">
          <Ava />
        </div>
      </button>
      <Dropdown
        align="right"
        isOpen={isProfileMenuOpen}
        onClose={() => setIsProfileMenuOpen(false)}
      >
        {/* <DropdownItem tag="a" href="#">
          <OutlinePersonIcon className="w-4 h-4 mr-3" aria-hidden="true" />
          <span>Profile</span>
        </DropdownItem>
        <DropdownItem tag="a" href="#">
          <OutlineCogIcon className="w-4 h-4 mr-3" aria-hidden="true" />
          <span>Settings</span>
        </DropdownItem> */}
        <DropdownItem
          onClick={async () => {
            const user = supabase.auth.session();
            await supabase.auth.signOut();
            if (user?.access_token)
              await supabase.auth.api.signOut(user?.access_token);
          }}
        >
          <OutlineLogoutIcon className="w-4 h-4 mr-3" aria-hidden="true" />
          <span>Log out</span>
        </DropdownItem>
      </Dropdown>
    </li>
  );
};

export default AvatarMenu;
