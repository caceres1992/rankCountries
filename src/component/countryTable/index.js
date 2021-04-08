import React, {useEffect, useState} from 'react';
import styles from './ContryTable.module.css'
import {MdKeyboardArrowDown, MdKeyboardArrowUp} from 'react-icons/md'
import Link from 'next/link'

const orderBy = (countries, value, direction) => {
    //comparacion de dos numer a y b

    if (direction === 'asc') {
        return countries.sort((a, b) => a[value] > b[value] ? 1 : -1)
    }
    if (direction === 'desc') {
        return countries.sort((a, b) => a[value] > b[value] ? -1 : 1)

    }

    return countries;
}


const SortArrow = ({direction}) => {

    if (!direction) {
        return <></>
    }
    if (direction === 'desc') {
        return <div className={styles.heading_arrow}>
            <MdKeyboardArrowDown/>
        </div>
    } else {
        return <div className={styles.heading_arrow}>
            <MdKeyboardArrowUp/>
        </div>
    }
}

const ContriesTable = ({countries}) => {
    const [direction, setDirection] = useState()
    const [value, setValue] = useState()
    const orderedCountries = orderBy(countries, value, direction)

    const [items, setItems] = useState([])
    const [visible, setVisible] = useState(5)

    useEffect(() => {
    }, [])

    const SwitchDirection = () => {
        if (!direction) {
            setDirection("desc")
        } else if (direction === "desc") {
            setDirection("asc")
        } else {
            setDirection('desc')
        }
    }

    const setValueAndDirection = (value) => {
        SwitchDirection();
        setValue(value)
    }

    return (
        <div>
            <div className={styles.heading}>

                <button
                    onClick={() => setValueAndDirection('name')}
                    className={styles.heading_name}>
                    <div>
                        Name

                    </div>
                    {value === 'name' && <SortArrow direction={direction}/>}
                </button>

                <button onClick={() => setValueAndDirection('population')}
                        className={styles.heading_population}>
                    <div>
                        Population
                    </div>
                    {value === 'population' && <SortArrow direction={direction}/>}
                </button>

                <button onClick={() => setValueAndDirection('area')}
                        className={styles.heading_area}>
                    <div>
                        Area (km <sup style={{fontSize: '.5rem'}}>2</sup>)
                    </div>
                    {value === 'area' && <SortArrow direction={direction}/>}
                </button>

                <button onClick={() => setValueAndDirection('gini')}
                        className={styles.heading_gini}>
                    <div>
                        Gini
                    </div>
                    {value === 'gini' && <SortArrow direction={direction}/>}
                </button>


            </div>
            {countries.slice(0, visible).map((country) =>
                <Link href={`/country/${country.alpha3Code}`} key={country.name}>
                    <div className={styles.row}>
                        <div className={styles.name}><img src={country.flag} width={50} alt={country.name}/>
                            {country.name}</div>
                        <div className={styles.population}>{country.population}</div>
                        <div className={styles.area}>{country.area || 0} km<sup>2</sup></div>
                        <div className={styles.gini}>{country.gini || 0}%</div>
                    </div>
                </Link>
            )}
            <button  className={styles.btnShowMore} onClick={() => setVisible(visible + 5)}>Show more</button>

        </div>

    );
};

export default ContriesTable;
