import {useEffect, useRef, useState} from "react";
import {AuthorItem} from "./AuthorItem";
import useAxiosPrivate from "../../api/useAxiosPrivate";

export function Author() {

    const [authors, setAuthors] = useState([]);
    const effectRan = useRef(false)

    const protectedAxios = useAxiosPrivate();
    const controller = new AbortController();

    useEffect(() => {
        if (effectRan.current === false) {
            effectRan.current = true
            protectedAxios.get(`/api/user/getAuthors`,{
                signal: controller.signal
            }).then(function
                    (response) {
                    console.log(response);
                    setAuthors(response.data)

                }).catch(function (error) {
                console.log(error);
            });
        }
    }, [])

    return (

        <div className="container">
            <div className="card-body px-3 px-md-5">
                <div className="row">
                    {authors.map(author => <AuthorItem author={author} key={author.id}
                                                       className="col-lg-6 col-xl-4 col-md-6 col-sm-12">

                    </AuthorItem>)}
                </div>
            </div>
        </div>
    )
}



