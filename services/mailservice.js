const express = require('express');
const exphbs = require('express-handlebars');
const nodemailer = require('nodemailer');
const hbs = require('nodemailer-express-handlebars').default;
const path = require('path');

const app = express();

const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: 'YOUR_EMAIL',
    pass: 'YOUR_APP_PASSWORD',
  },
});

transporter.use(
  'compile',
  hbs({
    viewEngine: {
      extname: '.hbs',

      partialsDir: path.resolve('./templates/partials'),

      layoutsDir: path.resolve('./templates/layouts'),

      defaultLayout: 'main',
    },

    viewPath: path.resolve('./templates/emails'),

    extName: '.hbs',
  })
);

app.get('/send', async (req, res) => {
  try {
    await transporter.sendMail({
      from: 'YOUR_EMAIL',
      to: 'test@gmail.com',

      subject: 'Test Email',

      template: 'new-user-created',

      context: {
        title: 'Welcome',

        userName: 'John Doe',

        message: 'Account created successfully',

        userDetails: [
          {
            label: 'Name',
            value: 'John Doe',
          },
          {
            label: 'Email',
            value: 'john@gmail.com',
          },
        ],

        createdDetails: [
          {
            label: 'Created By',
            value: 'Admin',
          },
          {
            label: 'Date',
            value: 'Today',
          },
        ],
      },
    });

    res.send('Email Sent');
  } catch (err) {
    console.log('Mail Error:', err);
    res.send(err.message);
  }
});

app.listen(3000, () => {
  console.log('Server running on port 3000');
});