import Sidebar from './sidebar';
import UserMenu from './user-menu';
export default function Header() {
  return (
    <header className="sticky top-0 z-50 h-28 w-full shadow-sm bg-gray-50">
      <div className="flex h-full items-center justify-between border-b bg-background px-24 py-2">
        <Sidebar />
        <div className="ml-14 flex flex-1 justify-center">
          <div className="flex h-16 w-40 items-center justify-center rounded bg-muted">
            <span className="text-muted-foreground">Logo</span>
          </div>
        </div>

        <UserMenu />
      </div>
    </header>
  );
}
