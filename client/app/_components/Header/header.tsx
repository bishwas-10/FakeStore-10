import { ModeToggle } from "@/components/ui/toggle-mode";
import { MainNav } from "../Dashboard/components/main-nav";
import TeamSwitcher from "../Dashboard/components/team-switcher";
import { Search } from "../Dashboard/components/search";
import { UserNav } from "../Dashboard/components/user-nav";


const Header = () => {
  
  return (
    <div className="border-b">
    <div className="flex h-16 items-center px-4 shadow-lg dark:bg-black dark:text-white">
      <TeamSwitcher />
      <MainNav className="mx-6" />
      <div className="ml-auto flex items-center space-x-4">
      <ModeToggle/>
        <Search />
        <UserNav />
      </div>
    </div>
  </div>
  );
};

export default Header;
