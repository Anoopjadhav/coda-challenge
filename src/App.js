import './App.css';
import { Route } from 'react-router-dom'
import Homepage from './Homepage/Homepage'
import BetPage from './BetPage/BetPage'
import { useEffect, useState } from 'react'
import axios from './axios'
import { connect } from 'react-redux'
import * as actions from './actions'

function App(props) {
console.log(props)
  let [data, setdata] = useState();
  let [betList, setBetList] = useState();

  function setBetListFun(betList) {
    setBetList(betList);
  }
  function updateData(newData) {
    setdata(newData);
  }
  useEffect(() => {
    if (props.data.length === 0) {
      axios.get('bets7747a43.json')
        .then(res => {
          let temp = res.data;
          temp.forEach(ele => {
            ele["Player Selected"] = false;
          })
          // setdata(temp);
          props.setdata(temp);
          props.setCheckedCount(0);
          props.setBetList([]);
        })
    }
  }, []);

  return (
    <div className="App">
      <Route exact path="/" component={
        () =>
          <Homepage updateData={updateData} props={props}></Homepage>

      }></Route>
      <Route exact path="/bet" component={
        () =>
         <BetPage></BetPage>
      }></Route>

    </div>
  );
}


const mapStoreToProps = (store) => {
  return {
      data: store.r.data,
      betList: store.r.betList,
      checkedCount : store.r.checkedCount
  }
}
const mapDispatchToProps = (dispatch) => {
  return {
      setbetlist: (data) => dispatch(actions.setbetlist(data)),
      setdata: (data) => dispatch(actions.setdata(data)),
      setCheckedCount : (data) => dispatch(actions.setcheckedcount(data))
  }
}

export default connect(mapStoreToProps, mapDispatchToProps)(App);
