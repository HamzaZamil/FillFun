const express = require('express');
const nodemailer = require('nodemailer');
const bodyParser = require('body-parser');
const cors = require('cors');
require('dotenv').config();

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(cors());
app.use(bodyParser.json());

// Verify email credentials
const transporter = nodemailer.createTransport({
    service: 'Gmail',
    auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS
    }
});

transporter.verify((error, success) => {
    if (error) {
        console.error('Email setup error:', error);
    } else {
        console.log('Email setup successful:', success);
    }
});

app.post('/send', (req, res) => {
    const { name, email, subject, message } = req.body;
    console.log(`Received request: ${JSON.stringify(req.body)}`);
    console.log('Email User:', process.env.EMAIL_USER); // Debugging
    console.log('Email Pass:', process.env.EMAIL_PASS); // Debugging

    const mailOptions = {
        from: email,
        to: process.env.EMAIL_USER,
        subject: `Contact Form Submission: ${subject}`,
        text: `Name: ${name}\nEmail: ${email}\n\nMessage:\n${message}`
    };

    transporter.sendMail(mailOptions, (error, info) => {
        if (error) {
            console.error('Error sending email:', error);
            return res.status(500).send(error.toString());
        }
        console.log('Email sent:', info.response);
        res.status(200).send('Email sent: ' + info.response);
    });
    res.status(200).send('Email sent: ');
});

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
