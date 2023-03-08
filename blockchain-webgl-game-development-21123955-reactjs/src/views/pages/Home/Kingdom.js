import React from "react";
import {
  Grid,
  Box,
  Container,
  Typography,
  makeStyles,
} from "@material-ui/core";
import TeamCard from "src/component/TeamCard";
const useStyles = makeStyles((theme) => ({
  aboutsection: {
    padding: "80px 0",
    position: "relative",
    [theme.breakpoints.down("sm")]: {
      padding: "100px 0",
    },
    [theme.breakpoints.down("xs")]: {
      padding: "50px 0",
    },
  },
  textbox: {
    "& h1": {
      fontSize: "70px",
      fontWeight: "800",
      color: "#fff",
      [theme.breakpoints.down("md")]: {
        fontSize: "60px",
      },
      [theme.breakpoints.down("xs")]: {
        fontSize: "30px",
      },
    },
    "& p": {
      fontSize: "16px",
      marginTop: "20px",
      color: "#fff",
    },
  },
}));
const TeamMap = [
  {
    image: "images/collection/MetaMat.png ",
    name: "MetaMat",
  },
  {
    image: "images/collection/MetaMike.png",
    name: "MetaMike",
  },
  {
    image: "images/collection/SlumDoge.png ",
    name: "SlumDoge",
  },
  {
    image: "images/collection/SolidTea.png ",
    name: "SolidTea",
  },
];

class KingdomMap extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      img: "images/map/DefaultMap.png",
      areaName: "LORE  AND FACTION INFORMATION",
      text: "This is our map of the Meta Kingdom. This map will provide utility and interaction for our holders with time in future phases. We plan on adding a Control and Conquer style system where holders can take over land and claim the territory based on your Meta Knights faction. Owning certain territories will reap certain rewards and benefits.",
    };
    this.handleMouseOver = this.handleMouseOver.bind(this);
    this.handleMouseOut = this.handleMouseOut.bind(this);
  }

  handleMouseOver(val) {
    if (val === 0) {
      this.setState({
        img: "images/map/SunWardenMap_Hover.png",
        iconImg: "images/map/SunWarden_RedBanner.png",
        areaName: "Sun Warden Alliance",
        text: "Known for their prolific battle techniques. Masters of war, strategy, and armed combat. Rulers of Eastern Meta Kingdom region.",
      });
    } else if (val === 1) {
      this.setState({
        img: "images/map/ShujariMap_Hover.png",
        iconImg: "images/map/Shujari_YellowBanner.png",
        areaName: "Shujari Tribe",
        text: "Known for their intelligence. Master engineers and craftsmen. Mastered the art of traps, gadgets, and mechanical advancements. Rulers of Northern Meta Kingdom region.",
      });
    } else if (val === 2) {
      this.setState({
        img: "images/map/RhinestoneMap_Hover.png",
        iconImg: "images/map/Rhinestone_OrangeBanner.png",
        areaName: "Rhinestone Tribe",
        text: "Known for being master armor smiths and master weapon smiths. A crafty faction that can upgrade their own gear. Rulers of The Meta Kingdom Desert lands located in the central region.",
      });
    } else if (val === 3) {
      this.setState({
        img: "images/map/SerenheartMap_Hover.png",
        iconImg: "images/map/Serenheart_GreenBanner.png",
        areaName: "Serenheart Alliance",
        text: "Fight to protect all living things. Masters of stealth, master hunters, and known for their allegiances with other factions. A passive faction that wants Meta World Peace. Meta Kingdom Wildlands located to the north western region. ",
      });
    } else if (val === 4) {
      this.setState({
        img: "images/map/MoorlockMap_Hover.png",
        iconImg: "images/map/Moorlock_PurpleBanner.png",
        areaName: "Moorlock Covenant",
        text: "Known for being masters of magic (Dark, Elemental, Arcane, and blood magic). Disliked by all the other factions except the Serenheart Alliance. Not passive and they instigate wars for thrill. Rulers of the Exiled Meta Kingdom Plague lands, located in the outskirts of the south western region.",
      });
    } else if (val === 5) {
      this.setState({
        img: "images/map/AshenzureMap_Hover.png",
        iconImg: "images/map/Ashenzure_BlueBanner.png",
        areaName: "Ashenzure Alliance",
        text: "Masters of the seas and ocean battle. Largest fleet of battleships in the Meta Kingdom. An island based faction and rulers of the Great Meta Kingdom Sea Islands located to the south east.",
      });
    } else {
      this.setState({
        img: "images/map/DefaultMap.png",
        areaName: "LORE  AND FACTION INFORMATION",
        iconImg: "images/dot.png",
        text: "This is our map of the Meta Kingdom. This map will provide utility and interaction for our holders with time in future phases. We plan on adding a Control and Conquer style system where holders can take over land and claim the territory based on your Meta Knights faction. Owning certain territories will reap certain rewards and benefits.",
      });
    }
  }

  handleMouseOut() {
    this.setState({
      img: "images/map/DefaultMap.png",
      areaName: "LORE  AND FACTION INFORMATION",
      iconImg: "images/dot.png",
      text: "This is our map of the Meta Kingdom. This map will provide utility and interaction for our holders with time in future phases. We plan on adding a Control and Conquer style system where holders can take over land and claim the territory based on your Meta Knights faction. Owning certain territories will reap certain rewards and benefits.",
    });
  }

  render() {
    return (
      <Box pb={5}>
        <Container maxWidth="lg" className="wow bounceInUp">
          <Box align="center" mb={5} mb={7}>
            <Typography variant="h1" align="center" className="sectionHeader">
              {" "}
              META KINGDOM MAP
            </Typography>
          </Box>
          <Box className="hoveredText">
            <img src={this.state.iconImg} className="mapIcon" />
            <Typography variant="h5">{this.state.areaName} </Typography>
            <Typography variant="body2">{this.state.text} </Typography>
          </Box>
          <Box className="mapImgHolder">
            <Box className="mapImg">
              <img
                src="images/map/DefaultMap.png"
                alt="default map"
                className="mainImg"
              />
              <img src={this.state.img} />

              <Box
                className="mapImg1 mapimglist"
                onMouseOver={() => this.handleMouseOver(0)}
                onMouseOut={this.handleMouseOut}
              >
                {" "}
                <img src={this.state.img} className="mainImg" />
              </Box>

              <Box
                className="mapImg2 mapimglist"
                onMouseOver={() => this.handleMouseOver(1)}
                onMouseOut={this.handleMouseOut}
              ></Box>
              <Box
                className="mapImg3 mapimglist"
                onMouseOver={() => this.handleMouseOver(2)}
                onMouseOut={this.handleMouseOut}
              ></Box>
              <Box
                className="mapImg4 mapimglist"
                onMouseOver={() => this.handleMouseOver(3)}
                onMouseOut={this.handleMouseOut}
              ></Box>
              <Box
                className="mapImg5 mapimglist"
                onMouseOver={() => this.handleMouseOver(4)}
                onMouseOut={this.handleMouseOut}
              ></Box>
              <Box
                className="mapImg6 mapimglist"
                onMouseOver={() => this.handleMouseOver(5)}
                onMouseOut={this.handleMouseOut}
              ></Box>
            </Box>
          </Box>
        </Container>
      </Box>
    );
  }
}
KingdomMap.propTypes = {};

KingdomMap.defaultProps = {};

export default KingdomMap;
