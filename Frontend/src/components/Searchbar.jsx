import { useState } from "react";

export default function Searchbar({ onSearch }) {
  const [q, setQ] = useState("");

  function submit(e) {
    e.preventDefault();
    onSearch(q.trim());
  }

  return (
    <form
      onSubmit={submit}
      className="flex items-center gap-2 w-full max-w-md"
    >
      <input
        type="text"
        placeholder="Search..."
        value={q}
        onChange={e => setQ(e.target.value)}
        className="flex-1 border rounded px-4 py-3 text-sm"
      />

      <button
        type="submit"
        className="bg-blue-600 text-white px-6 py-3 rounded text-sm cursor-pointer"
      >
        Search
      </button>
    </form>
  );
}
