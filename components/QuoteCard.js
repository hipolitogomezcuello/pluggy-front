import { Card, CardContent, Typography, Grid, Button } from "@mui/material";
import colors from "../styles/colors";

const styles = {
  container: {
    height: 200,
    width: 500,
    backgroundColor: colors.darkPurple,
    color: "white",
    borderRadius: 15,
  },
  contentContainer: {
    display: "flex",
    flexDirection: "column",
    margin: "1rem 4rem",
  },
  title: {
    fontSize: "2rem",
    marginBottom: "1rem",
  },
  singleQuoteContainer: {
    display: "flex",
    flexDirection: "row",
  },
  singleQuoteText: {
    fontSize: "1rem",
    marginRight: "1rem",
    marginTop: "0.5rem",
  },
  singleQuoteValue: {
    fontSize: "1.5rem",
  },
  sourceContainer: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "flex-end",
  },
  sourceButton: {
    backgroundColor: colors.red,
  }
}

const QuoteCard = ({ type, quote }) => {

  const getCardContent = (type) => {
    switch(type) {
      case "average":
        return(
          <CardContent style={styles.contentContainer}>
            <div style={styles.title}>Average</div>
            <div style={styles.singleQuoteContainer}>
              <div style={styles.singleQuoteText}>Compra</div>
              <div style={styles.singleQuoteValue}>${quote.average_buy_price.toString().replace(".", ",")}</div>
            </div>
            <div style={styles.singleQuoteContainer}>
              <div style={styles.singleQuoteText}>Venta</div>
              <div style={styles.singleQuoteValue}>${quote.average_sell_price.toString().replace(".", ",")}</div>
            </div>
          </CardContent>
        );
      case "quote":
        let buySlippageText = (quote.buy_price_slippage * 100).toString().replace(".",",");
        buySlippageText = buySlippageText.includes("-") ? buySlippageText : `+${buySlippageText}`;
        let sellSlippageText = (quote.sell_price_slippage * 100).toString().replace(".",",");
        sellSlippageText = sellSlippageText.includes("-") ? sellSlippageText : `+${sellSlippageText}`;
        return(
          <CardContent style={styles.contentContainer}>
            <div style={styles.title}>{quote.name}</div>
            <div style={styles.singleQuoteContainer}>
              <div style={styles.singleQuoteText}>Compra</div>
              <div style={styles.singleQuoteValue}>${quote.buy_price.toString().replace(".", ",")} / {buySlippageText}%</div>
            </div>
            <div style={styles.singleQuoteContainer}>
              <div style={styles.singleQuoteText}>Venta</div>
              <div style={styles.singleQuoteValue}>${quote.sell_price.toString().replace(".", ",")} / {sellSlippageText}%</div>
            </div>
            <div style={styles.sourceContainer}>
              <Button variant="contained" style={styles.sourceButton} href={quote.source}>source</Button>
            </div>
          </CardContent>
        );
      default:
        throw new Error("invalid quote card type");
    }
    
  }

  return (
    <Card style={styles.container}>
      {getCardContent(type)}
    </Card>
  )
}

export default QuoteCard;