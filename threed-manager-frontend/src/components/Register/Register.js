import React from 'react';

const Register = (props) => {

    const [formData, updateFormData]=React.useState({
        name:"",
        surname:"",
        email:"",
        password:"",
        repeatPassword:"",
        role:""
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
        const name=form.elements.name.value;
        const surname=form.elements.surname.value;
        const password=form.elements.password.value;
        const repeatPassword=form.elements.repeatPassword.value;
        const role=form.elements.role.value;
        props.onRegister(email, name, surname, password,repeatPassword, role);
    }
    const passwordsError=props.passwordsError;
    const emailTakenError=props.emailTakenError;
    const invalidError=props.invalidError;

    return (
        <div className={"container-fluid text-primary"}>
            <h1 className={"text-center"}>Register a new User</h1>
            <form onSubmit={onFormSubmit}>
                <input type="email" name="email" id="email" placeholder="E-mail" onChange={handleChange}/>
                <input type="password" name="password" id="password" placeholder="Password" onChange={handleChange}/>
                <input type="password" name="repeatPassword" id="repeatPassword" placeholder="Repeat Password" onChange={handleChange}/>
                <input type="text" name="name" id="name" placeholder="Name" onChange={handleChange}/>
                <input type="text" name="surname" id="surname" placeholder="Surname" onChange={handleChange}/>

                <input type="radio" name="role" id="client" value="CLIENT"/>
                <label htmlFor="client">Client</label>
                <input type="radio" name="role" id="freelancer" value="FREELANCER"/>
                <label htmlFor="freelancer">Freelancer</label>
                <input type="submit" value="Register"/>
            </form>
            <div className="text-danger">
                {passwordsError && <h1>Passwords do not match!</h1>}
                {invalidError && <h1>Email and Password can not be empty!</h1>}
                {emailTakenError!=="" ? <h1>The email is already in use!</h1> : ""}
            </div>
        </div>
    );
}
export default Register;