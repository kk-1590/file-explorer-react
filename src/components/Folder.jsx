import { useState } from "react";
import '../styles.css';

const Folder = ({ explorer }) => {
  console.log(explorer);

  const [expand,setExpand] = useState(false);

  if(explorer.isFolder){
    return (
      <div style={{ marginTop: "10px" }}>
        <div className="folder" onClick={() => setExpand(!expand)} >
          <span>📂{explorer.name}</span>
        </div>
        <div style={{display: expand ? "block" : "none",paddingLeft:"20px"}}>
          {explorer.items.map((exp) => {
            return <Folder key={exp.id} explorer={exp} />
          })}
        </div>
      </div>
    );
  }
  else{
    return <div className="file">📄{explorer.name}</div>
  }
};

export default Folder;
