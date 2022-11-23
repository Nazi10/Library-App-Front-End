import './App.css';
import {BookPage} from "./pages/BookPage";
import {CategoryPage} from "./pages/CategoryPage";
import {AuthorPage} from "./pages/AuthorPage";
import {HomePage} from "./pages/HomePage";
import { Route, Routes} from "react-router-dom";
import {Container} from "react-bootstrap";
import {Navbar} from "./components/Navbar";
import {AuthorBooksPage} from "./pages/AuthorBooksPage";
import {UserPage} from "./pages/UserPage";
import {LoginPage} from "./pages/LoginPage";
import {RequireAuth} from "./components/authentication/RequireAuth";
import {AuthorProfilePage} from "./pages/AuthorProfilePage";
import PersistLogin from "./components/authentication/PersistLogin";

function App() {
    return (
        <>
            <Navbar/>
            <Container className="mb-4">
                <Routes>
                    <Route path="/login" element={<LoginPage/>}/>
                    <Route element={<PersistLogin/>}>
                        <Route element={<RequireAuth allowedRoles={["Author"]}/>}>
                            <Route path="/authorProfile/:id" element={<AuthorProfilePage/>}/>
                        </Route>
                        <Route element={<RequireAuth allowedRoles={["Author", "Admin"]}/>}>
                            <Route path="/" element={<HomePage/>}/>
                        </Route>
                        <Route element={<RequireAuth allowedRoles={"Admin"}/>}>
                            <Route path="/book" element={<BookPage/>}/>
                            <Route path="/author" element={<AuthorPage/>}/>
                            <Route path="/category" element={<CategoryPage/>}/>
                            <Route path="author/book/:id" element={<AuthorBooksPage/>}/>
                            <Route path="/user" element={<UserPage/>}/>
                        </Route>
                    </Route>
                </Routes>
            </Container>
        </>
    );
}

export default App;
