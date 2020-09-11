# NodeMailer
This is a program that makes use of a module of node.js called NodeMailer that helpes sending emails. 
<br>
Here are the docs to nodemailer : https://nodemailer.com/about/
<br>
## Requirements
You must have Nodemailer, mode, nodemailer-express-handlebars and  csv-parser parser installed.<br>
First install node from :https://nodejs.org/en/download/  <br>
Then you can use node to download the remaining dependencies as follows <br>
'npm install nodemailer'
'npm install nodemailer-express-handlebars'
'npm install csv-parser'

## Email template.
get the html code to your email and paste the code in two files : <br>
main.handlebar >br>
index.handlebar( you'll find this inside the "View" folder) <br>

(the above is a bug that needs to be fixed )

## Adding credentials
### For Amazon SES :
service: "SMTP",
      host:'',// Host name
      auth: {
        user: "", // Username 
        pass: ""// password 
      },
### For Outlook:
service: 'outlook',
      auth: {
        user: '',//Outlook Email adress
        pass: ''// Outlook password
      },
## Sending emails:
Add your csv file name on line 15. This file should consists of a coloumn with hearder : "Emails" exactly as such <br>

Open terminal and navigate to the folder that contains the code files. <br>
run 'node nodemailer_SES/OutLook' <br>

Emails should start sending. 


      








