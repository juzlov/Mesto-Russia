
//класс управляющий попапом для редактирования

export default class PopUpEditCard {
  constructor(errorMessage) {
    this.errorMessage = errorMessage;
  }

  validateName() {
    const author = document.querySelector('#author');
    this.errorMessage.length(author);                                                        
  }

  validateAbout() {
    const about = document.querySelector('#about');
    this.errorMessage.length(about);
  }

  open(event) {
    if (event.target.classList.contains('user-info__button_edit')) {
      const editPopup = document.querySelector('.popup-edit');
      editPopup.classList.toggle('popup_is-opened');
    }
  }

  close() {
    if (event.target.classList.contains('popup-edit__close')) {
      const editPopup = document.querySelector('.popup-edit');
      editPopup.classList.toggle('popup_is-opened');
    }
  }
}
