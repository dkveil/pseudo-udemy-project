const { coursesData } = require('./courses');

const usersData = [
  {
    accessLevel: 0,
    budget: 150,
    courses: [
      coursesData[0].id,
    ],
    login: 'user',
    password: '123456',
  },
  {
    accessLevel: 1,
    budget: 1000000,
    courses: [
      coursesData.map(course => course.id)
    ],
    login: 'Admin',
    password: '******',
  }
];

exports.postUser = (request, response, next) => {
  try {
    const { login, password } = request.body;

    const user = usersData.find(u => u.login === login);
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

exports.patchUser = (request, response, next) => {
  try {
    const { login, courseId } = request.body;

    const course = coursesData.find(course => course.id === courseId);
    const user = usersData.find(user => user.login === login);

    if (!course) {
      response.status(404).json({
        message: 'No course with the given id was found',
      });

      return;
    } else if (!user) {
      response.status(404).json({
        message: 'No user with the given id was found',
      });

      return;
    }

    const hasUserCourseAlready = user.courses.some(id => id === courseId);
    if (hasUserCourseAlready) {
      response.status(200).json({
        user,
      });

      return;
    }

    const hasUserEnoughtMoney = user.budget - course.price >= 0;
    if (!hasUserEnoughtMoney) {
      response.status(403).json({
        message: 'User has not enough funds to pay',
      });

      return;
    }

    user.budget = Number((user.budget - course.price).toFixed(2));
    user.courses.push(courseId);
    response.status(202).json({
      user,
    });
  } catch (error) {
    response.status(500).json({
      error,
      message: 'Something went wrong with the endpoint /users and method PATCH',
    });
  }
};