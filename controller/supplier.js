// Require Post Schema from Model..
const Supplier = require('../models/supplier');

exports.add = async (req, res, next) => {
  try {

      let data = req.body;
      let supplier = new Supplier(data);
      await supplier.save();

      res.status(200).json({
          message: "Supplier added successfully",
      });
  } catch (err) {
      console.log(err);
      if (!err.statusCode) {
          err.statusCode = 500;
          err.message = "Something went wrong on database operation!";
      }
      next(err);
  }
};

exports.getAll = async (req, res, next) => {
    try {

        const data = await Supplier.find();

        res.status(200).json({
            data: data,
            message: "Suppliers fetched successfully",
        });
    } catch (err) {
        console.log(err);
        if (!err.statusCode) {
            err.statusCode = 500;
            err.message = "Something went wrong on database operation!";
        }
        next(err);
    }
};
exports.getFilteredData = async (req, res, next) => {
    try {
        
      console.log("Hello World")
        // Query Text
        const search = req.query.q;
        console.log(search);
    
        // Additional Filter
        // const filter = {};
    
        // Pagination
        const pageSize = +req.query.pageSize;
        const currentPage = +req.query.currentPage;
    
        // Build Regex Query
        const newQuery = search.split(/[ ,]+/);
        const queryArray = newQuery.map((str) => ({ name: RegExp(str, "i") }));
        const queryArray2 = newQuery.map((str) => ({ phoneNo: RegExp(str, "i") }));
        const queryArray3 = newQuery.map((str) => ({link: RegExp(str, 'i')}));
        // const queryArray4 = newQuery.map((str) => ({username: RegExp(str, 'i')}));
        // const regex = new RegExp(query, 'i')
    
        let dataDoc = Supplier.find({
            $and: [
              {
                $or: [
                  { $and: queryArray },
                  { $and: queryArray2 },
                  {$and: queryArray3},
                  // {$and: queryArray4},
                ],
              },
            ],
          });
    
        // {marketer: {$in: [null]}}
    
        if (pageSize && currentPage) {
          dataDoc.skip(pageSize * (currentPage - 1)).limit(Number(pageSize));
        }
    
        const results = await dataDoc;
        console.log(results);
        res.status(200).json({
          data: results
        });
      } catch (err) {
        console.log(err);
        if (!err.statusCode) {
            err.statusCode = 500;
            err.message = "Something went wrong on database operation!";
        }
        next(err);
    }
};

exports.editById = async (req, res, next) => {
    try {

        let updatedData = req.body;
        const data = Supplier.findOne({_id: updatedData._id});
        const finalData = {...updatedData, ...{password: data.password}}
        await Supplier.updateOne({_id: updatedData._id}, {$set: updatedData})

        res.status(200).json({
            message: "Supplier edited successfully",
        });
    } catch (err) {
        console.log(err);
        if (!err.statusCode) {
            err.statusCode = 500;
            err.message = "Something went wrong on database operation!";
        }
        next(err);
    }
};

