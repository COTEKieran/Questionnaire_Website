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

    window.onload = function () {
      pageLoaded();
      document.getElementById("resetButton").addEventListener("click",reset)
      document.getElementById("submitButton").addEventListener("click",submit)
    }

  