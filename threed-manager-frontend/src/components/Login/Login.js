import React from 'react';
import repository from "../../repository/repository";

const Login = (props) => {

    const [formData, updateFormData]=React.useState({
        email:"",
        password:"",
    })
    const handleChange=(e)=>{
        updateFormData({
            ...formData,
            [e.target.name]:e.target.value.trim()
        })
    }

    const onFormSubmit=(e)=>{
        e.preventDefault();
        repository.login(formData.email, formData.password).then(resp => {
            localStorage.setItem("JWT", "Bearer "+resp.data.token);
            var tokenParse=parseJwt(resp.data.token);
            localStorage.setItem("Email", tokenParse.email);
            localStorage.setItem("Role", tokenParse.role);
            props.onLogin();
        })
    }
    function parseJwt (token) {
        var base64Url = token.split('.')[1];
        var base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/');
        var jsonPayload = decodeURIComponent(window.atob(base64).split('').map(function(c) {
            return '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2);
        }).join(''));
        return JSON.parse(jsonPayload);
    }

    return (
        <div className={"container-fluid"}>
            <h1 className={"text-center"}>Login</h1>
            <form onSubmit={onFormSubmit}>
                <input type="email" name="email" id="email" placeholder="E-mail" onChange={handleChange}/>
                <input type="password" name="password" id="password" placeholder="Password" onChange={handleChange}/>
                <input type="submit" value="Login"/>
            </form>
        </div>
    );
}
export default Login;