/// GOOGLE
function onSignIn(googleUser) {
    const profile = googleUser.getBasicProfile();
    const el = document.getElementById('greeting');
    el.textContent = 'Hello ' + profile.getName() + '!';
    const pr = document.getElementById('linkToHome');
    pr.style.visibility = 'visible';
    let link = document.createElement('a');
    link.textContent = 'Continue to Account';
    link.href = 'http://localhost:8080/completequestionnaire.html';
    pr.appendChild(link);
    document.getElementById('signoutlink').style.visibility= 'visible';
  console.log('ID: ' + profile.getId()); // Do not send to your backend! Use an ID token instead.
  console.log('Name: ' + profile.getName());
  console.log('Image URL: ' + profile.getImageUrl());
  console.log('Email: ' + profile.getEmail()); // This is null if the 'email' scope is not present.
callServer();
  }


  async function signOut() {
    location.reload();
    await gapi.auth2.getAuthInstance().signOut();
    console.log('User signed out.');
    const el = document.getElementById('greeting');
    el.textContent = 'Not Signed In!';
    document.getElementById('linkToHome').style.visibility='hidden';
    document.getElementById('signoutlink').style.visibility = 'hidden';


  }

  async function callServer() {
    const token = gapi.auth2.getAuthInstance().currentUser.get().getAuthResponse().id_token;
  
    const el = document.getElementById('server-response');
    el.textContent = 'loading…';
  
    const fetchOptions = {
      credentials: 'same-origin',
      method: 'GET',
      headers: { 'Authorization': 'Bearer ' + token },
    };
    const response = await fetch('/api/hello', fetchOptions);
    if (!response.ok) {
      // handle the error
      el.textContent = "Unauthorised User\n" + "Error code" + " " + response.status;
      return;
    }
  
    // handle the response
    const data = await response.text();
    console.log('setting text content: ' + data);
    el.textContent = data;
  }

  

 