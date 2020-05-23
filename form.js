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
    let questionName = document.createElement("h5");
    questionName.classList.add("questionName");
    questionName.textContent = data.questions[i].text;
    body.appendChild(questionName);

    if (data.questions[i].type == 'text') {
      const text = document.createElement('input');
      text.setAttribute('type', 'text');
      text.classList.add('questionResponse');
      body.appendChild(text);
    }

    if (data.questions[i].type == 'number') {
      const num = document.createElement('input')
      num.setAttribute('type', 'number');
      num.classList.add('questionResponse');
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
          multiple.setAttribute('type', 'checkbox');
          multiple.setAttribute('name', 'mutiple_ ' + options[i]);
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

    function reset(){
      document.getElementById("questions").reset();
    }



    function getResults(typeArray, responseElement){
      let responseArray = new Array();
      for (let i = 0; i < typeArray.length; i++){
        if(typeArray[i] == "text" || typeArray[i] == "number"){
          responseArray[i] = responseElement[i].value;
        }
        else if (typeArray[i] == "radio"){
          responseArray[i] = responseElement[i].value;
        }
        else if (typeArray[i] == "checkbox"){
          responseArray[i] = responseElement[i].value;
        }
      }

    return responseArray;
    }

    function receiveJson(){
      let namesElement = document.getElementsByClassName("questionName");
      let responseElement = document.getElementsByClassName("questionResponse");

      let nameArray = new Array();
      let responseArray = new Array();
      let typeArray = new Array();

      for(let i = 0; i < namesElement.length; i++){
        nameArray[i] = namesElement[i].textContent;
        typeArray[i] = responseElement[i].getAttribute("type");
      }

      responseArray = getResults(typeArray, responseElement);

      console.log(nameArray);
      console.log(responseArray);
      console.log(typeArray);

      let responses = new Array();
      responses[0] = nameArray;
      responses[1] = responseArray;
      responses[2] = typeArray;

      let data = { questionnaire: responses };
      let json = JSON.stringify(data);

      return json;
    }

    function submit(){
      // document.getElementById("questions").submit();
     
      let json = receiveJson();
      console.log(json);
    }

    function uploadQuestionaire(){
      try{
        let json = receiveJson();
        console.log(json);
        const options = {
          method: 'POST',
          headers: {
              'Content-Type': 'application/json'
          },
          body: json
      };
      fetch('/post-upload', options);
      }
      catch(err){
          console.log("File can not be uploaded at this moment Err:" + err);
      }
        }
  



    function dropdownFunction() {
      document.getElementById("myDropdown").classList.toggle("show");    
    }

    function toggleDarkMode(){
      document.body.style.backgroundImage = "url('images/backgrounddark.jpg')";
      document.body.style.color = "white";
      document.body.style.transitionDuration = "1s";
      document.getElementById("header").style.background = "black";
      document.getElementById("header").style.transitionDuration = "1s";
    
      
      
      
    }

    function toggleLightMode(){
      document.body.style.backgroundImage = "url('images/background.jpg')";
      document.body.style.color = "black";
      document.body.style.transitionDuration = "1s";
      document.getElementById("header").style.background = "#2f5a9e";
      document.getElementById("header").style.transitionDuration = "1s";
      
  
    }
  
      



    window.onload = function () {
      pageLoaded();
      document.getElementById("resetButton").addEventListener("click",reset)
      document.getElementById("submitButton").addEventListener("click",submit)
    }


    
   