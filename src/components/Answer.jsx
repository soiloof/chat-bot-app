import React from 'react'
import { makeStyles } from '@mui/styles';
import Button from '@mui/material/Button';

const useStyles = makeStyles({
  answerButton: {
    borderColor: "#FFB549 !important",
    color: '#FFB549 !important',
    fontWeight: "600 !important",
    marginBottom: '8px !important',
    "&:hover": {
      backgroundColor: '#FFB549 !important',
      color: "#fff !important"
    }
  },
});

const Answer = (props) => {
  const classes = useStyles();
  return (
    <Button
        className={classes.answerButton}
        variant="outlined"
        onClick={() => props.select(props.content, props.nextId)}
    >
      {props.content}
    </Button>
  )
}

export default Answer