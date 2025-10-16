"use client";

import { useFormStatus } from "react-dom";
import React from "react";

function SubmitButton({ pendingLabel, children }) {
  const { pending } = useFormStatus();

  return (
    <button
      className="p-1 px-3 rounded-md border border-primary-600 bg-accent-600 hover:bg-accent-800"
      disabled={pending}
    >
      {pending ? pendingLabel : children}
    </button>
  );
}

export default SubmitButton;
