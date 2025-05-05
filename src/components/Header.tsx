import { Link } from "react-router-dom";

export function Header() {
  return (
    <header className="flex items-center justify-around w-full h-8 bg-gray-600">
      <Link to="/" className="text-gray-300 font-bold">
        History
      </Link>
      <Link to="/saved" className="text-gray-300 font-bold">
        Saved
      </Link>
    </header>
  );
}
