import { readTextFile, removeFile } from "@tauri-apps/api/fs";
import { desktopDir, join } from "@tauri-apps/api/path";
import { FiTrash, FiX } from "react-icons/fi";
import { twMerge } from "tailwind-merge";
import { useSnippetStore } from "../store/snippetsStore";
import { toastSucces } from "../toast/toast";

type SnippetItemProps = {
  file: string;
};

function SnippetItem({ file }: SnippetItemProps) {
  const { removeSnippetName, setSelectedSnippet, selectedSnippet } =
    useSnippetStore((state) => state);
  console.log(selectedSnippet);

  const handleDelete = async (file: string) => {
    const accept = await window.confirm(
      "Are you sure you want to delete this snippet?"
    );
    if (!accept) return;
    const desktopPath = await desktopDir();
    const filePath = await join(desktopPath, "taurifiles", `${file}`);
    await removeFile(filePath);
    removeSnippetName(file);
    toastSucces("Snippet deleted");
  };

  const handleSelect = async (file: string) => {
    setSelectedSnippet(null);
    const desktopPath = await desktopDir();
    const filePath = await join(desktopPath, "taurifiles", `${file}`);
    const snippet = await readTextFile(filePath);
    setSelectedSnippet({
      name: file,
      code: snippet,
      path: filePath,
    });
  };
  return (
    <li
      className={twMerge(
        "task py-2 px-4 hover:bg-neutral-900 hover:cursor-pointer flex justify-between",
        selectedSnippet?.name === file ? "bg-sky-500" : ""
      )}
      onClick={(e) => {
        e.stopPropagation();
        handleSelect(file);
      }}
    >
      {file}

      {selectedSnippet?.name === file && (
        <div className={"flex gap-2 items-center justify-center"}>
          <FiTrash
            className="text-neutral-500"
            onClick={(e) => {
              e.stopPropagation();
              handleDelete(file);
            }}
          />
          <FiX
            className="text-neutral-500 text-xl"
            onClick={(e) => {
              e.stopPropagation();
              setSelectedSnippet(null);
            }}
          />
        </div>
      )}
    </li>
  );
}

export default SnippetItem;
