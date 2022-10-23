const { v4: uuid } = require('uuid');
const { coursesData } = require('./courses');

const usersData = [
  {
    id: uuid(),
    accessLevel: 0,
    budget: 150,
    courses: [
      coursesData[0].id,
    ],
    wishlist: [],
    login: 'user',
    password: '123456',
    avatar: null,
    banned: false
  },
  {
    id: uuid(),
    accessLevel: 1,
    budget: 1000000,
    courses: [],
    wishlist: [],
    login: 'admin',
    password: '******',
    avatar: null,
    banned: false
  }
];

exports.postUser = (request, response, next) => {
  try {
    const { login, password } = request.body;

    const user = usersData.find(u => u.login == login);
    if (!user) {
      response.status(404).json({
        message: 'User does not exist',
      });

      return;
    }

    const isPasswordCorrect = user.password === password;
    if (!isPasswordCorrect) {
      response.status(401).json({
        message: 'Login or password does not match',
      });

      return;
    }

    response.status(200).json({
      user,
    });
  } catch (error) {
    response.status(500).json({
      error,
      message: 'Something went wrong with the endpoint /users and method POST',
    });
  }
};

exports.addUser = (request, response, next) => {
  try {
    const { login, password } = request.body;
    if (!login || !password) {
      response.status(400).json({
        message: 'Not all information was provided'
      });

      return
    }

    const isUserExist = usersData.some(({ login: currentLogin }) => currentLogin === login);
    if (isUserExist) {
      response.status(409).json({
        message: `A user with the given login already exist`
      })

      return
    }

    const newUser = {
      id: uuid(),
      accessLevel: 0,
      budget: 150,
      courses: [],
      login,
      password,
      avatar: null
    }

    usersData.push(newUser)

    response.status(201).json({
      user: newUser
    })
  }
  catch (error) {
    response.status(500).json({
      error,
      message: 'Something went wrong with the endpoints /users'
    })
  }
}

exports.patchUser = (request, response, next) => {
  try {
    const { login, boughtCourses, totalPrice, action, addedFunds, newLogin, checkedPassword, newPassword, courseId, img } = request.body;

    const user = usersData.find(user => user.login === login);

    if (!user) {
      response.status(404).json({
        message: 'No user with the given id was found',
      });

      return;
    }

    if (action === "buying a course") {
      boughtCourses.forEach(course => {
        const hasUserThisCourseOnWishlist = user.wishlist.find(wishlistCourse => wishlistCourse === course)

        if (hasUserThisCourseOnWishlist) {
          const courseIndex = user.wishlist.findIndex(course => course === hasUserThisCourseOnWishlist)
          user.wishlist.splice(courseIndex, 1)
        }

      })

      const hasUserEnoughtMoney = user.budget - totalPrice >= 0;
      if (!hasUserEnoughtMoney) {
        response.status(403).json({
          message: 'User has not enough funds to pay',
        });

        return;
      }

      user.budget = Number((user.budget - totalPrice).toFixed(2));
      user.courses = user.courses.concat(boughtCourses);
      response.status(202).json({
        user,
      });
    }

    if (action === "adding funds") {
      user.budget = user.budget + addedFunds
      response.status(202).json({
        user,
      });
    }

    if (action === "changing username") {
      if (newLogin === user.login) {
        response.status(403).json({
          message: "You have already this nickname"
        })

        return;
      }

      if (newLogin == "admin") {
        response.status(403).json({
          message: "You can't use this nickname!"
        })

        return;
      }

      if (usersData.find(user => user.login === newLogin)) {
        response.status(403).json({
          message: "Another user has already this nickname"
        })

        return;
      }

      user.login = newLogin
      response.status(202).json({
        user,
      });
    }
    if (action === "changing password") {

      if (user.password !== checkedPassword) {
        response.status(403).json({
          message: 'Old password does not match',
        });

        return;
      }

      user.password = newPassword
      response.status(202).json({
        user,
      });

    }

    if (action === "adding to wishlist") {
      user.wishlist.push(courseId)
      response.status(202).json({
        user,
      });
    }

    if (action === "remove from wishlist") {
      const courseIndex = user.wishlist.findIndex(course => course === courseId)
      user.wishlist.splice(courseIndex, 1)
      response.status(202).json({
        user,
      });
    }

    if (action === "changing profile picture") {
      user.avatar = img
      response.status(202).json({
        user,
      });
    }

  } catch (error) {
    response.status(500).json({
      error,
      message: 'Something went wrong with the endpoint /users and method PATCH',
    });
  }
};

exports.getUsers = (request, response, next) => {
  try {
    response.status(200).json({
      users: usersData
    })
  }
  catch (error) {
    response.status(500).json({
      error,
      message: 'Something went wrong with the endpoint /users and method GET',
    });
  }

}