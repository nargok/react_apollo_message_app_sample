import React from 'react';

const Login = () => {
    return (
        <div>
            <h1>ログイン</h1>
            <div>
                <label htmlFor="login_name">ユーザ名</label>
                <input type="text"　id="login_name" placeholder="ユーザ名"/>
            </div>
            <div>
                <label htmlFor="login_name">パスワード</label>
                <input type="password"　id="login_password" />
            </div>
            <div>
                <button>ログインする</button>
            </div>
        </div>
    )
}

export default Login;