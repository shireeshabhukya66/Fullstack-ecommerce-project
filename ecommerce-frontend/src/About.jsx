function About() {
  return (
    <div className="container-fluid py-3 px-5">

      <div className="text-center mb-5 pb-4">
        <h1 className="fw-bold display-5">MyStore</h1>
        <p className="text-muted fs-5">
          A modern e-commerce platform built using React & Django REST API
        </p>
      </div>


      <div className="row align-items-center mb-5 pb-4">
        <div className="col-md-6">
          <h3 className="fw-bold">About the Project</h3>
          <p className="text-muted">
            MyStore is a full-stack CRUD application where users can view,
            update, and manage products. It demonstrates REST API integration,
            frontend state management, and responsive UI design.
          </p>
        </div>

        <div className="col-md-6 text-center">
          <img
            src="https://cdn-icons-png.flaticon.com/512/263/263142.png"
            alt="about"
            style={{ width: "120px", opacity: 0.7 }}
          />
        </div>
      </div>

      <div className="text-center mt-5 pb-4">
        <h3 className="fw-bold mb-5">Features</h3>

        <div className="row">
          <div className="col-md-3">
            <div className="card p-3 shadow-sm border-0">
              <h5>Products</h5>
              <p className="small text-muted">View all products easily</p>
            </div>
          </div>

          <div className="col-md-3">
            <div className="card p-3 shadow-sm border-0">
              <h5>Edit</h5>
              <p className="small text-muted">Update product details</p>
            </div>
          </div>

          <div className="col-md-3">
            <div className="card p-3 shadow-sm border-0">
              <h5>Delete</h5>
              <p className="small text-muted">Remove products</p>
            </div>
          </div>

          <div className="col-md-3">
            <div className="card p-3 shadow-sm border-0">
              <h5>Responsive</h5>
              <p className="small text-muted">Works on all devices</p>
            </div>
          </div>
        </div>
      </div>
    </div>

  );
}

export default About;
