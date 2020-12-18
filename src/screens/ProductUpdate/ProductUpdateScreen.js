import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import axios from "axios";
import "./ProductUpdateScreen.css";
import { detailsProduct, updateProduct } from "../../actions/product.action";

function ProductUpdateScreen(props) {
  const productDetail = useSelector((state) => state.productDetails);
  const { product, loading, error } = productDetail;
  let pr = { ...product };
  let { _id } = product ? product : "";
  let id = props.location.search.split("=")[1];
  useEffect(() => {
    dispatch(detailsProduct(id));
  }, [id]);

  const [name, setName] = useState(pr ? pr.name : "");
  const [price, setPrice] = useState(pr ? pr.price : "");
  const [image, setImage] = useState(pr ? pr.image : "");
  const [brand, setBrand] = useState(pr ? pr.brand : "");
  const [category, setCategory] = useState(pr ? pr.category : "");
  const [description, setDescription] = useState(pr ? pr.description : "");
  const [uploading, setUploading] = useState(false);
  const dispatch = useDispatch();
  console.log(product);
  const uploadFile = (e) => {
    const file = e.target.files[0];
    const bodyFormData = new FormData();
    bodyFormData.append("image", file);
    setUploading(true);
    axios
      .post("/api/uploads", bodyFormData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      })
      .then((response) => {
        setImage(response.data);
        setUploading(false);
      })
      .catch((err) => {
        console.log(err);
        setUploading(false);
      });
  };
  const handleSubmit = (e) => {
    e.preventDefault();
    console.log({ _id, name, price, image, brand, category, description });
    dispatch(
      updateProduct({ _id, name, price, image, brand, category, description })
    );
    setTimeout(() => {
      props.history.push("/list");
    }, 1000);
  };
  return (
    <>
      {pr && (
        <form className="form" onSubmit={handleSubmit}>
          <h1>Update Product</h1>
          {loading && <div>Loading...</div>}
          {error && (
            <p style={{ color: "red" }}>
              Have error when loading to upload product.Please try again.
            </p>
          )}

          <div className="form-group">
            <label htmlFor="name">Name:</label>
            <input
              Value={pr.name}
              type="text"
              required
              autoFocus
              className="form-control form-create"
              placeholder="Enter name product"
              onChange={(e) => setName(e.target.value)}
              id="name"
            />
          </div>
          <div className="form-group">
            <label htmlFor="price">Price:</label>
            <input
              type="int"
              Value={pr.price}
              className="form-control form-create"
              placeholder="Enter price"
              required
              autoFocus
              onChange={(e) => setPrice(e.target.value)}
              id="price"
            />
          </div>
          <div className="form-group">
            <label htmlFor="image">Image:</label>
            <input
              type="text"
              hidden
              name="image"
              Value={ pr.image }
              onChange={(e) => setImage(e.target.value)}
            />
            <input
              type="file"
              style={{ paddingBottom: "30px" }}
              className="form-control form-create"
              placeholder="No file choose"
              id="image"
              onChange={uploadFile}
            />
            {uploading && <div>Uploading...</div>}
            <img
              style={{
                width: "100%",
                paddingTop: "2rem",
                paddingBottom: "2rem",
              }}
              src={`api/uploads/${pr.image}`}
            />
          </div>
          <div className="form-group">
            <label htmlFor="brand">Brand:</label>
            <input
              type="text"
              className="form-control form-create"
              placeholder="Enter brand"
              required
              autoFocus
              Value={pr.brand}
              onChange={(e) => setBrand(e.target.value)}
              id="brand"
            />
          </div>
          <div className="form-group">
            <label htmlFor="category">Category:</label>
            <input
              type="text"
              className="form-control form-create"
              placeholder="Enter category"
              required
              autoFocus
              Value={pr.category}
              onChange={(e) => setCategory(e.target.value)}
              id="category"
            />
          </div>
          <div className="form-group">
            <label htmlFor="description">Description:</label>
            <input
              type="text"
              className="form-control form-create"
              placeholder="Enter description"
              required
              autoFocus
              Value={pr.description}
              onChange={(e) => setDescription(e.target.value)}
              id="description"
            />
          </div>
          <div className="form-group">
            <button type="submit" className="btn btn-primary btn-create">
              Update
            </button>
          </div>
          <div className="form-group">
            <button
              className="btn btn-warning btn-create"
              onClick={() => {
                props.history.push("/list");
              }}
            >
              Back
            </button>
          </div>
        </form>
      )}
    </>
  );
}

export default ProductUpdateScreen;
