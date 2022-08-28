import React, { useEffect, useState } from "react";

import axios from "axios";
import { format } from 'date-fns';
import { Toast, ToastContainer } from "react-bootstrap";

import "./Activity.css";

export default function Activity() {
  const [isLoaded, setIsLoaded] = useState(false);
  const [urls, setUrls] = useState([]);
  const [message, setMessage] = useState("");
  const [name, setName] = useState("");
  const [original_url, setUrl] = useState("");
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState(false);

  // load urls at page creation
  useEffect(() => {
    fetchUrls();
  }, []);

  // fetch urls
  function fetchUrls() {
    const configuration = {
      method: "get",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
        Authorization: `Bearer ` + sessionStorage.getItem("url_token"),
      },
      url: `${process.env.REACT_APP_BASE_URL}`.concat("/urls"),
    };

    axios(configuration)
      .then((result) => {
        setIsLoaded(true);
        setMessage(result.data.message);
        setUrls([...result.data.data]);
      })
      .catch(() => {
        
      });
  }

  // create new url
  const handleSubmit = (e) => {
    e.preventDefault();

    let pass = true;
    if (
      name == null ||
      name === "" ||
      original_url == null ||
      original_url === ""
    ) {
      pass = false;
    }

    if (pass) {
      const configuration = {
        method: "post",
        url: `${process.env.REACT_APP_BASE_URL}`.concat("/urls"),
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
          Authorization: `Bearer ` + sessionStorage.getItem("url_token"),
        },
        data: {
          name,
          original_url,
        },
      };

      axios(configuration)
        .then((result) => {
          setSuccess(true);
          setMessage(result.data.message);

          fetchUrls()
        })
        .catch((err) => {
          setError(true);
          setMessage([...err.response.data.errors]);
        });
    } else {
      setError(true);
      setMessage(["Fill in the required fields!"]);
    }
  };

  //clear data
  const clearData = () => {
    if (success) {
      setName("");
      setUrl("");

      let modal = document.getElementById("closeModal");
      modal.click();
    }

    setSuccess(false);
    setError(false);
    setMessage("");
  };

  //render errors
  function renderErrors() {
    const errors = [];

    let i = 0;
    for (const err of message) {
      errors.push(<li className="text-white" key={i}>{err}</li>);
      i++;
    }

    return errors;
  }

  //return value
  return (
    <div className="container act-container py-3">
      {/** Page heading */}
      <div className="d-flex justify-content-between">
        <div className="p2">
          <h2>
            <strong>Past Activity</strong>
          </h2>
        </div>

        <div>
          {/* Button trigger modal*/}
          <button
            type="button"
            className="btn btn-primary"
            data-bs-toggle="modal"
            data-bs-target="#shortenModal"
          >
            Shorten URL
          </button>

          {/* Modal */}
          <div
            className="modal fade"
            id="shortenModal"
            tabIndex="-1"
            aria-labelledby="shortenModalLabel"
            aria-hidden="true"
          >
            <div className="modal-dialog">
              <div className="modal-content">
                <div className="modal-header">
                  <h5 className="modal-title" id="shortenModalLabel">
                    Shorten URL
                  </h5>
                  <button
                    type="button"
                    className="btn-close"
                    data-bs-dismiss="modal"
                    aria-label="Close"
                  ></button>
                </div>
                <div className="modal-body">
                  <form onSubmit={(e) => handleSubmit(e)}>
                    <div className="mb-3">
                      <label>Name*</label>
                      <input
                        required
                        type="text"
                        className="form-control"
                        placeholder="Enter a name for the original url"
                        onChange={(e) => setName(e.target.value)}
                      />
                    </div>

                    <div className="mb-3">
                      <label>Original URL*</label>
                      <input
                        required
                        type="text"
                        className="form-control"
                        placeholder="Enter the original URL"
                        onChange={(e) => setUrl(e.target.value)}
                      />
                    </div>
                  </form>
                </div>
                <div className="modal-footer">
                  <button
                    id="closeModal"
                    type="button"
                    className="btn btn-danger"
                    data-bs-dismiss="modal"
                  >
                    Cancel
                  </button>
                  <button
                    type="button"
                    className="btn btn-primary"
                    onClick={(e) => handleSubmit(e)}
                  >
                    Shorten
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/**Table */}
      {isLoaded && (
        <div className="card">
          <div className="card-body responsive">
            <table className="table table-striped table-hover">
              <thead className="table-primary">
                <tr>
                  <th scope="col">#</th>
                  <th scope="col">Name</th>
                  <th scope="col">Original URL</th>
                  <th scope="col">Shortened URL </th>
                  <th scope="col">Date Created </th>
                  <th scope="col">Total Clicks</th>
                </tr>
              </thead>
              <tbody>
                {urls.map((url, index) => (
                  <tr key={index}>
                    <th scope="row">{index + 1}</th>
                    <td>{url.name}</td>
                    <td>{url.original_url}</td>
                    <td>{url.short_url}</td>
                    <td>{format(new Date(url.created_at), 'dd MM, yyyy HH:mm a')}</td>
                    <td>{url.clicks}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}
      {!isLoaded && <div>Activity is loading...</div>}

      {/**Toast container */}
      <ToastContainer position="top-end" className="m-2">
        {/** Error Toast */}
        <Toast
          onClose={clearData}
          show={error}
          delay={3000}
          autohide
          bg="danger"
        >
          <Toast.Header>
            <img src="holder.js/20x20?text=%20" className="rounded me-2" alt="" />
            <strong className="me-auto">Alert</strong>
            <small>1 sec ago</small>
          </Toast.Header>
          <Toast.Body>
            <ol>{renderErrors()}</ol>
          </Toast.Body>
        </Toast>

        {/** Success Toast */}
        <Toast
          onClose={clearData}
          show={success}
          delay={1500}
          autohide
          bg="success"
          placement="top-end"
        >
          <Toast.Header>
            <img src="holder.js/20x20?text=%20" className="rounded me-2" alt="" />
            <strong className="me-auto">Success</strong>
            <small>1 sec ago</small>
          </Toast.Header>
          <Toast.Body className="text-white">{message}</Toast.Body>
        </Toast>
      </ToastContainer>
    </div>
  );
}
