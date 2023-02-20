import { Route, Routes } from "react-router-dom"
import { Login } from "./components/auth/Login"
import { Register } from "./components/auth/Register"
import { NavBar } from "./components/nav/NavBar"
import { MusicContainer } from "./components/search/MusicContainer"

import { Authorized } from "./components/views/Authorized"

export const WeVibin = () => {
    return <Routes>
    <Route path="/login" element={<Login />} />
    <Route path="/register" element={<Register />} />

    <Route path="*" element={
        <Authorized>
            <>
                <NavBar/>
                <MusicContainer/>
                
            </>
        </Authorized>

    } />
</Routes>
}