// This is API to get Base64String from local file
function readBase64(file) {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onload = function (event: FileReaderProgressEvent) {
      const binaryString = event.target.result;
      resolve(binaryString);
    };
    reader.readAsDataURL(file);

    reader.onerror = error => reject(error);
  });

}

function getBase64(localFilePath: string) {
  return new Promise((resolve, reject) => {
    const xhr = new XMLHttpRequest();
    xhr.open('GET', localFilePath, true);
    xhr.responseType = 'blob';
    xhr.onload = function (this: XMLHttpRequest, e: Event) {
      readBase64(this.response)
        .then(r => resolve(r))
        .catch(error => reject(error));
    };
    xhr.send();
  });
}

interface FileReaderProgressEvent extends ProgressEvent {
  readonly target: FileReader | null;
}

export { readBase64, getBase64 };
