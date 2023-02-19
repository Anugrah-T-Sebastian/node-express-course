const Product = require("../models/product");

const getAllProductsStatic = async (req, res) => {
  const products = await Product.find({})
    .sort("-name price") //sorting syntax
    .select("name") //selecting fields
    .limit(10) //limiting number of items being sent
    .skip(5); //skipping items from the begining. Can be used for page number
  res.status(200).json({ products, nbHits: products.length });
  //throw new Error("testing async errors");
  //res.status(200).json({ msg: "products testing routes" });
};
const getAllProducts = async (req, res) => {
  const { featured, company, name, sort, fields, numericFilters } = req.query;
  const queryObject = {};
  if (featured) queryObject.featured = featured === "true" ? true : false;
  if (company) queryObject.company = company;
  if (name) queryObject.name = { $regex: name, $options: "i" }; //Using regex because we want to search similar name, not just absolute same name
  //numeric filtering
  if (numericFilters) {
    const operatorMap = {
      ">": "$gt",
      ">=": "$gte",
      "=": "$eq",
      "<": "$lt",
      "<=": "$lte",
    };
    const regEx = /\b(<|>|>=|=|<|<=)\b/g;
    let filters = numericFilters.replace(
      regEx,
      (match) => `-${operatorMap[match]}-`
    );
    const options = ["price", "rating"];
    filters = filters.split(",").forEach((item) => {
      const [field, operator, value] = item.split("-");
      if (options.includes(field)) {
        queryObject[field] = { [operator]: Number(value) };
      }
    });
  }
  console.log(queryObject);
  let result = Product.find(queryObject);
  //sorting
  if (sort) {
    const sortList = sort.split(",").join(" ");
    result = result.sort(sortList);
  } else {
    result = result.sort("createdAt");
  }
  //selecting fields to show
  if (fields) {
    const fieldList = fields.split(",").join(" ");
    result = result.select(fieldList);
  }
  //setting page number
  const page = Number(req.query.page) || 1;
  //limiting number of products
  const limit = Number(req.query.limit) || 10;
  const skip = (page - 1) * limit;
  result = result.skip(skip).limit(limit);
  const products = await result; //Only fulfill the promise after the sorting is done
  res.status(200).json({ products, nbHits: products.length });
};

module.exports = {
  getAllProducts,
  getAllProductsStatic,
};
