import React from 'react';

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
        var form = e.target
        const email=form.elements.email.value;
        const password=form.elements.password.value;
        props.onLogin(email, password);
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