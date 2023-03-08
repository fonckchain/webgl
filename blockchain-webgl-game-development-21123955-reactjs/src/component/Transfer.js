import React from "react";
import {
    Box,
    makeStyles,
    Link,
    Typography,
} from "@material-ui/core";
// import { Link } from "react-router-dom";
const useStyles = makeStyles((theme) => ({
    gallryBox: {
        '& figure': {
            width: "100%",
            height: "300px",
            display: "flex",
            overflow: "hidden",
            justifyContent: "center",
            position: "relative",
            backgroundColor: "#272a30",
            borderRadius: "50px",
            [theme.breakpoints.down("xs")]: {
                height: "auto",
            },
            "&:hover": {
                '& img': {
                    transform: "rotate(5deg)",
                },
            },
            '& img': {
                transition: "05s",
                width: "auto",
                maxWidth: "100%",
                maxHeight: "300px",
                [theme.breakpoints.down("xs")]: {
                    maxHeight: "auto",
                    width: "100%",
                },
            },
            '& div': {
                position: "absolute",
                left: 0,
                top: "0",
                boxShadow: "rgba(0, 0, 0, 0.35) 0px 5px 15px",
                background: "linear-gradient( 179.94deg, rgba(196, 196, 196, 0) 0.06%, rgba(255, 255, 255, 0) 0.07%, rgb(0 0 0 / 21%) 82.78%)",
                width: "100%",
                height: "100%",
                '& p': {
                    width: "100%",
                    height: "100%",
                    display: "flex",
                    justifyContent: "flex-start",
                    alignItems: "flex-end",
                },
                '& h6': {
                    color: "#fff",
                    fontWeight: "700",
                    paddingLeft: "20px",
                    paddingRight: "20px",
                    marginBottom: "20px",
                },
            },
        },
    },
}));

export default function UsersCard(props) {
    const classes = useStyles();
    const { data } = props;
    return (
        <Box className={classes.gallryBox}>
            <Link href={data.url} >
                <figure><img src={data.image} alt="" />
                    <Box>
                        <Typography>
                            <Typography variant="h6">{data.name}</Typography>
                        </Typography>
                    </Box>
                </figure>
            </Link>
        </Box>
    );
}
