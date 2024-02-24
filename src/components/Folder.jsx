import { useState } from "react";
import '../styles.css';

const Folder = ({ handleInsertNode, handleDeleteNode, explorer }) => {
  console.log(explorer);

  const [expand,setExpand] = useState(false);
  const [showInput,setShowInput] = useState({
    visible : false,
    isFolder : null
  })

  const handleNewFolder = (e,isFolder) => {
    e.stopPropagation();

    setExpand(true);
    setShowInput({
        visible : true,
        isFolder
    })
  }

  function handleDeleteFolder(e,isFolder)  {
    e.stopPropagation();

    handleDeleteNode(explorer.id);
  }

  const addNewFolder = (e) => {
    console.log(e);
    if(e.keyCode === 13 && e.target.value){
        //add logic
        handleInsertNode(explorer.id,e.target.value,showInput.isFolder);
        setShowInput({...showInput,visible:false});
    }

  }

  if(explorer.isFolder){
    return (
      <div style={{ marginTop: "10px" }}>
        <div className="folder" onClick={() => setExpand(!expand)}>
          <span>
            <i
              className="fa-solid fa-folder-closed"
              style={{ color: "#FFD43B" }}
            ></i>
            &nbsp;&nbsp;{explorer.name}
          </span>

          <div>
            <button
              onClick={(e) => handleNewFolder(e, true)}
              style={{ background: "none", border: "none" }}
            >
              <i className="fa-solid fa-folder-plus fa-lg"></i>
            </button>
            <button
              onClick={(e) => handleNewFolder(e, false)}
              style={{ background: "none", border: "none" }}
            >
              <i className="fa-solid fa-file-circle-plus"></i>
            </button>
            <button onClick={(e) => handleDeleteFolder(e, false)}
            style={{background:"none", border: "none"}}>
              <i className="fa-solid fa-trash-can"></i>
            </button>
          </div>
        </div>

        <div
          style={{ display: expand ? "block" : "none", paddingLeft: "20px" }}
        >
          {showInput.visible && (
            <div
              className="inputContainer"
              style={{ width: "250px", paddingLeft: "10px" }}
            >
              <span>{showInput.isFolder ? "📂" : "📄"}</span>
              <input
                type="text"
                className="inputContainer__input"
                onKeyDown={(e) => addNewFolder(e)}
                onBlur={() => setShowInput({ ...showInput, visible: false })}
                autoFocus
              />
            </div>
          )}
          {explorer.items.map((exp) => {
            return (
              <Folder
                handleInsertNode={handleInsertNode}
                handleDeleteNode={handleDeleteNode}
                key={exp.id}
                explorer={exp}
              />
            );
          })}
        </div>
      </div>
    );
  }
  else{
    return (
      <div className="file">
        <i className="fa-file fa-regular"></i>&nbsp;&nbsp;{explorer.name}
        <button
          className="deleteBtn"
          onClick={(e) => handleDeleteFolder(e, false)}
        >
          <i className="fa-solid fa-trash-can"></i>
        </button>
      </div>
    );
  }
};

export default Folder;
