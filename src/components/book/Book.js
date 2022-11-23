import {useEffect, useState, useRef} from "react";
import {AddBook} from "./AddBook";

import {BookItem} from "./BookItem";
import useAxiosPrivate from "../../api/useAxiosPrivate";

export function Book() {

    const [books, setBooks] = useState([]);
    const effectRan = useRef(false)

    const protectedAxios = useAxiosPrivate();
    const controller = new AbortController();

    useEffect(() => {
        if (effectRan.current === false) {
            effectRan.current = true
            protectedAxios.get('/api/book/getAll', {
                signal: controller.signal
            })
                .then(function
                    (response) {
                    setBooks(response.data)
                }).catch(function (error) {
                console.log(error);
                // navigate('/login', { state: { from: location }, replace: true });
            });
        }
    }, [])


    return (
        <div className="container">
            <div className="content contact-list">
                <div className="card card-default">
                    <div className="card-header align-items-center px-3 px-md-5">
                        <AddBook></AddBook>
                    </div>
                    <div className="card-body px-3 px-md-5">
                        <div className="row">
                            {books.map(book => <BookItem book={book} key={book.id}
                                                         className="col-lg-6 col-xl-4 col-md-6 col-sm-12">
                            </BookItem>)}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}
