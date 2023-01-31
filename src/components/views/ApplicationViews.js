import { Outlet, Route, Routes } from "react-router-dom"


export const ApplicationViews = () => {
	return (
        <Routes>
            <Route path="/" element={
                <>
                    <h1>We Vibin'</h1>
                    <div>Share and explore music with your friends</div>

                    <Outlet />
                </>
            }>
                
            </Route>
        </Routes>
    )
}