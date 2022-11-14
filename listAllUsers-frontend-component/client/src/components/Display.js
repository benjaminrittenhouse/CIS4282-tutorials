import React, {useState, useEffect} from "react";
import User from "../components/User";
import "../../src/style.css"

function Display(props) {

//used to store the JS Object that comes from the API call
const [userList, setUserList] = useState([]);


  //an asynchronous function that will either return the API data or an error
  async function fetchAllUsers() {
    try {
      //we use the "await" keyword here because we have to wait for this API call to complete.
      //we cannot continue without the information returned here.
      const res = await fetch(
        process.env.REACT_APP_API_URL + "/api/listAllUsers"
      );

      //res.json parses the JSON response and returns a JS Object insead
      const data = await res.json();

      console.log("Setting user list: " + JSON.stringify(data));
      //set our userList array with our JS Object
      setUserList(data);
    } catch (err) {
      //error catching
      console.log(err);
    }
  }

  useEffect(() => {
    fetchAllUsers();
  }, []);


  return (
    <div className="spaPage">
      <div className="main">
        <h2 className="heading">ListAllUsers React Component</h2>
        <div className="userTable">
            
          <div className="tableBody">
            {userList.length > 0 ? (
              userList.map((ele, index) => (
                <div key={index} className="userBlock">
                  <User props={ele} />                  
                </div>
              ))
            ) : (
              <div>
                <p>No Users Found</p>
              </div>
            )}
            </div> 
        </div>
      </div>
    </div>
  );
} // end of Display() function

export default Display;
