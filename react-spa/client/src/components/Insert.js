import { React, useState } from 'react';


function Insert(props) {

    const [roleError, setRoleError] = useState("");

    // Object (State Variable) that holds all the user entered data. Each object 
    // is linked with a textbox for user input. 
    const [userData, setUserData] = useState(
        {
            "webUserId": "",
            "userEmail": "",
            "userPassword": "",
            "userPassword2": "",
            "image": "",
            "birthday": "",
            "membershipFee": "",
            "userRoleId": "",
            "errorMsg": ""
        }
    );

    // This is shorter, makes a copy (then changes a value of a property of 
    // the copy) using new ES6 Object.assign function.
    const setProp = (obj, propName, propValue) => {
        var o = Object.assign({}, obj);
        o[propName] = propValue;
        return o;
    };

    // State variable to hold the Role List (gotten from getRolesAPI.jsp) 
    // Role List populates the <select tag> for the UI.
    const [roleList, setRoleList] = useState([]);

    // Object (State Variable) that holds all the error messages - field level 
    // and form/record level (errorMsg).
    const [sqlMessage, setSqlMessage] = useState("");

    const [errorObj, setErrorObj] = useState(
        {
            "webUserId": "",
            "userEmail": "",
            "userPassword": "",
            "userPassword2": "",
            "image": "",
            "birthday": "",
            "membershipFee": "",
            "userRoleId": "",
            "errorMsg": ""
        }
    )



    //an asynchronous function that will either return the API data or an error
    async function insertUser() {
        try {
            //const res = await fetch("http://localhost:5000/api/insertUser/:id/:email/:password/:image/:fee/:bday/:role");
            // /api/insertUser + userData.webUserId + "/" + 
            // try using {} notation, like "{userData.webUserId}/ ... ""
            const str = `http://localhost:5000/api/insertUser/${userData.userEmail}/${userData.userPassword}/${userData.image}/${userData.membershipFee}/${userData.birthday}/${userData.userRoleId}`;

            // str that doesnt pass webUserId bc of AutoIncrement
            //const str = `http://localhost:5000/api/insertUser/${userData.webUserId}/${userData.userEmail}/${userData.userPassword}/${userData.image}/${userData.membershipFee}/${userData.birthday}/${userData.userRoleId}`;


            // NOTE:
            /*
                - We get Error: SyntaxError: Unexpected token '<', "<!DOCTYPE "... is not valid JSON when we do calls with missing /: params. We need to do some try catching or 
                figure out how we can pass an incomplete object that still properly does the API call. Hence the reason for doing an object as the /: parameter instead of 
                multiple in a row

                Or we could figure out a way to do ?user_id="" etc...
            */

            const ministr = `http://localhost:5000/api/insertUser/${userData.webUserId}/${userData.userEmail}/${userData.userPassword}/${userData.userRoleId}`;
            console.log("STR: " + str);
            // const res = await fetch(str);
            const res = await fetch(str);


            //res.json parses the JSON response and returns a JS Object insead
            const data = await res.json();

            console.log(data);

            //set our userList array with our JS Object
            // if data contains error from BACKEND, display error
            setUserData(data);
            if(data.sqlMessage){
                console.log("DATA: " + data);
                setErrorObj({...errorObj, errorMsg: "Error: " + String(data.sqlMessage)});                
            }
        } catch (err) {
            //error catching for when database is not available
            console.log("err (caught):" + String(err));
            if(String(err) == "SyntaxError: Unexpected end of JSON input"){
                setErrorObj({...errorObj, errorMsg: "Record inserted!"});
            } else {
                setErrorObj({...errorObj, errorMsg: "Error: " + String(err)});
            }
        }
    }

    return (
        <div className="spaPage">
            <h2 className="heading">Insert Page</h2>
            <table className="insertArea">
                <tbody>
                    <tr>
                        <td>Email</td>
                        <td>
                            <input value={userData.userEmail} onChange=
                                {e => setUserData({...userData, userEmail: e.target.value})}
                            />
                        </td>
                        <td className="error">
                            {errorObj.userEmail}
                        </td>
                    </tr>
                    <tr>
                        <td>Password</td>
                        <td>
                            <input type="password" value={userData.userPassword} onChange=
                                {e => setUserData({...userData, userPassword: e.target.value})}
                            />
                        </td>
                        <td className="error">
                            {errorObj.userPassword}
                        </td>
                    </tr>
                    <tr>
                        <td>Re-enter Password</td>
                        <td>
                            <input type="password" value={userData.userPassword2} onChange=
                                {e => setUserData(setProp(userData, "userPassword2", e.target.value))}
                            />
                        </td>
                        <td className="error">
                            {errorObj.userPassword2}
                        </td>
                    </tr>
                    <tr>
                        <td>Image</td>
                        <td>
                            <input value={userData.image} onChange=
                                {e => setUserData(setProp(userData, "image", e.target.value))}
                            />
                        </td>
                        <td className="error">
                            {errorObj.image}
                        </td>
                    </tr>
                    <tr>
                        <td>Birthday</td>
                        <td>
                            <input value={userData.birthday} onChange=
                                {e => setUserData(setProp(userData, "birthday", e.target.value))}
                            />
                        </td>
                        <td className="error">
                            {errorObj.birthday}
                        </td>
                    </tr>
                    <tr>
                        <td>Membership Fee</td>
                        <td>
                            <input value={userData.membershipFee} onChange=
                                {e => setUserData(setProp(userData, "membershipFee", e.target.value))}
                            />
                        </td>
                        <td className="error">
                            {errorObj.membershipFee}
                        </td>
                    </tr>
                    <tr>
                        <td>Role</td>
                        <td>
                            {/* to be changed to a drop down, this for time being */}
                            <input value={userData.userRoleId} onChange=
                                    {e => setUserData({...userData, userRoleId: e.target.value})}
                                />
                        </td>
                        <td className="error">
                            {errorObj.userRoleId}
                        </td>
                    </tr>
                    <tr>
                        <td>
                            <br />
                            <button type="button" onClick={insertUser}>Save</button>
                        </td>
                        <td className="error" colSpan="2">
                            <br />
                            {errorObj.errorMsg}
                            <div>
                                {roleError}
                            </div>
                        </td>
                    </tr>
                </tbody>
            </table>

        </div>
    )
}

export default Insert;