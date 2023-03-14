const bcrypt = require('bcrypt');
const router = require('express').Router();
const { User } = require('../../models');

router.post('/login', async (req, res) => {
    try {
        const userData = await User.findOne({
            where: {
                username: req.body.username
            }
        });

        if(!userData) {
            res.json(404).json({
                message: 'Username not found. Please try again.'
            });
            return;
        }

        const validPassword = await userData.checkPassword(req.body.password);

        if(!validPassword) {
            res.status(401).json({
                message: 'Incorrect password. Please try again.'
            });
            return;
        }

        req.session.save(() => {
            req.session.user_id = userData.id;
            req.session.username = userData.username;
            req.session.logged_in = true;

            res.json({
                user: {
                    id: userData.id,
                    username: userData.username,
                },
                message: "You're now logged in."
            })
        })

    } catch(err) {
        res.status(500).json({
            message: 'Error logging in',
        });
    }
})

// router.post('/logout', async (req, res) => {
//     try {
//         // TODO
//     } catch(err) {
//         res.status(500).json({
//             message: 'Error logging out',
//         });
//     }
// })

router.post('/signup', async (req, res) => {
    const saltRounds = 10;
    try {
        const salt = bcrypt.genSaltSync(saltRounds);
        const hash = bcrypt.hashSync(req.body.password, salt);

        req.body.password = hash;

        console.log('\n\n Signup in progress \n\n');

        console.log('req.body => ', req.body);

        const newUser = await User.create(req.body);

        res.status(201).json(newUser);

    } catch (err) {
        console.error(err)
        res.status(500).json({
            message: 'Error creating a new user',
        });
    }
})

module.exports = router