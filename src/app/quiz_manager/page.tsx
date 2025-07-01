"use client";

import { useState } from "react";

function QuizManager({ setPage }: { setPage: (page: string) => void }) {
  return <div>hi</div>;
}

function QuizEditor({ setPage }: { setPage: (page: string) => void }) {
  return (
    <div>
      <h3>Quiz Editor</h3>
      <div className="w-full my-2 border-2 h-px"></div>
      <p>Quiz Editor content goes here.</p>
    </div>
  );
}

export default function QuizManagerPage() {
  const [page, setPage] = useState("quiz_manager");

  function handlePageChange(newPage: string) {
    setPage(newPage);
  }

  return (
    <div>
      <h3>Quiz Manager</h3>
      <div className="flex justify-start items-center">
        <button onClick={() => setPage("quiz_manager")} className="underline">Manager</button><button onClick={() => setPage("quiz_editor")} className="underline">Editor</button>
      </div>

      <div className="w-full my-2 border-2 h-px"></div>

      {page === "quiz_manager" ? (
        <QuizManager setPage={handlePageChange} />
      ) : page === "quiz_editor" ? (
        <QuizEditor setPage={handlePageChange} />
      ) : (
        <p>Page not found</p>
      )}
    </div>
  );
}
