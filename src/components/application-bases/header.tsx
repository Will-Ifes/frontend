import Sidebar from './sidebar';
import UserMenu from './user-menu';
export default function Header() {
  return (
    <header className="sticky top-0 z-50 h-28 w-full bg-gray-50 shadow-sm">
      <div className="flex h-full items-center justify-between border-b bg-background px-24 py-2">
        <Sidebar />
        <div className="ml-14 flex flex-1 justify-center">
          <div className="flex h-16 w-40 items-center justify-center rounded bg-muted">
            <Image src="/logo.svg" alt="Logo" width={40} height={40} />
          </div>
        </div>

        <UserMenu />
      </div>
    </header>
  );
}
