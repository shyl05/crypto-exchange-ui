import React from "react";
import "./Dashboard.css"
import axios from 'axios';
import { TextField, MenuItem, Card, CardContent, Button, CircularProgress } from "@mui/material";
import AlertBox from "./AlertBox";

const Dashboard = () => {

    const currencies = [
        {
          value: 'usd',
          label: '$ - USD',
        },
        {
          value: 'inr',
          label: '₹ - INR',
        },
    ];

    const [loading, setLoading] = React.useState(true);
    const [cryptoTypes, setCryptoTypes] = React.useState([]);
    const [selectedCrypto, setSelectedCrypto] = React.useState('');
    const [selectedMoney, setSelectedMoney] = React.useState('usd');
    const [amount, setAmount] = React.useState(1.0);
    const [showResult, setShowResult] = React.useState(false);
    const [exchangeAmount, setExchangeAmount] = React.useState('');
    const [exchangeLabel, setExchangeLabel] = React.useState('');
    const [errorMsg, setErrorMsg] = React.useState('');
    const [errorState, setErrorState] = React.useState(false);

    const handleCloseError = () => {
        setErrorMsg('');
        setErrorState(false);
    };

    const getCryptoTypes = () => {
        setShowResult(false);
        setLoading(true);
        axios.get(`${process.env.REACT_APP_API_URL}/allTypes`)
        .then((response)=>{
            if(response.data){
                setCryptoTypes(response?.data);
                setLoading(false);
            } else {
                setLoading(false);
                setErrorMsg('API Error: Reached Maximum Fetchs - Upgrade Coingecko Plan');
                setErrorState(true);
            }
        })
        .catch((err)=> {
            console.log(err);
            setLoading(false);
            setErrorMsg('API Error: Network Error');
            setErrorState(true);
        })
    }

    const handleCryptoChange = (event) => {
        setShowResult(false);
        setSelectedCrypto(event.target.value);
    };

    const handleMoneyChange = (event) => {
        setShowResult(false);
        setSelectedMoney(event.target.value);
    };

    const handleAmountValueChange = (event) => {
        setShowResult(false);
        setAmount(event.target.value);
    };

    const getExchangeValue = () => {
        setShowResult(false);
        setLoading(true);
        const reqBody = {
            id: selectedCrypto,
            amountType: selectedMoney,
        }
        if(selectedCrypto === '' && !selectedMoney && !amount) {
            setErrorMsg('Enter All Required fields');
            setErrorState(true);
        } else {
            axios.post(`${process.env.REACT_APP_API_URL}/exchange`, reqBody)
            .then((response)=>{
                let exchangeVal;
                let currLabel;
                if(selectedMoney === 'usd'){
                    currLabel = '$';
                    exchangeVal = amount * response.data.exchangeValue
                } else {
                    currLabel = '₹';
                    exchangeVal = amount * response.data.exchangeValue
                }
                setExchangeAmount(exchangeVal);
                setExchangeLabel(currLabel);
                setShowResult(true);
                setLoading(false);
            }) 
            .catch((err)=> {
                console.log(err);
                setLoading(false);
                setErrorMsg('API Error: Network Error');
                setErrorState(true);
            })
        }
    };

    React.useEffect(()=>{
        getCryptoTypes();
    },[]);

    return (
        <div className="dashboard-container">
            {loading? (
                <CircularProgress color="secondary" />
            ): (
                <Card sx={{ minWidth: 275 }} variant="outlined" className="card-outer">
                    <CardContent className="card-inner">
                        <TextField
                            required
                            className="input-box"
                            id="select-crypto"
                            select
                            label="Select Crypto"
                            defaultValue={selectedCrypto}
                            helperText="* Please select your crypto"
                            onChange={(e) =>handleCryptoChange(e)}
                            >
                            {cryptoTypes?.map((option) => (
                                <MenuItem key={option.id} value={option.id}>
                                {option.name}
                                </MenuItem>
                            ))}
                        </TextField>
                        <TextField
                            required
                            className="input-box"
                            id="select-currency"
                            select
                            label="Select Currency"
                            defaultValue="usd"
                            helperText="* Please select your currency"
                            onChange={(e) =>handleMoneyChange(e)}
                            >
                            {currencies.map((option) => (
                                <MenuItem key={option.value} value={option.value}>
                                {option.label}
                                </MenuItem>
                            ))}
                        </TextField>
                        <TextField
                            className="input-box"
                            required
                            id="amount-input"
                            label="Amount"
                            type="number"
                            placeholder="Enter the amount"
                            helperText="* Please enter amount"
                            value={amount}
                            onChange={(e) =>handleAmountValueChange(e)}
                        />
                        <Button variant="contained" onClick={getExchangeValue} className="exchange-btn">Exchange</Button>
                        {showResult ? (
                            <TextField
                                className="output-box"
                                id="amount-output"
                                label="Exchange Value"
                                type="text"
                                defaultValue={exchangeLabel +" "+exchangeAmount}
                                disabled
                            />
                            ): (
                                null
                            )
                        }
                    </CardContent>
                </Card>
            )}
            <AlertBox open={errorState} onHandleClose={handleCloseError} errorMsg={errorMsg}/>
        </div>
    )   
}

export default Dashboard;