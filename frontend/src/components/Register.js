import React from "react";
import { Link } from "react-router-dom";

function Register(props) {

  const [email, setEmail] = React.useState("");
  const [password, setPassword] = React.useState("");

  function handleSubmit(evt) {
    evt.preventDefault()
    props.onRegister(email, password)
}

// меняем Email
  function changeEmail(evt) {
    setEmail(evt.target.value);
}
// Меняем пароль
function changePassword(evt) {
    setPassword(evt.target.value);
}

  return (
    <div className="login">
        <form className="login__form" onSubmit={handleSubmit}>
            <h1 className="login__title">Регистрация</h1>
            <input className="login__input" value={email} onChange={changeEmail} placeholder="Email" type="email" name="email" required />
            <input className="login__input" value={password} onChange={changePassword} placeholder="Пароль" type="password" name="password" required />
                <button className="login__button" type="submit">Зарегистрироваться</button>
                <Link className='login__link' to='/sign-in'>Уже зарегистрированы? Войти</Link>
        </form>
    </div>
  );
}

export default Register;