import axios from 'axios';
import { useFormik } from 'formik';
import React, { useEffect, useState } from 'react';
import { useHistory } from 'react-router-dom';
import Loading from './loading';


function EditProduct(props) {
    console.log(props);

    const [isLoading, setIsLoading] = useState(false); //display loading
    const history = useHistory(); //calling useHistory function for redirection to other component

    useEffect(() => {
        //this code will executed when it entered into this component
        //we have product id, get product data by id and populate in form
        async function fetch() {
            let productData = await axios.get(`http://localhost:3001/products/${props.match.params.id}`)
            console.log(productData);
            formik.setFieldValue("productName",productData.data.productName);
            formik.setFieldValue("productPrice",productData.data.productPrice);
        }
        fetch();

    }, [])

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
                let products = await axios.put(`http://localhost:3001/update-product/${props.match.params.id}`, values)
                console.log(products.data);
            } catch (error) {
                console.log(error);
                setIsLoading(false);
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

export default EditProduct
