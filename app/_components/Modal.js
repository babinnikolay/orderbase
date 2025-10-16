"use client";

import { cloneElement, createContext, useContext, useState } from "react";
import { createPortal } from "react-dom";
import { useOutsideClick } from "@/app/hooks/useOutsideClick";

const ModalContext = createContext();

function Modal({ children }) {
  const [openName, setOpenName] = useState("");
  const onClose = () => {
    setOpenName("");
  };
  const open = setOpenName;

  return (
    <ModalContext.Provider value={{ onClose, openName, open }}>
      {children}
    </ModalContext.Provider>
  );
}

function Open({ children, opens: opensWindowName }) {
  const { open } = useContext(ModalContext);
  return cloneElement(children, { onClick: () => open(opensWindowName) });
}

function Close({ children }) {
  cloneElement(children, { onClick: () => open("") });
}

function Window({ children, name }) {
  const { onClose, openName } = useContext(ModalContext);

  const modalRef = useOutsideClick(onClose);

  if (name !== openName) return null;

  return createPortal(
    <Overlay>
      <StyledModal ref={modalRef}>
        <Button onClick={() => onClose()}>&times;</Button>
        <div>{cloneElement(children, { onCloseModal: onClose })}</div>
      </StyledModal>
    </Overlay>,
    document.body,
  );
}

function Overlay({ children }) {
  return (
    <div className="fixed top-0 left-0 w-full h-full z-[1000] bg-blue-200 bg-opacity-50 backdrop-blur-sm">
      {children}
    </div>
  );
}

function StyledModal({ children, ref }) {
  return (
    <div
      ref={ref}
      className="fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 bg-primary-600 shadow-lg p-[1.2rem_1rem] transition-all rounded-xl"
    >
      {children}
    </div>
  );
}

function Button({ children, onClick }) {
  return (
    <button
      onClick={onClick}
      className="bg-none border-none p-[0.4rem] transition-all absolute top-[1.2rem] right-[1.2rem]  hover:text-amber-950"
    >
      {children}
    </button>
  );
}

Modal.Open = Open;
Modal.Window = Window;
Modal.Close = Close;

export default Modal;
