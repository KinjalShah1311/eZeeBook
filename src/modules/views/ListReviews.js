import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import Box from "@material-ui/core/Box";
import Typography from "@material-ui/core/Typography";
import Rating from '@material-ui/lab/Rating';

import { useHistory } from "react-router";

const useStyles = makeStyles({
    author: {
        display: "flex",
    },
    info: {
        display: "flex",
        justifyContent: "space-between"
    },
    badgeText: {
        fontSize: "0.75rem",
        color: "white",
        backgroundColor: "purple",
        padding: "7px",
        borderRadius: "10px",
    }
});

export default function ListReviews(props) {
    const classes = useStyles();
    const milliseconds = +props.postedOn;
    let dateObject = new Date(milliseconds);
    var dd = String(dateObject.getDate()).padStart(2, '0');
    var mm = String(dateObject.getMonth() + 1).padStart(2, '0'); //January is 0!
    var yyyy = dateObject.getFullYear();
    dateObject = mm + '/' + dd + '/' + yyyy;
    return (
        <Box className={classes.author} ml={2} padding="15px">
            <Rating name="read-only" value={props.rating} readOnly />
            <Box ml={2} width="90%">
                <Box className={classes.info}>
                    <Typography variant="subtitle2" component="p">
                        {dateObject}
                    </Typography>
                    <Typography variant="subtitle2" component="p" className={classes.badgeText}>
                        {props.qualitativeBadgeText}
                    </Typography>
                </Box>
                <Typography variant="subtitle2" color="textSecondary" component="p">
                    {props.summary}
                </Typography>
            </Box>
        </Box>
    );
}
