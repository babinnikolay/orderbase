"use client";

import { useFormStatus } from "react-dom";
import React from "react";
import { Save } from "lucide-react";

function SaveButton({ pendingLabel, children }) {
  const { pending } = useFormStatus();

  return (
    <button
      className="p-1 rounded-md border border-primary-600 hover:bg-green-900 bg-primary-800"
      disabled={pending}
      type="submit"
    >
      <div className="flex items-center justify-center gap-2 p-1">
        <Save /> {pending ? pendingLabel : children}
      </div>
    </button>
  );
}

export default SaveButton;
