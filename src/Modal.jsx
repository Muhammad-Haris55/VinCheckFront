import React, { useRef } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
// import { useHistory } from 'react-router-dom';
// import { useState } from "react";
// import withrouter
// import { History } from "@mui/icons-material";
// import { withRouter } from "react-router-dom";



function Modal() {
    const inp = useRef();
    const navigate = useNavigate();
    // const history = useHistory();
    let counter = 0;
    const clickHandler = async () => {
        if (counter < 0) {
            counter++;
        } else {
            document.getElementById("loginbtn").disabled = true;
        }
        const val = inp.current.value;
        // alert(val)

        if (!val) {
            document.getElementById("loginbtn").disabled = false;
            return alert("Enter a valid Vin");
        }
        try {
            const data = await axios.get(
                `${process.env.REACT_APP_DEVELOPMENT_URL}/vindata?vin=${val}`,
                {
                    headers: { "Content-Type": "application/json" },
                }
            );

            localStorage.setItem("car_D", JSON.stringify(data.data));
            // history.push('/Preview');
            // window.location.reload(true);
            navigate({
                pathname: "/Preview"
                // window.location.reload(true)

                // "/Preview".location.reload();
                // history.push("/preview");
            });
        } catch (err) {
            document.getElementById("loginbtn").disabled = false;
            alert(err.response.data.error);
        }
    };
    return (
        <>
            {/* <!-- Modal --> */}
            <div class="modal fade" id="exampleModal" tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
                <div class="modal-dialog modal-dialog-centered">
                    <div class="modal-content">
                        <div class="modal-header">
                            <div style={{ width: '100%', display: 'flex', justifyContent: 'space-between' }}>

                                <h4 class="modal-title fs-5" id="exampleModalLabel">Package name</h4>
                                <h1 class="modal-title fs-5" id="exampleModalLabel">Remaining reports</h1>
                            </div>
                            {/* <h1 class="modal-title fs-5" id="exampleModalLabel">Package name</h1> */}
                            <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                        </div>
                        <div class="modal-body">
                            {/* <input type="placeholder" /> */}
                            <input
                                type="text"
                                class="form-control"
                                id="exampleFormControlInput1"
                                placeholder="Enter VIN to Search"
                                ref={inp}
                            // ref={inp}
                            />
                            <div className="col-md-6 mx-auto inputgroup">
                                <div className="captcha">
                                    <input
                                        type="email"
                                        class="form-control"
                                        id="exampleFormControlInput2"
                                        placeholder="Answer"
                                    ></input>
                                </div>
                                <div className="box">
                                    <div>
                                        <p className="boxp">4+1=</p>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div class="modal-footer " >

                            <div className="lbtn">
                                <button
                                    type="submit"
                                    class="btn btn-primary "
                                    data-mdb-ripple-init
                                    id="loginbtn"
                                    onClick={clickHandler}
                                >
                                    Buy Now!
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}

export default Modal
