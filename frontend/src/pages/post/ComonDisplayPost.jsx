
import { useEffect, useState} from "react" ;

import PostServices from "../../services/PostService";

const CommonPostDisplay = ({fetchDataPost}) => {

    const [items, setItems] = useState([]);
    const [loading, setLoading] = useState(false);
    const [page, setPage] = useState(1);
    const [hasmore, setHasMore] = useState(true);


    const fetchData = async () => {
        
        if (loading && !hasmore) return;

        setLoading(true);

        try {
            
            let res = await fetchDataPost(page);

            console.log("res ka data ",(res.data.data));
            setItems((prevItems) => [...prevItems, ...(res.data.data)]);
            (res.data.data)?.length > 0 ? setHasMore(true) : setHasMore(false);
            setLoading(false);
        } catch (err) {
            console.log(err);
            setLoading(false);
        };
    }

    const handleScroll = () => {
        const { scrollTop, clientHeight, scrollHeight } =
            document.documentElement;
        if (scrollTop + clientHeight >= scrollHeight) {
           
            setPage((prevPage) => prevPage + 1);

        }
    }
    useEffect(()=> {

        if(hasmore){

            fetchData();
        }
        
    },[page])

    useEffect(() => {
        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);


    return (
        <div>
            
        </div>
    )

}

export default CommonPostDisplay ;

