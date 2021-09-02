import axios from 'axios';
import React, { useState } from 'react';
import { useHistory } from 'react-router-dom';
import Loading from './loading';
import {useFormik} from 'formik';

const url = "https://sridharrajaram-node-sbadmin.herokuapp.com"

function CreateUser(props) {

    const [isLoading,setIsLoading]=useState(false); // to show loading till data gets fetched from server
    
    const history = useHistory(); //calling useHistory function for redirection to other component
    
    const formik = useFormik({
        initialValues:{
            userName:"",
            position:"",
            office:"",
            startDate:"",
            salary:"",
        },
        validate: (values) => {
            const errors = {};
            if(!values.userName){
                errors.userName = "Required"
            }
            if(!values.position){
                errors.position ="Required"
            }
            if(!values.office){
                errors.office ="Required"
            }
            if(!values.startDate){
                errors.startDate ="Required"
            }
            if(!values.salary){
                errors.salary ="Required"
            }
            return errors;
        },
        onSubmit: async (values) => {
            console.log(values);
            try {
                setIsLoading(true);
                let users = await axios.post(`${url}/create-user`,values);
                console.log(users.data);
            } catch (error) {
                console.log(error);
                setIsLoading(true);
            }
    
            isLoading ? <Loading></Loading> :  history.push("/user") //redirection command to users component
        }

    })

    return (
        <div>
            <div className="d-sm-flex align-items-center justify-content-between mb-4">
                <h1 className="h3 mb-0 text-gray-800">Create User</h1>
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
                                formik.errors.userName ? <span style={{color:"red"}}>{formik.errors.userName}</span> : null
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
                                formik.errors.position ? <span style={{color:"red"}}>{formik.errors.position}</span> : null
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
                                formik.errors.office ? <span style={{color:"red"}}>{formik.errors.office}</span> : null
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
                                formik.errors.startDate ? <span style={{color:"red"}}>{formik.errors.startDate}</span> : null
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
                                formik.errors.salary ? <span style={{color:"red"}}>{formik.errors.salary}</span> : null
                            }
                        </div>
                        <div className="col-lg-12 mt-2">
                        {
                                (formik.errors.userName || formik.errors.position || formik.errors.office || formik.errors.startDate || formik.errors.salary) ? 
                                <input type="submit"
                                    value="Submit"
                                    className="btn btn-primary"
                                    disabled={true}
                                />
                                :
                                <input type="submit"
                                    value="Submit"
                                    className="btn btn-primary"
                                    disabled={false}
                                />
                            }
                        </div>
                    </div>
                </form>
            </div>
        </div>    
    )
}

export default CreateUser
