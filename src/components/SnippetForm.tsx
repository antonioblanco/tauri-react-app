import { writeTextFile } from "@tauri-apps/api/fs";
import { desktopDir, join } from "@tauri-apps/api/path";
import { useEffect, useState } from "react";
import { useSnippetStore } from "../store/snippetsStore";
import { toastError, toastSucces } from "../toast/toast";
import { loadFiles } from "../services/snippets.service";

function SnippetForm() {
  const [snippetName, setSnippetName] = useState<string>("");
  const { addSnippetName, allSnipets } = useSnippetStore((state) => state);

  useEffect(() => {
    loadFiles();
  }, [snippetName]);

  const onSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!snippetName || snippetName === "") {
      toastError("Please write a snippet name");
      return;
    }

    // file already exists
    const alreadyExist = allSnipets.every(
      (snippet) => snippet.name === snippetName
    );
    console.log(allSnipets, alreadyExist);
    if (snippetName && alreadyExist) {
      toastError("Snippet already exists");
      return;
    }

    const desktopPath = await desktopDir();
    const filePath = await join(desktopPath, "taurifiles", `${snippetName}`);
    writeTextFile(filePath, "");
    const newSnippet = {
      name: snippetName,
      path: filePath,
    };
    addSnippetName(newSnippet);
    setSnippetName("");
    toastSucces("Snippet saved");
  };
  return (
    <form onSubmit={onSubmit}>
      <input
        type="text"
        placeholder="Write a Snippet"
        onChange={(e) => setSnippetName(e.target.value)}
        className="bg-zinc-900 w-full border-none outline-none p-4"
        autoFocus
        value={snippetName}
      />
    </form>
  );
}

export default SnippetForm;
