export function HomePage() {
    return (
        <>
            <h1 className="position-absolute start-50 translate-middle-x display-1"> LIBRARY APP </h1>
            <img src={require("../assets/bookstore.png")}
                 className="position-absolute top-50 start-50 translate-middle" height={300}/>
        </>
    )
}
