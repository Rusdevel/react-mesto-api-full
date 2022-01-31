import React from "react";

function Login(props) {
  const [email, setEmail] = React.useState("");
  const [password, setPassword] = React.useState("");

  function handleSubmit(evt) {
    evt.preventDefault()
    props.onLogin(email, password)
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
            <h1 className="login__title">Вход</h1>
            <input className="login__input" value={email} onChange={changeEmail} placeholder="Email" type="email" name="email" required />
            <input className="login__input" value={password} onChange={changePassword} placeholder="Пароль" type="password" name="password" required />
                <button className="login__button" type="submit">Войти</button>
        </form>
    </div>
  );
}

export default Login;