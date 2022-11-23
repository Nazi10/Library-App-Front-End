import {useParams} from "react-router-dom";
import {useEffect, useRef, useState} from "react";
import useAxiosPrivate from "../../api/useAxiosPrivate";
import {AuthorBookItem} from "./AuthorBookItem";

export const AuthorBooks = () => {

    const [books, setBooks] = useState([]);
    const effectRan = useRef(false)

    const protectedAxios = useAxiosPrivate();
    const controller = new AbortController();

    const {id} = useParams()

    useEffect(() => {
        if (effectRan.current === false) {
            effectRan.current = true
            protectedAxios.get(`/api/book/author/${id}`, {
                signal: controller.signal
            })
                .then(function
                    (response) {
                    console.log(response);
                    setBooks(response.data)
                }).catch(function (error) {
                console.log(error);
            });
        }
    },)

    if (books.length === 0) {
        return <h1> This author doesnt have any books</h1>
    }

    return (
        <div className="container">
            <div className="content contact-list">
                <div className="card card-default">
                    <div className="card-body px-3 px-md-5">
                        <div className="row">
                            {books.map(book => <AuthorBookItem book={book} key={book.id}
                                                         className="col-lg-6 col-xl-4 col-md-6 col-sm-12">
                            </AuthorBookItem>)}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )

}
