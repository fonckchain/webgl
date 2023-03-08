import React from "react";
import { withStyles } from "@material-ui/core/styles";
import MuiAccordion from "@material-ui/core/Accordion";
import MuiAccordionSummary from "@material-ui/core/AccordionSummary";
import MuiAccordionDetails from "@material-ui/core/AccordionDetails";
import Typography from "@material-ui/core/Typography";
import ExpandMoreIcon from "@material-ui/icons/ExpandMore";
const Accordion = withStyles({
  root: {
    "&:not(:last-child)": {
      background: "#FFFFFF",
      border: "1px solid #ea15467a",
      boxShadow: "0px 4px 8px rgba(0, 0, 0, 0.12)",
    },
    "&:before": {
      display: "none",
    },
    "&$expanded": {
      border: " 1px solid #ea15467a",
      background:
        "linear-gradient( 152.97deg, rgba(255, 255, 255, 0.2) 0%, rgba(255, 255, 255, 0) 100%)",
      backdropFilter: "blur(42px)",
    },
  },
  expanded: {},
})(MuiAccordion);

const AccordionSummary = withStyles({
  root: {
    borderBottom: "0",
    marginBottom: -1,
    backgroundColor: "#190a2c",
    // background: "linear-gradient(152.97deg, #fff3 0%, #fff0 100%)",

    // backdropFilter: "blur(42px)",
    // background: "linear-gradient(33deg, #3d4040 0%, #2a272700 100%)",
    // backdropFilter: "blur(95px)",
    fontWeight: 500,
    fontSize: "24px",
    lineHeight: "36px",
    color: "#fff",
    padding: "0 20px",
    minHeight: 45,
    "&$expanded": {
      minHeight: 45,
      borderBottom: "0",
      color: "#ffffff",
      backgroundColor: "#24113b",
      padding: "0 20px",
    },
  },
  content: {
    "&$expanded": {
      margin: "0px 0",
    },
  },
  expanded: {},
})(MuiAccordionSummary);

const AccordionDetails = withStyles((theme) => ({
  root: {
    padding: theme.spacing(2),
    background: "#0b0413",
    // background: "rgb(251, 253, 255)",
    // background: "linear-gradient(33deg, #3d4040 0%, #2a272700 100%)",
    // backdropFilter: "blur(95px)",
  },
}))(MuiAccordionDetails);
export default function FaqData({ data, index }) {
  const [expanded, setExpanded] = React.useState("panel1");

  const handleChange = (panel) => (event, newExpanded) => {
    setExpanded(newExpanded ? panel : false);
  };

  return (
    <div>
      <Accordion
        square
        defaultExpanded={index == 0 ? true : false}
        onChange={handleChange("panel1")}
      >
        <AccordionSummary
          aria-controls="panel1d-content"
          expandIcon={<ExpandMoreIcon />}
        >
          <Typography variant="h6">{data.head}</Typography>
        </AccordionSummary>
        <AccordionDetails>
          <Typography
            style={{
              color: "rgb(255, 255, 255)",
              fontSize: "15px",
              lineHeight: "24px",
            }}
          >
            {data.summary}
          </Typography>
        </AccordionDetails>
      </Accordion>
    </div>
  );
}
