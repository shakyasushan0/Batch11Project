import Product from "../models/products.js";

const getProducts = async (req, res) => {
  try {
    const products = await Product.find().populate(
      "user",
      "fullname email -_id"
    );
    res.send(products);
  } catch (err) {
    res.status(500).send({ error: err.message });
  }
};

const getProductById = async (req, res) => {
  const productId = req.params.id;
  const product = await Product.findById(productId);
  if (!product) return res.status(404).send({ error: "Product not found" });
  res.send(product);
};

const getTopProducts = async (req, res) => {
  const products = await Product.find().sort({ rating: 1 }).limit(5);
  res.send(products);
};

const addProduct = async (req, res) => {
  const productBody = req.body;
  const product = await Product.create({ ...productBody, user: req.user._id });
  res.send({ message: "Product added!", product });
};

const updateProduct = async (req, res) => {
  const productId = req.params.id;
  const updateBody = req.body;
  const updatedProduct = await Product.findByIdAndUpdate(
    productId,
    updateBody,
    { new: true }
  );
  // const product = await Product.findById(productId)
  // product.name = updateBody.name || product.name
  // product.description = updateBody.description || product.descriptop
  if (!updatedProduct)
    return res.status(404).send({ error: "Product not found" });
  res.send({ message: "Product updated!", product: updatedProduct });
};

const deleteProduct = async (req, res) => {
  const productId = req.params.id;
  const deletedProduct = await Product.findByIdAndDelete(productId);
  if (!deletedProduct)
    return res.status(404).send({ error: "Product not found" });
  res.send({ message: "Product deleted" });
};

export {
  getProducts,
  getProductById,
  addProduct,
  updateProduct,
  deleteProduct,
  getTopProducts,
};
