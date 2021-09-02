import axios from 'axios';
import React, { useState } from 'react';
import { useHistory } from 'react-router-dom';
import Loading from './loading';

import  {useFormik} from 'formik';

const URL ="http://localhost:3001"

function CreateProduct(props) {

    const [isLoading, setIsLoading] = useState(false);
    const history = useHistory(); //calling useHistory function for redirection to other component
    

    const formik = useFormik({
        initialValues: {
            productName: "",
            productPrice: ""
        },
        validate: (values) => {
            const errors = {};
            if(!values.productName){
                errors.productName = "Required"
            }
            if(!values.productPrice){
                errors.productPrice ="Required"
            }
            return errors;

        },
        onSubmit: async (values) => {
            console.log(values);
            try {
                setIsLoading(true);
                let products = await axios.post(`${URL}/create-product`,values);
                alert(products.data.message);
            } catch (error) {
                console.log(error);
                setIsLoading(true);
            }
    
            isLoading ? <Loading></Loading> : history.push("/product"); //redirection command to users component
        }
    })


    return (
        <div>
            <div className="d-sm-flex align-items-center justify-content-between mb-4">
                <h1 className="h3 mb-0 text-gray-800">Create Products</h1>
            </div>

            <div className="container">

                <form onSubmit={formik.handleSubmit}>
                    <div className="row">
                        <div className="col-lg-6 mt-2">
                            <label>Product Name</label>
                            <input type="text"
                                name="productName"
                                value={formik.values.productName}
                                onChange={formik.handleChange}
                                className="form-control"
                            />
                            {
                                formik.errors.productName ? <span style={{color:"red"}}>{formik.errors.productName}</span> : null
                            }
                        </div>
                        <div className="col-lg-6 mt-2">
                            <label>Product Price</label>
                            <input type="text"
                                name="productPrice"
                                value={formik.values.productPrice}
                                onChange={formik.handleChange}
                                className="form-control"
                            />
                            {
                                formik.errors.productPrice ? <span style={{color:"red"}}>{formik.errors.productPrice}</span> : null
                            }
                        </div>
                        <div className="col-lg-12 mt-2">
                            {
                                (formik.errors.productName || formik.errors.productPrice) ? 
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

export default CreateProduct