const User = require('../modals/user')
var jwt = require('jsonwebtoken');
exports.signup = (req, res) => {
    User.findOne({ email: req.body.email }).then((error, data) => {
        let { firstName, lastName, email, password } = req.body
        const _user = new User({
            firstName,
            lastName,
            email,
            password,
            username: Math.random().toString()
        });
        _user.save((error, data) => {
            if (error) {
                return res.status(400).json({
                    message: 'somthing went wrong' + error
                })
            }
            if (data) {
                return res.status(400).json({
                    user: 'User Register successfully'
                })
            }
        })
    });
}

exports.singin = (req, res) => {
    User.findOne({ email: req.body.email })
        .exec((err, user) => {
            if (err) return res.status(400).json({
                err
            })
            if (user) {
                if (user.authenticat(req.body.password)) {
                    const token = jwt.sign({ _id: user._id }, 'merntoken', { expiresIn: '1h' });
                    const { _id, firstName, lastName, email, role, fullname } = user
                    res.status(200).json({
                        token,
                        user: {
                           _id, firstName, lastName, email, role, fullname
                        }
                    });

                } else {
                    return res.status(200).json({
                        message: 'Invalid Password'
                    })
                }

            }
            else {
                return res.status(400).json({
                    message: 'somthing went wrong'
                })
            }
        })
}

exports.requireSignin =(req,res,next)=>{
    const token = req.headers
    console.log(token);
    next();
}