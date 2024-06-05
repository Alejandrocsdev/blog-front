// HTML元素
const userAvatar = document.querySelector('.user-avatar')
const fileUploader = document.querySelector('#file-uploader')

let id = user.id
const ARTICLES_URL = `${BASE_URL}/articles`


//監聽器
fileUploader.addEventListener('change', (e) => {
  // get file object
  const file = e.target.files[0]
  console.log(file); 

    if (file) {
      const reader = new FileReader();
      reader.onload = function(e) {
          document.querySelector('#user-avatar').src = e.target.result;
      };
      reader.readAsDataURL(file)
      uploadImage()
  }
});

function uploadImage() {
  const file = fileUploader.files[0]

    if (file) {
      let form = new FormData();
      form.append('file', file)
// fetchAPI
      fetch(`${BASE_URL}/users/${id}/upload`, {
        method: 'PATCH',
        headers: {
                'Authorization': `Bearer ${token}`
        },
        body: form,
      })
      .then(response => response.json())
      .then(data => {
          console.log('Success:', data);
          alert('Image uploaded successfully!');
      })
      .catch(error => {
          console.error('Error:', error);
          alert('Failed to upload image');
      });
  } else {
      alert('Please select an image file first');

    }

}



