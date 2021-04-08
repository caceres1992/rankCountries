import styles from '../searchInput/SearchInput.module.css'
import {BsSearch} from 'react-icons/bs'

const SearchInput = ({...rest}) => {

    return (
        <div className={styles.inputContent}>
            <BsSearch/>
            <input {...rest} className={styles.inputSearch}/>
        </div>
    );
};

export default SearchInput;
