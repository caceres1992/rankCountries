import Head from 'next/head'
import styles from '../styles/Home.module.css'
import axios from "axios";
import Layout from "../component/layout";
import SearchInput from "../component/searchInput";
import ContriesTable from "../component/countryTable";
import React, {useState} from "react"

export default function Home({countries}) {


    const [keyword, setKeyword] = useState("")

    //filtrar por el input
    const filteredCountries = countries.filter((contry) =>
        contry.name.toLowerCase().includes(keyword) ||
        contry.region.toLowerCase().includes(keyword) ||
        contry.subregion.toLowerCase().includes(keyword)
    )

    const onInputChange = (e) => {
        e.preventDefault();

        setKeyword(e.target.value.toLowerCase())

    }
    return (
        <>
            <Layout>
                <div className={styles.counts}>
                    {countries.length} Paises encontrados
                </div>
                <SearchInput placeholder="Filtrar pais" onChange={onInputChange}/>
                <ContriesTable countries={filteredCountries}/>
            </Layout>
        </>
    )
}

export const getStaticProps = async () => {
    const url = 'https://restcountries.eu/rest/v2/all'
    const res = await axios.get(url);
    const countries = await res.data

    // const res = await fetch(url);
    // const countries = await res.json();

    return {
        props: {
            countries,
        },
    }
};


