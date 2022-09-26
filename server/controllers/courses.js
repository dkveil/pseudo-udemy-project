const { v4: uuid } = require('uuid');

const coursesData = [
  {
    authors: ['author name'],
    id: uuid(),
    img: 'https://img-a.udemycdn.com/course/240x135/1673856_ff13_5.jpg',
    price: 69.99,
    title: 'course title',
    description: 'description',
  },
];

exports.getCourses = (request, response, next) => {
  try {
    response.status(200).json({
      courses: coursesData
    });
  } catch (error) {
    response.status(500).json({
      error,
      message: 'Something went wrong with the endpoint /courses and method GET',
    });
  }
};

exports.getCourse = (request, response, next) => {
  try {
    const { id } = request.params;
    const courseToSend = coursesData.find(course => course.id === id);

    if (!courseToSend) {
      response.status(404).json({
        message: 'No course found with the given id',
      });

      return;
    }

    response.status(200).json({
      course: courseToSend,
    });
  } catch (error) {
    response.status(500).json({
      error,
      message: 'Something went wrong with the endpoint /courses/:id and method GET',
    })
  }
};

exports.postCourse = (request, response, next) => {
  try {
    const { authors, img, price, title } = request.body;
    if ( !authors || !price || !title ) {
      response.status(400).json({
        message: 'Not all information was provided',
      });

      return;
    }

    const isCourseExist = coursesData.some(({title: currentTitle}) => currentTitle === title);
    if (isCourseExist) {
      response.status(409).json({
        message: `A course with the given title already exists - ${title}`,
      });

      return;
    }

    const newCourse = {
      authors: authors,
      id: uuid(),
      img,
      price,
      title,
    };

    coursesData.push(newCourse);

    response.status(201).json({
      courses: coursesData
    });
  } catch (error) {
    response.status(500).json({
      error,
      message: 'Something went wrong with the endpoint /courses and method POST'
    });
  }
};

exports.putCourse = (request, response, next) => {
  try {
    const { authors, id, price, title } = request.body;
    if (!authors || !id || !price || !title) {
      response.status(400).json({
        message: 'Not all information was provided',
      });

      return;
    }

    const indexCourseToUpdate = coursesData.findIndex(course => course.id === id);
    if (indexCourseToUpdate === -1) {
      response.status(404).json({
        message: 'No course found with the given id',
      });

      return;
    }


    coursesData.splice(indexCourseToUpdate, 1, request.body);

    response.status(202).json({
      courses: coursesData
    });
  } catch (error) {
    response.status(500).json({
      error,
      message: 'Something went wrong with the endpoint /courses and method PUT'
    });
  }
};

exports.deleteCourse = (request, response, next) => {
  try {
    const { id } = request.params;

    console.log(id);
    const indexCourseToDelete = coursesData.findIndex(course => course.id === id);

    if (indexCourseToDelete === -1) {
      response.status(404).json({
        message: 'Not found course with the given id',
      });

      return;
    }

    coursesData.splice(indexCourseToDelete, 1);
    response.status(200).end();
  } catch (error) {
    response.status(500).json({
      error,
      message: 'Something went wrong with the endpoint /courses/:id and method DELETE',
    });
  }
};

exports.coursesData = coursesData;