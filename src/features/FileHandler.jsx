import React from "react";
import { useState } from "react";



export default function FileUploader() {
    const [getFile,setGetFile] = useState();
  return (<><input
  type="file"
  ref={getFile}
  accept=".mp3"
  onChange={setGetFile}
      /> 
      </>
);}
