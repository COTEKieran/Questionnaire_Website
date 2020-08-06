// GOOGLE
// The following functions allow for Google login authenitcation onto the web application. 
//They work with the Google-auth-library module so that the server successfuly communicates with the Google API.
//The user signs in with their Google account, the server captures their ID token, name and email details.  
//This allows the user to access the web application, and sign out whenebver they would like. 

//The onSignIn function occurs when the user clicks on the Google Sign In button on the index page of the application. 
//It communicates with the Google Authenitcation library so that the user can enter their Google email and password- information is sent to the backend server and the console.
//This function also shows the "continue to application" link which directs the user to the next page of the app. The 'Sign Out' button also appears after the user signs in.
//The callServer() function is also called here- this function will be discussed down below. 
function onSignIn(googleUser) {
  console.clear();
    const account = googleUser.getBasicProfile(); //Communicated with google-auth-library to receive Google API and user details
    const welcome = document.getElementById('greeting');
    welcome.textContent = 'Welcome ' + account.getName() + '!';
    const homeLink = document.getElementById('linkToHome');
    homeLink.style.visibility = 'visible';
    let link = document.createElement('a');
    link.textContent = 'Continue to Application'; //Button created after user signs in with Google Account
    link.href = 'http://localhost:8080/welcome.html'; //Link to the next page of the application- accessible after user signs in 
    homeLink.appendChild(link);
    document.getElementById('signoutlink').style.visibility= 'visible';
  console.log('Name: ' + account.getName());
  localStorage.setItem("username",account.getName()); //The user's name and email address is added to the local stoage for later use. 
  
  console.log('Email: ' + account.getEmail()); 
  localStorage.setItem("email", account.getEmail());
callServer(); //The callServer function is called to communicate with the server for authentication.
  }

//The signOut function occurs when the user clicks on the 'Sign Out' button- ths button is displayed just after the user signs in.
//This function is also available on every page of the appication- with the 'Sign Out' button on the navigation pane. 
  async function signOut() {
    location.reload();
    await gapi.auth2.getAuthInstance().signOut(); //Communicating with the google library to allow the user to sign out from their profile.
    console.log('User signed out.');
    const welcome = document.getElementById('greeting'); //Clicking 'Sign Out' changes what is displayed to the user.
    welcome.textContent = 'User is not signed In!';
    document.getElementById('linkToHome').style.visibility='hidden';
    document.getElementById('signoutlink').style.visibility = 'hidden'; 
    console.clear();
  }


//The callServer function occurs when the user signs in using their Google account. It's purpose is to authenticate the user befire they sign in to the app.
//The user's ID token is used for this authentication. 
  async function callServer() {
    const uniqueToken = gapi.auth2.getAuthInstance().currentUser.get().getAuthResponse().id_token;

    const welcome = document.getElementById('server-response');
    welcome.textContent = 'loading…';

    const fetchOptions = {
      credentials: 'same-origin',
      method: 'GET',
      headers: { 'Authorization': 'Bearer ' + uniqueToken },
    };
    const checkAuthentication = await fetch('/api/hello', fetchOptions);
    if (!checkAuthentication.ok) {
      // handle the error
      welcome.textContent = "Unauthorised User\n" + "Error code" + " " + checkAuthentication.status; //This is shown on the login page if the user is not authenticated or not signed in.
      return;
    }
    // handle the response
    const message = await checkAuthentication.text();
    console.log(message);
    welcome.textContent = message;
  }

  
//This is a small function which allows the navigation pane to work throughout the application.
  function dropdownFunction() {
    document.getElementById("myDropdown").classList.toggle("show"); 
    
  
  }
  
//On the welcome page, the user's name is included through the use of local storage. 
  function welcomeName(){
    document.getElementById("welcome").innerHTML = "Welcome to Questionnaire Buddy, " + localStorage.getItem("username"); 
  }


  