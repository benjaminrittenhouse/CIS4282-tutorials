  
  import User from './User.js';
  import {React, useEffect, useState} from 'react';

  //This is the function that is being rendered by ReactDOM
  function Display(props) {

    //used to store the JS Object that comes from the API call
    const [userList, setUserList] = useState([]);


      //an asynchronous function that will either return the API data or an error
      async function fetchAllUsers() {
        try {

          //we use the "await" keyword here because we have to wait for this API call to complete.
          //we cannot continue without the information returned here.
          const res = await fetch("http://localhost:5000/api/listAllUsers");

          //res.json parses the JSON response and returns a JS Object insead
          const data = await res.json();

          console.log(data);

          //set our userList array with our JS Object
          setUserList(data);
        } catch (err) {
          //error catching
          console.log(err);
        }
      }

    //useEffect will run upon loading the page, this is where we will call our display API
    useEffect(() => {

      fetchAllUsers();
    }, []);


    // user id for single user sort
    const [userID, setUserID] = useState("");
    const handleChange = (event) => {
      const value = event.target.value;
      setUserID(value);
      console.log("ID is now " + userID);
    };

    async function fetchSingleUser() {
      try {

        //we use the "await" keyword here because we have to wait for this API call to complete.
        //we cannot continue without the information returned here.
        const res = await fetch("http://localhost:5000/api/getUser/" + userID);

        //res.json parses the JSON response and returns a JS Object insead
        const data = await res.json();

        console.log(data);

        //set our userList array with our JS Object
        setUserList(data);
      } catch (err) {
        //error catching
        console.log(err);
      }
    }


    return (
      <div className="spaPage">
        <div className="main">
          <h2 className="heading">Web User Display</h2>
          <h3>Get by ID:</h3>
          <input 
            type="text"
            id="userID"
            name="userID"
            onChange={handleChange}
            value={userID}
            autoComplete="off"
          />
          <button onClick={() => fetchSingleUser()}>Find</button>
          <button onClick={() => fetchAllUsers()}>Reset</button>
          <div className="userTable">

            <div className="tableBody">
              {userList.length > 0 ? (
                userList.map((ele) => (
                  <div key={ele.id} className="userBlock">
                    <User props={ele} />
                  </div>
                ))
              ) : (
                <p>No Users Found</p>
              )}
            </div>
          </div>
        </div>
      </div>
    );
  } // end of DisplayUsers() function

export default Display;
