const placesList = document.querySelector('.places-list');
const userInfoButton = document.querySelector('.user-info__button');
const popupNew = document.querySelector('.popup-new');
const popupEdit = document.querySelector('.popup-edit');
const popupImage = document.querySelector('.popup-image');
const popupNewButton = document.querySelector('.popup-new__button');
const popupEditButton = document.querySelector('.popup-edit__button');
const userInfoButtonEdit = document.querySelector('.user-info__button_edit');
const popupPlaceImageSrc = document.querySelector('.popup__place-image-src');
const popupCloseNew = document.querySelector('.popup-new__close');
const popupCloseEdit = document.querySelector('.popup-edit__close');
const popupCloseImage = document.querySelector('.popup-image__close');
const author = document.querySelector('#author');
const about = document.querySelector('#about');
const errorMessages = {
  'author': 'Это обязательное поле',
  'about': 'Это обязательное поле',
  'length': 'Должно быть от 2 до 30 символов'
}
let userInfoName = document.querySelector('.user-info__name').innerHTML;
let userInfoAbout = document.querySelector('.user-info__job').innerHTML;


//слушатель для кнопки редактирования карточки
popupEditButton.addEventListener('click', function (event) {
  event.preventDefault();
  const nameTyped = document.querySelector('.popup__input_type_author-name');
  const aboutTyped = document.querySelector('.popup__input_type_about');

  api.changeServerName(nameTyped.value, aboutTyped.value);
  popupEdit.classList.toggle('popup_is-opened');
});

//слушатель для кнопки создания новой карточки
popupNewButton.addEventListener('click', function (event) {
  event.preventDefault();

  api.addNewCard(document.forms.new.name.value, document.forms.new.link.value);
  popupNew.classList.toggle('popup_is-opened');
});

//функция отключения кнопки редактировать в попапе 1
function placeButtonDisabler(event) {
  const formNew = document.forms.new;
  const button = formNew.querySelector('.popup__button');

  formNew.addEventListener('input', function (event) {
    let names = document.querySelector('.popup__input_type_name');
    let links = document.querySelector('.popup__input_type_link-url');

    if (names.value.length === 0 || links.value.length === 0) {
      button.setAttribute('disabled', true);
      button.classList.add('popup__button_disabled');
    }
    else {
      button.removeAttribute('disabled');
      button.classList.remove('popup__button_disabled');
    }
  });
}
placeButtonDisabler(event);

//функция отключения кнопки редактировать в попапе 2
function editButtonDisabler() {
  const formEdit = document.forms.edit;
  const button = formEdit.querySelector('.popup__button');

  formEdit.addEventListener('input', function () {
    let author = document.querySelector('.popup__input_type_author-name');
    let about = document.querySelector('.popup__input_type_about');

    if (author.value.length <= 1 || about.value.length <= 1) {
      button.setAttribute('disabled', true);
      button.classList.add('popup__button_disabled');
    }
    else {
      button.removeAttribute('disabled');
      button.classList.remove('popup__button_disabled');
      return true;
    }
  });
}
editButtonDisabler();

//функция смены имени 
function changeName(name, about) {
  return (document.querySelector('.user-info__name').textContent = name), (document.querySelector('.user-info__job').textContent = about);
}

//функция отображения значений по умолчанию в попапе
function formDefault() {
  let author = document.querySelector('.popup__input_type_author-name');
  let authorDefault = document.querySelector('.user-info__name').innerHTML;
  author.value = authorDefault;

  let about = document.querySelector('.popup__input_type_about');
  let aboutDefault = document.querySelector('.user-info__job').innerHTML;
  about.value = aboutDefault;
}
formDefault();
