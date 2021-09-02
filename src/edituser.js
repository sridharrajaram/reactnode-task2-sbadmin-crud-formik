import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { useHistory } from 'react-router-dom';
import Loading from './loading';
import { useFormik } from 'formik';


function EditUser(props) {
    
    const [isLoading, setIsLoading] = useState(false); // to show loading till data gets fetched from server
    const history = useHistory(); //calling useHistory function for redirection to other component

    //using formik for form validation and submission
    const formik = useFormik({
        initialValues: {
            userName: "",
            position: "",
            office: "",
            startDate: "",
            salary: "",
        },
        validate: (values) => {
            const errors = {};
            if (!values.userName) {
                errors.userName = "Required"
            }
            if (!values.position) {
                errors.position = "Required"
            }
            if (!values.office) {
                errors.office = "Required"
            }
            if (!values.startDate) {
                errors.startDate = "Required"
            }
            if (!values.salary) {
                errors.salary = "Required"
            }
            return errors;
        },
        onSubmit: async (values) => {
            console.log(values);
            try {
                setIsLoading(true);
                let users = await axios.put(`http://localhost:3001/update-user/${props.match.params.id}`, values);
                console.log(users.data.message);
            } catch (error) {
                console.log(error);
                setIsLoading(true);
            }

            isLoading ? <Loading></Loading> : history.push("/user") //redirection command to users component
        }

    })

    useEffect(async () => {
        //this code will executed when it entered into this component
        //we have user id, get user data by id and populate in form
        try {
            let userData = await axios.get(`http://localhost:3001/users/${props.match.params.id}`);
            console.log(userData);
            formik.setFieldValue("userName", userData.data.userName)
            formik.setFieldValue("position", userData.data.position)
            formik.setFieldValue("office", userData.data.office)
            formik.setFieldValue("startDate", userData.data.startDate)
            formik.setFieldValue("salary", userData.data.salary)
        } catch (error) {
            console.log(error);
        }
    }, [])

    return (
        <div>
            <div className="d-sm-flex align-items-center justify-content-between mb-4">
                <h1 className="h3 mb-0 text-gray-800">Edit User</h1>
            </div>

            <div className="container">
                <form onSubmit={formik.handleSubmit}>
                    <div className="row">
                        <div className="col-lg-6 mt-2">
                            <label>User Name</label>
                            <input type="text"
                                name="userName"
                                value={formik.values.userName}
                                onChange={formik.handleChange}
                                className="form-control"
                            />
                            {
                                formik.errors.userName ? <span style={{ color: "red" }}>{formik.errors.userName}</span> : null
                            }
                        </div>
                        <div className="col-lg-6 mt-2">
                            <label>Position</label>
                            <input type="text"
                                name="position"
                                value={formik.values.position}
                                onChange={formik.handleChange} className="form-control"
                            />
                            {
                                formik.errors.position ? <span style={{ color: "red" }}>{formik.errors.position}</span> : null
                            }
                        </div>
                        <div className="col-lg-6 mt-2">
                            <label>Office</label>
                            <input type="text"
                                name="office"
                                value={formik.values.office}
                                onChange={formik.handleChange}
                                className="form-control"
                            />
                            {
                                formik.errors.office ? <span style={{ color: "red" }}>{formik.errors.office}</span> : null
                            }
                        </div>
                        <div className="col-lg-6 mt-2">
                            <label>Start Date</label>
                            <input type="date"
                                name="startDate"
                                value={formik.values.startDate}
                                onChange={formik.handleChange}
                                className="form-control"
                            />
                            {
                                formik.errors.startDate ? <span style={{ color: "red" }}>{formik.errors.startDate}</span> : null
                            }
                        </div>
                        <div className="col-lg-6 mt-2">
                            <label>Salary</label>
                            <input type="text"
                                name="salary"
                                value={formik.values.salary}
                                onChange={formik.handleChange}
                                className="form-control"
                            />
                            {
                                formik.errors.salary ? <span style={{ color: "red" }}>{formik.errors.salary}</span> : null
                            }
                        </div>
                        <div className="col-lg-12 mt-2">
                            {
                                (formik.errors.userName || formik.errors.position || formik.errors.office || formik.errors.startDate || formik.errors.salary) ?
                                <input type="submit"
                                    value="Update"
                                    className="btn btn-primary"
                                    disabled={true}
                                />
                                :
                                <input type="submit"
                                    value="Update"
                                    className="btn btn-primary"
                                    disabled={false}
                                />
                            }
                        </div>
                    </div>
                </form>
            </div>
        </div>
    );
}

export default EditUser
