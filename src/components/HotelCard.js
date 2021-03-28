import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import Card from "@material-ui/core/Card";
import CardActionArea from "@material-ui/core/CardActionArea";
import CardActions from "@material-ui/core/CardActions";
import CardContent from "@material-ui/core/CardContent";
import CardMedia from "@material-ui/core/CardMedia";
import Box from "@material-ui/core/Box";
import Avatar from "@material-ui/core/Avatar";
import Typography from "@material-ui/core/Typography";

import { useHistory } from "react-router";

const useStyles = makeStyles({
    root: {
        maxWidth: 500,
        margin: 10,
    },
    media: {
        height: 240,
    },
    cardActions: {
        display: "flex",
        margin: "0 10px",
        justifyContent: "space-between",
    },
    author: {
        display: "flex",
    },
    summaryBox: {
        minHeight: 150,
    },
    roomClicked: {
        display: "none",
    }
});

export default function HotelCard(props) {
    const classes = useStyles();
    const history = useHistory();

    const handleClick = (hotel) => {
        history.push({
            pathname: '/hotel',
            hotel: hotel,
        });
    }

    return (
        <Card className={classes.root} onClick={() => handleClick(props.room)} >
            <CardActionArea>
                <CardMedia
                    className={classes.media}
                    image={props.room.roomBanner}
                    title={props.room.roomType}
                />
                <CardContent>
                    <Typography gutterBottom variant="h5" component="h2">
                        {props.room.roomType}
                    </Typography>
                    <Typography variant="body2" color="textSecondary" component="p" className={classes.summaryBox}>
                        {props.room.summary}
                    </Typography>
                </CardContent>
            </CardActionArea>
            <CardActions className={classes.cardActions}>
                <Box className={classes.author}>
                    <Avatar src="https://images.unsplash.com/photo-1494790108377-be9c29b29330?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=2734&q=80" />
                    <Box ml={2}>
                        <Typography variant="subtitle2" component="p">
                            Owner
            </Typography>
                        <Typography variant="subtitle2" color="textSecondary" component="p">
                            May 14, 2020
            </Typography>
                    </Box>
                </Box>
                <Box></Box>
            </CardActions>
        </Card>
    );
}
