const { v4: uuid } = require('uuid');
const { faker } = require('@faker-js/faker');

const coursesData = [
  {
    authors: ['Rafał Mobilo'],
    id: uuid(),
    img: 'https://img-b.udemycdn.com/course/480x270/2331806_b90c_2.jpg',
    dateAdded: faker.date.past(),
    price: 69.99,
    usePromotionPrice: true,
    promotionPrice: 42.33,
    duration: Math.round((Math.random() * (60 - 12) + 12) * 2) / 2,
    title: 'Python dla początkujących',
    description: 'Watch Over My Shoulder As I Implement A Manual SEO Audit In Real-Time & Show You How To Fix The Most Common SEO Problems',
    opinions: Math.floor(Math.random() * (2000 - 200) + 200),
    rate: (Math.random() * (5 - 3) + 3).toFixed(1),
    benefits: ["Learn how to start your own SEO business from scratch", "Get access to my SEO agencies SEO Audit checklist", "Learn what tools you should use to carry out an SEO Audit"]
  },
  {
    authors: ['Arkadiusz Włodarczyk', 'Rafał Mobilo', 'Paweł Krakowiak', 'Marta Potocka'],
    id: uuid(),
    img: 'https://img-b.udemycdn.com/course/480x270/2331806_b90c_2.jpg',
    dateAdded: faker.date.past(),
    price: 69.99,
    usePromotionPrice: false,
    promotionPrice: null,
    duration: Math.round((Math.random() * (60 - 12) + 12) * 2) / 2,
    title: 'Python 3 od Podstaw do Eksperta',
    description: 'Watch Over My Shoulder As I Implement A Manual SEO Audit In Real-Time & Show You How To Fix The Most Common SEO Problems',
    opinions: Math.floor(Math.random() * (2000 - 200) + 200),
    rate: (Math.random() * (5 - 3) + 3).toFixed(1),
    benefits: ["Learn how to start your own SEO business from scratch", "Get access to my SEO agencies SEO Audit checklist", "Learn what tools you should use to carry out an SEO Audit"]
  },
  {
    authors: ['author name'],
    id: uuid(),
    img: 'https://img-b.udemycdn.com/course/480x270/2331806_b90c_2.jpg',
    dateAdded: faker.date.past(),
    price: 69.99,
    usePromotionPrice: false,
    promotionPrice: null,
    duration: Math.round((Math.random() * (60 - 12) + 12) * 2) / 2,
    title: 'course title 3',
    description: 'Watch Over My Shoulder As I Implement A Manual SEO Audit In Real-Time & Show You How To Fix The Most Common SEO Problems',
    opinions: Math.floor(Math.random() * (2000 - 200) + 200),
    rate: (Math.random() * (5 - 3) + 3).toFixed(1),
    benefits: ["Learn how to start your own SEO business from scratch", "Get access to my SEO agencies SEO Audit checklist", "Learn what tools you should use to carry out an SEO Audit"]
  },
  {
    authors: ['author name'],
    id: uuid(),
    img: 'https://img-b.udemycdn.com/course/480x270/2331806_b90c_2.jpg',
    dateAdded: faker.date.past(),
    price: 69.99,
    usePromotionPrice: false,
    promotionPrice: null,
    duration: Math.round((Math.random() * (60 - 12) + 12) * 2) / 2,
    title: 'course title 4',
    description: 'Watch Over My Shoulder As I Implement A Manual SEO Audit In Real-Time & Show You How To Fix The Most Common SEO Problems',
    opinions: Math.floor(Math.random() * (2000 - 200) + 200),
    rate: (Math.random() * (5 - 3) + 3).toFixed(1),
    benefits: ["Learn how to start your own SEO business from scratch", "Get access to my SEO agencies SEO Audit checklist", "Learn what tools you should use to carry out an SEO Audit"]
  },
  {
    authors: ['author name'],
    id: uuid(),
    img: 'https://img-b.udemycdn.com/course/480x270/2331806_b90c_2.jpg',
    dateAdded: faker.date.past(),
    price: 69.99,
    usePromotionPrice: false,
    promotionPrice: null,
    duration: Math.round((Math.random() * (60 - 12) + 12) * 2) / 2,
    title: 'course title 5',
    description: 'Watch Over My Shoulder As I Implement A Manual SEO Audit In Real-Time & Show You How To Fix The Most Common SEO Problems',
    opinions: Math.floor(Math.random() * (2000 - 200) + 200),
    rate: (Math.random() * (5 - 3) + 3).toFixed(1),
    benefits: ["Learn how to start your own SEO business from scratch", "Get access to my SEO agencies SEO Audit checklist", "Learn what tools you should use to carry out an SEO Audit"]
  },
  {
    authors: ['author name'],
    id: uuid(),
    img: 'https://img-b.udemycdn.com/course/480x270/2331806_b90c_2.jpg',
    dateAdded: faker.date.past(),
    price: 69.99,
    usePromotionPrice: false,
    promotionPrice: null,
    duration: Math.round((Math.random() * (60 - 12) + 12) * 2) / 2,
    title: 'course title 6',
    description: 'Watch Over My Shoulder As I Implement A Manual SEO Audit In Real-Time & Show You How To Fix The Most Common SEO Problems',
    opinions: Math.floor(Math.random() * (2000 - 200) + 200),
    rate: (Math.random() * (5 - 3) + 3).toFixed(1),
    benefits: ["Learn how to start your own SEO business from scratch", "Get access to my SEO agencies SEO Audit checklist", "Learn what tools you should use to carry out an SEO Audit"]
  },
  {
    authors: ['author name'],
    id: uuid(),
    img: 'https://img-b.udemycdn.com/course/480x270/2331806_b90c_2.jpg',
    dateAdded: faker.date.past(),
    price: 69.99,
    usePromotionPrice: false,
    promotionPrice: null,
    duration: Math.round((Math.random() * (60 - 12) + 12) * 2) / 2,
    title: 'course title 7',
    description: 'Watch Over My Shoulder As I Implement A Manual SEO Audit In Real-Time & Show You How To Fix The Most Common SEO Problems',
    opinions: Math.floor(Math.random() * (2000 - 200) + 200),
    rate: (Math.random() * (5 - 3) + 3).toFixed(1),
    benefits: ["Learn how to start your own SEO business from scratch", "Get access to my SEO agencies SEO Audit checklist", "Learn what tools you should use to carry out an SEO Audit"]
  },
  {
    authors: ['author name'],
    id: uuid(),
    img: 'https://img-b.udemycdn.com/course/480x270/2331806_b90c_2.jpg',
    dateAdded: faker.date.past(),
    price: 69.99,
    usePromotionPrice: false,
    promotionPrice: null,
    duration: Math.round((Math.random() * (60 - 12) + 12) * 2) / 2,
    title: 'course title 8',
    description: 'Watch Over My Shoulder As I Implement A Manual SEO Audit In Real-Time & Show You How To Fix The Most Common SEO Problems',
    opinions: Math.floor(Math.random() * (2000 - 200) + 200),
    rate: (Math.random() * (5 - 3) + 3).toFixed(1),
    benefits: ["Learn how to start your own SEO business from scratch", "Get access to my SEO agencies SEO Audit checklist", "Learn what tools you should use to carry out an SEO Audit"]
  },
  {
    authors: ['author name'],
    id: uuid(),
    img: 'https://img-b.udemycdn.com/course/480x270/2331806_b90c_2.jpg',
    dateAdded: faker.date.past(),
    price: 69.99,
    usePromotionPrice: false,
    promotionPrice: null,
    duration: Math.round((Math.random() * (60 - 12) + 12) * 2) / 2,
    title: 'course title 9',
    description: 'Watch Over My Shoulder As I Implement A Manual SEO Audit In Real-Time & Show You How To Fix The Most Common SEO Problems',
    opinions: Math.floor(Math.random() * (2000 - 200) + 200),
    rate: (Math.random() * (5 - 3) + 3).toFixed(1),
    benefits: ["Learn how to start your own SEO business from scratch", "Get access to my SEO agencies SEO Audit checklist", "Learn what tools you should use to carry out an SEO Audit"]
  },
  {
    authors: ['author name'],
    id: uuid(),
    img: 'https://img-b.udemycdn.com/course/480x270/2331806_b90c_2.jpg',
    dateAdded: faker.date.past(),
    price: 69.99,
    usePromotionPrice: false,
    promotionPrice: null,
    duration: Math.round((Math.random() * (60 - 12) + 12) * 2) / 2,
    title: 'course title 10',
    description: 'Watch Over My Shoulder As I Implement A Manual SEO Audit In Real-Time & Show You How To Fix The Most Common SEO Problems',
    opinions: Math.floor(Math.random() * (2000 - 200) + 200),
    rate: (Math.random() * (5 - 3) + 3).toFixed(1),
    benefits: ["Learn how to start your own SEO business from scratch", "Get access to my SEO agencies SEO Audit checklist", "Learn what tools you should use to carry out an SEO Audit"]
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
    const {
      title,
      authors,
      dateAdded,
      description,
      duration,
      img,
      price,
      usePromotionPrice,
      promotionPrice,
      rate,
      opinions,
      benefits
    } = request.body;

    if (!title || !authors || !dateAdded || !description || !duration || !img || !price || usePromotionPrice === undefined || promotionPrice === undefined || !rate || !opinions || !benefits) {
      response.status(400).json({
        message: 'Not all information was provided',
      });

      return;
    }

    const isCourseExist = coursesData.some(({ title: currentTitle }) => currentTitle === title);
    if (isCourseExist) {
      response.status(409).json({
        message: `A course with the given title already exists - ${title}`,
      });

      return;
    }

    const newCourse = {
      id: uuid(),
      title,
      description,
      dateAdded,
      authors,
      img,
      price,
      usePromotionPrice,
      promotionPrice,
      duration,
      benefits,
      opinions,
      rate
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