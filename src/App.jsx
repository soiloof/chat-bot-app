import React, { useState } from 'react';
import defaultDataset from './dataset';
import './assets/styles/style.css';

function App() {
  const [answers, setAnswers] = useState([]);
  const [chats, setChats] = useState([]);
  const [currentId, setCurrentId] = useState("init");
  const [dateset, setDateSet] = useState(defaultDataset);
  const [open, setOpen] = useState(false);
  return (
    <section className='c-section'>
      <div className="c-box">
        {currentId}
      </div>
    </section>
  );
}

export default App;
