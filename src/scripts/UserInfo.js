
//класс хранящий данные пользователя и изменяющий их

export default class UserInfo {
  constructor(name, about) {
    this.name = name;
    this.about = about;
  }

  setUserInfo(name, about) {
    this.name = name;
    this.about = about;
  }

  updaterUserInfo(event) {
    event.preventDefault();
    const nameTyped = document.querySelector('.popup__input_type_author-name');
    const aboutTyped = document.querySelector('.popup__input_type_about');
    const editPopup = document.querySelector('.popup-edit');

    changeNameAndValue(nameTyped.value, aboutTyped.value);

    editPopup.classList.toggle('popup_is-opened');
  }

  changeNameAndValue (name, about) {
      const userName = document.querySelector('.user-info__name').textContent;
      const userAbout = document.querySelector('.user-info__job').textContent;

      userName = name;
      userAbout = about;
      
      return userName, userAbout;
  }

  changeNameFromServer(name, about) {
      this.name = name;
      this.about = about;

      const userName = document.querySelector('.user-info__name');
      const userAbout = document.querySelector('.user-info__job');

      userName.textContent = this.name;
      userAbout.textContent = this.about;

      return userName, userAbout;
  }
}
