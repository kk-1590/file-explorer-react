import { useState } from "react";
import explorer from "./data/folderData";
import Folder from "./components/Folder";
import useTraverseTree from "./hooks/use-traverse-tree";

function App() {
  const [explorerData, setExplorerData] = useState(explorer);

  const { insertNode,deleteNode } = useTraverseTree();

  const handleInsertNode = (folderId, item, isFolder) => {
    const finalTree = insertNode(explorerData, folderId, item, isFolder);

    setExplorerData(finalTree);
  };

  const handleDeleteNode = (nodeId) => {
    const tempTree = deleteNode(explorerData,-1, nodeId);
    setExplorerData(tempTree);
  };

  return (
    <div className="App">
      <Folder
        handleInsertNode={handleInsertNode}
        handleDeleteNode={handleDeleteNode}
        explorer={explorerData}
      />
    </div>
  );
}

export default App;
