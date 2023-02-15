import { useEffect, useState } from "react"
import { BrowseCategories } from "./BrowseCategories"

export const Browse = () => {
    const [categories, setCategories] = useState([])

    let token = window.localStorage.getItem("token")
    const trackParameters = {
        method: "GET",
        headers: {
            "Content-Type": "application/json",
            "Authorization": "Bearer " + token
        }
    }
    useEffect(() => {
        fetch("https://api.spotify.com/v1/browse/categories", trackParameters)
        .then(response => response.json())
        .then(data => {
            setCategories(data.categories.items)
        })
    }, [])
    
    return <>
    <h2 className="text-white text-4xl flex justify-center underline py-2">Browse Categories</h2>
    <article className="grid grid-cols-5">
        {categories.map(category => <BrowseCategories key={`category--${category.id}`}
        category={category}/>)}
    </article>
    </>
}