import React, { useState, useEffect, useRef } from "react";
import { useHistory, useParams } from "react-router-dom";
import axios from "axios";
import { getUser, initialize } from "../services/User";

const EditAdd = () => {
  const datemail = localStorage.getItem("EcomEmail");
  const [name, setName] = useState("");
  const [email, setEmail] = useState(datemail);
  const [phone, setPhone] = useState("");
  const [addr, setAddr] = useState("");

  const { id } = useParams();

  const timeout = useRef(null);
  const his = useHistory();
  const checkAuth = async () => {
    if (!localStorage.getItem("Ecomtoken")) return his.push("/");

    await initialize();
    getUser(localStorage.getItem("Ecomtoken"))
      .then((user) => {
        if (!user) {
          his.push("/");
        }
      })
      .catch((err) => his.push("/"));
  };

  useEffect(() => {
    timeout.current = setTimeout(checkAuth, 1000);
    return function () {
      if (timeout.current) {
        clearTimeout(timeout.current);
      }
    };
  }, []);

  const getaddress = async () => {
    const res = await axios.get(`http://localhost:8000/getaddress/${id}`);
    setName(res.data[0].name);
    setEmail(res.data[0].email);
    setPhone(res.data[0].phone);
    setAddr(res.data[0].address);
    //   console.log(res.data)
    //     setYourAddress(res.data)
  };
  useEffect(() => {
    getaddress();
  }, []);

  const onSub = async (e) => {
    e.preventDefault();
    const data = {
      name: name,
      email: email,
      phone: phone,
      address: addr,
      userId: id,
    };

    // const res = await axios.post(`http://localhost:8000/editadd`, data);
    his.push("/payment");
  };

  return (
    <>
      <div className="address">
        <div className="container ">
          <div className="row">
            <div className="col-md-6 col-12 mx-auto">
              <div className="card">
                <form onSubmit={onSub}>
                  <div className="form-group">
                    <label>Name:</label>
                    <input
                      type="text"
                      className="form-control"
                      name="name"
                      placeholder="Enter name"
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                      required
                    />
                  </div>
                  <div className="form-group">
                    <label>Email:</label>
                    <input
                      type="text"
                      className="form-control"
                      name="email"
                      readOnly
                      placeholder="Enter Email"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      required
                    />
                  </div>
                  <div className="form-group">
                    <label>Phone:</label>
                    <input
                      type="tel"
                      className="form-control"
                      name="phone"
                      placeholder="Enter Phone"
                      value={phone}
                      onChange={(e) => setPhone(e.target.value)}
                      required
                    />
                  </div>

                  <div className="form-group">
                    <label>Full Address:</label>

                    <textarea
                      name="address"
                      id=""
                      className="form-control"
                      rows="3"
                      placeholder="Enter Full Address"
                      value={addr}
                      onChange={(e) => setAddr(e.target.value)}
                      required
                    ></textarea>
                  </div>

                  <div className="text-center mb-5">
                    <input
                      type="submit"
                      className="btn btn-info pt-2 pb-2 pl-5 pr-5"
                      value="Edit Address"
                    />
                  </div>
                </form>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default EditAdd;