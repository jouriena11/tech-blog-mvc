const bcrypt = require('bcrypt');
const router = require('express').Router();
const { User } = require('../../models');

// GET request - user profile by user_id
// api/user/:id
router.get('/:id', async (req, res) => {
  const userProfile = await User.findByPk(req.params.id);

  if(!userProfile) {
    res.status(404).json({
      message: 'Error finding user profile'
    })
  }

  res.status(200).json(userProfile);

})

// POST request - login
router.post('/login', async (req, res) => {
    try {
        const userData = await User.findOne({
            where: {
                username: req.body.username
            }
        });

        if(!userData) {
            res.status(400).json({
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

            const user = {
                id: userData.id,
                username: userData.username,
                first_name: userData.first_name,
                last_name: userData.last_name,
                email: userData.email,
                logged_in: req.session.logged_in
            }

            // console.log('userLog', user)

            res.status(200)
                .json({
                    user: user,
                    message: "You're now logged in."
                })
        });

    } catch(err) {
        res.status(400).json({
            message: 'Error logging in',
        });
    }
})

// POST request - logout
router.post('/logout', (req, res) => {
  if (req.session.logged_in) {
    req.session.destroy(() => {
      res.clearCookie('connect.sid'); // clear session cookie
      res.status(204).end(); // send empty response with 204 status
    });
  } else {
    res.status(404).end();
  }
});

// POST request - signup
router.post('/signup', async (req, res) => {
  const saltRounds = 10;
  try {
    const salt = bcrypt.genSaltSync(saltRounds);
    const hash = bcrypt.hashSync(req.body.password, salt);

    req.body.password = hash;

    const newUser = await User.create(req.body);

    const user = {
      id: newUser.id,
      username: newUser.username,
      first_name: newUser.first_name,
      last_name: newUser.last_name,
      email: newUser.email,
      logged_in: true
    };

    // console.log('userLog', user)

    req.session.save(() => {
      req.session.user_id = newUser.id;
      req.session.username = newUser.username;
      req.session.logged_in = true;

      res.status(201).json({
        user: user,
        message: "You're now logged in."
      });
    });

  } catch (err) {
    console.error(err)
    res.status(500).json({
      message: 'Error creating a new user',
    });
  }
});

// PUT request - update user profile
// api/user/update/:id
router.put('/update/:id', async (req, res) => {
  try {
    const updatedUserData = await User.update(req.body, {
      where: {
        id: req.params.id
      }
    })

    if (!updatedUserData) {
      res.status(404).json({
        message: 'User not found'
      }); 
      return;
    };

    res.status(200).json({
      message: 'Your profile has been updated.'
    })

  } catch(err) {
    console.error(err);
    res.status(500).json(err);
  }
})

// DELETE request - request user by user id
router.delete('/delete/:id', async (req, res) => {
try {
    const delUser = await User.destroy({
        where: {
            id: req.params.id,
        }
    })

    if(!delUser) {
        res.status(404).json({
            message: 'User not found'
        });
        return;
    }

    res.status(200).json({
        message: 'The user has been deleted',
        rows_deleted: delUser
    })
} catch(err) {
    console.log(err);
    res.status(500).json(err);
}
})

module.exports = router