import React, { useState, useEffect } from 'react';

function App() {
  const [fileContent, setFileContent] = useState("");
  const [fileHandle, setFileHandle] = useState(null);

  const readFile = async (handle) => {
    const file = await handle.getFile();
    const content = await file.text();
    return content;
  };

  const handleFileAccess = async () => {
    if (window.showOpenFilePicker) {
      const [selectedFileHandle] = await window.showOpenFilePicker();
      setFileHandle(selectedFileHandle);
      const initialContent = await readFile(selectedFileHandle);
      setFileContent(initialContent);
    }
  };

  useEffect(() => {
    let intervalId;

    if (fileHandle) {
      intervalId = setInterval(async () => {
        const updatedContent = await readFile(fileHandle);
        setFileContent(updatedContent);
      }, 5000); // 5秒ごとに確認
    }

    return () => {
      if (intervalId) {
        clearInterval(intervalId);
      }
    };
  }, [fileHandle]);

  return (
    <div>
      <button onClick={handleFileAccess}>ファイルを選択</button>
      <pre>{fileContent}</pre>
    </div>
  );
}

export default App;
