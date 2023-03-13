const router = require('express').Router();
const { User } = require('../../models');

// router.post('/login', async (req, res) => {
//     try {
//         // TODO
//     } catch(err) {
//         res.status(500).json({
//             message: 'Error logging in',
//         });
//     }
// })

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
    try {
        console.log('\n\n Signup in progress \n\n');

        console.log('req.body => ', req.body);

        const newUser = await User.create(req.body);

        res.status(200).json(newUser);
    } catch (err) {
        res.status(500).json({
            message: 'Error creating a new user',
        });
    }
})

module.exports = router