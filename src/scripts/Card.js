
// класс создания прототипа карточки с методами лайк, ремув

export default class Card {
  constructor(name, link, likes, id, cards) {
    this.name = name;
    this.link = link;
    this.likes = likes;
    this.id = id;
    this.cards = cards;
  }

  like(result, idCard) {
    this.result = result;
    this.idCard = idCard;

    const listOfPlaces = document.querySelectorAll('.place-card');
    
    for (let i = 0; i < this.cards.length; i++) {
      let keys = Object.values(this.cards[i]);
        if (keys[3] === this.idCard) {
          listOfPlaces[i].querySelector('.place-card__like-counter').textContent = this.result;
          listOfPlaces[i].querySelector('.place-card__like-icon').classList.toggle('place-card__like-icon_liked');
        }
    }   
  }

  likeDelete(result, idCard) {
    this.result = result;
    this.idCard = idCard;

    const listOfPlaces = document.querySelectorAll('.place-card');
    
    for (let i = 0; i < this.cards.length; i++) {
      let keys = Object.values(this.cards[i]);
        if (keys[3] === this.idCard) {
          listOfPlaces[i].querySelector('.place-card__like-counter').textContent = this.result;
          listOfPlaces[i].querySelector('.place-card__like-icon').classList.toggle('place-card__like-icon_liked');
        }
    }   
  }

  setEventListener() {
    this.placeCard.querySelector('.place-card__delete-icon').addEventListener('click', function (event) {
      const listOfPlaces = document.querySelectorAll('.place-card');
        for (let i = 0; i < listOfPlaces.length; i++) {
          if (listOfPlaces[i].contains(event.target)) {
            api.deleteCard(initialCards[i].id);
          }
        }
    });
      // Надо исправить: Во первых вам надо убедиться что сервер действительно прислал результат того что  (Исправил)
      // карточка удалена, после этого только можно удалять её с DOM
    this.placeCard.querySelector('.place-card__like-icon').addEventListener('click', function (event) {
      const listOfPlaces = document.querySelectorAll('.place-card');

      if (!event.target.classList.contains('place-card__like-icon_liked')) {
        for (let i = 0; i < listOfPlaces.length; i++) {
          if (listOfPlaces[i].contains(event.target)) {
            api.likeCard(initialCards[i].id);
          }
        }
      } else {
        for (let i = 0; i < listOfPlaces.length; i++) {
          if (listOfPlaces[i].contains(event.target)) {
            api.likeDelete(initialCards[i].id);
          }
        }
      }

    });
  }



  remove(cardId) {
    this.cardId = cardId;

    const listOfPlaces = document.querySelectorAll('.place-card');
      for (let i = 0; i < this.cards.length; i++) {
        let keys = Object.values(this.cards[i]);
            if (keys[3] === this.cardId) {
            listOfPlaces[i].closest('.place-card').remove();
          }
      }
  }

  create() {
    let placesList = document.querySelector('.places-list');

    this.placeCard = document.createElement('div');
    let placeCardImage = document.createElement('div');
    let placeCardDescription = document.createElement('div');
    let placeCardName = document.createElement('h3');
    let placeCardDeleteIcon = document.createElement('button');
    let placeCardLikeIcon = document.createElement('button');
    let placeCardLikeCounter = document.createElement('h4');
    let placeCardLikeContainer = document.createElement('div');

    this.placeCard.classList.add('place-card');

    placeCardImage.classList.add('place-card__image');
    placeCardName.classList.add('place-card__name');
    placeCardDescription.classList.add('place-card__description');
    placeCardDeleteIcon.classList.add('place-card__delete-icon');
    placeCardLikeIcon.classList.add('place-card__like-icon');
    placeCardLikeCounter.classList.add('place-card__like-counter');
    placeCardLikeContainer.classList.add('place-card__like-container');


    placeCardImage.style.backgroundImage = `url('${this.link}')`;
    placeCardName.textContent = this.name;
    placeCardLikeCounter.textContent = this.likes;

    placeCardImage.appendChild(placeCardDeleteIcon);
    placeCardDescription.appendChild(placeCardName);
    placeCardDescription.appendChild(placeCardLikeContainer);
    placeCardLikeContainer.appendChild(placeCardLikeIcon);
    placeCardLikeContainer.appendChild(placeCardLikeCounter);

    this.placeCard.appendChild(placeCardImage);
    this.placeCard.appendChild(placeCardDescription);

    placesList.appendChild(this.placeCard);
    this.setEventListener();
    return this.placeCard;
  }
}