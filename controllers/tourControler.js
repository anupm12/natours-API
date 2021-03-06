const fs = require('fs');

const tours = JSON.parse(
  fs.readFileSync(`${__dirname}/../dev-data/data/tours-simple.json`)
);

exports.checkID = (req, res, next, val) => {
  console.log(`The id is ${val}`);
  if (req.params.id * 1 >= tours.length) {
    return res.status(404).json({
      Status: 'Fail',
      Message: 'Invalid Id',
    });
  }
  next();
};

exports.checkBody = (req, res, next) => {
  // console.log(req.body);
  if (!req.body.name || !req.body.price) {
    return res.status(404).json({
      Status: 'Fail',
      Message: 'Missing name or price',
    });
  }
  next();
};

exports.getAllTours = (req, res) => {
  // console.log(req.requestTime);
  res.status(200).json({
    status: 'success',
    requestedAt: req.requestTime,
    results: tours.length,
    data: {
      tours,
    },
  });
};

exports.getTour = (req, res) => {
  const id = req.params.id * 1;
  const tour = tours.find((el) => el.id === id);

  res.status(200).json({
    status: 'success',
    results: tours.length,
    data: {
      tour,
    },
  });
};

exports.createTour = (req, res) => {
  const newId = tours[tours.length - 1].id + 1;
  const newTour = Object.assign({ id: newId }, req.body);

  tours.push(newTour);

  fs.writeFile(
    `${__dirname}/dev-data/data/tours-simple.json`,
    JSON.stringify(tours),
    (err) => {
      res.status(201).json({
        status: 'Success',
        data: {
          tour: newTour,
        },
      });
    }
  );
};

exports.updateTour = (req, res) => {
  res.status(200).json({
    Status: 'Success',
    Message: 'Data updated!!',
  });
};

exports.deleteTour = (req, res) => {
  res.status(204).json({
    Status: 'Success',
    data: {
      Message: null,
    },
  });
};
