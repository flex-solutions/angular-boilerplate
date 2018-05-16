export function getBase64(file) {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onload = () =>
      resolve(readerEvt => {
        const binaryString = readerEvt.target.result;
        return btoa(binaryString);
      });

    reader.readAsBinaryString(file);

    reader.onerror = error => reject(error);
  });
}
