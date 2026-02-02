import Filter from "../../components/Search/Filter/Filter";
import ProductList from "../../components/Search/ProductList/ProductList";
import { useSearch } from "../../context/Search";

const SearchPage = ()=>{
    const [search] = useSearch();
    return(
        <div 
            className="d-flex flex-column w-100" 
            style={{marginTop: 32}}
        >
            <h2 className="ms-5 mb-5">Search Results for "{search?.keyword}"</h2>
            {/* <Filter filter={search} /> */}
            <ProductList products={
                search?.results || []
            } />
        </div>
    )
}

export default SearchPage;