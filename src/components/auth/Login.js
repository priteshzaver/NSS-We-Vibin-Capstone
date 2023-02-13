import { useState } from "react"
import { Link, useNavigate } from "react-router-dom"

export const Login = () => {

    const [email, setEmail] = useState("pritesh@zaver.com")
    const navigate = useNavigate()

    const handleLogin = (event) => {
        event.preventDefault()

        return fetch(`http://localhost:8088/users?email=${email}`)
            .then(response => response.json())
            .then(foundusers => {
                if (foundusers.length === 1) {
                    const user = foundusers[0]
                    localStorage.setItem("spotify_user", JSON.stringify({
                        id: user.id
                    }))
                    navigate("/")
                }
                else {
                    window.alert("Invalid login")
                }
            })
    }
    return (
        <div className="bg-white bg-opacity-40 border-white border-2 border-opacity-30 h-60 w-80 mx-auto rounded-lg flex flex-col justify-center items-center space-y-8 shadow-2xl shadow-emerald-400 mt-11">
            <h2 className="text-white text-4xl">LOGIN</h2>
            <form className="mx-auto" onSubmit={handleLogin}>
                <fieldset className="flex flex-col mb-6">
                    <label className="text-white">Email Address</label>
                    <input type="email"
                        value={email}
                        onChange={(event) => {
                            setEmail(event.target.value)
                        }}
                        placeholder="Email address"
                        className="border-lime-500 border-2"
                        required autoFocus />
                </fieldset>
                <fieldset>
                    <button className="bg-green-500 hover:bg-green-700 text-white font-bold mt-2 px-16 rounded-full" type="submit">
                        Sign in
                    </button>
                </fieldset>
            </form>
            <section className="text-white text-sm">
                <Link to="/register">Not a member yet?</Link>
            </section>
        </div>
    )
}