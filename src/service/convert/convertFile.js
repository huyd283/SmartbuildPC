export function downloadTxtFile(responseText) {
   
    const blob = new Blob([responseText], { type: 'text/plain' });
    const url = URL.createObjectURL(blob);
  
    const a = document.createElement('a');
    a.href = url;
    a.download = `Bill_${new Date().getTime()}.txt`;
    document.body.appendChild(a);
    a.click();
  
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  }