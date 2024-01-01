import React from "react";
import "./Dashboard.css"
import axios from 'axios';
import { TextField, MenuItem, Card, CardContent, Button, CircularProgress } from "@mui/material";

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
    const [amount, setAmount] = React.useState(0.0);
    const [showResult, setShowResult] = React.useState(false);
    const [exchangeAmount, setExchangeAmount] = React.useState('');
    const [exchangeLabel, setExchangeLabel] = React.useState('');

    const getCryptoTypes = () => {
        // axios.get("http://localhost:7000/crypto/allTypes")
        // .then((response)=>{
        //     setCryptoTypes(response.data);
        // })
        const data = [
            {
                "id": "bitcoin",
                "symbol": "btc",
                "name": "Bitcoin",
                "image": "https://assets.coingecko.com/coins/images/1/large/bitcoin.png?1696501400"
            },
            {
                "id": "ethereum",
                "symbol": "eth",
                "name": "Ethereum",
                "image": "https://assets.coingecko.com/coins/images/279/large/ethereum.png?1696501628"
            },
            {
                "id": "tether",
                "symbol": "usdt",
                "name": "Tether",
                "image": "https://assets.coingecko.com/coins/images/325/large/Tether.png?1696501661"
            },
            {
                "id": "binancecoin",
                "symbol": "bnb",
                "name": "BNB",
                "image": "https://assets.coingecko.com/coins/images/825/large/bnb-icon2_2x.png?1696501970"
            },
            {
                "id": "solana",
                "symbol": "sol",
                "name": "Solana",
                "image": "https://assets.coingecko.com/coins/images/4128/large/solana.png?1696504756"
            },
            {
                "id": "ripple",
                "symbol": "xrp",
                "name": "XRP",
                "image": "https://assets.coingecko.com/coins/images/44/large/xrp-symbol-white-128.png?1696501442"
            },
            {
                "id": "usd-coin",
                "symbol": "usdc",
                "name": "USDC",
                "image": "https://assets.coingecko.com/coins/images/6319/large/usdc.png?1696506694"
            },
            {
                "id": "staked-ether",
                "symbol": "steth",
                "name": "Lido Staked Ether",
                "image": "https://assets.coingecko.com/coins/images/13442/large/steth_logo.png?1696513206"
            },
            {
                "id": "cardano",
                "symbol": "ada",
                "name": "Cardano",
                "image": "https://assets.coingecko.com/coins/images/975/large/cardano.png?1696502090"
            },
            {
                "id": "avalanche-2",
                "symbol": "avax",
                "name": "Avalanche",
                "image": "https://assets.coingecko.com/coins/images/12559/large/Avalanche_Circle_RedWhite_Trans.png?1696512369"
            },
            {
                "id": "dogecoin",
                "symbol": "doge",
                "name": "Dogecoin",
                "image": "https://assets.coingecko.com/coins/images/5/large/dogecoin.png?1696501409"
            },
            {
                "id": "polkadot",
                "symbol": "dot",
                "name": "Polkadot",
                "image": "https://assets.coingecko.com/coins/images/12171/large/polkadot.png?1696512008"
            },
            {
                "id": "tron",
                "symbol": "trx",
                "name": "TRON",
                "image": "https://assets.coingecko.com/coins/images/1094/large/tron-logo.png?1696502193"
            },
            {
                "id": "matic-network",
                "symbol": "matic",
                "name": "Polygon",
                "image": "https://assets.coingecko.com/coins/images/4713/large/polygon.png?1698233745"
            },
            {
                "id": "chainlink",
                "symbol": "link",
                "name": "Chainlink",
                "image": "https://assets.coingecko.com/coins/images/877/large/chainlink-new-logo.png?1696502009"
            },
            {
                "id": "the-open-network",
                "symbol": "ton",
                "name": "Toncoin",
                "image": "https://assets.coingecko.com/coins/images/17980/large/ton_symbol.png?1696517498"
            },
            {
                "id": "wrapped-bitcoin",
                "symbol": "wbtc",
                "name": "Wrapped Bitcoin",
                "image": "https://assets.coingecko.com/coins/images/7598/large/wrapped_bitcoin_wbtc.png?1696507857"
            },
            {
                "id": "shiba-inu",
                "symbol": "shib",
                "name": "Shiba Inu",
                "image": "https://assets.coingecko.com/coins/images/11939/large/shiba.png?1696511800"
            },
            {
                "id": "internet-computer",
                "symbol": "icp",
                "name": "Internet Computer",
                "image": "https://assets.coingecko.com/coins/images/14495/large/Internet_Computer_logo.png?1696514180"
            },
            {
                "id": "uniswap",
                "symbol": "uni",
                "name": "Uniswap",
                "image": "https://assets.coingecko.com/coins/images/12504/large/uni.jpg?1696512319"
            },
            {
                "id": "litecoin",
                "symbol": "ltc",
                "name": "Litecoin",
                "image": "https://assets.coingecko.com/coins/images/2/large/litecoin.png?1696501400"
            },
            {
                "id": "dai",
                "symbol": "dai",
                "name": "Dai",
                "image": "https://assets.coingecko.com/coins/images/9956/large/Badge_Dai.png?1696509996"
            },
            {
                "id": "bitcoin-cash",
                "symbol": "bch",
                "name": "Bitcoin Cash",
                "image": "https://assets.coingecko.com/coins/images/780/large/bitcoin-cash-circle.png?1696501932"
            },
            {
                "id": "cosmos",
                "symbol": "atom",
                "name": "Cosmos Hub",
                "image": "https://assets.coingecko.com/coins/images/1481/large/cosmos_hub.png?1696502525"
            },
            {
                "id": "filecoin",
                "symbol": "fil",
                "name": "Filecoin",
                "image": "https://assets.coingecko.com/coins/images/12817/large/filecoin.png?1696512609"
            },
            {
                "id": "near",
                "symbol": "near",
                "name": "NEAR Protocol",
                "image": "https://assets.coingecko.com/coins/images/10365/large/near.jpg?1696510367"
            },
            {
                "id": "leo-token",
                "symbol": "leo",
                "name": "LEO Token",
                "image": "https://assets.coingecko.com/coins/images/8418/large/leo-token.png?1696508607"
            },
            {
                "id": "stellar",
                "symbol": "xlm",
                "name": "Stellar",
                "image": "https://assets.coingecko.com/coins/images/100/large/Stellar_symbol_black_RGB.png?1696501482"
            },
            {
                "id": "optimism",
                "symbol": "op",
                "name": "Optimism",
                "image": "https://assets.coingecko.com/coins/images/25244/large/Optimism.png?1696524385"
            },
            {
                "id": "okb",
                "symbol": "okb",
                "name": "OKB",
                "image": "https://assets.coingecko.com/coins/images/4463/large/WeChat_Image_20220118095654.png?1696505053"
            },
            {
                "id": "injective-protocol",
                "symbol": "inj",
                "name": "Injective",
                "image": "https://assets.coingecko.com/coins/images/12882/large/Secondary_Symbol.png?1696512670"
            },
            {
                "id": "ethereum-classic",
                "symbol": "etc",
                "name": "Ethereum Classic",
                "image": "https://assets.coingecko.com/coins/images/453/large/ethereum-classic-logo.png?1696501717"
            },
            {
                "id": "monero",
                "symbol": "xmr",
                "name": "Monero",
                "image": "https://assets.coingecko.com/coins/images/69/large/monero_logo.png?1696501460"
            },
            {
                "id": "aptos",
                "symbol": "apt",
                "name": "Aptos",
                "image": "https://assets.coingecko.com/coins/images/26455/large/aptos_round.png?1696525528"
            },
            {
                "id": "immutable-x",
                "symbol": "imx",
                "name": "Immutable",
                "image": "https://assets.coingecko.com/coins/images/17233/large/immutableX-symbol-BLK-RGB.png?1696516787"
            },
            {
                "id": "hedera-hashgraph",
                "symbol": "hbar",
                "name": "Hedera",
                "image": "https://assets.coingecko.com/coins/images/3688/large/hbar.png?1696504364"
            },
            {
                "id": "crypto-com-chain",
                "symbol": "cro",
                "name": "Cronos",
                "image": "https://assets.coingecko.com/coins/images/7310/large/cro_token_logo.png?1696507599"
            },
            {
                "id": "vechain",
                "symbol": "vet",
                "name": "VeChain",
                "image": "https://assets.coingecko.com/coins/images/1167/large/VET_Token_Icon.png?1696502256"
            },
            {
                "id": "lido-dao",
                "symbol": "ldo",
                "name": "Lido DAO",
                "image": "https://assets.coingecko.com/coins/images/13573/large/Lido_DAO.png?1696513326"
            },
            {
                "id": "kaspa",
                "symbol": "kas",
                "name": "Kaspa",
                "image": "https://assets.coingecko.com/coins/images/25751/large/kaspa-icon-exchanges.png?1696524837"
            },
            {
                "id": "true-usd",
                "symbol": "tusd",
                "name": "TrueUSD",
                "image": "https://assets.coingecko.com/coins/images/3449/large/tusd.png?1696504140"
            },
            {
                "id": "blockstack",
                "symbol": "stx",
                "name": "Stacks",
                "image": "https://assets.coingecko.com/coins/images/2069/large/Stacks_logo_full.png?1696503035"
            },
            {
                "id": "quant-network",
                "symbol": "qnt",
                "name": "Quant",
                "image": "https://assets.coingecko.com/coins/images/3370/large/5ZOu7brX_400x400.jpg?1696504070"
            },
            {
                "id": "arbitrum",
                "symbol": "arb",
                "name": "Arbitrum",
                "image": "https://assets.coingecko.com/coins/images/16547/large/photo_2023-03-29_21.47.00.jpeg?1696516109"
            },
            {
                "id": "bitcoin-cash-sv",
                "symbol": "bsv",
                "name": "Bitcoin SV",
                "image": "https://assets.coingecko.com/coins/images/6799/large/BSV.png?1696507128"
            },
            {
                "id": "mantle",
                "symbol": "mnt",
                "name": "Mantle",
                "image": "https://assets.coingecko.com/coins/images/30980/large/token-logo.png?1696529819"
            },
            {
                "id": "the-graph",
                "symbol": "grt",
                "name": "The Graph",
                "image": "https://assets.coingecko.com/coins/images/13397/large/Graph_Token.png?1696513159"
            },
            {
                "id": "elrond-erd-2",
                "symbol": "egld",
                "name": "MultiversX",
                "image": "https://assets.coingecko.com/coins/images/12335/large/egld-token-logo.png?1696512162"
            },
            {
                "id": "algorand",
                "symbol": "algo",
                "name": "Algorand",
                "image": "https://assets.coingecko.com/coins/images/4380/large/download.png?1696504978"
            },
            {
                "id": "first-digital-usd",
                "symbol": "fdusd",
                "name": "First Digital USD",
                "image": "https://assets.coingecko.com/coins/images/31079/large/firstfigital.jpeg?1696529912"
            },
            {
                "id": "celestia",
                "symbol": "tia",
                "name": "Celestia",
                "image": "https://assets.coingecko.com/coins/images/31967/large/tia.jpg?1696530772"
            },
            {
                "id": "render-token",
                "symbol": "rndr",
                "name": "Render",
                "image": "https://assets.coingecko.com/coins/images/11636/large/rndr.png?1696511529"
            },
            {
                "id": "aave",
                "symbol": "aave",
                "name": "Aave",
                "image": "https://assets.coingecko.com/coins/images/12645/large/AAVE.png?1696512452"
            },
            {
                "id": "ordinals",
                "symbol": "ordi",
                "name": "ORDI",
                "image": "https://assets.coingecko.com/coins/images/30162/large/ordi.png?1696529082"
            },
            {
                "id": "thorchain",
                "symbol": "rune",
                "name": "THORChain",
                "image": "https://assets.coingecko.com/coins/images/6595/large/Rune200x200.png?1696506946"
            },
            {
                "id": "bittensor",
                "symbol": "tao",
                "name": "Bittensor",
                "image": "https://assets.coingecko.com/coins/images/28452/large/ARUsPeNQ_400x400.jpeg?1696527447"
            },
            {
                "id": "maker",
                "symbol": "mkr",
                "name": "Maker",
                "image": "https://assets.coingecko.com/coins/images/1364/large/Mark_Maker.png?1696502423"
            },
            {
                "id": "sei-network",
                "symbol": "sei",
                "name": "Sei",
                "image": "https://assets.coingecko.com/coins/images/28205/large/Sei_Logo_-_Transparent.png?1696527207"
            },
            {
                "id": "mina-protocol",
                "symbol": "mina",
                "name": "Mina Protocol",
                "image": "https://assets.coingecko.com/coins/images/15628/large/JM4_vQ34_400x400.png?1696515261"
            },
            {
                "id": "rocket-pool-eth",
                "symbol": "reth",
                "name": "Rocket Pool ETH",
                "image": "https://assets.coingecko.com/coins/images/20764/large/reth.png?1696520159"
            },
            {
                "id": "fantom",
                "symbol": "ftm",
                "name": "Fantom",
                "image": "https://assets.coingecko.com/coins/images/4001/large/Fantom_round.png?1696504642"
            },
            {
                "id": "flow",
                "symbol": "flow",
                "name": "Flow",
                "image": "https://assets.coingecko.com/coins/images/13446/large/5f6294c0c7a8cda55cb1c936_Flow_Wordmark.png?1696513210"
            },
            {
                "id": "havven",
                "symbol": "snx",
                "name": "Synthetix Network",
                "image": "https://assets.coingecko.com/coins/images/3406/large/SNX.png?1696504103"
            },
            {
                "id": "theta-token",
                "symbol": "theta",
                "name": "Theta Network",
                "image": "https://assets.coingecko.com/coins/images/2538/large/theta-token-logo.png?1696503349"
            },
            {
                "id": "the-sandbox",
                "symbol": "sand",
                "name": "The Sandbox",
                "image": "https://assets.coingecko.com/coins/images/12129/large/sandbox_logo.jpg?1696511971"
            },
            {
                "id": "axie-infinity",
                "symbol": "axs",
                "name": "Axie Infinity",
                "image": "https://assets.coingecko.com/coins/images/13029/large/axie_infinity_logo.png?1696512817"
            },
            {
                "id": "bittorrent",
                "symbol": "btt",
                "name": "BitTorrent",
                "image": "https://assets.coingecko.com/coins/images/22457/large/btt_logo.png?1696521780"
            },
            {
                "id": "tokenize-xchange",
                "symbol": "tkx",
                "name": "Tokenize Xchange",
                "image": "https://assets.coingecko.com/coins/images/4984/large/TKX_-_Logo_-_RGB-15.png?1696505519"
            },
            {
                "id": "helium",
                "symbol": "hnt",
                "name": "Helium",
                "image": "https://assets.coingecko.com/coins/images/4284/large/Helium_HNT.png?1696504894"
            },
            {
                "id": "binance-usd",
                "symbol": "busd",
                "name": "BUSD",
                "image": "https://assets.coingecko.com/coins/images/9576/large/BUSDLOGO.jpg?1696509654"
            },
            {
                "id": "kucoin-shares",
                "symbol": "kcs",
                "name": "KuCoin",
                "image": "https://assets.coingecko.com/coins/images/1047/large/sa9z79.png?1696502152"
            },
            {
                "id": "neo",
                "symbol": "neo",
                "name": "NEO",
                "image": "https://assets.coingecko.com/coins/images/480/large/NEO_512_512.png?1696501735"
            },
            {
                "id": "kava",
                "symbol": "kava",
                "name": "Kava",
                "image": "https://assets.coingecko.com/coins/images/9761/large/kava.png?1696509822"
            },
            {
                "id": "eos",
                "symbol": "eos",
                "name": "EOS",
                "image": "https://assets.coingecko.com/coins/images/738/large/eos-eos-logo.png?1696501893"
            },
            {
                "id": "decentraland",
                "symbol": "mana",
                "name": "Decentraland",
                "image": "https://assets.coingecko.com/coins/images/878/large/decentraland-mana.png?1696502010"
            },
            {
                "id": "tezos",
                "symbol": "xtz",
                "name": "Tezos",
                "image": "https://assets.coingecko.com/coins/images/976/large/Tezos-logo.png?1696502091"
            },
            {
                "id": "osmosis",
                "symbol": "osmo",
                "name": "Osmosis",
                "image": "https://assets.coingecko.com/coins/images/16724/large/osmo.png?1696516298"
            },
            {
                "id": "gala",
                "symbol": "gala",
                "name": "GALA",
                "image": "https://assets.coingecko.com/coins/images/12493/large/GALA-COINGECKO.png?1696512310"
            },
            {
                "id": "iota",
                "symbol": "iota",
                "name": "IOTA",
                "image": "https://assets.coingecko.com/coins/images/692/large/IOTA_Swirl.png?1696501881"
            },
            {
                "id": "wemix-token",
                "symbol": "wemix",
                "name": "WEMIX",
                "image": "https://assets.coingecko.com/coins/images/12998/large/wemixcoin_color_200.png?1696512788"
            },
            {
                "id": "sui",
                "symbol": "sui",
                "name": "Sui",
                "image": "https://assets.coingecko.com/coins/images/26375/large/sui_asset.jpeg?1696525453"
            },
            {
                "id": "pancakeswap-token",
                "symbol": "cake",
                "name": "PancakeSwap",
                "image": "https://assets.coingecko.com/coins/images/12632/large/pancakeswap-cake-logo_%281%29.png?1696512440"
            },
            {
                "id": "whitebit",
                "symbol": "wbt",
                "name": "WhiteBIT Coin",
                "image": "https://assets.coingecko.com/coins/images/27045/large/wbt_token.png?1696526096"
            },
            {
                "id": "cheelee",
                "symbol": "cheel",
                "name": "Cheelee",
                "image": "https://assets.coingecko.com/coins/images/28573/large/CHEEL_%D1%82%D0%BE%D0%BD%D0%BA%D0%B0%D1%8F_%D0%BE%D0%B1%D0%B2%D0%BE%D0%B4%D0%BA%D0%B0_%283%29.png?1696527561"
            },
            {
                "id": "bitget-token",
                "symbol": "bgb",
                "name": "Bitget Token",
                "image": "https://assets.coingecko.com/coins/images/11610/large/icon_colour.png?1696511504"
            },
            {
                "id": "bonk",
                "symbol": "bonk",
                "name": "Bonk",
                "image": "https://assets.coingecko.com/coins/images/28600/large/bonk.jpg?1696527587"
            },
            {
                "id": "terra-luna",
                "symbol": "lunc",
                "name": "Terra Luna Classic",
                "image": "https://assets.coingecko.com/coins/images/8284/large/01_LunaClassic_color.png?1696508486"
            },
            {
                "id": "beam-2",
                "symbol": "beam",
                "name": "Beam",
                "image": "https://assets.coingecko.com/coins/images/32417/large/chain-logo.png?1698114384"
            },
            {
                "id": "dydx",
                "symbol": "ethdydx",
                "name": "dYdX",
                "image": "https://assets.coingecko.com/coins/images/17500/large/hjnIm9bV.jpg?1696517040"
            },
            {
                "id": "klay-token",
                "symbol": "klay",
                "name": "Klaytn",
                "image": "https://assets.coingecko.com/coins/images/9672/large/klaytn.png?1696509742"
            },
            {
                "id": "xdce-crowd-sale",
                "symbol": "xdc",
                "name": "XDC Network",
                "image": "https://assets.coingecko.com/coins/images/2912/large/xdc-icon.png?1696503661"
            },
            {
                "id": "fetch-ai",
                "symbol": "fet",
                "name": "Fetch.ai",
                "image": "https://assets.coingecko.com/coins/images/5681/large/Fetch.jpg?1696506140"
            },
            {
                "id": "ecash",
                "symbol": "xec",
                "name": "eCash",
                "image": "https://assets.coingecko.com/coins/images/16646/large/Logo_final-22.png?1696516207"
            },
            {
                "id": "msol",
                "symbol": "msol",
                "name": "Marinade staked SOL",
                "image": "https://assets.coingecko.com/coins/images/17752/large/mSOL.png?1696517278"
            },
            {
                "id": "astar",
                "symbol": "astr",
                "name": "Astar",
                "image": "https://assets.coingecko.com/coins/images/22617/large/astr.png?1696521933"
            },
            {
                "id": "woo-network",
                "symbol": "woo",
                "name": "WOO Network",
                "image": "https://assets.coingecko.com/coins/images/12921/large/WOO_Logos_2023_Profile_Pic_WOO.png?1696512709"
            },
            {
                "id": "usdd",
                "symbol": "usdd",
                "name": "USDD",
                "image": "https://assets.coingecko.com/coins/images/25380/large/UUSD.jpg?1696524513"
            },
            {
                "id": "frax-ether",
                "symbol": "frxeth",
                "name": "Frax Ether",
                "image": "https://assets.coingecko.com/coins/images/28284/large/frxETH_icon.png?1696527284"
            },
            {
                "id": "gatechain-token",
                "symbol": "gt",
                "name": "Gate",
                "image": "https://assets.coingecko.com/coins/images/8183/large/gate.png?1696508395"
            },
            {
                "id": "oasis-network",
                "symbol": "rose",
                "name": "Oasis Network",
                "image": "https://assets.coingecko.com/coins/images/13162/large/rose.png?1696512946"
            }
        ]

        setCryptoTypes(data);
        setLoading(false);
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
        axios.post("http://localhost:7000/crypto/exchange", reqBody)
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
                            {cryptoTypes.map((option) => (
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
        </div>
    )   
}

export default Dashboard;