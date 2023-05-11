"use client";

import {
  deleteUser,
  getUser,
  patchUser,
  postUser,
} from "@apiService/backend_helper";
import { useFormik } from "formik";
import * as Yup from "yup";
import { useParams } from "next/navigation";
import {} from "postcss";
import React, { useEffect, useState } from "react";
import { Container, Button, Card, Modal } from "react-bootstrap";

const userDetails = () => {
  const { userId } = useParams();
  const [data, setData] = useState([]);
  const [editData, setEditData] = useState({});
  const [showAdd, setAddShow] = useState(false);
  const [showEdit, setEditShow] = useState(false);

  useEffect(() => {
    getUserData();
  }, []);

  const getUserData = async () => {
    try {
      const result = await getUser(userId);
      setData(result.data.data);
    } catch (error) {
      console.log("error: ", error);
    }
  };
  const deleteUserData = async (id) => {
    try {
      await deleteUser(id);
      getUserData();
    } catch (error) {
      console.log("error: ", error);
    }
  };
  const handleClose = async () => {
    setAddShow(false);
    setEditShow(false);
  };

  const validate = useFormik({
    enableReinitialize: true,
    initialValues: {
      name: "",
      email: "",
      password: "",
    },
    validationSchema: Yup.object({
      name: Yup.string().required(),
      email: Yup.string().email().required(),
      password: Yup.string().required(),
    }),
    onSubmit: async (value) => {
      try {
        const result = await postUser(value);
        if (result.status === 200) {
          getUserData();
          setAddShow(false);
          validate.resetForm();
        }
      } catch (error) {
        console.log("error: ", error);
      }
    },
  });

  const editValidate = useFormik({
    enableReinitialize: true,
    initialValues: {
      name: editData?.name || "",
    },
    validationSchema: Yup.object({
      name: Yup.string().required(),
    }),
    onSubmit: async (value) => {
      try {
        const result = await patchUser({
          data: { name: value.name },
          id: editData._id,
        });
        if (result.status === 200) {
          getUserData();
          setEditShow(false);
          editValidate.resetForm();
        }
      } catch (error) {
        console.log("error: ", error);
      }
    },
  });

  return (
    <>
      <Container>
        <Card className="mt-5">
          <Card.Header className="d-flex align-items-center justify-content-between">
            <h2>List</h2>
            <Button
              variant="primary"
              onClick={() => {
                setAddShow(true);
              }}
            >
              Add
            </Button>
          </Card.Header>
          <Card.Body>
            {data.map((item, key) => {
              return (
                <Card key={key} className="mb-2">
                  <Card.Body className="d-flex align-items-center justify-content-between">
                    <div>
                      <h5>{item.name}</h5>
                      <p className="mb-0">email: {item.email}</p>
                    </div>
                    <div>
                      <Button
                        variant="info"
                        className="me-2 text-white"
                        onClick={() => {
                          setEditShow(true);
                          setEditData(item);
                        }}
                      >
                        Edit
                      </Button>
                      <Button
                        variant="danger"
                        onClick={() => {
                          deleteUserData(item._id);
                        }}
                      >
                        Remove
                      </Button>
                    </div>
                  </Card.Body>
                </Card>
              );
            })}
          </Card.Body>
        </Card>
        <Modal show={showAdd} onHide={handleClose}>
          <Modal.Header closeButton>
            <Modal.Title>Add</Modal.Title>
          </Modal.Header>
          <form
            onSubmit={(e) => {
              e.preventDefault();
              validate.handleSubmit();
              return false;
            }}
          >
            <Modal.Body>
              <div>
                <label>Full name</label>
                <input
                  type="text"
                  name="name"
                  className="form-control"
                  value={validate.values.name}
                  onChange={validate.handleChange}
                  onBlur={validate.handleBlur}
                />
                <span className="text-danger">{validate.errors.name}</span>
              </div>
              <div>
                <label>Email</label>
                <input
                  type="email"
                  name="email"
                  className="form-control"
                  value={validate.values.email}
                  onChange={validate.handleChange}
                  onBlur={validate.handleBlur}
                />
                <span className="text-danger">{validate.errors.email}</span>
              </div>
              <div>
                <label>Password</label>
                <input
                  type="password"
                  name="password"
                  className="form-control"
                  value={validate.values.password}
                  onChange={validate.handleChange}
                  onBlur={validate.handleBlur}
                />
                <span className="text-danger">{validate.errors.password}</span>
              </div>
            </Modal.Body>
            <Modal.Footer>
              <Button
                variant="secondary"
                onClick={() => {
                  setAddShow(false);
                }}
              >
                Close
              </Button>
              <Button variant="primary" type="submit">
                Save Changes
              </Button>
            </Modal.Footer>
          </form>
        </Modal>
        <Modal show={showEdit} onHide={handleClose}>
          <Modal.Header closeButton>
            <Modal.Title>Edit</Modal.Title>
          </Modal.Header>
          <form
            onSubmit={(e) => {
              e.preventDefault();
              editValidate.handleSubmit();
              return false;
            }}
          >
            <Modal.Body>
              <div>
                <label>Full name</label>
                <input
                  type="text"
                  name="name"
                  className="form-control"
                  value={editValidate.values.name}
                  onChange={editValidate.handleChange}
                  onBlur={editValidate.handleBlur}
                />
                <span className="text-danger">{editValidate.errors.name}</span>
              </div>
              <div>
                <label>Email</label>
                <input
                  type="email"
                  name="email"
                  readOnly
                  className="form-control"
                  value={editData?.email}
                />
              </div>
            </Modal.Body>
            <Modal.Footer>
              <Button
                variant="secondary"
                onClick={() => {
                  setEditShow(false);
                }}
              >
                Close
              </Button>
              <Button variant="primary" type="submit">
                Save Changes
              </Button>
            </Modal.Footer>
          </form>
        </Modal>
      </Container>
    </>
  );
};

export default userDetails;
