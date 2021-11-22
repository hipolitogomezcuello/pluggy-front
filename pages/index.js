import { AppBar, CircularProgress, Grid, Typography } from '@mui/material';
import Button from '@mui/material/Button';
import { Box } from '@mui/system';
import Image from 'next/image'
import { useEffect, useState } from 'react';
import QuoteCard from '../components/QuoteCard';
import colors from '../styles/colors';

const apiUrl = "https://8sa5p2lw88.execute-api.sa-east-1.amazonaws.com/dev";

const styles = {
  headerContainer: {
    height: "5rem",
    backgroundColor: "#ACA5C4",
  },
  pluggyLogoContainer: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
  },
  pluggyLogo: {
    height: "3rem",
    marginTop: "1rem",
    marginLeft: "4rem"
  },
  averageContainer: {
    padding: "3rem",
  },
  sourceCardsContainer: {
    padding: "3rem",
  },
  sourceCardContainer: {
    marginBottom: "2rem",
  }
}

const Home = () => {
  const [quotes, setQuotes] = useState([]);
  const [average, setAverage] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  
  useEffect(() => {
    if (average && quotes.length > 0) {
      setIsLoading(false);
    }
  }, [average, quotes]);

  useEffect(() => {
    async function fetchData() {
      try {
        const [allQuotesPromise, averagePromise, slippagePromise] = await Promise.all([
          fetch(`${apiUrl}/quotes`),
          fetch(`${apiUrl}/average`),
          fetch(`${apiUrl}/slippage`)
        ]);
        const [allQuotesResponse, averageResponse, slippageResponse] = await Promise.all([
          allQuotesPromise.json(),
          averagePromise.json(),
          slippagePromise.json()
        ]);
        const allCompleteQuotes = allQuotesResponse.map(quote => {
          const correspondingSlippage = slippageResponse.find(slippage => slippage.source === quote.source);
          quote.buy_price_slippage = correspondingSlippage.buy_price_slippage;
          quote.sell_price_slippage = correspondingSlippage.sell_price_slippage;
          return quote;
        });
        setQuotes(allCompleteQuotes);
        setAverage(averageResponse);
      } catch(err) {
        console.log(err);
      }
    }
    fetchData();
  }, []);

  return (
    <Box xs={{ flexGrow: 1 }}>
      <AppBar position="static" style={styles.headerContainer}>
        <div>
          <img src={"/img/pluggyLogo.png"} style={styles.pluggyLogo} />
        </div>
        
      </AppBar>
      {
        isLoading ? (
          <div>
            <CircularProgress />
          </div>
        ) : (
          <Grid container direction={"column"}>
            <Grid item xs={12}>
              <Typography variant="h3" color={colors.red} component="div">
                Dolar Blue
              </Typography>
            </Grid>
            <Grid item container xs={12}>
              <Grid item xs={5} direction="column" style={styles.averageContainer}>
                <QuoteCard type="average" quote={average} />
              </Grid>
              <Grid item xs={2}>
                separator
              </Grid>
              <Grid item xs={5} style={styles.sourceCardsContainer}>
                {quotes.map(quote => <div key={quote.source} style={styles.sourceCardContainer}>
                  <QuoteCard type="quote" quote={quote} />
                </div>)}
                
              </Grid>
            </Grid>
          </Grid>
        )
      }
    </Box>
  )
}

export default Home;
