import React, { useState } from "react";

const AddProduct = () => {
  const [productName, setProductName] = useState("");
  const [productDescription, setProductDescription] = useState("");
  const [productPrice, setProductPrice] = useState("");
  const [productCategory, setProductCategory] = useState("");
//   const [productImage, setProductImage] = useState(null);
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");

//   const handleImageChange = (event) => {
//     const file = event.target.files[0];
//     setProductImage(file);
//   };

  const handleSubmit = async (event) => {
    event.preventDefault();
    setLoading(true);

    const formData = {
        "name":productName,
        "des":productDescription,
        "price":productPrice,
        "category":productCategory
    };

    try {
      console.log("Product Name:", productName);
      console.log("Product Description:", productDescription);
      console.log("Product Price:", productPrice);
      console.log("Product Category:", productCategory);
    //   console.log("Product Image:", productImage);

      const response = await fetch("api/products", {
        method: "POST",
        headers:{'Content-Type':"application/json"},
        body: JSON.stringify(formData),
      });

      if (response.ok) {
        setMessage("Product added successfully!");
        // Reset form after successful submission
        setProductName("");
        setProductDescription("");
        setProductPrice("");
        setProductCategory("");
        // setProductImage(null);
      } else {
        setMessage("Failed to add product");
      }
    } catch (error) {
      setMessage("Error occurred while adding product");
    }

    setLoading(false);
  };

  return (
    <div className="add-product-container">
      <h2>Add New Product</h2>
      {message && <p>{message}</p>}
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label>Product Name</label>
          <input
            type="text"
            value={productName}
            onChange={(e) => setProductName(e.target.value)}
            required
          />
        </div>

        <div className="form-group">
          <label>Product Description</label>
          <textarea
            value={productDescription}
            onChange={(e) => setProductDescription(e.target.value)}
            required
          />
        </div>

        <div className="form-group">
          <label>Product Price</label>
          <input
            type="number"
            value={productPrice}
            onInput={(e) => setProductPrice(e.target.value)}
            required
          />
        </div>

        <div className="form-group">
          <label>Product Category</label>
          <input
            type="number"
            value={productCategory}
            onChange={(e) => setProductCategory(e.target.value)}
            required
          ></input>
        </div>

        {/* <div className="form-group">
          <label>Product Image</label>
          <input
            type="file"
            onChange={handleImageChange}
            required
          />
        </div> */}

        <button type="submit" disabled={loading}>
          {loading ? "Adding Product..." : "Add Product"}
        </button>
      </form>
    </div>
  );
};

export default AddProduct;
