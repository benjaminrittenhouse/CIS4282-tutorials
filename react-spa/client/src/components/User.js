
//This is a React Component that will be used to display the information of a SINGLE user.
//It will take in an propsect "props".
function User({ props }) {

  //takes the image url stored in the database and finds the matching picture in our pics folder
  var imageName = "./pics/" + props.image;
  var rollType = "";

  if (props.user_role_id == 1) {
    rollType = "Admin"
  } else if (props.user_role_id == 2) {
    rollType = "View"
  } else {
    rollType = "Member"
  }

  return (
    <div className="spaPage">
      <div className="grid-container">
        {/* info is extracted and displayed from the propsect passed*/}
        <div className="info-col">
          <h2><u>User {props.web_user_id}</u></h2>
          <p>Email: {props.user_email}</p>
          <p>Password: {props.user_password}</p>
          <div className="img-col">
            <div className="userPics">
              <p><u>Image</u></p>
              <img src={imageName} alt="Picture not found" />
            </div>
          </div>
          <h4>Role: {rollType}</h4>
        </div>
      </div>
    </div>
  )
} //End User

export default User;