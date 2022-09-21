import React, {useState} from 'react'
import repository from "../../../../repository/repository";


const RatingForm = (props) => {
    const [stars,setStars]=useState(0)
    const [error,setError]=useState(false)
    const rate=()=>{
        if(stars===0){
            setError(true)
        }else{
            setError(false)
            repository.rateProject(props.project.id.id,stars).then((resp)=>{
                props.reloadProject(props.project.id.id);
            })
        }
    }
    const generateStars=(number)=>{
        if(number===0){
            return []
        }
        var stars=[]
        var x=0;
        for(;x<number;x++){
            stars.push(<img src={"/images/star_full.png"} style={{width:"30px"}}/>)
        }
        for(;x<5;x++){
            stars.push(<img src={"/images/star_empty.png"} style={{width:"30px"}}/>)
        }
        return stars;
    }
    return(
      <div>

          {localStorage.getItem("Role")==="FREELANCER" && props.project.freelancerRating!==null&&
              <div>
                  <h2 className={"text-center mb-3"}>Project Ratings</h2>
                  {props.project.clientRating!==null && <h5><span className={"badge rounded-5 bg-warning text-white"}>FREELANCER</span> was rated with {generateStars(props.project.clientRating)} stars!</h5>}
                  {props.project.clientRating===null && <h5>The <span className={"badge rounded-5 bg-warning text-white"}>FREELANCER</span> has not been rated yet!</h5>}

                  {props.project.freelancerRating!==null && <h5><span className={"badge rounded-5 bg-warning text-white"}>CLIENT</span> was rated with {generateStars(props.project.freelancerRating)} stars!</h5>}
                  {props.project.freelancerRating===null && <h5>The <span className={"badge rounded-5 bg-warning text-white"}>CLIENT</span> has not been rated yet!</h5>}
              </div>
          }
          {localStorage.getItem("Role")==="CLIENT" && props.project.clientRating!==null &&
              <div>
                  <h2 className={"text-center mb-3"}>Project Ratings</h2>
                  {props.project.clientRating!==null && <h5><span className={"badge rounded-5 bg-warning text-white"}>FREELANCER</span> was rated with {generateStars(props.project.clientRating)} stars!</h5>}
                  {props.project.clientRating===null && <h5>The <span className={"badge rounded-5 bg-warning text-white"}>FREELANCER</span> has not been rated yet!</h5>}

                  {props.project.freelancerRating!==null && <h5><span className={"badge rounded-5 bg-warning text-white"}>CLIENT</span> was rated with {generateStars(props.project.freelancerRating)} stars!</h5>}
                  {props.project.freelancerRating===null && <h5>The <span className={"badge rounded-5 bg-warning text-white"}>CLIENT</span> has not been rated yet!</h5>}
              </div>
          }

          {localStorage.getItem("Role")==="FREELANCER" && props.project.freelancerRating===null&&
            <div className={"text-center"}>
                <h2 className={"text-center mb-2"}>Rate the <span className={"badge rounded-5 bg-warning text-white"}>CLIENT</span> of this project</h2>

                {stars<1 && <img src={"/images/star_empty.png"} style={{width:"75px"}} onClick={()=>{setStars(1)}}/>}
                {stars>=1 && <img src={"/images/star_full.png"} style={{width:"75px"}} onClick={()=>{setStars(1)}}/>}

                {stars<2 && <img src={"/images/star_empty.png"} style={{width:"75px"}} onClick={()=>{setStars(2)}}/>}
                {stars>=2 && <img src={"/images/star_full.png"} style={{width:"75px"}} onClick={()=>{setStars(2)}}/>}

                {stars<3 && <img src={"/images/star_empty.png"} style={{width:"75px"}} onClick={()=>{setStars(3)}}/>}
                {stars>=3 && <img src={"/images/star_full.png"} style={{width:"75px"}} onClick={()=>{setStars(3)}}/>}

                {stars<4 && <img src={"/images/star_empty.png"} style={{width:"75px"}} onClick={()=>{setStars(4)}}/>}
                {stars>=4 && <img src={"/images/star_full.png"} style={{width:"75px"}} onClick={()=>{setStars(4)}}/>}

                {stars<5 && <img src={"/images/star_empty.png"} style={{width:"75px"}} onClick={()=>{setStars(5)}}/>}
                {stars>=5 && <img src={"/images/star_full.png"} style={{width:"75px"}} onClick={()=>{setStars(5)}}/>}
                <button className={"btn btn-block btn-warning text-white rounded-5 col-12 btn-lg mt-3"} onClick={()=>{rate()}}>Rate</button>
                {error && <h4 className={"text-danger text-center fst-italic mt-2"}>Please select a star above!</h4>}
            </div>
          }
          {localStorage.getItem("Role")==="CLIENT" && props.project.clientRating===null&&
              <div className={"text-center"}>
                  <h2 className={"text-center mb-2"}>Rate the <span className={"badge rounded-5 bg-warning text-white"}>FREELANCER</span> of this project</h2>

                  {stars<1 && <img src={"/images/star_empty.png"} style={{width:"75px"}} onClick={()=>{setStars(1)}}/>}
                  {stars>=1 && <img src={"/images/star_full.png"} style={{width:"75px"}} onClick={()=>{setStars(1)}}/>}

                  {stars<2 && <img src={"/images/star_empty.png"} style={{width:"75px"}} onClick={()=>{setStars(2)}}/>}
                  {stars>=2 && <img src={"/images/star_full.png"} style={{width:"75px"}} onClick={()=>{setStars(2)}}/>}

                  {stars<3 && <img src={"/images/star_empty.png"} style={{width:"75px"}} onClick={()=>{setStars(3)}}/>}
                  {stars>=3 && <img src={"/images/star_full.png"} style={{width:"75px"}} onClick={()=>{setStars(3)}}/>}

                  {stars<4 && <img src={"/images/star_empty.png"} style={{width:"75px"}} onClick={()=>{setStars(4)}}/>}
                  {stars>=4 && <img src={"/images/star_full.png"} style={{width:"75px"}} onClick={()=>{setStars(4)}}/>}

                  {stars<5 && <img src={"/images/star_empty.png"} style={{width:"75px"}} onClick={()=>{setStars(5)}}/>}
                  {stars>=5 && <img src={"/images/star_full.png"} style={{width:"75px"}} onClick={()=>{setStars(5)}}/>}
                  <button className={"btn btn-block btn-warning text-white rounded-5 col-12 btn-lg mt-3"} onClick={()=>{rate()}}>Rate</button>
                  {error && <h4 className={"text-danger text-center fst-italic mt-2"}>Please select a star above!</h4>}
              </div>
          }
      </div>

    );
}

export default RatingForm;