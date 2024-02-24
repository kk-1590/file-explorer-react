import { useState } from "react";
import '../styles.css';

const Folder = ({ handleInsertNode, handleDeleteNode, handleUpdateNode, explorer }) => {
  console.log(explorer);

  const [expand,setExpand] = useState(false);
  const [showInput,setShowInput] = useState({
    visible : false,
    isFolder : null
  })


  const [showUpdateField,setShowUpdateField] = useState({
    visible : false,
    isFolder : null
  });

  const handleNewFolder = (e,isFolder) => {
    e.stopPropagation();

    setExpand(true);
    setShowInput({
        visible : true,
        isFolder
    })
  }

  function handleDeleteFolder(e)  {
    e.stopPropagation();

    handleDeleteNode(explorer.id);
  }

  function handleUpdateFolder(newValue,isFolder){
    console.log(newValue);
    setShowUpdateField({
      isFolder,
      visible:true
    })
  }

  const addNewFolder = (e) => {
    console.log(e);
    if(e.keyCode === 13 && e.target.value){
        //add logic
        handleInsertNode(explorer.id,e.target.value,showInput.isFolder);
        setShowInput({...showInput,visible:false});
    }

  }

  const updateNode = (e) => {
    if(e.keyCode === 13 && e.target.value){
      handleUpdateNode(explorer.id,e.target.value);
      setShowUpdateField({...showUpdateField,visible:false});
    }
  }

  if(explorer.isFolder){
    return (
      <div style={{ marginTop: "10px" }}>
        {!showUpdateField.visible && (
          <div className="folder" onClick={() => setExpand(!expand)}>
            {expand ? (
              <span>
                <i className="fa-solid fa-angle-down"></i>
              </span>
            ) : (
              <span>
                <i className="fa-solid fa-angle-right"></i>
              </span>
            )}
            <span>
              {expand ? (
                <i className="fa-solid fa-folder-open" style={{color: '#FFD43B'}}></i>
              ) : (
                <i
                  className="fa-solid fa-folder-closed"
                  style={{ color: "#FFD43B" }}
                ></i>
              )}
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
              <button
                onClick={(e) => handleUpdateFolder(e, true)}
                style={{ background: "none", border: "none" }}
              >
                <i className="fa-solid fa-pen-to-square"></i>
              </button>
              <button
                onClick={(e) => handleDeleteFolder(e, false)}
                style={{ background: "none", border: "none" }}
              >
                <i className="fa-solid fa-trash-can"></i>
              </button>
            </div>
          </div>
        )}

        <div
          style={{
            display: showUpdateField ? "block" : "none",
            paddingLeft: "20px",
          }}
        >
          {showUpdateField.visible && (
            <div
              className="inputContainer"
              style={{ display: "flex", width: "200px" }}
            >
              <span style={{ marginRight: "1rem" }}>
                {showUpdateField.isFolder ? (
                  <i
                    className="fa-solid fa-folder-closed"
                    style={{ color: "#FFD43B" }}
                  ></i>
                ) : (
                  <i className="fa-file fa-regular"></i>
                )}
              </span>
              <input
                type="text"
                className="inputContainer__input"
                onKeyDown={(e) => updateNode(e)}
                onBlur={() =>
                  setShowUpdateField({ ...showUpdateField, visible: false })
                }
                autoFocus
              />
            </div>
          )}
        </div>

        <div
          style={{ display: expand ? "block" : "none", paddingLeft: "20px" }}
        >
          {showInput.visible && (
            <div
              className="inputContainer"
              style={{ width: "250px", paddingLeft: "10px" }}
            >
              <span style={{ marginRight: "1rem" }}>
                {showInput.isFolder ? (
                  <i
                    className="fa-solid fa-folder-closed"
                    style={{ color: "#FFD43B" }}
                  ></i>
                ) : (
                  <i className="fa-file fa-regular"></i>
                )}
              </span>
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
                key={exp.id}
                handleInsertNode={handleInsertNode}
                handleDeleteNode={handleDeleteNode}
                handleUpdateNode={handleUpdateNode}
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
        {!showUpdateField.visible && (
          <div>
            <i className="fa-file fa-regular"></i>&nbsp;&nbsp;{explorer.name}
          </div>
        )}
        <div
          style={{
            display: showUpdateField ? "block" : "none",
            paddingLeft: "20px",
          }}
        >
          {showUpdateField.visible && (
            <div className="inputContainer" style={{ width: "200px" }}>
              <span style={{marginRight:"1rem"}}>
                {showUpdateField.isFolder ? (
                  <i
                    className="fa-solid fa-folder-closed"
                    style={{ color: "#FFD43B" }}
                  ></i>
                ) : (
                  <i className="fa-file fa-regular"></i>
                )}
              </span>
              <input
                type="text"
                className="inputContainer__input"
                onKeyDown={(e) => updateNode(e)}
                onBlur={() =>
                  setShowUpdateField({ ...showUpdateField, visible: false })
                }
                autoFocus
              />
            </div>
          )}
        </div>

        <div style={{ display: "flex", justifyContent: "space-between" }}>
          <button
            onClick={() => handleUpdateFolder(explorer.name, false)}
            style={{ background: "none", border: "none" }}
          >
            <i className="fa-solid fa-pen-to-square"></i>
          </button>
          <button
            className="deleteBtn"
            onClick={(e) => handleDeleteFolder(e, false)}
          >
            <i className="fa-solid fa-trash-can"></i>
          </button>
        </div>
      </div>
    );
  }
};

export default Folder;
