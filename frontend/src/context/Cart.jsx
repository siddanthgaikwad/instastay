import {useState, useContext, createContext, useEffect} from "react"

const CartContext = createContext();

const CartProvider = ({children})=>{
    const [cart, setCart] = useState([]);

    // console.log("Cart from CartProvider : ",cart);
    useEffect(()=>{
        let existingCart = localStorage.getItem("cart");
        if(existingCart){
            setCart(JSON.parse(existingCart));
        }
    },[])

    return(
        <CartContext.Provider value={[cart, setCart]}>
            {children}
        </CartContext.Provider>
    )
}

// custom hook 
const useCart = ()=> useContext(CartContext);

export {CartProvider, useCart};