import styles from './BetPage.module.css'
import { connect } from 'react-redux'
import * as actions from '../actions'
import { useState,useEffect,useRef } from 'react'

import { useHistory } from "react-router-dom";

const BetPage = (props) => {
    let history = useHistory();
    let [currentBet, setCurrentBet] = useState(0);
    const prevBetRef = useRef();

    let [loaded, setLoaded] = useState(false); 

    useEffect(() => {
        console.log('mount')
        let value = Math.floor(Math.random() * 10 % 10);
        setCurrentBet(value);
    },[])


    // useEffect(() => {
    //     if(currentBet !== undefined && currentBet !== 0){
    //         console.log('bet update')
    //         let temp = [...props.betList];
    //         temp.forEach(ele => {
    //             if (parseInt(ele.Bet) === parseInt(currentBet)) {
    //                 console.log(ele);
    //                 ele["Price"] = parseInt(ele["Price"]) * 2;
    //                 props.updatePerson(ele);
    //             }
    //         })
    //     }
    // }, [currentBet]);

    useEffect(() => {
       
    }, [props]);

    function back() {
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
                                        Price
                                    </div>
                                    <div className={styles.priceData}>
                                        {ele.Price}
                                    </div>
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
        setCheckedCount: (data) => dispatch(actions.setcheckedcount(data)),
        updatePerson: (data) => dispatch(actions.updateperson(data))
    }
}

export default connect(mapStoreToProps, mapDispatchToProps)(BetPage);
