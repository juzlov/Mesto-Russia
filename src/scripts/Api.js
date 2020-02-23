export default class Api {
    constructor(options, infoAboutUser, renderCard, listOfCards, iniCards) {
        this.options = options;
        this.infoAboutUser = infoAboutUser;
        this.renderCard = renderCard;
        this.listOfCards = listOfCards;
        this.iniCards = iniCards;

    }

    //Загрузка информации о пользователе с сервера и смена имени на эту информацию 
    getNameFromServer() {
        fetch((this.options.baseUrl + '/users/me'), {
            method: 'GET',
            headers: this.options.headers
        })
            .then((res) => res.json())
            .then((res) => {
                // Надо исправить: только возвращаете результат return res; , это надо удалить                        (Исправил)
                return res;
            })
            .then((res) => {
                this.infoAboutUser.changeNameFromServer(res.name, res.about);                                         //Можно ли так делать? Без этой строки не обновляется имя.
            })
            .catch((err) => {
                console.log(err);
            });
        //  Надо исправить: Необходимо в метод добавить обработку ошибок                                              (Исправил)
        //    .catch((err) => { 
        //  	console.log(err); 
        //  	});  
    }

    //Загрузка первоначальных карточек с сервера
    getInitialCards() {

        //  Надо исправить: Здесь можете вызывать только метод класса Api 
        // Но не создавать полную реализацию, а метод должен возвращать результат 
        // который в дальнейшем вы сможете использовать в классе(Card,CardList,Popup ...)                           (Исправил)
        // 
        fetch((this.options.baseUrl + '/cards'), {
            method: 'GET',
            headers: this.options.headers
        })
            .then((res) => {
                return res.json();
            })
            .then((result) => {
                // Это должно быть в CardList, для этого мы и создавали класс и методы  
                // Вызовите getInitialCards() из класса CardList и обработайте там результат(как вариант)           (Исправил)
                this.listOfCards.getInitialCards(result);
                this.listOfCards.render(this.renderCard);
            })
            .catch((err) => {
                console.log(err);
            });
        //  Надо исправить: Необходимо в метод добавить обработку ошибок                                            (Исправил)
        //    .catch((err) => { 
        //  	console.log(err); 
        //  	});  
    }

    //заготовка для смены моей аватарки на сервере (Не должно работать)
    changeAvatar() {
        fetch((this.options.baseUrl + 'users/me/avatar'), {
            method: 'PATCH',
            headers: this.options.headers,
            body: JSON.stringify({
                "avatar": "https://i.ibb.co/1qLp4R3/s1200.png"
            })
        })
            .then((res) => res.json())
            .catch((err) => {
                console.log(err);
            });
        //  Надо исправить: Необходимо в метод добавить обработку ошибок                                           (Исправил)
        //    .catch((err) => { 
        //  	console.log(err); 
        //  	});  
    }

    //смена имени и О себе на сервере
    changeServerName(name, about) {
        fetch((this.options.baseUrl + '/users/me'), {
            method: 'PATCH',
            headers: this.options.headers,
            body: JSON.stringify({
                "name": `${name}`,
                "about": `${about}`
            })
        })
            .then((res) => res.json())
            .then(() => {
                /** Надо исправить: вы обращаетесь в классе к переменной объявленной глобально,                     (Исправил)
                так делать нельзя. Вы можете передать эту переменную в качестве параметров, а потом уже обращаться к ней 
                Стремитесь к тому чтобы класс у вас был самодостаточным, и не зависел от глобальных переменных или классов 
                объявленных глобально, а только от тех данных которые были переданны через параметры 
                */
                this.getNameFromServer();
            })
            .catch((err) => {
                console.log(err);
            });
        //  Надо исправить: Необходимо в метод добавить обработку ошибок                                            (Исправил)
        //    .catch((err) => { 
        //  	console.log(err); 
        //  	});  
    }

    // добавление новой карточки
    addNewCard(name, link) {
        fetch((this.options.baseUrl + '/cards'), {
            method: 'POST',
            headers: this.options.headers,
            body: JSON.stringify(
                {
                    "name": `${name}`,
                    "link": `${link}`
                })
        })
            .then((res) => {
                if (res.ok) {
                    return res.json();
                }
            })
            .then((res) => {
                this.renderCard.name = name;
                this.renderCard.link = link;
                this.listOfCards.addCard(this.renderCard);
            })
            .catch((err) => {
                console.log(err);
            });
        //  Надо исправить: Необходимо в метод добавить обработку ошибок                                          (Исправил)
        //    .catch((err) => { 
        //  	console.log(err); 
        //  	});  
    }

    // заготовка для удаления карточки
    deleteCard(cardId) {
        fetch((this.options.baseUrl + '/cards/' + cardId), {
            method: 'DELETE',
            headers: this.options.headers
        })
            .then((res) => {
                if (res.ok) {
                    return res.json();
                }
            }).then((res) => {
                if (res.message === "Пост удалён") {
                    this.renderCard.remove(cardId);
                };
            })
            .catch((err) => {
                console.log(err);
            });
        //  Надо исправить: Необходимо в метод добавить обработку ошибок                                        (Исправил)
        //    .catch((err) => { 
        //  	console.log(err); 
        //  	});  
    }

    // постановка лайка
    likeCard(cardId) {
        fetch((this.options.baseUrl + '/cards/like/' + cardId), {
            method: 'PUT',
            headers: this.options.headers
        })
            .then((res) => {
                if (res.ok) {
                    return res.json();
                }
            }).then((res) => {
                return res.likes.length;
            }).then((res) => {
                this.renderCard.like(res, cardId);
            })
            .catch((err) => {
                console.log(err);
            });
    }

    //снятие лайка
    likeDelete(cardId) {
        fetch((this.options.baseUrl + '/cards/like/' + cardId), {
            method: 'DELETE',
            headers: this.options.headers
        })
            .then((res) => {
                if (res.ok) {
                    return res.json();
                }
            }).then((res) => {
                return res.likes.length;
            }).then((res) => {
                this.renderCard.likeDelete(res, cardId);
            })
            .catch((err) => {
                console.log(err);
            });
    }
}



/**
* Здравствуйте.
* --------------------------------------------------------------------
* Весь функционал работает корректно
* Код чистый и хорошо читается
* --------------------------------------------------------------------
* Все проблемы в коде были помечены как нужно исправить
*
* По мимо того что я указал в коде, надо исправить добавление карточек при отсутствии интернета(такого не должно быть)      (Исправил)
* А так же удаление карточек при отсутсвии интернета                                                                        (Исправил)
*
*
* Работа принимается
* Сперва решил что у вас не работает удаление карточек, потом заметил что у вас нет доступа для удаления. Не стал акцептировать внимание на этом
* Молодцы что закончили работу )))
*/