// 登入功能還未完成, 先以點擊按鈕後就出現可以留言示意

const body = document.querySelector('body')
const commentArea = document.querySelector('.comment-area')



// listen to sign-in btn
signIn.addEventListener('click', (e)=> {
  target = e.target
  commentArea.innerHTML = `
    <textarea name="user-comment" id="user-comment" class="text-area"></textarea>
    <div class="comment-btn-container">
    </div>
  `
})

//listen to body
body.addEventListener('click', (e)=> {
  target = e.target
  const commentBtn = document.querySelector('.comment-btn-container')
  const textArea = document.querySelector('#user-comment')
  // let isCommented = false

  if (target.tagName === 'TEXTAREA') {
    commentBtn.innerHTML = `
      <button class="comment-cancel">取消</button>
      <input type="submit" value="確定">
    `
    textArea.classList.add('textarea-clicked')
  }
  
  // text area without content, reset height
  if(target.tagName !== 'TEXTAREA' && textArea.value.length === 0) {
      textArea.classList.remove('textarea-clicked')
      commentBtn.innerHTML = ''
  } else if ( target.classList.contains('comment-cancel') ){
      textArea.value = ''
      textArea.classList.remove('textarea-clicked')
      commentBtn.innerHTML = ''
  }
})


