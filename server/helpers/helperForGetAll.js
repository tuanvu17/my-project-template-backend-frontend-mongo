const asyncHandler = require("express-async-handler");

const helperForGetAll = async (queryObj, modelSchema) => {
    try {
        //Filltering
        let exeQuery = { ...queryObj }
        
        const excludeFields = ["page", "sort", "limit", "fields"];
        
        excludeFields.forEach((el) => delete exeQuery[el]);

        let queryStr = JSON.stringify(exeQuery);
        queryStr = queryStr.replace(/\b(gte|gt|lte|lt|eq)\b/g, (match) => `$${match}`);
        
        let query =  modelSchema.find(JSON.parse(queryStr));

        // nếu có sort
        if (queryObj.sort) {
            const sortBy = queryObj.sort.split(',').join(" ");
            query = query.sort(sortBy);
        } else {
            query = query.sort("-createAt");
        }

        // nếu có loại trừ trường
        if (queryObj.fields) {
            const fields = queryObj.fields.split(",").join(" ");
            query = query.select(fields);
        } else {
            query = query.select('-__v');
        }

        //pagination
        const page = queryObj.page;
        const limit = queryObj.limit;
        const skip = (page - 1) * limit;
        query = query.skip(skip).limit(limit);
        if (queryObj.page) {
            const count = await modelSchema.countDocuments();
            if (skip >= count) return [];
        }
        
        const result = await query;
        
        return result;
    } catch (error) {
        return new Error(error);
    }
}


module.exports = { helperForGetAll }

