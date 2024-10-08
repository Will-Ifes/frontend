import Sidebar from "./sidebar";
import UserMenu from "./user-menu";
export default function Header() {
  return (
    <header className="sticky  top-0 z-50 shadow-sm h-28 w-full">
      <div className="flex items-center justify-between px-24 h-full py-2 bg-background border-b">
        <Sidebar />
        <div className="flex ml-14 flex-1 justify-center">
          <div className="w-40 h-16 bg-muted flex items-center justify-center rounded">
            <span className="text-muted-foreground">Logo</span>
          </div>
        </div>

        <UserMenu />
      </div>
    </header>
  );
}
