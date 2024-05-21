const signIn = document.querySelector("#sign-in");
const signInShowModal = document.querySelector("#sign-in-showModal");
const signUp = document.querySelector("#sign-up");
const signUpShowModal = document.querySelector("#sign-up-showModal");
const signInClose = document.querySelector("#sign-in-close");
const signUpClose = document.querySelector("#sign-up-close");

// signIn鈕監聽，一旦clicked，會showModal
signIn.addEventListener("click", function(){
  signInShowModal.showModal();
});
// signInClose鈕監聽，一旦clicked，會關閉視窗
signInClose.addEventListener("click", function(){
  signInShowModal.close();
})

signUp.addEventListener("click", function () {
  signUpShowModal.showModal();
});
signUpClose.addEventListener("click", function () {
  signUpShowModal.close();
});