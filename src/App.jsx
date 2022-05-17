import React, {useState, useEffect, useCallback} from 'react';
import './assets/styles/style.css';
import { Answers, Chats } from './components';
import FormDialog from './components/forms/FormDialog';
import { collection, getDocs } from "firebase/firestore";
import {db} from "./firebase";

const App = () => {
  const [answers, setAnswers] =useState([]);
  const [chats, setChats] =useState([]);
  const [currentId, setCurrentId] =useState("init");
  const [open, setOpen] =useState(false);
  const [dataset, setDataset] =useState({});
  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = useCallback(() => {
      setOpen(false);
  },[setOpen]);

  const addChats = (chat) => {
    setChats(prevChats => {
      return [...prevChats, chat]
    })
  }
  const displayNextQuestion = (nextQuestionId, nextDataset) => {
    addChats({
      text: nextDataset.question,
      type: 'question'
    });
    setAnswers(nextDataset.question);
    setCurrentId(nextQuestionId);
  }

  const selectAnswer = (selectedAnswer, nextQuestionId) => {
    switch(true) {
      case (/^https:*/.test(nextQuestionId)):
        const a = document.createElement('a');
        a.href = nextQuestionId;
        a.target = '_blank';
        a.click();
        break;
      case (nextQuestionId === 'contact'):
        handleClickOpen();
        break;
      default:
        addChats({
          text: selectedAnswer,
          type: "answer"
        });
        setTimeout(() => displayNextQuestion(nextQuestionId, dataset[nextQuestionId]), 500)
        break;
    }
  }
  useEffect(() => {
    (async() => {
      const initDataset = {};
      await getDocs(collection(db, "questions")).then(snapshots => {
        snapshots.forEach(doc => {
          initDataset[doc.id] = doc.data()
        })
      });

      setDataset(initDataset);
      displayNextQuestion(currentId, initDataset[currentId])
    })();
  }, []);

  useEffect(() => {
    const scrollArea = document.getElementById('scroll-area')
    if (scrollArea) {
      scrollArea.scrollTop = scrollArea.scrollHeight;
    }
  });

  return (
    <section className="c-section">
      <div className="c-box">
        <Chats chats={chats}/>
        <Answers answers={answers} select={selectAnswer}/>
        <FormDialog open={open} handleClose={handleClose}/>
      </div>
    </section>
  );
}
export default App;
