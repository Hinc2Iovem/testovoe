import { useEffect } from "react";

type useOutOfModalProps<T> = {
  showModal: T | null;
  setShowModal: React.Dispatch<React.SetStateAction<T | null>>;
  modalRef: React.MutableRefObject<HTMLDivElement | null>;
};

export default function useOutOfModal<T>({ setShowModal, showModal, modalRef }: useOutOfModalProps<T>) {
  useEffect(() => {
    const handleEscapeKey = (e: KeyboardEvent) => {
      if (showModal && e.key === "Escape") {
        setShowModal(null);
      }
    };
    const handleEscapeClick = (e: MouseEvent) => {
      if (modalRef.current && !modalRef.current.contains(e.target as Node) && showModal) {
        setShowModal(null);
      }
    };

    document.addEventListener("keydown", handleEscapeKey);
    document.addEventListener("click", handleEscapeClick);

    return () => {
      document.removeEventListener("keydown", handleEscapeKey);
      document.removeEventListener("click", handleEscapeClick);
    };
  }, [showModal, modalRef, setShowModal]);
}
