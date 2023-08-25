import React, { useEffect, useState } from "react";
import Modal from "react-modal";
import { useRef } from "react";

interface PopupModalProps {
  isOpen: boolean;
  onClose: () => void;
  children: React.ReactNode;
}
const PopupModal = ({ isOpen, onClose, children }: PopupModalProps) => {
  const [contentHeight, setContentHeight] = useState(0);
  const contentRef = useRef<HTMLDivElement>(null);
  const [isOpenState, setIsOpenState] = useState<boolean>(isOpen);
  const handleClose = () => {
    setIsOpenState(false);
    onClose();
  };
  useEffect(() => {
    if (contentRef.current) {
      setContentHeight(contentRef.current.clientHeight);
    }
  }, [children]);
  return (
    <Modal
      ariaHideApp={false}
      className={` mx-auto my-10 max-w-lg border-2 border-blue-500 text-center bg-white rounded-md     h-${contentHeight} p-8`}
      isOpen={isOpen}
      onRequestClose={onClose}
      contentLabel="Popup Modal"
    >
      <div ref={contentRef} id="modal-root">
        {children}
        <button
          className="mt-6 border-2 py-2 px-4 rounded-md shadow-2xl border-blue-100"
          onClick={handleClose}
        >
          Close
        </button>
      </div>
    </Modal>
  );
};

export default PopupModal;
