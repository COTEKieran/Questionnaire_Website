async function pageLoaded() {
  const response = await fetch('questions.json');
  const data = await response.json();
  console.log(data);

  read(data);
  
}

function read(data) {
  console.log(data);
  const body = document.getElementById('questions');
  for (let i = 0; i < data.questions.length; i++) {
    const questionName = document.createElement("h5");
    questionName.textContent = data.questions[i].text;
    body.appendChild(questionName);

    if (data.questions[i].type == 'text') {
      const txt = document.createElement('input');
      txt.setAttribute('type', 'text');
      body.appendChild(txt);
    }

    if (data.questions[i].type == 'number') {
      const num = document.createElement('input')
      num.setAttribute('type', 'number');
      body.appendChild(num);
    }

    if (data.questions[i].type == 'single-select') {
        const options = data.questions[i].options;
        const ul = document.createElement('ul');
        const length = data.questions[i].options.length;
        for (let i = 0; i < length; i++) {
          const li = document.createElement('li');
          const single = document.createElement('input');
          single.setAttribute('type', 'radio');
          single.setAttribute('name', 'single');
          const label = document.createElement('label');
          label.textContent = options[i];
          li.append(single);
          li.append(label);
          ul.appendChild(li);
        }
        body.appendChild(ul);
      }


      if (data.questions[i].type === 'multi-select') {
        const options = data.questions[i].options;
        const ul = document.createElement('ul');
        const length = data.questions[i].options.length;
        for (let i = 0; i < length; i++) {
          const li = document.createElement('li');
          const multiple = document.createElement('input');
          multiple.setAttribute('type', 'checkbox');
          multiple.setAttribute('name', 'mutiple');
          const label = document.createElement('label');
          label.textContent = options[i];
          li.append(multiple);
          li.append(label);
          ul.appendChild(li);

        }
        body.appendChild(ul);

      }

    }

  

  }

    function reset(){
      document.getElementById("questions").reset();
    }

    function submit(){
      document.getElementById("questions").submit();
    }



    function dropdownFunction() {
      document.getElementById("myDropdown").classList.toggle("show");    
    }

   /// GOOGLE
   function onSignIn(googleUser) {
    const profile = googleUser.getBasicProfile();
    console.log('ID: ' + profile.getId()); // Do not send to your backend! Use an ID token instead.
    console.log('Name: ' + profile.getName());
    console.log('Image URL: ' + profile.getImageUrl());
    console.log('Email: ' + profile.getEmail()); // This is null if the 'email' scope is not present.
    const el = document.getElementById('greeting');
    el.textContent = 'Hello ' + profile.getName() + '!';
    const pr = document.getElementById('linkToHome');
    pr.style.visibility = 'visible';
    let link = document.createElement('a');
    link.textContent = 'Continue to Account';
    link.href = 'http://localhost:8080/completequestionnaire.html';
    pr.appendChild(link);
    document.getElementById('signoutlink').style.visibility= 'visible';
  
    // The ID token you need to pass to your backend:
    var id_token = googleUser.getAuthResponse().id_token;
    console.log("ID Token: " + id_token);
  }
    
  


  async function signOut() {
    location.reload();
    await gapi.auth2.getAuthInstance().signOut();
    console.log('User signed out.');
    const el = document.getElementById('greeting');
    el.textContent = 'Not Signed In';
    document.getElementById('linkToHome').style.visibility='hidden';
    document.getElementById('signoutlink').style.visibility = 'hidden';
    
   
  }

    window.onload = function () {
      pageLoaded();
      document.getElementById("resetButton").addEventListener("click",reset)
      document.getElementById("submitButton").addEventListener("click",submit)
    }


    
   