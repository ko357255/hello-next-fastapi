'use client';

import { useState } from 'react';

export default function Counter() {
  const [count, setCount] = useState(0);

  return (
    <div className="bg-neutral-100 p-2">
      <span>{count}</span>
      <button
        onClick={() => setCount(count + 1)}
        className="bg-gray-300 text-black ml-2 px-2 rounded border border-gray-500"
      >
        Add
      </button>
    </div>
  );
}
