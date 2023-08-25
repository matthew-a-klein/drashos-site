export const fileToBase64 = (file: File) => {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);

    reader.onload = () => {
      const base64 = reader.result;
      resolve(base64);
    };

    reader.onerror = (error) => {
      reject(error);
    };
  });
};
