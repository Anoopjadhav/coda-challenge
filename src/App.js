import './App.css';
import { Route } from 'react-router-dom'
import Homepage from './Homepage/Homepage'
import { useRef, useEffect, useState } from 'react'
import axios from './axios'

function App() {
  const childRef = useRef();
  let [data, setdata] = useState();
  let [betList,setBetList] = useState();

  function setBetListFun(betList){
    setBetList(betList);
  }
  function updateData(newData){
    setdata(newData);
  }
  useEffect(() => {
    axios.get('bets7747a43.json')
      .then(res => {
        let temp = res.data;
        temp.forEach(ele=>{
          ele["Player Selected"] = false;
        })
        setdata(temp);

      })
  }, []);

  // useEffect(()=>{
  //   console.log(data);
  // },[data]);

  return (
    <div className="App">
      <Route path="/" component={
        () => 
          <Homepage data={data} setBetList={setBetListFun} updateData={updateData} ref={childRef}></Homepage>
        
      }></Route>
       <Route path="/bet" component={
        () => 
          <Homepage data={data}></Homepage>
        
      }></Route>
     
    </div>
  );
}

export default App;
