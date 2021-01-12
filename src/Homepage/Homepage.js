import styles from './Homepage.module.css'
import React, { useState } from 'react'
import CasinoOutlinedIcon from '@material-ui/icons/CasinoOutlined';
import SearchOutlinedIcon from '@material-ui/icons/SearchOutlined';
import { useEffect } from 'react';
import { connect } from 'react-redux'
import * as actions from '../actions'
import { useHistory } from "react-router-dom";

const Homepage = (props) => {

    let history = useHistory();
    let [currentData, setCurrentData] = useState([]);
    let [searchValue, setSearchValue] = useState('');
    // let [betList, setBetList] = useState([]);

    function searchChange(evt) {
        let value = evt.currentTarget.value;
        setSearchValue(value);

        let temp = [...props.data];
        let filteredList = [];
        filteredList = temp.filter(ele => {
            let name = ele.Name.toLowerCase();
            if (name.startsWith(value.toLowerCase())) return true;
            else return false;
        })
        setCurrentData(filteredList);

    }
    function selectPlayer(evt) {
        let value = evt.target.checked;
        let key = parseInt(evt.target.dataset.index);

        let temp = [...currentData];
        temp.forEach((ele, index) => {
            if (index === key) {
                if (value === true && props.checkedCount < 9) {
                    ele["Player Selected"] = true;
                    let count = props.checkedCount + 1
                    props.setCheckedCount(count);
                } else if (value === false) {
                    ele["Player Selected"] = false;
                    let count = props.checkedCount - 1
                    props.setCheckedCount(count);
                }
            }
        })

        props.setbetlist(getSelectedPlayers());

    }

    function getSelectedPlayers() {
        let temp = [...currentData];
        let filteredList = [];
        filteredList = temp.filter((ele, index) => {
            if (ele["Player Selected"]) return true;
            else return false;
        })
        return filteredList;
    }

    function startPlaying(){
        history.push('/bet')
    }
    useEffect(() => {
        setCurrentData(props.data);
    }, []);
    // useEffect(() => {
    //     setCurrentData(props.data);
    // }, [props.data]);

    return (
        <div className={styles.homepage}>
            <div className={styles.leftpane}>
                <div className={styles.logo}>
                    <CasinoOutlinedIcon className={styles.diceIcon} style={{ color: '#2F80ED' }}/>
                    <CasinoOutlinedIcon className={styles.rotateIcon + ' ' + styles.diceIcon} style={{ color: '#2F80ED' }}/>
                </div>
                <div className={styles.leftpanebody}>
                    <div className={styles.betList}>
                    { props.betList !== undefined && props.betList.length > 0 && <div className={styles.playingtext}> { props.betList.length } Players Playing</div>}
                    {
                        props.betList !== undefined && props.betList.map((ele,index)=>{
                            return (
                                <div key={index} className={styles.card}>
                                    <div><img className={styles.avatarTable} src={ele["Profile Image"]} alt="profile pic"></img></div>
                                    <div className={styles.name}>{ele.Name}</div>
                                </div>
                            )
                        })
                    }
                    </div>
                    { props.betList !== undefined && props.betList.length > 0 && <button className={styles.startButton} onClick={startPlaying}>Start Playing</button>} 
                </div>
            </div>
            <div className={styles.body}>
                <div className={styles.searchInput}>
                    <SearchOutlinedIcon style={{ color: 'lightgrey' }} className={styles.searchIcon}></SearchOutlinedIcon>
                    <input type="text" value={searchValue} onChange={searchChange} placeholder="Search"></input>
                </div>
                <div className={styles.table}>
                    <div className={styles.tableheader}>
                        <div className={styles.row}>
                            <div>select</div>
                            <div>player name</div>
                            <div>level</div>
                            <div>avatar</div>
                            <div>bet</div>
                            <div>wins</div>
                            <div>lost</div>
                            <div>price</div>
                        </div>
                    </div>
                    <div className={styles.tableBody}>
                        {
                            currentData !== undefined && currentData.map((ele, index) => {
                                return (
                                    <div key={index} className={styles.row}>
                                        <div>
                                            <input type="checkbox" data-index={index} checked={ele["Player Selected"]} onChange={selectPlayer}></input>
                                        </div>
                                        <div className={styles.name}>{ele.Name}</div>
                                        <div>level</div>
                                        <div>
                                            <img className={styles.avatarTable} src={ele["Profile Image"]} alt="profile pic"></img>
                                        </div>
                                        <div>{ele.Bet}</div>
                                        <div>{ele.Wins}</div>
                                        <div>{ele.Lost}</div>
                                        <div>{ele.Price}</div>
                                    </div>
                                )
                            })
                        }
                    </div>


                </div>

            </div>
        </div>
    )
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

export default connect(mapStoreToProps, mapDispatchToProps)(Homepage);