import React, {useState} from 'react';
import {Link} from "react-router-dom";
import repository from "../../../repository/repository";


const LinkAccounts=(props)=>{
    const [error, setError] = useState();
    const buildImagePath=(path)=>{
        return "http://localhost:8002/api/file?path="+path;
    }
    const onFormSubmit=(e)=>{
        e.preventDefault();
        var form=e.target;
        var platform=form.elements.platform.value;
        var link=form.elements.link.value;
        if(platform==="" || link===""){
            setError(true);
        }else{
            setError(false);
            repository.addExternalLink(platform,link).then(()=>{
                props.reloadUser();
            })
            form.elements.platform.value="";
            form.elements.link.value="";
        }
        props.reloadUser();
    }
    const onDeleteLink=(name)=>{
        repository.removeExternalLink(name).then(()=>{
            props.reloadUser();
        });
        props.reloadUser();
    }
    const rows=[];
    const options=[];
    const existingNames=props.user.externalLinks.map(x=>x.name.name);
    return (
        <div className={"container col-8 text-dark border border-dark rounded-5 mt-4 text-center"}>
            <h1 className={"mt-2"}>Linked Accounts</h1>
            <hr className={"mt-1"}/>
            {props.user.externalLinks.forEach(x=>{
                rows.push(<div className={"row mb-2"}>
                            <div className={"col-2"}>
                                <img style={{width:"70px"}} src={buildImagePath(x.name.imageLocation)}/>
                            </div>
                    <div className={"col-8 mt-3"}>
                        <h5 >{x.link}</h5>
                    </div>
                <div className={"col-2"}>
                    <button onClick={() => onDeleteLink(x.name.name)} className={"col-6 btn text-white btn-danger"} linkname={x.name.name}><h1 className={"mb-0"}>X</h1></button>
                </div>

                          </div>)
            })}
            {rows}
            {rows.length===0 && <h4 className={"text-danger fst-italic"}>You have currently no linked accounts! :(</h4>}
            {rows.length===0 && <h4 className={"text-success fst-italic"}>Start by linking an account below!</h4>}
            <hr/>
            <h3>Link Other Accounts</h3>
            <hr/>
            {error && <div className="bg-danger text-white rounded-5 ps-2 pe-2 pt-1 pb-1 text-center mb-2"><h4>Please select a Platform and enter your profile link!</h4></div>}
            <form onSubmit={onFormSubmit}>
                <div className="form-group mb-3">
                    <select className="form-control" name="platform" id="platform">
                        <option value={""}>--Select a Platform--</option>
                        {props.externalLinkNames.filter(x=>existingNames.indexOf(x.name)==-1).forEach(x=>options.push(<option value={x.name}>{x.name}</option>))}
                        {options}
                    </select>
                </div>
                <div className="form-group mb-3">
                    <input className="form-control" type="text" name="link" id="link" placeholder={"http://example.link.com"}/>
                </div>
                <button type={"submit"} className={"btn btn-block btn-lg btn-success text-white rounded-5 col-12 mt-0 mb-2"}>Link account</button>
                <Link to={"/myProfile"} className={"btn btn-block btn-lg btn-primary text-white rounded-5 col-12 mt-0 mb-2"}>Go Back</Link>
            </form>
        </div>
    );
}
export default LinkAccounts;