import React, { useEffect, useState } from 'react'

function Cards() {

    const [cardImage, setCardsImage] = useState([])
    const [loading, setLoading] = useState(false)

    const [currentPage, setCurrentPage] = useState(1)

    const [pageNumberLimit, setPageNumberLimit] = useState(5)
    const [maxPageNumberLimit, setMaxPageNumberLimit] = useState(5)
    const [minPageNumberLimit, setMinPageNumberLimit] = useState(0)

    const clickHandle = (event) => {
        setCurrentPage(Number(event.target.id))
    }
    // Created pages for pagination
    let total = 1560;
    let limit = 12;

    const pages = [];
    for (let i = 1; i <= Math.ceil(total / limit); i++) {
        pages.push(i);
    }
    /*created li for pagination number */
    const renderPagesNumber = pages.map(number => {

        if (number < maxPageNumberLimit + 1 && number > minPageNumberLimit) {
            return (
                <li key={number}
                    id={number}
                    onClick={clickHandle}
                    className={currentPage == number ? "active" : null}
                >{number}</li>
            );
        }
        else {
            return null;
        }
    })
    /*methods for onclick in the span and button tags*/
    const handleNextBtn = () => {
        setCurrentPage(currentPage + 1)

        if (currentPage + 1 > maxPageNumberLimit) {
            setMaxPageNumberLimit(maxPageNumberLimit + pageNumberLimit)
            setMinPageNumberLimit(minPageNumberLimit + pageNumberLimit)
        }
    }

    const handlePrevBtn = () => {
        setCurrentPage(currentPage - 1)

        if ((currentPage - 1) % pageNumberLimit == 0) {
            setMaxPageNumberLimit(maxPageNumberLimit - pageNumberLimit)
            setMinPageNumberLimit(minPageNumberLimit - pageNumberLimit)
        }
    }

    const handleNextArrow = () => {
        if (currentPage != pages[pages.length - 1]) {
            setCurrentPage(currentPage + 1)

            if (currentPage + 1 > maxPageNumberLimit) {
                setMaxPageNumberLimit(maxPageNumberLimit + pageNumberLimit)
                setMinPageNumberLimit(minPageNumberLimit + pageNumberLimit)
            }
        }
        else {
            return null;
        }

    }

    const handlePrevArrow = () => {
        if (currentPage != pages[0]) {
            setCurrentPage(currentPage - 1)

            if ((currentPage - 1) % pageNumberLimit == 0) {
                setMaxPageNumberLimit(maxPageNumberLimit - pageNumberLimit)
                setMinPageNumberLimit(minPageNumberLimit - pageNumberLimit)
            }
        } else {
            return null;
        }
    }
    

    useEffect(() => {
        setLoading(true)
        
        const localData = JSON.parse(sessionStorage.getItem(currentPage))
        if(localData){
            setCardsImage(localData)
            setLoading(false)
        }
        else{
            fetch(`https://gateway.marvel.com/v1/public/characters?limit=12&offset=${(currentPage - 1) * 12}
            &apikey=7f376033cee4fc8bc0f8519cbc7af6cd&ts=1&hash=3742fc994ebaec75d3e36e308b391f76`)
                .then(res => res.json())
                .then((data) => {
                     setCardsImage(data.data.results)
                     sessionStorage.setItem(currentPage,JSON.stringify([...data.data.results]))
                     
                     console.log("else calıstı")
                    setLoading(false)
                })
        }
    }, [currentPage])

    return (
        <>
            {/* Hero cards created as using map method */}
            <div className='cardContainer'>
                {
                    cardImage && cardImage.map((item, key) => {
                        return (
                            <div class="card">
                                <div class="topLine"></div>
                                <img className='cardImg' src={`${item.thumbnail.path}.${item.thumbnail.extension}`}></img>
                                <div class="herosName">{item.name}</div>
                            </div>
                        )
                    })
                }

                {
                    loading && <div className='loading'><span>Loading...</span></div>
                }
            </div>
            {/* start pagination section  */}
            <div className='pagination'>
                <ul className='pageNumbers'>

                    <li>
                        <span className="material-icons-outlined"
                            onClick={handlePrevArrow}
                        >chevron_left </span>
                    </li>
                    <li>
                        <button onClick={handlePrevBtn}
                            disabled={currentPage == pages[0] ? true : false}
                        >...</button>
                    </li>

                    {renderPagesNumber}
                    <li>
                        <button onClick={handleNextBtn}
                            disabled={currentPage == pages[pages.length - 1] ? true : false}
                        >...</button>
                    </li>
                    <li>
                        <span class="material-icons-outlined"
                            onClick={handleNextArrow}
                        >navigate_next</span>
                    </li>
                </ul>
            </div>
        </>
    )
}

export default Cards