// HTML元素
const signIn = document.querySelector('.sign-in')
const signUp = document.querySelector('.sign-up')
const guest = document.querySelector('.guest')
const mode = document.querySelector('.darkmode')

// 變數
let loginState = 'Sign_out'
let isModalOpen = false; // 初始 Modal為關閉

// 初始函式
;(function init() {
  // 切換登入/登出樣式
  toggleLoginView()
  // 切換暗黑模式圖示
  mode.addEventListener('click', onDarkMode)
})()

//點擊signIn時，建立並顯示signInModal
signIn.addEventListener("click", function () {
  if (!isModalOpen) {
    isModalOpen = true; 
    const signInModal = createSignInModal();
    showSignInModal(signInModal, signIn);
  }
});

// 點擊signUp時，建立並顯示signUpModal
signUp.addEventListener("click", function () {
  if (!isModalOpen) {
    isModalOpen = true;
    const signUpModal = createSignUpModal(); 
    showSignUpModal(signUpModal, signUp);
  }
});

// 監聽器函式: 切換暗黑模式圖示
function onDarkMode(event) {
  let target = event.target
  target.classList.toggle('fa-sun')
  target.classList.toggle('fa-moon')
}

// 其他函式: 切換登入/登出樣式
function toggleLoginView() {
  if (loginState === 'Sign_out') {
    signIn.style.display = 'block'
    signUp.style.display = 'block'
    guest.style.display = 'none'
  } else if (loginState === 'Sign_in') {
    signIn.style.display = 'none'
    signUp.style.display = 'none'
    guest.style.display = 'block'
  }
}

// 建立signInModal
function createSignInModal() {  
  const signInModal = document.createElement("div");
  signInModal.id = "signInModal";
  signInModal.className = "sign-in-modal-content";
  signInModal.innerHTML = `
    <div>
      <button class="sign-in-close">X</button>
    </div>
    <h3 class="sign-up">登入</h3>      
    <div class="sign-in-content-table">
      <div class="content">
        <div class="title">帳號</div>
        <div class="colon">:</div>
        <input type="text">
      </div>
      <div class="content">
        <div class="title">密碼</div>
        <div class="colon">:</div>
        <input type="password">
      </div>
    </div>    
    <div class="submit">
      <button>提交</button>
    </div>
  `;

  document.body.appendChild(signInModal);
  return signInModal;
}

// 顯示signInModal
function showSignInModal(signInModal) {
  signInModal.style.display = "block";

  // signInModal顯示時的背景
  const modalOverlay = document.createElement("div");
  modalOverlay.className = "modal-overlay";
  document.body.appendChild(modalOverlay);

  // sign-in-close監聽器(顯示signInModal時才有)
  const closeButton = signInModal.querySelector(".sign-in-close");
  closeButton.addEventListener("click", function () {
    signInModal.style.display = "none";
    modalOverlay.remove(); // 移除signInModal顯示時的背景
    isModalOpen = false; // modal回初始
  }); 
}

// 建立signUpModal
function createSignUpModal() {
  const signUpModal = document.createElement("div");
  signUpModal.id = "signUpModal"; 
  signUpModal.className = "sign-up-modal-content";
  signUpModal.innerHTML = `
    <div>
      <button class="sign-up-close">X</button>
    </div>
    <h3 class="sign-up">註冊</h3>
    <div class="sign-up-content-table">
      <div class="content">
        <div class="title">帳號</div>
        <div class="colon">:</div>
        <input type="text">
      </div>
      <div class="content">
        <div class="title">信箱</div>
        <div class="colon">:</div>
        <input type="text">
      </div>
      <div class="content">
        <div class="title">密碼</div>
        <div class="colon">:</div>
        <input type="password">
      </div>
      <div class="content">
        <div class="title">確認密碼</div>
        <div class="colon">:</div>
        <input type="password">
      </div>
    </div>
    <div class="submit">
      <button>提交</button>
    </div>
  `;

  document.body.appendChild(signUpModal);
  return signUpModal;
}

// 顯示 signUpModal
function showSignUpModal(signUpModal) {
  signUpModal.style.display = "block";

  const modalOverlay = document.createElement("div");
  modalOverlay.className = "modal-overlay";
  document.body.appendChild(modalOverlay);

  const closeButton = signUpModal.querySelector(".sign-up-close");
  closeButton.addEventListener("click", function () {
    signUpModal.style.display = "none";
    modalOverlay.remove();
    isModalOpen = false; // modal回初始
  });
}
