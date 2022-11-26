import {useEffect, useRef, useState} from "react";
import {UserItem} from "./UserItem";
import {AddUser} from "./AddUser";
import useAxiosPrivate from "../../api/useAxiosPrivate";

export function User(){

    const [users, setUsers] = useState([]);
    const effectRan = useRef(false)

    const protectedAxios = useAxiosPrivate();
    const controller = new AbortController();

    useEffect(() => {
        if (effectRan.current === false) {
            effectRan.current = true
            protectedAxios.get(`/api/user/getAll`,{
                signal: controller.signal
            })
                .then(function
                    (response) {
                    setUsers(response.data)
                }).catch(function (error) {
                console.log(error);
            });
        }
    }, [])

    return (
        <div className="container ">
            <div className="content contact-list ">
                <div className="card card-default ">
                    <div className="card-header align-items-center px-3 px-md-5">
                        <AddUser/>
                    </div>
                    <table className="table table-sm">
                        <thead className="table">
                        <tr>
                            <th scope="col">Name</th>
                            <th scope="col">Username</th>
                            <th scope="col">Email</th>
                            <th scope="col">Role</th>
                            <th scope="col">Options</th>
                        </tr>
                        </thead>
                        <tbody>
                        {users.map(user => <UserItem user={user} key={user.id}
                                                                  className="col-lg-6 col-xl-4 col-md-6 col-sm-12">
                        </UserItem>)}
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    )
}
