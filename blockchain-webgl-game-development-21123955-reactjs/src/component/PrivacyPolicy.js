import React from "react";
import {
  Grid,
  Box,
  Container,
  Typography,
  makeStyles,
  ListItem,
  List,
} from "@material-ui/core";

import {} from "react-feather";

const useStyles = makeStyles((theme) => ({
  GrantTerms: {
    paddingBottom: "30px",
    "& h4": {
      color: "#fff",
      fontSize: "Roboto",
    },
    "& p": {
      color: "#d8d8d8",
    },
    // background: "#ececec",
    // backgroundImage: "linear-gradient(77deg , #b26fca 30%, #e264)",
  },
}));

export default function PrivacyPolicy() {
  const classes = useStyles();
  return (
    <>
      <Box className={classes.GrantTerms}>
        {/* featured */}
        <Box mt={5} mb={2}>
          <Container fixed>
            <Grid container spacing={2} className="counterSection">
              <Grid item xs={12} md={12} className="aboutText">
                <Box className="subtext" textAlign="center" mb={3}>
                  <Typography variant="h3" title="    Privacy Policy">
                    Privacy Policy
                  </Typography>
                </Box>

                <Typography gutterBottom variant="h4">
                  1. Introduction
                </Typography>
                <Typography variant="body2">
                  Lorem ipsum dolor sit amet, consectetur adipiscing elit.
                  Aenean euismod bibendum laoreet. Proin gravida dolor sit amet
                  lacus accumsan et viverra justo commodo. Proin sodales
                  pulvinar tempor. Cum sociis natoque penatibus et magnis dis
                  parturient montes, nascetur ridiculus mus. Nam fermentum,
                  nulla luctus pharetra vulputate, felis tellus mollis orci, sed
                  rhoncus sapien nunc eget odio. Lorem ipsum dolor sit amet,
                  consectetur adipiscing elit. Aenean euismod bibendum laoreet.
                  Proin gravida dolor sit amet lacus accumsan et viverra justo
                  commodo. Proin sodales pulvinar tempor. Cum sociis natoque
                  penatibus et magnis dis parturient montes, nascetur ridiculus
                  mus. Nam fermentum, nulla luctus pharetra vulputate, felis
                  tellus mollis orci, sed rhoncus sapien nunc eget odio. Lorem
                  ipsum dolor sit amet, consectetur adipiscing elit. Aenean
                  euismod bibendum laoreet. Proin gravida dolor sit amet lacus
                  accumsan et viverra justo commodo. Proin sodales pulvinar
                  tempor. Cum sociis natoque penatibus et magnis dis parturient
                  montes, nascetur ridiculus mus. Nam fermentum, nulla luctus
                  pharetra vulputate, felis tellus mollis orci, sed rhoncus
                  sapien nunc eget odio. Lorem ipsum dolor sit amet, consectetur
                  adipiscing elit. Aenean euismod bibendum laoreet. Proin
                  gravida dolor sit amet lacus accumsan et viverra justo
                  commodo. Proin sodales pulvinar tempor. Cum sociis natoque
                  penatibus et magnis dis parturient montes, nascetur ridiculus
                  mus. Nam fermentum, nulla luctus pharetra vulputate, felis
                  tellus mollis orci, sed rhoncus sapien nunc eget odio. Lorem
                  ipsum dolor sit amet, consectetur adipiscing elit. Aenean
                  euismod bibendum laoreet. Proin gravida dolor sit amet lacus
                  accumsan et viverra justo commodo. Proin sodales pulvinar
                  tempor. Cum sociis natoque penatibus et magnis dis parturient
                  montes, nascetur ridiculus mus. Nam fermentum, nulla luctus
                  pharetra vulputate, felis tellus mollis orci, sed rhoncus
                  sapien nunc eget odio. Lorem ipsum dolor sit amet, consectetur
                  adipiscing elit. Aenean euismod bibendum laoreet. Proin
                  gravida dolor sit amet lacus
                </Typography>
              </Grid>
              <Grid item xs={12} sm={12} md={12} className="aboutText">
                <Typography gutterBottom variant="h4">
                  2. General Provisions and Notes
                </Typography>
                <List className="listTerms">
                  <ListItem>
                    <Typography variant="body2">
                      No Claim against Suum Cuique: Lorem ipsum dolor sit amet,
                      consectetur adipiscing elit. Aenean euismod bibendum
                      laoreet. Proin gravida dolor sit amet lacus accumsan et
                      viverra justo commodo. Proin sodales pulvinar tempor. Cum
                      sociis natoque penatibus et magnis dis parturient montes,
                      nascetur ridiculus mus. Nam fermentum, nulla luctus
                      pharetra vulputate, felis tellus mollis orci, sed rhoncus
                      sapien nunc eget odio. Lorem ipsum dolor sit amet,
                      consectetur adipiscing elit. Aenean euismod bibendum
                      laoreet. Proin gravida dolor sit amet lacus accumsan et
                      viverra justo commodo. Proin sodales pulvinar tempor.
                    </Typography>
                  </ListItem>
                  <ListItem>
                    <Typography variant="body2">
                      Program Specifications: Lorem ipsum dolor sit amet,
                      consectetur adipiscing elit. Aenean euismod bibendum
                      laoreet. Proin gravida dolor sit amet lacus accumsan et
                      viverra justo commodo.
                    </Typography>
                  </ListItem>
                  <ListItem>
                    <Typography variant="body2">
                      Maximal Amount of Participants and of the Grant: Lorem
                      ipsum dolor sit amet, consectetur adipiscing elit. Aenean
                      euismod bibendum laoreet. Proin gravida dolor sit amet
                      lacus accumsan et viverra justo commodo. Proin sodales
                      pulvinar tempor. Cum sociis natoque penatibus et magnis
                      dis parturient montes, nascetur ridiculus mus. Nam
                      fermentum, nulla luctus pharetra vulputate, felis tellus
                      mollis orci, sed rhoncus sapien nunc eget odio. Lorem
                      ipsum dolor sit amet, consectetur adipiscing elit. Aenean
                      euismod bibendum laoreet. Proin gravida dolor sit amet
                      lacus accumsan et viverra justo commodo. Proin sodales
                      pulvinar tempor.
                    </Typography>
                  </ListItem>
                  <ListItem>
                    <Typography variant="body2">
                      Participant’s Account Security: You are solely responsible
                      to ensure that you enter the correct public key (PUK,
                      Ethereum address). Furthermore, you are solely responsible
                      for the security of your private key (PIK), passwords as
                      well as your systems and (IT) infrastructure. Public
                      Communication and Acknowledgements: You hereby agree to
                      appropriately credit and acknowledge the support of Suum
                      Cuique in any publication, advertisement, or public
                      comment related to your usage of the Grant.
                    </Typography>
                  </ListItem>

                  <Grid item xs={12} md={12} className="aboutText">
                    <Typography gutterBottom variant="h4">
                      Exclusion of Warranties and Liability
                    </Typography>
                    <Typography variant="body2">
                      Lorem ipsum dolor sit amet, consectetur adipiscing elit.
                      Aenean euismod bibendum laoreet. Proin gravida dolor sit
                      amet lacus accumsan et viverra justo commodo. Proin
                      sodales pulvinar tempor. Cum sociis natoque penatibus et
                      magnis dis parturient montes, nascetur ridiculus mus. Nam
                      fermentum, nulla luctus pharetra vulputate, felis tellus
                      mollis orci, sed rhoncus sapien nunc eget odio. Lorem
                      ipsum dolor sit amet, consectetur adipiscing elit. Aenean
                      euismod bibendum laoreet. Proin gravida dolor sit amet
                      lacus accumsan et viverra justo commodo. Proin sodales
                      pulvinar tempor.
                    </Typography>
                  </Grid>
                </List>
                <Typography
                  gutterBottom
                  variant="h4"
                  style={{ marginTop: "10px" }}
                >
                  Use of Grant / Regulatory compliance
                </Typography>
                <Typography variant="body2">
                  Lorem ipsum dolor sit amet, consectetur adipiscing elit.
                  Aenean euismod bibendum laoreet. Proin gravida dolor sit amet
                  lacus accumsan et viverra justo commodo. Proin sodales
                  pulvinar tempor. Cum sociis natoque penatibus et magnis dis
                  parturient montes, nascetur ridiculus mus. Nam fermentum,
                  nulla luctus pharetra vulputate, felis tellus mollis orci, sed
                  rhoncus sapien nunc eget odio. Lorem ipsum dolor sit amet,
                  consectetur adipiscing elit. Aenean euismod bibendum laoreet.
                  Proin gravida dolor sit amet lacus accumsan et viverra justo
                  commodo. Proin sodales pulvinar tempor. Cum sociis natoque
                  penatibus et magnis dis parturient montes, nascetur ridiculus
                  mus.
                </Typography>
                <Typography
                  gutterBottom
                  variant="h4"
                  style={{ marginTop: "10px" }}
                >
                  Indemnification
                </Typography>
                <Typography variant="body2">
                  Lorem ipsum dolor sit amet, consectetur adipiscing elit.
                  Aenean euismod bibendum laoreet. Proin gravida dolor sit amet
                  lacus accumsan et viverra justo commodo.
                </Typography>
                <Typography
                  gutterBottom
                  variant="h4"
                  style={{ marginTop: "10px" }}
                >
                  Miscellaneous
                </Typography>
                <Typography variant="body2">
                  Lorem ipsum dolor sit amet, consectetur adipiscing elit.
                  Aenean euismod bibendum laoreet. Proin gravida dolor sit amet
                  lacus accumsan et viverra justo commodo. Proin sodales
                  pulvinar tempor. Cum sociis natoque penatibus et magnis dis
                  parturient montes, nascetur ridiculus mus. Nam fermentum,
                  nulla luctus pharetra vulputate, felis tellus mollis orci, sed
                  rhoncus sapien nunc eget odio. Lorem ipsum dolor sit amet,
                  consectetur adipiscing elit. Aenean euismod bibendum laoreet.
                  Proin gravida dolor sit amet lacus accumsan et viverra justo
                  commodo. Proin sodales pulvinar tempor. Cum sociis natoque
                  penatibus et magnis dis parturient montes,
                </Typography>
                <Typography
                  gutterBottom
                  variant="h4"
                  style={{ marginTop: "10px" }}
                >
                  Applicable Law and Jurisdiction
                </Typography>
                <Typography variant="body2">
                  You agree that all matters relating to the programe, including
                  all disputes, will be governed by Swiss law, excludingthe
                  Swiss conflict of law rules. Any dispute, controversy or claim
                  arising out of or in connection with these Terms, the Grant or
                  the breach, termination, existence, legal competence or
                  invalidity thereof, shall be exclusively settled by the courts
                  of Zug, Switzerland.
                </Typography>
              </Grid>
            </Grid>
          </Container>
        </Box>
      </Box>
    </>
  );
}
