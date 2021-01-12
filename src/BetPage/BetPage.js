import styles from './BetPage.module.css'
import { connect } from 'react-redux'
import * as actions from '../actions'
import {useState} from 'react'
import { useEffect } from 'react'
import { useHistory } from "react-router-dom";

const BetPage = (props) => {
    let history = useHistory();
    let [currentBet, setCurrentBet] = useState(0);

    console.log(currentBet);
    useEffect(()=>{
        setCurrentBet(Math.floor(Math.random()*10 % 10));
       
    },[])
    function back(){
        history.push('/')
    }
    return (
        <div className={styles.betpage}>
            <div className={styles.cardWrapper}>
                {
                    props.betList !== undefined && props.betList.map((ele, index) => {
                        return (
                            <div key={index} className={styles.card} data-class={parseInt(ele.Bet) === parseInt(currentBet) ? "win" : "loss"}>
                                <div className={styles.imageWrapper}>
                                    <div className={styles.avatar}>
                                        <img className={styles.avatarTable} src={ele["Profile Image"]} alt="profile pic"></img>
                                    </div>
                                    <div className={styles.name}>{ele.Name}</div>
                                </div>
                                <div className={styles.otherData}>
                                <div className={styles.bet}>
                                      BET
                                    </div>
                                    <div className={styles.data}>
                                        {ele.Bet}
                                    </div>
                                </div>
                                <div className={styles.status}>
                                    {
                                        parseInt(ele.Bet) === parseInt(currentBet) ? 'WIN' : 'LOSS'
                                    }
                                </div>
                            </div>
                        )
                    })
                }
            </div>
            <div className={styles.randomValue}>
                {currentBet}
            </div>
            <div className={styles.backButton}>
                <button className={styles.startButton} onClick={back}>Back</button>
            </div>
        </div>
    )
}

const mapStoreToProps = (store) => {
    return {
        data: store.r.data,
        betList: store.r.betList,
        checkedCount: store.r.checkedCount
    }
}
const mapDispatchToProps = (dispatch) => {
    return {
        setbetlist: (data) => dispatch(actions.setbetlist(data)),
        setdata: (data) => dispatch(actions.setdata(data)),
        setCheckedCount: (data) => dispatch(actions.setcheckedcount(data))
    }
}

export default connect(mapStoreToProps, mapDispatchToProps)(BetPage);
