import Mongoose from 'mongoose';
import { comparePassword, generateToken, hashPassword } from '../helpers/authenticate.js';
import { sendEmail } from '../helpers/emailSender.js';
import { validateSignUp } from '../helpers/validations/authValidations.js';
import { createUser } from '../models/body/auth.body.js';
import User from '../models/db/users.models.js';

export const signup = (req, res) => {
    const { names, phone, email,password, type } = req.body;
    const { error } = validateSignUp(createUser(req));
    if(error){
        return res.status(400).json({
            message: error.details[0].message.replace(/"/g, ''),
        });
    }

    User.find({ email }, (error, result) => {
        if(result.length){
            return res.status(409).json({
                message: 'Email is already in use, please try another.',
                status: 409,
            })
        }

        const hashedPassword = hashPassword(password);

        const user = new User({
            _id: new Mongoose.Types.ObjectId(),
            names,
            phone,
            email,
            password: hashedPassword,
            type
        });

        user
            .save()
            .then((results) => {
                res.status(201).json({
                    message: 'You have created an account successful',
                    token: generateToken(results)
                });
                // sendEmail(email, 'Welcome to Be One Success', 'This email is for welcoming you to the application', '<html><body><h1>Be One Success</h1></body></html>')
            })
            .catch(err => {
                res.status(500).json({
                    message: 'Oh no, there is something wrong, call the support.',
                    status: 500
                  })
            })
    })
    
}

export const signin = (req, res) => {
    const { email, password } = req.body;

    User.findOne({ email })
        .exec()
        .then((doc) => {
            if(doc){
                const compare = comparePassword(password, doc.password);
                if(compare){
                    res.status(200).json({
                        token: generateToken(doc)
                    });
                }else{
                    res.status(401).json({
                        message: 'Wrong email or password',
                    });
                }
            }else{
                res.status(401).json({
                    message: 'Wrong email or password'
                })
            }
        })
        .catch(() => {
            res.status(401).json({
                message: 'Wrong email or password'
            });
        });
} 

export const forgotPassword = (req, res) => {
    
}

export const changePassword = (req, res) => {

}
