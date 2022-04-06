import React from 'react'
import ListItem from '@mui/material/ListItem';
import ListItemAvatar from '@mui/material/ListItemAvatar';
import Avatar from '@mui/material/Avatar';
import NoProfile from '../assets/img/user.jpeg'
import ChatbotImage from '../assets/img/mawile_cute.jpeg'

const Chat = (props) => {
    const {type, text} = props;
    const isQuestion = (type === 'question');
    const classes = isQuestion ? 'p-chat__row' : 'p-chat__reverse';
  return (
      <>
        <ListItem className={classes}>
            <ListItemAvatar>
                {isQuestion ? (
                    <Avatar alt='icon' src={ChatbotImage} />
                ): (
                    <Avatar alt='icon' src={NoProfile} />
                )}
            </ListItemAvatar>
            <div className="p-chat__bubble">
                {text}
            </div>
        </ListItem>
    </>
  )
}

export default Chat