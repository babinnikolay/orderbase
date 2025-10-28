import React from "react";

function DeleteForm({ onConfirm, onCloseModal, children }) {
  return (
    <div className="p-4  w-[40rem] flex flex-col gap-4">
      <div className="flex flex-col gap-1">
        <p>Are you sure you want to delete this {children} permanently?</p>
        <p>This action cannot be undone.</p>
      </div>
      <div className="flex content-center justify-center gap-4">
        <button
          onClick={onConfirm}
          className="p-1 px-2 rounded-md border border-bl border-primary-500 hover:bg-accent-800 hover:text-accent-400 "
        >
          Delete
        </button>
        <button
          className="p-1 px-2 rounded-md border border-primary-500 hover:bg-primary-700 "
          onClick={onCloseModal}
        >
          Cancel
        </button>
      </div>
    </div>
  );
}

export default DeleteForm;
