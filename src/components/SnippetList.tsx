import { useEffect } from "react";
import { loadFiles } from "../services/snippets.service";
import { useSnippetStore } from "../store/snippetsStore";
import SnippetItem from "./SnippetItem";

function SnippetList() {
  const { setAllSnippets, allSnipets } = useSnippetStore((state) => state);
  const result = loadFiles();

  useEffect(() => {
    result.then((values) => {
      setAllSnippets(values);
    });
  }, []);

  return (
    <ul>
      {allSnipets.map((file) => (
        <SnippetItem key={file.path} file={file.name} />
      ))}
    </ul>
  );
}

export default SnippetList;
