import { useState } from "react"
import { useNavigate } from "react-router-dom"

export const Login = () => {
   
    const [email, setEmail] = useState("pritesh@zaver.com")
    const navigate = useNavigate()

    const handleLogin = (event) => {
        event.preventDefault()

        return fetch(`http://localhost:8088/users?email=${email}`)
            .then(response => response.json())
            .then(foundusers => {
                if (foundusers.length ===1) {
                    const user = foundusers[0]
                    localStorage.setItem("spotify_user", JSON.stringify({
                        id: user.id
                    }))
                    navigate("/")
                }
                else {window.alert("Invalid login")
                }
            })
    }   
    return (
        <form onSubmit={handleLogin}>
            <fieldset>
                <label htmlFor="inputEmail">Email Address</label>
                <input type="email"
                    value={email}
                    onChange={(event) => {
                        setEmail(event.target.value)
                    }}
                    className="form-control"
                    placeholder="Email address"
                    required autoFocus />
            </fieldset>
            <fieldset>
                        <button type="submit">
                            Sign in
                        </button>
                    </fieldset>
        </form>
    )
}