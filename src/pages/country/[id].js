import axios from "axios";
import styles from './contry.module.css'
import Layout from "../../component/layout";
import {useEffect, useState} from "react";

const getCountry = async (id) => {
    const url = `https://restcountries.eu/rest/v2/alpha/${id}`
    const res = await axios.get(url);
    const country = await res.data;
    return country;

}

const Country = ({country}) => {

    const [borders, setBorders] = useState([])


    const getBorders = async () => {

        const borders = await Promise.all(country.borders.map(border => getCountry(border)))
        setBorders(borders)
    }
    useEffect(() => {

        getBorders();

    }, [0])


    return (
        <Layout title={country.name}>
            <div className={styles.container}>
                <div className={styles.containerLeft}>
                    <div className={styles.overview_pane}>
                        <img src={country.flag} alt={country.name}/>
                        <h1 className={styles.overview_name}>{country.name}</h1>
                        <div className={styles.overview_region}>
                            {country.region}
                        </div>
                        <div className={styles.overview_numbers}>

                            <div className={styles.overview_population}>
                                <div className={styles.overview_value}>{country.population}</div>
                                <div className={styles.overview_label}>Population</div>
                            </div>

                            <div className={styles.overview_area}>
                                <div className={styles.overview_value}>{country.area}</div>
                                <div className={styles.overview_label}>area</div>
                            </div>
                        </div>

                    </div>

                </div>
                <div className={styles.containerRight}>

                    <div className={styles.details_panel}>
                        <h4 className={styles.details_heading}>Details</h4>

                        <div className={styles.details_pane_row}>
                            <div className={styles.details_pane_label}>Capital</div>
                            <div className={styles.details_pane_value}>{country.capital}</div>
                        </div>

                        <div className={styles.details_pane_row}>
                            <div className={styles.details_pane_label}>Subregion</div>
                            <div className={styles.details_pane_value}>{country.subregion}</div>
                        </div>

                        <div className={styles.details_pane_row}>
                            <div className={styles.details_pane_label}>Lenguages</div>
                            <div
                                className={styles.details_pane_value}>
                                {country.languages.map(({name}) => name).join(", ")}
                            </div>
                        </div>

                        <div className={styles.details_pane_row}>
                            <div className={styles.details_pane_label}>Currencies</div>
                            <div className={styles.details_pane_value}>
                                {country.currencies.map(({name}) => name).join(", ")}


                            </div>
                        </div>

                        <div className={styles.details_pane_row}>
                            <div className={styles.details_pane_label}>native Name</div>
                            <div className={styles.details_pane_value}>{country.nativeName}</div>
                        </div>
                        <div className={styles.details_pane_row}>
                            <div className={styles.details_pane_label}>Gini</div>
                            <div className={styles.details_pane_value}>{country.gini} %</div>

                        </div>


                    </div>
                    <div className={styles.borders_Container}>
                        <div className={styles.borders_title}>Neighbouring Countries</div>
                        <div className={styles.borders}>
                            {borders.map(({flag, name}) => <div className={styles.borders_details}>
                                <img src={flag} alt={name}/>
                                <div className={styles.borders_name}>{name}</div>
                            </div>)}
                        </div>
                    </div>

                </div>


            </div>
        </Layout>
    );
};

export default Country;


export const getServerSideProps = async ({params}) => {

    const country = await getCountry(params.id)

    return {
        props: {
            country,
        },
    }
}
