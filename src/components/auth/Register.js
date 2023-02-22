import { useState } from "react"
import { useNavigate } from "react-router-dom"

export const Register = (props) => {
    const [customer, setCustomer] = useState({
        email: "",
        fullName: ""
    })
    let navigate = useNavigate()

    const registerNewUser = () => {
        return fetch("http://localhost:8088/users", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(customer)
        })
            .then(res => res.json())
            .then(createdUser => {
                if (createdUser.hasOwnProperty("id")) {
                    localStorage.setItem("spotify_user", JSON.stringify({
                        id: createdUser.id
                    }))

                    navigate("/")
                }
            })
    }

    const handleRegister = (e) => {
        e.preventDefault()
        return fetch(`http://localhost:8088/users?email=${customer.email}`)
            .then(res => res.json())
            .then(response => {
                if (response.length > 0) {
                    // Duplicate email. No good.
                    window.alert("Account with that email address already exists")
                }
                else {
                    // Good email, create user.
                    registerNewUser()
                }
            })
    }

    const updateCustomer = (evt) => {
        const copy = { ...customer }
        copy[evt.target.id] = evt.target.value
        setCustomer(copy)
    }

    return (
        <main>
            <div className="bg-white bg-opacity-40 border-white border-2 border-opacity-30 h-60 w-80 mx-auto rounded-lg flex flex-col justify-center items-center space-y-4 shadow-2xl shadow-emerald-400 mt-11">
                <h2 className="text-white text-4xl">PLEASE REGISTER</h2>
                <form onSubmit={handleRegister}>
                    <div className="mb-6">
                    <fieldset className="flex flex-col mb-2">
                        <label className="text-white"> Full Name </label>
                        <input onChange={updateCustomer}
                            className="border-lime-500 border-2 pl-1"
                            type="text"
                            id="fullName"
                            placeholder="Enter your name"
                            required autoFocus />
                    </fieldset>
                    <fieldset className="flex flex-col">
                        <label className="text-white"> Email address </label>
                        <input onChange={updateCustomer}
                            className="border-lime-500 border-2 pl-1"
                            type="email"
                            id="email"
                            placeholder="Email address"
                            required />
                    </fieldset>
                    </div>
                    <fieldset>
                        <button
                            className="bg-green-500 hover:bg-green-700 text-white font-bold px-16 rounded-full"
                            type="submit">
                            Register
                        </button>
                    </fieldset>
                </form>
            </div>
        </main>
    )
}