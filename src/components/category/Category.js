import {useEffect, useRef, useState} from "react";
import {CategoryItem} from "./CategoryItem";
import {AddCategory} from "./AddCategory";
import useAxiosPrivate from "../../api/useAxiosPrivate";

export function Category() {

    const [categories, setCategories] = useState([]);
    const effectRan = useRef(false)

    const protectedAxios = useAxiosPrivate();
    const controller = new AbortController();

    useEffect(() => {
        if(effectRan.current === false){
            effectRan.current = true
            protectedAxios.get(`/api/category/getAll`,{
                signal: controller.signal
            }).then(function
                    (response) {
                    setCategories(response.data)
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
                        <AddCategory/>
                    </div>
                    <table className="table table-sm">
                        <thead className="table">
                        <tr>
                            <th scope="col">Name</th>
                            <th scope="col">Priority</th>
                            <th scope="col">Options</th>
                        </tr>
                        </thead>
                        <tbody>
                        {categories.map(category => <CategoryItem category={category} key={category.id}
                                                                  className="col-lg-6 col-xl-4 col-md-6 col-sm-12">
                        </CategoryItem>)}
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    )
}
