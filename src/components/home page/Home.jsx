import { useEffect, useState } from 'react'
import "./Home.css"
import api from '../api/api'

const Home = () => {
    const [price, setPrice] = useState()
    const [Purity, setPurity] = useState("")
    const [weight, setWeight] = useState(0)
    const [total, setTotal] = useState(0)

    //get gold prices from API
    useEffect(()=>{
        const getGoldPrices = async () => {
            try {
              const response = await api.get("/prices")
                console.log(response.data)
                setPrice(response.data)
            } catch (error) {
                console.log(error)
            }
        }
        getGoldPrices()
    },[])
    
    // handle weight
    const handleWeightChange = (e) => {
        setWeight(e.target.value)
        return weight
    }

    // handle Purity
    const handlePurityChange = (e) => {
        setPurity(e.target.value)
    }

    // handle Submit
    const handleSubmit = (e) => {
        e.preventDefault()
        setTotal(weight * price[0][Purity])
    }

    return (
        <>
            <div className="main-container">
                <header>
                <h1>Gold price calculator</h1>
                </header>
                <form onSubmit={handleSubmit}>
                <div className="form-group">
                        <label>Purity</label>
                        <select className="form-select" value={Purity}
                            onChange={handlePurityChange}>
                            <option value="24K">24K</option>
                            <option value="22K">22K</option>
                        </select>
                    </div>
                    <label>weight (in grams) </label>
                    <input type="text" value={weight} onChange={handleWeightChange} />
                    <button className="btn btn-primary" type="submit">Calculate</button>
                </form>
                <p>The gold price is {total}</p>
            </div>
        </>
    )
}
export default Home