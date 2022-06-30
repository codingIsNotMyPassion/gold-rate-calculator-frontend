import { useEffect, useState } from 'react'
import "./Home.css"
import api from '../api/api'

const Home = () => {
    const [price, setPrice] = useState(null)
    const [Purity, setPurity] = useState("24K")
    const [weight, setWeight] = useState(0)
    const [total, setTotal] = useState(0)

    //get gold prices from API
    useEffect(() => {
        const getGoldPrices = async () => {
            try {
                const response = await api.get("/prices")
                setPrice(response.data)
            } catch (error) {
                console.log(error)
            }
        }
        getGoldPrices()
    }, [])

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
                <main>
                    <form className="form-container" onSubmit={handleSubmit}>
                        <div className="form-group">
                            <label className='form-label'>Purity</label>
                            <select className="form-select" value={Purity}
                                onChange={handlePurityChange}>
                                <option value="24K">24K</option>
                                <option value="22K">22K</option>
                            </select>
                        </div>
                        <label className='form-label'>weight (in grams) </label>
                        <input type="number" value={weight} onChange={handleWeightChange} />
                        <button className="btn btn-primary" type="submit">Calculate</button>
                    </form>
                    <p>The gold price is {total}</p>
                </main>
            </div>
        </>
    )
}
export default Home