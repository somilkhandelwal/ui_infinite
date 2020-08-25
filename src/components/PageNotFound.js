import React from 'react';
import { makeStyles, Container } from '@material-ui/core';


const useStyles = makeStyles((theme) => ({
    root: {
        marginTop: theme.spacing(8),
        height: 'calc(100vh - 68px)',
        justifyContent: "center",
        display: "flex"
    }
}));

const PageNotFound = () => {
    const classes = useStyles();
    return (
        <Container className={classes.root} >
            <h1>
                Page Not Found
            </h1>
        </Container>
    )
}

export default PageNotFound;