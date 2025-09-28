"use client";

import { useEffect } from "react";
import { PydleData } from "./pydle_data"
import { usePython } from 'react-py'
import { Play } from "lucide-react";

export default function PyPlayground({id}: {id: string}) {
  const code = PydleData[id];

  if (!code) {
    return <p>ID {id} not available.</p>
  }

  if (!('randomUUID' in crypto)) {
    (crypto as any).randomUUID = function () {
      return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, c => {
        const r = crypto.getRandomValues(new Uint8Array(1))[0] & 15;
        const v = c === 'x' ? r : (r & 0x3) | 0x8;
        return v.toString(16);
      });
    };
}

  const { runPython, stdout } = usePython();

  return <div>
    
    <button onClick={() => runPython(code)} className="flex flex-row gap-1">
      <Play />Run
    </button>

    {stdout}

  </div>
}