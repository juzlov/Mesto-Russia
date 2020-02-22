const userinfo = new UserInfo(author.value, about.value);
const renderCard = new Card('', '', '', '', initialCards);
const cardlist = new CardList(placesList, initialCards);
const imagecard = new PopUpImageCard;
const newcard = new PopUpNewCard;
const validation = new FormValidator(errorMessages); 
const popupEditCard = new PopUpEditCard(validation); 

const api = new Api({
    baseUrl: 'http://95.216.175.5/cohort7',
    headers: {
      authorization: '0c961df6-89b0-435f-8c24-258dd9cf0d90',
      'Content-Type': 'application/json'
    }
}, userinfo, renderCard, cardlist, initialCards) ;

author.addEventListener('input', function() {
    popupEditCard.validateName(validation);
});
    
about.addEventListener('input', function() {
    popupEditCard.validateAbout(validation);
});

placesList.addEventListener('click', imagecard.open);
popupCloseImage.addEventListener('click', imagecard.close);

userInfoButton.addEventListener('click', newcard.open);
popupCloseNew.addEventListener('click', newcard.close);

userInfoButtonEdit.addEventListener('click', popupEditCard.open);
popupCloseEdit.addEventListener('click', popupEditCard.close);

api.getNameFromServer();
api.getInitialCards();