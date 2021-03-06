import React, { useState, useContext } from 'react'
import AuthContext from '../context/authContext'


export default function DeleteAccount() {
    const { setIsLoggedIn, userId, token } = useContext(AuthContext)

    const [msg, setMsg] = useState("")
    const [deleted, setDeleted] = useState(false)

    function deleteAccount() {
        let confirmation = window.confirm("Do you really want to delete your account for ever?")

        if (confirmation) {
            setMsg(`Your account has been deleted. \nThank you for have been part of our community and you are welcome back any time!`)

            fetch("/users/" + userId, {
                headers: {
                    'x-auth': token,
                },
                method: 'DELETE'
            })
                .then(res => res.json())
                .then((res) => {
                    console.log('deleted', res);
                })

            setIsLoggedIn(false)
            setDeleted(true)
        }
        else {
            setMsg("Your account is still active.")
            setDeleted(false)
        }
    }

    return (
        <div>
            {!deleted ? (<div className="msg-container">
                <h4 className="heading">Delete Account</h4>
                <p>Deleting your account is permanent and will remove all content including tracks!</p>
                <button onClick={deleteAccount} className="btn-delete">
                    delete
                </button>

                <div className="msg"><p>{msg}</p></div>
            </div>
            ) : (
                    <div className="msg">
                        {msg.split("\n").map((i, key) => {
                            return <div key={key}><p>{i}</p></div>;
                        })}
                    </div>
                )
            }
        </div>
    )
}
