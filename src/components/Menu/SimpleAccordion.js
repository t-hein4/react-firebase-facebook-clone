import * as React from "react";
import Accordion from "@mui/material/Accordion";
import AccordionSummary from "@mui/material/AccordionSummary";
import AccordionDetails from "@mui/material/AccordionDetails";
import Typography from "@mui/material/Typography";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import MenuButtonCard from "./MenuButtonCard";
import { Avatar, Grid, Stack } from "@mui/material";

export default function SimpleAccordion({ summary, details, index }) {
  return (
    <>
      <Accordion
        elevation={0}
        sx={{ bgcolor: "#F0F2F5" }}
        TransitionProps={{ unmountOnExit: true }}
        disableGutters
      >
        <AccordionSummary
          expandIcon={<ExpandMoreIcon />}
          aria-controls="panel1a-content"
          id="panel1a-header"
        >
          <Typography>{summary.name}</Typography>
        </AccordionSummary>
        <AccordionDetails>
          <Grid container spacing={1}>
            {details.map(({ id, name }) => (
              <Grid key={id} item xs={index === 0 ? 6 : 12}>
                {index === 0 ? (
                  <MenuButtonCard name={name} />
                ) : (
                  <Stack direction="row" alignItems="center" spacing={2}>
                    <Avatar src="" width={40} height={40} />
                    <Typography>{name}</Typography>
                  </Stack>
                )}
              </Grid>
            ))}
          </Grid>
        </AccordionDetails>
      </Accordion>
    </>
  );
}
