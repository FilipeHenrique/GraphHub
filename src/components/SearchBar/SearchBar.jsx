import { useEffect } from 'react';
import { useState } from 'react';
import { Link } from 'react-router-dom';
import useComponentVisible from '../../hooks/useComponentVisible';
import useDebounce from '../../hooks/useDebounce';
import api from '../../services/api';
import './SearchBar.css'

export function SearchBar() {
    
    const [search, setSearch] = useState('');

    const [usersList, setUserslist] = useState([]);

    const [cachedData, setCachedData] = useState({});

    const debouncedSearchTerm = useDebounce(search, 500);

    const { ref, isComponentVisible, setIsComponentVisible } = useComponentVisible(true);

    useEffect(() => {
        // if there is search
        if (debouncedSearchTerm.length > 0) {
            // if the data is in cache, return it
            if (cachedData[debouncedSearchTerm]) {
                setUserslist([...cachedData[debouncedSearchTerm]]);
                return;
            }
            // if data is not in cache make a req
            else {
                api.get(`/pesquisa/${debouncedSearchTerm}`)
                    .then((response) => {
                        const newUsers = [...response.data.filteredUsers];
                        setUserslist(newUsers);
                        setCachedData((prevData) => {
                            return {
                                ...prevData, [`${debouncedSearchTerm}`]: newUsers
                            }
                        });
                    })
                    .catch((error) => {
                        alert(error);
                    })
            }
        }
    }, [debouncedSearchTerm])


    return (
        <div className='searchbar-container' onClick={() => { setIsComponentVisible(true); }}>
            <input
                className="searchbar"
                type="text"
                placeholder="Buscar usuários..."
                value={search}
                onChange={(event) => {
                    setUserslist([]);
                    setSearch(event.target.value);
                }}
            />
            {
                (search.length > 0 & usersList.length > 0 & isComponentVisible) ?
                    <ul className='searchbar-users-list_container' ref={ref}>
                        {usersList.map((user, index) => {
                            return (
                                <Link 
                                key={index} 
                                className='searchbar-users-list_element' 
                                to={`/ListaGrafos/${user.username}`} 
                                style={{ textDecoration: 'none', color: 'unset' }}
                                onClick={() => {
                                    setIsComponentVisible(false);
                                }}
                                >
                                    <strong>{user.username}</strong>
                                    <p>{user.repositoriesNumber} grafos cadastrados</p>
                                </Link>

                            );
                        })
                        }
                    </ul>
                    : <></>
            }
        </div>
    );
}