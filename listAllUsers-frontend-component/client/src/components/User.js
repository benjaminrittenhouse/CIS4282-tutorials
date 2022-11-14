
//This is a React Component that will be used to display the information of a SINGLE user.
//It will take in an propsect "props".
function User({ props }) {  
  return (
    <div className="spaPage">
      <div className="grid-container">
        {/* info is extracted and displayed from the propsect passed*/}
        <div className="info-col">
          <h2><u>User {props.web_user_id}</u></h2>
          <p>Email: {props.user_email}</p>
          <p>Password: {props.user_password}</p>
          <div className="img-col">
            <div className="expanded-grid-child-image">
                <img className="imageThumb" src={props.image} alt="not found" />
              </div>
          </div>
          <h4>Role: {props.role_type}</h4>
        </div>
      </div>
    </div>
  )
} //End User

export default User;