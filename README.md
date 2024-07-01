This is a readme file of note-taking-app. To run the following project open 2 terminals concurrently in one of the start react file by cd note-taking-app-frontend -> npm start
And in the second terminal start backend with cd note-taking-app-backend -> node customers.js
Before I will start talking about the functional part, I will write the structure how I constructed the file:
NOTE-TAKING-APP
* note-taking-app-backend
* note-taking-app-frontend
I have 2 parts of the program backend and frontend, In the frontend part I design template for signing up, loggin in and creating note, when the user register, logs in or creates notes, all the data is stored in backend file, called customers.js which is exrpress.js file. Now let’s talk about each file separately.

NOTE-TAKING-APP-FRONTEND:
v src
components
* CreateNote.css
* Js CreateNote.js
* Js Log.js
* Notes.css
* JS Notes.js
* SignUp.css
* Js SignUp.js
* UserAuthentication.css
App.css
JS App.js
index.css
js index.js

In this folder I have frontend design for sign up, log in and creating note.

SIGN UP:
In the SignUp.js class I have 5 useState, name, last name, email, username and password. I have made classical signUp template, with constraint that all the fields should be filled(non of them should be empty) then when all the values are set I have a button, that has handle click function. This function connects backend on port http://localhost:5000/signup and as soon as some user will be registered customers.js get this info with this port and update the list od users that I defined in this class. Also, in this function I check if some of the field is missing or not, if it missing then I return error message, when I will send the data to this port then I wait to get response, response can be 2 types, user is successfully created or some error, if there is some error user is notified that sign in failed and he should try it again.


LOG IN
 The next class is log class, where user is able to log in and log out the system, for this I have 3 usestate usernameoremail, password, loggedInUser. In general I have 2 types of css, one that is when nobody is logged in and I check it with loggInUser usestate and in this case registered user can log in the system, and the second when someone is logged in. In this case nobody can log in only this user can log out . Like in the previous class, I have 2 files one for username/email and second for password, when button is clicked at first I call handle login function that checks if all the fields are filled and if it is then send the log in request to backend customers.js, on the port 'http://localhost:5000/login' customers.js is waiting the user to check, when something is on the port it reads it and check in the registered users if the gives user exists, if it exists then it send successful message and user is logged in, otherwise again error message is sent. When the user is logged in and it automatically log him out and convert front end to previous state. Also, in this task I have one more functionality when the note is created it may have 2 types of privacy private or public, if it is public only the user who created it can see it, but public notes is visible for everyone. 

CREATE NOTE 
In the following class, I manage to create the notes, like in the previous classes I have some usestates: title, description, category, privacy. All of them are attributes of the note. Again I check if all of them are filled during click event in handle click, if not I return the  error message, Again when note is created it also check if some user is logged in if not it returns error message. Finally, if everything is well, it send the data to 'http://localhost:5000/createnote' where backend is located and waiting frontend message, as soon as it receives one message it add is to notes list. 


NOTES
In this class I display all the notes that are created in custormers.js class gets setNotes and setbackup notes and every time when the notes is changed it display changed notes, also in this class I added an icon for deletion, to delete the note you should press this icon and server will send deletion request to customers.js `http://localhost:5000/deletenote` on this port, as soon as backend get this request it goes to notes list and deletes it from the notes list, after that is send successful request to notes class and notifies the create note class that he changed notes, and create note should also change it in the usestate.

APP
App combines all the classes together, but it also gives extra tools for them, here I have some filters, it iterates over the list of notes and filters with some property each of them, I have filters for title, description, category, user, date. The logic for all of them are the same, so let’s consider one of them, title for example: 
￼
I create some new list and filter the previous list with filter function. Then after I will get this sorted list I updated the notes with setNote(sorted). This way filter change change the notes and is never possible to restore them, but I have solution for it, I have created some backup list that is the same as notes, and I don’t modify it with filters or sorters, so I added extra button to restore the notes and when I click this button I assign backup to notes and it is restored.
Also in the following class I have some sorters: by title, create date, category, let’s discuss one and all the others are the same:
￼
It works mostly the same like filter function, it creates some list and after it sort notes, it is sorted here, then update with setNotes(sorted) and in case of restoring this button is also active for it.
Finally I combine all the classes here as :
<CreateNote setNotes={setNotes} notes={notes} backup={backup} setBackup={setBackup} />
<SignUp />
<UserAuthentication />
<Notes notes={notes} setNotes={setNotes} backup={backup} setBackup={setBackup} />

And each of them creates above described object with respective functionalities. And as the last part, I add label “all user” which define if all the notes be visible or not, if it is check then all the label becomes visible for everyone, otherwise the visibility works like in the previous case, public is visible for everyone and private is visible only for user who create it.


NOTE-TAKING-APP-BACKEND:
This is a exrpress.js class responsible for connections for different frontend classes and storing the data. It have several port: signup port with which it connect to signup class and I explain above how it works. As well as, create note, login and delete note ports. 
