import { FaTrash } from "react-icons/fa";
import { LuBookmarkPlus } from "react-icons/lu";

import "./ListActionButton.css";

interface ListActionButtonProps {
  isInList: boolean;
  onClick: () => void;
}

export default function ListActionButton({
  isInList,
  onClick,
}: ListActionButtonProps) {
  return (
    <button className="button-add-list" onClick={onClick}>
      {isInList ? (
        <>
          <FaTrash size={18} />
          Remover da lista
        </>
      ) : (
        <>
          <LuBookmarkPlus size={23} />
          Adicionar a lista
        </>
      )}
    </button>
  );
}
