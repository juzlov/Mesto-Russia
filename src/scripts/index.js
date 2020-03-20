/* eslint-disable no-return-assign */
/* eslint-disable consistent-return */
/* eslint-disable no-shadow */
/* eslint-disable no-unused-vars */
// функция отключения кнопки редактировать в попапе 1+
export function placeButtonDisabler(event) {
  const formNew = document.forms.new;
  const button = formNew.querySelector('.popup__button');

  formNew.addEventListener('input', (event) => {
    const names = document.querySelector('.popup__input_type_name');
    const links = document.querySelector('.popup__input_type_link-url');

    if (names.value.length === 0 || links.value.length === 0) {
      button.setAttribute('disabled', true);
      button.classList.add('popup__button_disabled');
    } else {
      button.removeAttribute('disabled');
      button.classList.remove('popup__button_disabled');
    }
  });
}

// функция отключения кнопки редактировать в попапе 2+
export function editButtonDisabler() {
  const formEdit = document.forms.edit;
  const button = formEdit.querySelector('.popup__button');

  formEdit.addEventListener('input', () => {
    const author = document.querySelector('.popup__input_type_author-name');
    const about = document.querySelector('.popup__input_type_about');

    if (author.value.length <= 1 || about.value.length <= 1) {
      button.setAttribute('disabled', true);
      button.classList.add('popup__button_disabled');
    } else {
      button.removeAttribute('disabled');
      button.classList.remove('popup__button_disabled');
      return true;
    }
  });
}

// функция смены имени +
export function changeName(name, about) {
  return (document.querySelector('.user-info__name').textContent = name), (document.querySelector('.user-info__job').textContent = about);
}

// функция отображения значений по умолчанию в попапе +
export function formDefault() {
  const author = document.querySelector('.popup__input_type_author-name');
  const authorDefault = document.querySelector('.user-info__name').innerHTML;
  author.value = authorDefault;


  const about = document.querySelector('.popup__input_type_about');
  const aboutDefault = document.querySelector('.user-info__job').innerHTML;
  about.value = aboutDefault;
}
