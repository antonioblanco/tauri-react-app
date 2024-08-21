import { desktopDir } from "@tauri-apps/api/path";
import { readDir } from "@tauri-apps/api/fs";
import { Snippet } from "../store/snippetsStore";

  

export const loadFiles = async ()=> {
  const desktopPath = await desktopDir();
  const result = await readDir(`${desktopPath}/taurifiles`);
  return result as Snippet[]
}
