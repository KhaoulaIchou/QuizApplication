export default function Header() {
    return (
      <header className="flex justify-between items-center px-6 py-4">
        <h1 className="text-3xl font-bold">
          Quiz<span className="text-purple-600">App</span>
        </h1>
        <nav>
          <a href="/login" className="text-purple-600 font-semibold hover:underline">
            Login
          </a>
        </nav>
      </header>
    );
  }
  