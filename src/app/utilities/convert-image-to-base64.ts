// This is API to get Base64String from local file
export function getBase64(localFilePath: string) {
  return new Promise((resolve, reject) => {
    const xhr = new XMLHttpRequest();
    xhr.open('GET', localFilePath, true);
    xhr.responseType = 'blob';
    xhr.onload = function(e) {
      // console.log(this.response);
      const reader = new FileReader();
      reader.onload = function(event) {
        const binaryString = event.target.result;
        // console.log(binaryString);
        resolve(binaryString);
      };
      const file = this.response;
      reader.readAsDataURL(file);

      reader.onerror = error => reject(error);
    };
    xhr.send();
  });
}
