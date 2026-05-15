import { useParams, useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";

function EditProduct() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [product, setProduct] = useState(null);

  useEffect(() => {
   fetch(`http://127.0.0.1:8000/products/${id}/`, {
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${localStorage.getItem("token")}`,
    },
   })
     .then((res) => res.json())

     .then((data) => setProduct(data))

     .catch((err) => console.error(err));
  }, [id]);

  const handleChange = (e) => {
    setProduct({
      ...product,
      [e.target.name]: e.target.value,
    });
  };

  const handleUpdate = () => {
    fetch(`http://127.0.0.1:8000/products/${id}/`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${localStorage.getItem("token")}`,
      },
      body: JSON.stringify({
        name: product.name,
        description: product.description,
        price: Number(product.price),
        discount_price: product.discount_price
          ? Number(product.discount_price)
          : null,
        company: product.company,
        category: product.category,
        image: product.image,
      }),
    })
      .then((res) => {
        if (!res.ok) throw new Error("Update failed");
        return res.json();
      })
      .then(() => {
        alert("Updated successfully!");
        navigate("/");
      })
      .catch((err) => console.error(err));
  };

  if (!product) return <p>Loading...</p>;

  return (
    <div className="container py-5">
      <div className="row justify-content-center">
        <div className="col-md-6">
          <div className="card shadow-lg border-0 p-4">
            <h3 className="text-center mb-4 fw-bold">Edit Product</h3>

            <div className="mb-3">
              <label className="form-label">Name</label>
              <input
                className="form-control"
                name="name"
                value={product.name || ""}
                onChange={handleChange}
              />
            </div>

            <div className="mb-3">
              <label className="form-label">Description</label>
              <textarea
                className="form-control"
                name="description"
                value={product.description || ""}
                onChange={handleChange}
                rows="3"
              />
            </div>

            <div className="row">
              <div className="col-md-6 mb-3">
                <label className="form-label">Price</label>
                <input
                  className="form-control"
                  name="price"
                  value={product.price || ""}
                  onChange={handleChange}
                />
              </div>

              <div className="col-md-6 mb-3">
                <label className="form-label">Discount Price</label>
                <input
                  className="form-control"
                  name="discount_price"
                  value={product.discount_price || ""}
                  onChange={handleChange}
                />
              </div>
            </div>

            <div className="mb-3">
              <label className="form-label">Company</label>
              <input
                className="form-control"
                name="company"
                value={product.company || ""}
                onChange={handleChange}
              />
            </div>

            <div className="mb-3">
              <label className="form-label">Category</label>
              <input
                className="form-control"
                name="category"
                value={product.category || ""}
                onChange={handleChange}
              />
            </div>

            <div className="mb-3">
              <label className="form-label">Image URL</label>
              <input
                className="form-control"
                name="image"
                value={product.image || ""}
                onChange={handleChange}
              />
            </div>

            <div className="d-flex gap-2">
              <button
                onClick={handleUpdate}
                className="btn btn-success w-50 fw-semibold"
              >
                Save Changes
              </button>

              <button
                className="btn btn-secondary w-50"
                onClick={() => navigate("/")}
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default EditProduct;



