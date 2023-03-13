<img src="https://img.shields.io/badge/Reddit-FF4500?style=for-the-badge&logo=reddit&logoColor=white" /><img src="https://img.shields.io/badge/React_Native-20232A?style=for-the-badge&logo=react&logoColor=61DAFB" />
<img src="https://img.shields.io/badge/Redux-593D88?style=for-the-badge&logo=redux&logoColor=white" />
<img src="https://img.shields.io/badge/Expo-1B1F23?style=for-the-badge&logo=expo&logoColor=white" />
<img src="https://img.shields.io/badge/Postman-FF6C37?style=for-the-badge&logo=Postman&logoColor=white" />
<img src="https://img.shields.io/badge/Microsoft_Teams-6264A7?style=for-the-badge&logo=microsoft-teams&logoColor=white" />
<img src="https://img.shields.io/badge/Figma-F24E1E?style=for-the-badge&logo=figma&logoColor=white" />

# Application Redditech

## Introduction 🧑‍💻

Redditech is a mobile app which allow you to use Reddit with a simplified interface. Thus you could consult your favorite subreddit, comment them and see all your activities/publication on the network while enjoying a purified and smooth design.

Our app is available on Android for now.

## Technologies 🚀

To build this application, we used a modern development stack :

<img src="https://img.shields.io/badge/Reddit-FF4500?style=for-the-badge&logo=reddit&logoColor=white" /> React-Native for the front-end 

<img src="https://img.shields.io/badge/React_Native-20232A?style=for-the-badge&logo=react&logoColor=61DAFB" /> Redux for local storing

<img src="https://img.shields.io/badge/Redux-593D88?style=for-the-badge&logo=redux&logoColor=white" /> Expo (an open-source platform for making universal native apps)

<img src="https://img.shields.io/badge/Postman-FF6C37?style=for-the-badge&logo=Postman&logoColor=white" /> Postman for for API calls

<img src="https://img.shields.io/badge/Microsoft_Teams-6264A7?style=for-the-badge&logo=microsoft-teams&logoColor=white" /> Teams for project management & communication

<img src="https://img.shields.io/badge/Figma-F24E1E?style=for-the-badge&logo=figma&logoColor=white" /> Figma for app modeling

## Prequisites 🛠️

To run our application you need : 
- expo@47.0.12
- react@18.1.0
- react-native@0.70.5

be careful about the version you use, we do not guarantee the proper functioning of the app on other version. 

## Setup 🧾

Once you've download the application via this github, you have to check if you have npm and node install on your computer and Expo on your mobile phone.

When all of this is done, you can write 

```npm i```

to download all the dependencies 

## Use ✌️

write : 

```npm start```  

to run the application. 

"npm start" will run the command "expo start" that will run a QR code to flash with your phone. Once you select the name of the application the GRADLE build will occu and you will be able to access the application.

IMPORTANT : Be sure to be on the same network because the application run on a specific IP (the one you use with your computer).

Our application is accessible only for the reddit user via an Oauth2 authentification via REDDIT API. So if it's not already done you must create an account. 

## Code structure 🏘️

As the application don't need backend you will only have a front-end folder. 

To create the application we used a SDK from expo that insert automatically the settings to adapt for mobile use. 

The views of applications are mainly alter by the following folder :

- Page : That contain the Help section (beggining carousel for newcomer) and the login with the OAUTH2 mechanics.

- Component : That contain the main part of the application such as "menu", "profil", etc.

- Assets : for the img.

As I said before concerning the authentication, you will find in ./page/login the index.js file and in the "./hooks.useToken" all the steps the program do to store and create a token for the user, from the REDDIT API.

To store the token locally and avoid, daily (even hourly) login with Ouath2 we stored the token via REDUX, you will find the program in the REDUCER folder.

## Contributions 😉

As the a response to this readMe you can write us a comment on the gitHub to tell us about any features that could help us to improve our work. 

We thank you very much for the time you will take to inspect, analyse and evaluate our application. We hope you enjoy the content. 

There are a lot of feature to come such as : 

- The possibility to interact with your friend,

- The dark mode.

- Many more..

## CREATORS 🔝

Under the supervision of Epitech Technology Toulouse. 

|                                                                                                                                                    Author                                                                                                                                                     |                                                                                                                                     Author                                                                                                                                      |                                                                                                                                                    Author                                                                                                                                                     |
| :-----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------: | :-----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------: | :-----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------: |
| [<img src="https://github.com/clement-mendes.png?size=115" width=115><br><sub>@clement-mendes</sub>](https://github.com/clement-mendes) <br><br> [![](https://img.shields.io/badge/GitHub-100000?style=for-the-badge&logo=github&logoColor=white)](https://github.com/clement-mendes) | [<img src="https://github.com/cyrcab.png?size=250" width=115><br><sub>@cyrcab</sub>](https://github.com/cyrcab) <br><br> [![](https://img.shields.io/badge/GitHub-100000?style=for-the-badge&logo=github&logoColor=white)](https://github.com/cyrcab) | [<img src="https://github.com/AlexMerigot.png?size=250" width=115><br><sub>@AlexMerigot</sub>](https://github.com/AlexMerigot) <br><br> [![](https://img.shields.io/badge/GitHub-100000?style=for-the-badge&logo=github&logoColor=white)](https://github.com/AlexMerigot) |
