import styles from './Homepage.module.css'
import React, { useState } from 'react'
import CasinoOutlinedIcon from '@material-ui/icons/CasinoOutlined';
import SearchOutlinedIcon from '@material-ui/icons/SearchOutlined';
import { useEffect, useImperativeHandle, forwardRef } from 'react';

const Homepage = forwardRef((props,ref) => {

    let [checkedCount, setCheckedCount] = useState(0);
    let [currentData, setCurrentData] = useState([]);
    let [searchValue, setSearchValue] = useState('');
    let [betList, setBetList] = useState([]);

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
                if (value === true && checkedCount < 9) {
                    ele["Player Selected"] = true;
                    setCheckedCount(++checkedCount);
                } else if (value === false) {
                    ele["Player Selected"] = false;
                    setCheckedCount(--checkedCount);
                }
            }
        })

        setBetList(getSelectedPlayers());

    }

    // useImperativeHandle(ref, () => ({
    //     getSelectedPlayers : getSelectedPlayers
    // }));

    function getSelectedPlayers() {
        let temp = [...currentData];
        let filteredList = [];
        filteredList = temp.filter((ele, index) => {
            if (ele["Player Selected"]) return true;
            else return false;
        })
        return filteredList;
    }

    useEffect(() => {
        console.log(checkedCount);
    }, [checkedCount]);
    useEffect(() => {
        setCurrentData(props.data);
    }, []);
    useEffect(() => {
        setCurrentData(props.data);
    }, [props.data]);

    return (
        <div className={styles.homepage}>
            <div className={styles.leftpane}>
                <div className={styles.logo}>
                    <CasinoOutlinedIcon className={styles.diceIcon} style={{ color: '#2F80ED' }}/>
                    <CasinoOutlinedIcon className={styles.rotateIcon + ' ' + styles.diceIcon} style={{ color: '#2F80ED' }}/>
                </div>
                <div className={styles.leftpanebody}>
                    <div className={styles.betList}>
                    { betList !== undefined && betList.length > 0 && <div className={styles.playingtext}> { betList.length } Players Playing</div>}
                    {
                        betList !== undefined && betList.map((ele,index)=>{
                            return (
                                <div key={index} className={styles.card}>
                                    <div><img className={styles.avatarTable} src={ele["Profile Image"]} alt="profile pic"></img></div>
                                    <div className={styles.name}>{ele.Name}</div>
                                </div>
                            )
                        })
                    }
                    </div>
                    { betList !== undefined && betList.length > 0 && <button className={styles.startButton}>Start Playing</button>} 
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
})

export default Homepage;