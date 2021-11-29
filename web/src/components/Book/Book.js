import React, { useState, useEffect } from 'react';
import StripeContainer from '../StripeContainer/StripeContainer';
import classes from './Book.module.css';

function Booking(props) {
  const [showItem, setShowItem] = useState();
  const [type, setType] = useState(20);
  const [length, setLength] = useState(1);
  const [amount, setAmount] = useState(20);
  const [email, setEmail] = useState('');

  useEffect(() => {
    changeAmount();
  });

  function changeType(e) {
    setType(e.target.value);
  }

  function changeLength(e) {
    setLength(e.target.value);
  }

  function changeAmount() {
    setAmount(length * type);
  }

  function handleClick() {
    setShowItem(!showItem);
  }

  function updateEmail(e) {
    setEmail(e.target.value);
  }

  return (
    <section className={classes.layout}>
      <h1 className={classes.title}>Book a Session</h1>
      <div id='book' className={classes.inputs}>
        <label htmlFor='type'>Session Type</label>
        <select onChange={changeType} name='type' id='type'>
          <option value='20'>One-on-one</option>
          <option value='100'>Group Session</option>
        </select>
        <label htmlFor='length'>Session Length</label>
        <select onChange={changeLength} name='' id=''>
          <option value='1'>1 hour</option>
          <option value='2'>2 hours</option>
          <option value='3'>3 hours</option>
        </select>

        <label htmlFor='email'>Email</label>
        <input onChange={updateEmail} type='email' id='email' />
        <button onClick={handleClick}>Book</button>
      </div>

      <div>
        {showItem ? <StripeContainer amount={amount} email={email} /> : <p></p>}
      </div>
    </section>
  );
}

export default Booking;
