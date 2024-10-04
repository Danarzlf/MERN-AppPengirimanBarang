import "../../components/styles/Profile.css";

const StatisticProfile = () => {
  return (
    <>
      <div className="row gutters-sm">
        <div className="col-sm-6 mb-3">
          <div className="card h-100">
            <div className="card-body">
              <h6 className="d-flex align-items-center mb-3">
                <i className="material-icons text-info mr-2">assignment</i>
                Project Status
              </h6>
              <small>Web Design</small>
              <div className="progress mb-3" style={{ height: 5 }}>
                <div
                  className="progress-bar bg-primary"
                  role="progressbar"
                  style={{ width: "80%" }}
                  aria-valuenow={80}
                  aria-valuemin={0}
                  aria-valuemax={100}
                />
              </div>
              <small>Website Markup</small>
              <div className="progress mb-3" style={{ height: 5 }}>
                <div
                  className="progress-bar bg-primary"
                  role="progressbar"
                  style={{ width: "72%" }}
                  aria-valuenow={72}
                  aria-valuemin={0}
                  aria-valuemax={100}
                />
              </div>
              <small>One Page</small>
              <div className="progress mb-3" style={{ height: 5 }}>
                <div
                  className="progress-bar bg-primary"
                  role="progressbar"
                  style={{ width: "89%" }}
                  aria-valuenow={89}
                  aria-valuemin={0}
                  aria-valuemax={100}
                />
              </div>
              <small>Mobile Template</small>
              <div className="progress mb-3" style={{ height: 5 }}>
                <div
                  className="progress-bar bg-primary"
                  role="progressbar"
                  style={{ width: "55%" }}
                  aria-valuenow={55}
                  aria-valuemin={0}
                  aria-valuemax={100}
                />
              </div>
              <small>Backend API</small>
              <div className="progress mb-3" style={{ height: 5 }}>
                <div
                  className="progress-bar bg-primary"
                  role="progressbar"
                  style={{ width: "66%" }}
                  aria-valuenow={66}
                  aria-valuemin={0}
                  aria-valuemax={100}
                />
              </div>
            </div>
          </div>
        </div>
        <div className="col-sm-6 mb-3">
          <div className="card h-100">
            <div className="card-body">
              <h6 className="d-flex align-items-center mb-3">
                <i className="material-icons text-info mr-2">assignment</i>
                Project Status
              </h6>
              <small>Web Design</small>
              <div className="progress mb-3" style={{ height: 5 }}>
                <div
                  className="progress-bar bg-primary"
                  role="progressbar"
                  style={{ width: "80%" }}
                  aria-valuenow={80}
                  aria-valuemin={0}
                  aria-valuemax={100}
                />
              </div>
              <small>Website Markup</small>
              <div className="progress mb-3" style={{ height: 5 }}>
                <div
                  className="progress-bar bg-primary"
                  role="progressbar"
                  style={{ width: "72%" }}
                  aria-valuenow={72}
                  aria-valuemin={0}
                  aria-valuemax={100}
                />
              </div>
              <small>One Page</small>
              <div className="progress mb-3" style={{ height: 5 }}>
                <div
                  className="progress-bar bg-primary"
                  role="progressbar"
                  style={{ width: "89%" }}
                  aria-valuenow={89}
                  aria-valuemin={0}
                  aria-valuemax={100}
                />
              </div>
              <small>Mobile Template</small>
              <div className="progress mb-3" style={{ height: 5 }}>
                <div
                  className="progress-bar bg-primary"
                  role="progressbar"
                  style={{ width: "55%" }}
                  aria-valuenow={55}
                  aria-valuemin={0}
                  aria-valuemax={100}
                />
              </div>
              <small>Backend API</small>
              <div className="progress mb-3" style={{ height: 5 }}>
                <div
                  className="progress-bar bg-primary"
                  role="progressbar"
                  style={{ width: "66%" }}
                  aria-valuenow={66}
                  aria-valuemin={0}
                  aria-valuemax={100}
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default StatisticProfile;
