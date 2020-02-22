//класс для создания листа карточек и рендера

class CardList {
  constructor(container, iniCards) {
    this.container = container;
    this.iniCards = iniCards;
  }

  addCard(card) {
    this.card = card;
    this.card.create();
    this.card.setEventListener();
  }

  render(carder) {
    this.iniCards.forEach(function (elem) {
      carder.name = elem.name;
      carder.link = elem.link;
      carder.likes = elem.likes;
      carder.id = elem.id;
      carder.create(carder.name, carder.link, carder.likes, carder.id);
    });
  }

  getInitialCards(result) {
    /* 
     можно лучше : используйте for of для перебора массива с объектами
     https: //developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Statements/for...of 
     как пример:
     
     const array1 = ['a', 'b', 'c'];
     for (const element of array1) {
      console.log(element);
     }
     
    */
    for (let i = 0; i < result.length; i++) {
      const initialCard = {};
      initialCard.name = result[i].name;
      initialCard.link = result[i].link;
      initialCard.likes = result[i].likes.length;
      initialCard.id = result[i]._id;
      this.iniCards.push(initialCard);
    }
  }
}



