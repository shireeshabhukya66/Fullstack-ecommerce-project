import "./App.css";
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";

function App() {
  const navigate = useNavigate();
  const [search, setSearch] = useState("");
  const [category, setCategory] = useState("");
  const [products, setProducts] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);

  const productsPerPage = 8;

  const lastProductIndex = currentPage * productsPerPage;

  const firstProductIndex = lastProductIndex - productsPerPage;

  const filteredProducts = products.filter((product) => {
    const matchesSearch =
      product.name.toLowerCase().includes(search.toLowerCase()) ||
      product.category.toLowerCase().includes(search.toLowerCase());

    const matchesCategory = category === "" || product.category === category;

    return matchesSearch && matchesCategory;
  });

  const currentProducts = filteredProducts.slice(
    firstProductIndex,
    lastProductIndex,
  );

  useEffect(() => {
    setCurrentPage(1);
  }, [search, category]);

  const totalPages = Math.ceil(filteredProducts.length / productsPerPage);

  useEffect(() => {
    const token = localStorage.getItem("token");

    console.log("TOKEN:", token); //Prints token in browser console

    if (!token) {
      navigate("/login");
      return;
    }

    fetch("http://127.0.0.1:8000/products/", {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })
      .then((res) => {
        if (res.status === 401) {
          //Unauthorized
          localStorage.removeItem("token");
          navigate("/login");
          throw new Error("Unauthorized");
        }

        return res.json();
      })
      .then((data) => {
        setProducts(data);
      })
      .catch((err) => console.error(err));
  }, [navigate]);

  const deleteProduct = (id) => {
    fetch(`http://127.0.0.1:8000/products/${id}/`, {
      method: "DELETE",

      headers: {
        Authorization: `Bearer ${localStorage.getItem("token")}`,
      },
    }).then((res) => {
      if (res.ok) {
        setProducts((prev) => prev.filter((p) => p.id !== id));
      }
    });
  };

  return (
    <div className="container-fluid mt-2 px-4">
      <div className="row m-4">
        <div className="col-md-9">
          <input
            type="text"
            className="form-control"
            placeholder="Search products..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
        </div>

        <div className="col-md-3">
          <select
            className="form-select"
            value={category}
            onChange={(e) => setCategory(e.target.value)}
          >
            <option value="">All Categories</option>
            <option value="Electronics">Electronics</option>
            <option value="Beauty">Beauty</option>
            <option value="Fashion">Fashion</option>
          </select>
        </div>
      </div>
      <div className="row">
        {currentProducts.map((product) => (
            <div key={product.id} className="col-md-3 mb-5">
              <div className="card product-card h-100 shadow-sm border-0">
                <img
                  src={product.image}
                  className="card-img-top"
                  alt={product.name}
                />

                <div className="card-body d-flex flex-column">
                  <h5 className="card-title fw-bold">{product.name}</h5>

                  <p className="card-text text-muted small">
                    {product.description}
                  </p>
                  <div className="mb-2">
                    {product.discount_price ? (
                      <>
                        <span className="text-muted text-decoration-line-through me-2">
                          ₹{product.price}
                        </span>
                        <span className="text-danger fw-bold fs-5">
                          ₹{product.discount_price}
                        </span>
                      </>
                    ) : (
                      <span className="text-primary fw-bold fs-5">
                        ₹{product.price}
                      </span>
                    )}
                  </div>

                  <div className="text-muted small">
                    <div>Company: {product.company}</div>
                    <span className="badge bg-light text-dark border mt-2 p-2">
                      {product.category}
                    </span>
                  </div>

                  <div className="mt-auto d-flex gap-2">
                    <button
                      className="btn btn-sm btn-warning px-3 py-2"
                      onClick={() => navigate(`/edit/${product.id}`)}
                    >
                      Edit
                    </button>

                    <button
                      className="btn btn-sm btn-danger px-3 py-2"
                      onClick={() => deleteProduct(product.id)}
                    >
                      Delete
                    </button>
                  </div>
                </div>
              </div>
            </div>
          ))}
      </div>

      <div className="d-flex justify-content-center gap-3 my-4">
        <button
          className="btn btn-dark"
          disabled={currentPage === 1}
          onClick={() => setCurrentPage(currentPage - 1)}
        >
          Previous
        </button>

        <span className="fw-bold pt-2">
          Page {currentPage} of {totalPages}
        </span>

        <button
          className="btn btn-dark"
          disabled={currentPage === totalPages}
          onClick={() => setCurrentPage(currentPage + 1)}
        >
          Next
        </button>
      </div>

      <footer className="bg-dark text-light mt-5 pt-4 pb-2">
        <div className="container text-center text-md-start">
          <div className="row">
            <div className="col-md-4 mb-3">
              <h5 className="fw-bold">MyStore</h5>
              <p className="small">
                Your one-stop shop for quality products at the best prices.
              </p>
            </div>

            <div className="col-md-4 mb-3">
              <h6 className="fw-semibold">Quick Links</h6>
              <ul className="list-unstyled">
                <li>
                  <Link to="/" className="text-light text-decoration-none">
                    Home
                  </Link>
                </li>

                <li>
                  <Link to="/about" className="text-light text-decoration-none">
                    About
                  </Link>
                </li>

                <li>
                  <a href="#" className="text-light text-decoration-none">
                    Contact
                  </a>
                </li>
              </ul>
            </div>

            <div className="col-md-4 mb-3">
              <h6 className="fw-semibold">Contact</h6>
              <p className="small mb-1">Email: support@mystore.com</p>
              <p className="small">Phone: +91 9876543210</p>
            </div>
          </div>

          <hr className="border-light" />

          <p className="text-center small mb-0">
            © {new Date().getFullYear()} MyStore. All rights reserved.
          </p>
        </div>
      </footer>
    </div>
  );
}

export default App;
