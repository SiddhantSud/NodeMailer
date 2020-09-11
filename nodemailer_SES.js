var nodemailer = require("nodemailer");
const hbs = require('nodemailer-express-handlebars');
const csv = require("csv-parser");
const ObjectsToCsv = require('objects-to-csv')
const fs = require("fs");
const { errorMonitor } = require("stream");

// Testing 
//var emails = ['ajay.silicomm@gmail.com', 'ajaygoel999@gmail.com', 'ajay@parttimesnob.com', 'test@chromecompete.com', 'ajay@ajaygoel.net', 'ajay@gmailgenius.com', 'test@ajaygoel.org', 'me@dropboxslideshow.com', 'test@wordzen.com', 'rajgoel8477@gmail.com', 'briansmith8477@gmail.com', 'ajay@butterclaw.com', 'ajay@yoursipes.com', 'ajay@madsciencekidz.com', 'ajay@couchlock.com', 'ajay@downfor.io', 'ajay@ctopowered.com', 'ajay@atavolachicago.com', 'ajay@redsealrecruiting.com'];
//var emails=['bounce@simulator.amazonses.com','complaint@simulator.amazonses.com','success@simulator.amazonses.com']
var unsent_emails=[]
var sent_emails=[]
var emails=[]

fs.createReadStream("final_db.csv")
  .pipe(csv())
  .on("data", (row) => {
  emails.push(row.Emails);
  })
  .on("end", () => {

    var transporter = nodemailer.createTransport({
      service: "SMTP",
      host:'email-smtp.ap-south-1.amazonaws.com',// Host name
      auth: {
        user: "AKIA4LVD7SDQSW7WZAHA", // Username 
        pass: "BIAv0GQpXnEhOByT83XTrxi4XSwFsKdKAXYj76vfON9b"// password 
      },
      maxConnections : 3,
      maxMessages :7,
      pool: true
    });

    transporter.use('compile', hbs({
      viewEngine: 'express-handlebars',
      viewPath: "./views/"
    }))


    var mailOptions = {
      from: "Enter sender email Id",
      to: "",
      subject: "WEBINAR: Leveraging current and future solar opportunities for sustainable business",
      template:'index',
      ConfigurationSetName:'Dexler_Version1'
    };

    console.log("CSV file successfully processed");
    console.log(emails);
    emails.forEach((email_id,index) => {
      mailOptions.to = email_id;
      
      transporter.sendMail(mailOptions, function (error, info) {
        if (error) {
          console.log(error);
          unsent_emails.push(email_id);
        } else {
          console.log("Email sent: " + info.response);
          sent_emails.push(email_id);
        }
        if(unsent_emails.length+sent_emails.length===emails.length){
          console.log("All emails processed!");
          console.log(unsent_emails);
        }
        // else if(unsent_emails.length>=300){
        //   console.log("ded");
        //   console.log(unsent_emails);
        //   console.log(sent_emails);
        //   process.exit();
        // }
        else{
          console.log("Sent:",sent_emails.length);
          console.log("Unsent",unsent_emails.length);
          console.log("Emails:",emails.length);
        }
      }); 
    });
    
  });
