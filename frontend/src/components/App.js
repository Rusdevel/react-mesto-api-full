import React from "react";
import { Route, Switch, Redirect, useHistory} from 'react-router-dom';
import Header from "./Header";
import Main from "./Main";
import Footer from "./Footer";
import EditProfilePopup from "./EditProfilePopup";
import AddPlacePopup from "./AddPlacePopup";
import EditAvatarPopup from "./EditAvatarPopup";
import ImagePopup from "./ImagePopup";
import api from "../utils/Api";
import { CurrentUserContext } from "../contexts/CurrentUserContext";
import Login from "./Login";
import Register from "./Register";
import InfoTooltip from "./InfoTooltip";
import ProtectedRoute from "./ProtectedRoute";
import * as auth from "../utils/auth";

function App() {
  const [currentUser, setCurrentUser] = React.useState({});
  const [isEditProfilePopupOpen, setIsEditProfilePopupOpen] = React.useState(false);
  const [isAddPlacePopupOpen, setIsAddPlacePopupOpen] = React.useState(false);
  const [isEditAvatarPopupOpen, setIsEditAvatarPopupOpen] = React.useState(false);
  const [selectedCard, setSelectedCard] = React.useState(null);
  const [cards, setCards] = React.useState([]);


  //Авторизация
  const [loggedIn, setLoggedIn] = React.useState(false);
  const [isInfoTooltipPopupOpen, setIsInfoTooltipPopupOpen] = React.useState(false);
  const [isSuccess, setIsSuccess] = React.useState(false);
  const [userEmail, setUserEmail] = React.useState('')
  const history = useHistory();

  React.useEffect(() => {
    const token = localStorage.getItem('token');
    api.getUserInfo(token)
      .then((userData) => {
        setCurrentUser(userData);
      })
      .catch((err) => console.log(err));
  }, []);

  //запрос карточек
  React.useEffect(() => {
    const token = localStorage.getItem('token');
    api.getInitialCards(token)
      .then((data) => {
        setCards(data);
      })
      .catch((err) => console.log(err));
  }, []);

  function handleCardClick(card) {
    setSelectedCard(card);
  }

  function handleEditAvatarClick() {
    setIsEditAvatarPopupOpen(true);
  }
  function handleEditProfileClick() {
    setIsEditProfilePopupOpen(true);
  }
  function handleAddPlaceClick() {
    setIsAddPlacePopupOpen(true);
  }

  function handleInfoTooltipPopupOpen() {
    setIsInfoTooltipPopupOpen(!isInfoTooltipPopupOpen)
}

  function closeAllPopups() {
    setIsEditProfilePopupOpen(false);
    setIsAddPlacePopupOpen(false);
    setIsEditAvatarPopupOpen(false);
    setSelectedCard(null);
    setIsInfoTooltipPopupOpen(false)
  }
  //обновляем профиль
  function handleUpdateUser(data) {
    const token = localStorage.getItem('token');
    api.editeUserDate(data, token)
      .then((data) => {
        setCurrentUser(data);
        closeAllPopups();
      })
      .catch((err) => {
        console.log(err);
      });
  }
  //обновляем аватар
  function handleUpdateAvatar(link) {
    const token = localStorage.getItem('token');
    api.getUserInfo(link, token)
      .then((link) => {
        setCurrentUser(link);
        console.log(link);
        closeAllPopups();
      })
      .catch((err) => {
        console.log(err);
      });
  }

  //обновляем карточки
  function handleAddPlaceSubmit(data) {
    const token = localStorage.getItem('token');
    api.getUserInfo(data, token)
      .then((data) => {
        setCards([data, ...cards]);
        closeAllPopups();
      })
      .catch((err) => {
        console.log(err);
      });
  }

  function handleCardLike(card) {
    // Снова проверяем, есть ли уже лайк на этой карточке
    const isLiked = card.likes.some((i) => i._id === currentUser._id);

    // Отправляем запрос в API и получаем обновлённые данные карточки
    api
      .changeLikeCardStatus(card._id, !isLiked, localStorage.token)
      .then((newCard) => {
        setCards((state) => state.map((c) => (c._id === card._id ? newCard : c)));
      })
      .catch((err) => {
        console.log(err);
      });
  }

  //функция запроса удаления карточек
  function handleCardDelete(card) {
    api.cardDelete(card._id,localStorage.token)
      .then(() => {
        setCards((state) => state.filter((c) => c !== card));
      })
      .catch((err) => {
        console.log(err);
      });
  }

  function register(email, password) {
    auth.register(email, password).then(
        () => {
            setIsSuccess(true)
            handleInfoTooltipPopupOpen()
            history.push('/');
        })
        .catch((err) => {
            console.log(err)
            setIsSuccess(false)
            handleInfoTooltipPopupOpen()
        })
}
  
  function login(email, password) {

    auth.authorization(email, password).then(
        (data) => {
            localStorage.setItem('token', data.token);
            setUserEmail(email)
            setLoggedIn(true)
            history.push("/my-profile");
        })
        .catch((err) => {
            console.log(err)
            setIsSuccess(false)
            handleInfoTooltipPopupOpen()
        })
}

function signOut() {
  localStorage.removeItem('token');
  setLoggedIn(false);
  history.push('signin');
}


const checkToken = React.useCallback(() => {
  const token = localStorage.getItem('token');
  console.log(token);
  auth.checkToken(token).then(
      (data) => {
          setLoggedIn(true);
          setUserEmail(data.email);
          history.push('/my-profile');
      })
      .catch((err) => {
              console.log(err);
          }
      );
}, [history]);

React.useEffect(() => {
  const token = localStorage.getItem('token');
  if (token) {
      checkToken();
  }
}, [checkToken]);

  return (
    <CurrentUserContext.Provider value={currentUser}>
            <div className="page">
                <Header loggedIn={loggedIn} userEmail={userEmail} onSignOut={signOut}/>
                <Switch>
                   {<Route exact path='/'></Route>}
                    <ProtectedRoute exact path='/'
                                    component={Main}
                                    loggedIn={loggedIn}
                                    onEditProfile={handleEditProfileClick}
                                    onAddPlace={handleAddPlaceClick}
                                    onEditAvatar={handleEditAvatarClick}
                                    onCardClick={handleCardClick}
                                    cards={cards}
                                    onCardLike={handleCardLike}
                                    onCardDelete={handleCardDelete}
                    />
                    <Route path='/signup'>
                        <Register onRegister={register}/>
                    </Route>
                    <Route path='/signin'>
                        <Login onLogin={login} onChekToken={checkToken}/>
                    </Route>
                    <Route>
                        {loggedIn ? <Redirect to='/'/> : <Redirect to='/signin'/>}
                    </Route>
                </Switch>
                <Footer/>
                <EditProfilePopup isOpen={isEditProfilePopupOpen} onClose={closeAllPopups} onUpdateUser={handleUpdateUser} />
        <AddPlacePopup isOpen={isAddPlacePopupOpen} onClose={closeAllPopups} onAddPlace={handleAddPlaceSubmit} />
        <EditAvatarPopup isOpen={isEditAvatarPopupOpen} onClose={closeAllPopups} onUpdateAvatar={handleUpdateAvatar} />
        <ImagePopup card={selectedCard !== null && selectedCard} onClose={closeAllPopups} />
        <InfoTooltip isOpen={isInfoTooltipPopupOpen}
                             onClose={closeAllPopups} isSuccess={isSuccess}/>

      {/*  <Main
          onEditProfile={handleEditProfileClick}
          onAddPlace={handleAddPlaceClick}
          onEditAvatar={handleEditAvatarClick}
          onCardClick={handleCardClick}
          cards={cards}
          onCardLike={handleCardLike}
          onCardDelete={handleCardDelete}
      />*/}
        
         
        
      </div>
    </CurrentUserContext.Provider>
  );
}

export default App;
