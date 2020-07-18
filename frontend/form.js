//The form.js JavaScript file reads the questions.json file and displays it to the user as a questionnaire. 

//This function retreives the JSON file through fetch. Data is then passed through the read function.

async function pageLoaded() {
  const response = await fetch('/completeform');
  const data = await response.json();
  retrieveJSON(data);

}

//The read function reads the JSON file and translates its contents to the front-end element with the id "questions."
//Each question is assigned a questionName and all theb questions are appended to the questionnaire. 
function retrieveJSON(data) {

  const body = document.getElementById('questions');
  for (let i = 0; i < data.questions.length; i++) {
    let questionName = document.createElement("h2");
    questionName.classList.add("questionName");
    questionName.textContent = data.questions[i].text;
    body.appendChild(questionName);



    if (data.questions[i].type == 'text') {
      const text = document.createElement('input');
      text.setAttribute('type', 'text');
      text.setAttribute('name', 'text' + (i + 1)); //Questions are set typ and name attributes, and are added to the questionResponse class.
      text.classList.add('questionResponse');
      body.appendChild(text);

    }

    if (data.questions[i].type == 'number') {
      const num = document.createElement('input') //An input is also  created for each question.
      num.setAttribute('type', 'number');
      num.setAttribute('name', 'number');
      num.classList.add('questionResponse');
      body.appendChild(num);
    }

    if (data.questions[i].type == 'single-select') {
      const options = data.questions[i].options;
      const ul = document.createElement('ul');
      const length = data.questions[i].options.length; //A list is created through the use of li and ul. 
      for (let i = 0; i < length; i++) {
        const li = document.createElement('li');
        const single = document.createElement('input');
        single.setAttribute('type', 'radio'); //for the single select question, radio buttons are used. 
        single.setAttribute('name', 'single');
        single.setAttribute('value', options[i]); //value is assigned as options- this links with the questionnaire json file. 
        single.classList.add('questionResponse');
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
        multiple.setAttribute('type', 'checkbox'); //Checkboxes are used insteadf of radio for the multi-select question; this allows for more than one option to be chosen.
        multiple.setAttribute('name', 'mutiple');
        multiple.setAttribute('value', options[i]);
        multiple.classList.add('questionResponse');
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
//The reset function makes the front-end button reset the questionnaire. 
function reset() {
  document.getElementById("questions").reset();
}



//The reieveJson function acquires all of the question names, the question responses and question types and returns them to the console. 

function getResponses() {
  let namesElement = document.getElementsByClassName("questionName");
  let responseElement = document.getElementsByClassName("questionResponse");

  const formData = new FormData(document.querySelector('#questions'));
  let responseNameArray = new Array();

  for (let i = 0; i < responseElement.length; i++) {
    let questionName = responseElement[i].getAttribute('name');
    if (responseNameArray.indexOf(questionName) == -1) {
      responseNameArray.push(questionName);           
    }
  }
  let responseArray = new Array();
  for (let i = 0; i < responseNameArray.length; i++) {
    responseArray[i] = formData.getAll(responseNameArray[i]);
  }

  let nameArray = new Array();
  let typeArray = new Array();

  for (let i = 0; i < namesElement.length; i++) {
    nameArray[i] = namesElement[i].textContent;
    typeArray[i] = responseElement[i].getAttribute("type");
  }

  console.log("These are the question names: " + nameArray);
  console.log("These are the question responses: " + responseArray);   //Here the three arrays are logged to the console seperately. 
  console.log("These are the question types: " + typeArray);

  let responses = new Array();
  responses[0] = nameArray;
  responses[1] = responseArray;
  responses[2] = typeArray;

  let data = {
    questionnaire: responses
  };
  let json = JSON.stringify(data); //All the arrays are combined into one array which contains the questions, responses and question types. 

  return json;
}

function submit() {
  

  
  
  uploadQuestionaire();
  
  
}



//This function sends the user's responses, along with the question names and types to a new JSON file, which can be downloaded. 
function uploadQuestionaire() {
  try {
    let json = getResponses();
    console.log(json);
    const options = {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: json
    };
    fetch('/post-test', options);
  } catch (err) {
    console.log("File not uplodaded. Error: " + err);
  }
}





//This function comes into operation when the user clicks on the dark mode button on the questionnaire page.
//The function changes the colours of the elements on the page for a more approriate user experience.
//This could be when it is night time and the user requires a darker page for their eyes.
function toggleDarkMode() {
  document.body.style.backgroundImage = "url('images/backgrounddark.jpg')";
  document.body.style.color = "white";
  document.body.style.transitionDuration = "1s";
  document.getElementById("header").style.background = "black";
  document.getElementById("header").style.transitionDuration = "0.25s";

  document.getElementById("toggleLM").style.visibility = "visible";
  document.getElementById("toggleDM").style.visibility = "hidden";



}
//This function toggles the light mode back on after the user has been on dark mode. 
//The colours change back to suit the user's light mode preference. 
function toggleLightMode() {
  document.body.style.backgroundImage = "url('images/background.jpg')";
  document.body.style.color = "black";
  document.body.style.transitionDuration = "1s";
  document.getElementById("header").style.background = "#1e3964";
  document.getElementById("header").style.transitionDuration = "0.25s";

  document.getElementById("toggleDM").style.visibility = "visible";
  document.getElementById("toggleLM").style.visibility = "hidden";
}




//This adds the event listeners to the submit and rest buttons of the questionnaire.
window.onload = function () {
  pageLoaded();
  document.getElementById("resetButton").addEventListener("click", reset)
  document.getElementById("submitButton").addEventListener("click", submit)
}