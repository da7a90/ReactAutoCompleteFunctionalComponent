import './App.css';
import AutoComplete from './AutoComplete';
import { useEffect, useState} from 'react';

function App() {

  const [data, setData] = useState([]);


//fetching the data from the API
  useEffect(()=>{
    
    const returnData = async ()=>{
      const data = fetch("http://localhost:3030/",{
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
        }})
      .then(async (response)=>response.json())
      .then((data)=>{
        return data;
      }).catch((error)=>{
        console.log(error)
      });
      return data;
    }
    returnData().then((data)=>{
      setData(data.data);
    });
    
  },[])


  return (
    <div className="wrapper">
    <h2>Choose a Programming Language</h2>
    <AutoComplete data={data}></AutoComplete>
    </div>
  );
}

export default App;
