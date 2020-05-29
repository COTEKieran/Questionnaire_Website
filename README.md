Web Programming 2020- Questionnaire Engine

Key Features:

1. 
The first page of the applicaiton is the login page. The user logs onto the application using their Google Sign-In. Once the user has entered the correct details, they are authenticated to view the rest of the application. An authentication message will appear on the interface to let the user know they have been authenticated by the server. 

2. 
After the user is logged in they are greeted by a welcome page; from here they can navigate around the app or choose to sign out again if they wish. 

3. 
On the Questionnaire page of the app, users can fill in the form and submit it using the button. Once submitted, their response is logged to the console. 


Design and Implementation rationale:

The first step for creating the application was setting up the server. This meant the application could be tested throughout development on localhost:8080. HTML pages were put in place to view, however the actual design of the interface was not considered until much later on in the process. After setting up the server, attention turned to creating the questionnaire from the exmaple JSON file provided. The questions, inputs and labelled were sent to the front-end HTML pages through a series of JavaScript functions- this was the main bulk of the process as it was a challenge to log the user's responses to the console in the correct format. 

It was after the creation of the questionnaire and the JavaScript functions were made that it was decided to start focusing more on the front-end of the website. When considering design, simplicity and usability were the priorities. It had to be clear to the user how to use the app and how to access its features. Due to these priorities, a minimalistic design was used, only including features which were absolutely necessary. Another important feature of the front-end was that it had to be responsive and accessible on mobile. This meant that when the screen size changes, the features must all still be accessible whilst maintaining a clear design. The pages wereb made responsive through CSS, using vw to measure font size as pixels making use of the @media feature to ensure the pages are viewable on smaller screen sizes. The navigation bar and the change that it makes when the screen size decereases is a great exmaple of how resonsiveness has been considered in the design of this applciation. When the screen size gets small enough, the buttons in the header get turned into a drop down to save space. 

After creating the responsibve front-end, additional features were considered. This led to the addition of the Google OAuth login system. The server works with the Google-auth-library in order to create the Google-customsied login button that lets the user sign into the app with their Google credentials. Once signed in, there is a message to the user that lets them know that they are authenticated to use the app. There is an error message if the user is not signed in, or not authenitcated. The addition of Google OAuth was a worthwile one that develops the professionalism of the applciation. 