const nodemailer = require('nodemailer');


module.exports = (router) => {
    router.post('/submit', (req,res) => {
        if(!req.body.name) {
            res.json({ success: false, message: 'Name is required.'})
        } else {
            if(!req.body.email) {
                res.json({ success: false, message: 'Email is required.'})
            } else {
                if(!req.body.message) {
                    res.json({ success: false, message: 'Message is required.'})
                } else {
                    res.json({ success: true, message: 'Message sent!'})
                    const message = `
                      <h1>You have a message</h1>
                      <ul>
                        <li>Name: ${req.body.name}</li>
                        <li>Email: ${req.body.email}</li>
                        <li>Message: ${req.body.message}</li>
                      </ul>`
                    let transporter = nodemailer.createTransport({
                        service: 'gmail',
                        secure: false,
                        port: 25,
                        auth: {
                                user: 'sriharsha.uf51@gmail.com',
                                pass: '11ec0061',
                        },
                        tls: {
                            rejectUnauthorized: false
                        }
                    });
    
                    let mailOptions = {
                        from: '"Harsha" <sriharsha.uf51@gmail.com>', // sender address
                        to: 'sriharsha.alu@gmail.com', // list of receivers
                        subject: 'Hello, New Message from online portfolio!', // Subject line
                        html: message // html body
                    }
    
                    transporter.sendMail(mailOptions, function(err,res) {
                        if(err) {
                            console.log(err);
                        } else {
                            console.log('email sent');
                        }
                    });
                }
            }
        }
    });
    return router;
}