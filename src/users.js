import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import axios from 'axios';
import Loading from "./loading";

export default function Users() {

    const [userList, setUserList] = useState([]);
    const [isLoading, setIsLoading] = useState(true);

    // function to get data from server
    let getUser = async () => {

        let users = await axios.get("http://localhost:3001/users");
        console.log(users.data);
        setUserList([...users.data]);
        setIsLoading(false);
    }

    useEffect(() => {
        try {
            getUser();
        } catch (error) {
            console.log(error);
            setIsLoading(false);
        }

    }, [])

    let handleDelete = async (id) => {

        let confirm = window.confirm("Are you sure wanna delete the user?");
        if (confirm) {
            try {
                let deluser = await axios.delete(`http://localhost:3001/delete-user/${id}`) // deleting in actual dom
                console.log(deluser.data.message);
                getUser();
            } catch (error) {
                console.log(error);
            }
        }
    }

    return (
        <>

            <h1 class="h3 mb-2 text-gray-800">Users</h1>
            <p class="mb-4">DataTables is a third party plugin that is used to generate the demo table below.
                For more information about DataTables, please visit the <a href="https://datatables.net" target="_blank">
                    official DataTables documentation</a>.
            </p>

            <Link to="/create-user" class="d-none d-sm-inline-block btn btn-sm btn-primary shadow-sm"><i
                class="fas fa-download fa-sm text-white-50"></i>Create User</Link>

            <div class="card shadow mb-4">
                <div class="card-header py-3">
                    <h6 class="m-0 font-weight-bold text-primary">DataTables Example</h6>
                </div>
                <div class="card-body">
                    <div class="table-responsive">
                        {
                            <table class="table table-bordered" id="dataTable" width="100%" cellspacing="0">
                                    <thead>
                                        <tr>
                                            <th>Id</th>
                                            <th>Name</th>
                                            <th>Position</th>
                                            <th>Office</th>
                                            <th>Start date</th>
                                            <th>Salary</th>
                                            <th>Action</th>
                                        </tr>
                                    </thead>
                                    <tfoot>
                                        <tr>
                                            <th>Id</th>
                                            <th>Name</th>
                                            <th>Position</th>
                                            <th>Office</th>
                                            <th>Start date</th>
                                            <th>Salary</th>
                                            <th>Action</th>
                                        </tr>
                                    </tfoot>
                                    <tbody>
                                        {
                                            userList.map((obj,Index) => {
                                                return (
                                                    <tr key={Index+1}>
                                                        <td>{Index+1}</td>
                                                        <td>{obj.userName}</td>
                                                        <td>{obj.position}</td>
                                                        <td>{obj.office}</td>
                                                        <td>{obj.startDate}</td>
                                                        <td>{obj.salary}</td>
                                                        <td>
                                                            <Link to={`/user/edit/${obj._id}`} className="btn btn-sm btn-primary">Edit</Link> &nbsp;
                                                            <button onClick={() => { handleDelete(obj._id) }} className="btn btn-sm btn-danger">Delete</button>
                                                        </td>
                                                    </tr>
                                                );
                                            })
                                        }
                                    </tbody>
                                </table>

                        }

                    </div>
                </div>
            </div>
        </>

    );
}