import react ,{useState}from "react";
import Card from "./Card";
import axios from "axios";
import { useEffect } from "react";
import { getAuth, onAuthStateChanged } from "firebase/auth";
import { doSignOut } from "../../firebase/auth";
import './style.css';

const auth = getAuth();



const Main=()=>{
    const [search, setSearch] = useState("");
    const [bookData, setData] = useState([]);
    const [user, setUser] = useState(null);
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");


    const searchBook=(evt)=>{
        if(evt.key==="Enter")
        {
            axios.get('https://www.googleapis.com/books/v1/volumes?q='+search+'&key=AIzaSyA6SaT23KNiiA6DnUfUQTvFeyAcQEkwnSU'+'&maxResults=40')
            .then(res=>setData(res.data.items))
            .catch(err=>console.log(err))
        }
    }

    useEffect(() => {
      const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
        setUser(currentUser);
      });
  
      return () => unsubscribe();
    }, []);

    const handleSignOut = () => {
      doSignOut();
    };

    
    return(
        <>
            <div className="header">
                <div className="row1">
                    <h1>BookRealm <br/> Explore Boundless Worlds Between the Pages</h1>
                </div>
                <div className="row2">
                {user ? (
            <>
              <p>Hello, {user.email}</p>
              <button onClick={handleSignOut}>Log out</button>
            </>
          ) : (
            <>

              <button onClick={() => window.location.href = '/login' }  className={`w-1/3 px-4 py-2 text-white font-medium rounded-lg bg-gray-300 bg-red-400 hover:bg-red-500 hover:shadow-xl transition duration-300`}>Login</button>
            </>
          )}
  <h2>Find Your Book</h2>
                    <div className="search">
                        <input type="text" placeholder="Type the Title of Your Next Adventure"
                        value={search} onChange={e=>setSearch(e.target.value)}
                        onKeyPress={searchBook}/>
                        <button><i className="fas fa-search"></i></button>
                    </div>
                    <img src="./images/back2.png" alt="" />
                </div>
            </div>

            <div className="container">
              {
                    <Card book={bookData}/>
              }  
            </div>
        </>
    )
}
export default Main;