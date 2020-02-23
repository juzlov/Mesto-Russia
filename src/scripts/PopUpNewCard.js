
//класс управляющий попапом для создания новой карточки

export default class PopUpNewCard {
  open(event) {
    if (event.target.classList.contains('user-info__button')) {
      const newPopup = document.querySelector('.popup-new');
      newPopup.classList.toggle('popup_is-opened');
    }
  }

  close(event) {
    if (event.target.classList.contains('popup-new__close')) {
      const newPopup = document.querySelector('.popup-new');
      newPopup.classList.toggle('popup_is-opened');
    }
  }
}
