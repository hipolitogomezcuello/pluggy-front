import { AppBar, CircularProgress, Divider, Grid, Typography } from '@mui/material';
import Button from '@mui/material/Button';
import { Box } from '@mui/system';
import Image from 'next/image'
import { useEffect, useState } from 'react';
import QuoteCard from '../components/QuoteCard';
import colors from '../styles/colors';
import useAverage from '../swrUtils/useAverage';
import useQuotes from '../swrUtils/useQuotes';
import useSlippage from '../swrUtils/useSlippage';

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
  loaderContainer: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    marginTop: "10rem",
  },
  titleContainer: {
    display: "flex",
    justifyContent: "center",
    padding: "1rem"
  },
  averageContainer: {
    padding: "3rem",
    display: "flex",
    alignItems: "flex-end"
  },
  dividerContainer: {
    display: "flex",
    justifyContent: "center",
    padding: "4rem"
  },
  sourceCardsContainer: {
    padding: "3rem",
  },
  sourceCardContainer: {
    marginBottom: "2rem",
  }
}

const Home = () => {
  const { quotes, isLoading: quotesIsLoading, isError: quotesError } = useQuotes();
  const { slippage, isLoading: slippageIsLoading, isError: slippageError } = useSlippage();
  const { average, isLoading: averageIsLoading, isError: averageError } = useAverage();
  const [ completeQuotes, setCompleteQuotes ] = useState([]);
  
  useEffect(() => {
    if (!!quotes && !!slippage) {
      const completeQuotes = quotes.map(quote => {
        const correspondingSlippage = slippage.find(slippageI => slippageI.source === quote.source);
        quote.buy_price_slippage = correspondingSlippage.buy_price_slippage;
        quote.sell_price_slippage = correspondingSlippage.sell_price_slippage;
        return quote;
      });
      setCompleteQuotes(completeQuotes);
    }
  }, [quotes, slippage]);

  return (
    <Box xs={{ flexGrow: 1 }}>
      <AppBar position="static" style={styles.headerContainer}>
        <div>
          <img src={"/img/pluggyLogo.png"} style={styles.pluggyLogo} />
        </div>
      </AppBar>
      {
        (quotesIsLoading || averageIsLoading || slippageIsLoading || completeQuotes.length < 1) ? (
          <div style={styles.loaderContainer}>
            <CircularProgress />
          </div>
        ) : (
          <Grid container direction={"column"}>
            <Grid item xs={12} style={styles.titleContainer}>
              <Typography variant="h3" color={colors.red} component="div">
                Dolar Blue
              </Typography>
            </Grid>
            <Grid item container xs={12}>
              <Grid item container xs={5} direction="column" style={styles.averageContainer}>
                <QuoteCard type="average" quote={average} />
              </Grid>
              <Grid item xs={2} style={styles.dividerContainer}>
                <Divider orientation="vertical" />
              </Grid>
              <Grid item xs={5} style={styles.sourceCardsContainer}>
                {completeQuotes.map(quote => <div key={quote.source} style={styles.sourceCardContainer}>
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
