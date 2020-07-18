import React, { useState, useEffect, useContext } from 'react'
import AuthContext from '../context/authContext'
import imageWaves from "../img/waves.png"
import { Link } from "react-router-dom"

function SearchUser() {
    const { isLoggedIn, token } = useContext(AuthContext)

    const [searchValue, setSearchValue] = useState("")
    const [allMusicians, setAllMusicians] = useState([])

    // Improvement tip: Filtering should be done on the server. Here the searchValue should be sent so you don't have to download all the users, only the ones that will be displayed
    useEffect(() => {
        fetch("/users", {
            headers: {
                'x-auth': token,
            }
        })
            .then(res => res.json())
            .then(data => {
                setAllMusicians(data.users)
            })
    }, [token])

    console.log("allMusicians:", allMusicians);

    let userData = allMusicians && allMusicians.map((musician, i) => {
        if (searchValue && musician.name.toLowerCase() === searchValue.toLowerCase()) {
            
            return (
                <div className="user-found">
                    <div key={i} className="musician">
                        <span onClick={() => setSearchValue('')}
                            className="close-user"
                        >
                            X
                        </span>
                        {<img src={musician.profileImage} alt="Profile" width="100" height="100" />}
                        <h3>
                            <Link to={`/profile/${musician._id}`}>
                                {musician.name}
                            </Link>
                        </h3>
                        <p>Level: {musician.level} </p>
                        <p>Role: {musician.role} </p>
                        <p className="p-uploads">Collaborations/Tracks uploaded</p>
                        <img src={imageWaves} alt="" className="img-waves" width="230" />
                    </div>
                </div>
            )
        }
        else {
            console.log("user not found")
        }
    })



    return (
        <div className="search-container">
            {isLoggedIn ? (
                <div>
                    <form>
                        <input type="search"
                            name="search-user"
                            value={searchValue}
                            placeholder="search for a user..."
                            onChange={(e) => { setSearchValue(e.target.value) }}
                        />
                    </form>

                    {userData}
                </div>
            ) : null}
        </div>
    )
}

export default SearchUser