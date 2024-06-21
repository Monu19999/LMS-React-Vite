import React from "react";
import { useForm } from "react-hook-form";
import { Button, Form, Container, Row, Col } from "react-bootstrap";
import api from "@src/apis/api";

function Feedback() {
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm();


  const onSubmit = async (data) => {
    let api_url = api("user_feedback");
    let headers = {
      Accept: "application/json",
      "Content-Type": "application/json",
    };
    
    try {
      const response = await fetch(api_url, {
        mode: "cors",
        method: "POST",
        headers,
      });
  
      const json = await response.json();
      if (response.status !== 200) {
        throw new Error("Bad response", {
          cause: json,
        });
      }
      // console.log(json);
      reset();
    } catch (error) {
      console.warn(error);
    }
  
    console.log(data);
  };
  
  return (
    <Container className="mt-5">
      <div className="wrap d-md-flex">
        <div className="col-md-12 bg-white p-lg-5">
          <Form
            className="d-flex py-3 w-100 flex-column gap-3"
            onSubmit={handleSubmit(onSubmit)}
          >
            <Row>
              {/* Name */}
              <Col md={6}>
                <Form.Group
                  className="form-group mb-3"
                  controlId="formGroupFName"
                >
                  <Form.Label className="label">Name</Form.Label>
                  <Form.Control
                    className="mb-2"
                    type="text"
                    placeholder="Enter Name"
                    aria-describedby="nameHelpBlock"
                    {...register("name", { required: "Name is required" })}
                    isInvalid={!!errors.name}
                  />
                  <Form.Control.Feedback type="invalid">
                    {errors.name?.message}
                  </Form.Control.Feedback>
                </Form.Group>
              </Col>

              {/* Email */}
              <Col md={6}>
                <Form.Group
                  className="form-group mb-3"
                  controlId="formGroupEmail"
                >
                  <Form.Label className="label">Email</Form.Label>
                  <Form.Control
                    className="mb-2"
                    type="email"
                    placeholder="Enter Email"
                    aria-describedby="emailHelpBlock"
                    {...register("email", {
                      required: "Email is required",
                      pattern: {
                        value:
                          /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/,
                        message: "Invalid email address",
                      },
                    })}
                    isInvalid={!!errors.email}
                  />
                  <Form.Control.Feedback type="invalid">
                    {errors.email?.message}
                  </Form.Control.Feedback>
                </Form.Group>
              </Col>

              {/* Mobile */}
              <Col md={6}>
                <Form.Group
                  className="form-group mb-3"
                  controlId="formGroupMobile"
                >
                  <Form.Label className="label">Mobile</Form.Label>
                  <Form.Control
                    className="mb-2"
                    type="tel"
                    placeholder="Enter Mobile"
                    aria-describedby="mobileHelpBlock"
                    {...register("mobile", {
                      required: "Mobile number is required",
                      pattern: {
                        value: /^[0-9]{10}$/,
                        message: "Invalid mobile number",
                      },
                    })}
                    isInvalid={!!errors.mobile}
                  />
                  <Form.Control.Feedback type="invalid">
                    {errors.mobile?.message}
                  </Form.Control.Feedback>
                </Form.Group>
              </Col>

              {/* Subject */}
              <Col md={6}>
                <Form.Group
                  className="form-group mb-3"
                  controlId="formGroupSubject"
                >
                  <Form.Label className="label">Subject</Form.Label>
                  <Form.Control
                    className="mb-2"
                    type="text"
                    placeholder="Enter Subject"
                    aria-describedby="subjectHelpBlock"
                    {...register("subject", {
                      required: "Subject is required",
                    })}
                    isInvalid={!!errors.subject}
                  />
                  <Form.Control.Feedback type="invalid">
                    {errors.subject?.message}
                  </Form.Control.Feedback>
                </Form.Group>
              </Col>

              {/* Message */}
              <Col md={6}>
                <Form.Group
                  className="form-group mb-3"
                  controlId="formGroupMessage"
                >
                  <Form.Label className="label">Message</Form.Label>
                  <Form.Control
                    className="mb-2"
                    as="textarea"
                    placeholder="Enter Message"
                    aria-describedby="messageHelpBlock"
                    rows={3}
                    {...register("message", {
                      required: "Message is required",
                    })}
                    isInvalid={!!errors.message}
                  />
                  <Form.Control.Feedback type="invalid">
                    {errors.message?.message}
                  </Form.Control.Feedback>
                </Form.Group>
              </Col>
            </Row>
            <Row className="justify-content-center mt-4">
              <Col md={3} className="d-flex gap-2">
                <Button
                  type="submit"
                  className="form-control btn btn-primary  px-4"
                >
                  Submit
                </Button>
                <Button
                  type="button"
                  className="form-control btn btn-secondary"
                  onClick={() => reset()}
                >
                  Reset
                </Button>
              </Col>
            </Row>
          </Form>
        </div>
      </div>
    </Container>
  );
}

export default Feedback;
