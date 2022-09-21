import React from 'react'


const RatingForm = (props) => {
    return(
      <div>
          <h4 className={"text-center"}>Rating</h4>
          {(localStorage.getItem("Role")==="CLIENT" && props.project.clientRating!==null) ||(localStorage.getItem("Role")==="FREELANCER" && props.project.freelancerRating!==null)&&
              <div>
                  <p>Freelancer was rated with {props.project.clientRating} stars!</p>
                  <p>Client was rated with {props.project.freelancerRating} stars!</p>
              </div>
          }
          {(localStorage.getItem("Role")==="CLIENT" && props.project.clientRating===null) ||(localStorage.getItem("Role")==="FREELANCER" && props.project.freelancerRating===null)&&
            <div>

            </div>
          }
      </div>
    );
}

export default RatingForm;