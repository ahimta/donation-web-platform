import Promise from 'es6-promise';

const IMGUR_AUTH_HEADER = 'Client-ID c2377d212098943';
const IMGUR_IMG_FORM_KEY = 'image';
const IMGUR_UPLOAD_URL = '	https://api.imgur.com/3/image';

export function upload(file?: File): Promise<{ id: string, url: string }> {
  return new Promise((resolve, reject) => {
    if (file && file.type.match('image/*')) {
      const fd = new FormData();
      const xhr = new XMLHttpRequest();

      xhr.open('POST', IMGUR_UPLOAD_URL, true);
      xhr.setRequestHeader('Authorization', IMGUR_AUTH_HEADER);

      xhr.onreadystatechange = () => {
        if (xhr.readyState === 4 && xhr.status === 200) {
          const jsonResponse = JSON.parse(xhr.responseText);

          if (jsonResponse.success && jsonResponse.status === 200) {
            const {id, link}: { id: string, link: string } = jsonResponse.data;
            const url = link.replace('http:', 'https:');
            resolve({ id, url });
          } else {
            reject(jsonResponse);
          }
        }
      };
      xhr.onerror = () => {
        reject(xhr.response);
      };

      fd.append(IMGUR_IMG_FORM_KEY, file);
      xhr.send(fd);
    } else {
      console.log('Missing file or invalid file type');
      resolve({ id: '', url: '' });
    }
  });
}
