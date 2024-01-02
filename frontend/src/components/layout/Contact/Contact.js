// Contact.js
import { useState, useRef, Fragment } from 'react';
import { motion } from 'framer-motion';
import emailjs from '@emailjs/browser';
import SectionWrapper from '../hoc/SectionWrapper';
import { slideIn } from '../utils/motion';
import send from '../../../images/send.png';
import sendHover from '../../../images/sendHover.png';
import React, { useEffect } from 'react';
import './Contact.css';

const Contact = () => {
  useEffect(() => {
    // Widget initialization code here (if required)
  }, []);

  const formRef = useRef();
  const [form, setForm] = useState({
    name: '',
    email: '',
    message: '',
  });
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm({ ...form, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setLoading(true);

    // Your emailjs code here

    // Reset form and loading state after submission
    emailjs.send(
    'service_po9cbo8', // paste your ServiceID here (you'll get one when your service is created).
    'template_vu842kj', // paste your TemplateID here (you'll find it under email templates).
    {
      from_name: form.name,
      to_name: 'Prem Kansagra', // put your name here.
      from_email: form.email,
      to_email: 'prem.kansagra1234@gmail.com', //put your email here.
      message: form.message,
    },
    '4nn9vaVYg9qqQwfZf' //paste your Public Key here. You'll get it in your profile section.
  ).then(
      () => {
        setLoading(false);
        alert('Thank you. We will get back to you as soon as possible.');

        setForm({
          name: '',
          email: '',
          message: '',
        });
      },
      (error) => {
        setLoading(false);
        console.log(error);
        alert('Something went wrong. Please try again.');
      }
    );
  };

  return (
    // Updated Fragment JSX
<Fragment>
  <div className="Containerabc">
    <motion.div
      variants={slideIn('left', 'tween', 0.2, 1)}
      className="Box">
      <p className="sectionSubText">Get in touch</p>
      <h3 className="sectionHeadTextLight" style={{ color: '#6194fb' }}>
        Contact Me.
      </h3>

      <form ref={formRef} onSubmit={handleSubmit} className="formContainer">
        <label className="form-label">
          <span className="form-text">Your Name</span>
          <input
            type="text"
            name="name"
            value={form.name}
            onChange={handleChange}
            placeholder="What's your name ?"
            className="form-input"
          />
        </label>
        <label className="form-label">
          <span className="form-text">Your Email</span>
          <input
            type="email"
            name="email"
            value={form.email}
            onChange={handleChange}
            placeholder="What's your email ?"
            className="form-input"
          />
        </label>
        <label className="form-label">
          <span className="form-text">Your Message</span>
          <textarea
            rows="7"
            name="message"
            value={form.message}
            onChange={handleChange}
            placeholder="What's your message ?"
            className="form-textarea"
          />
        </label>

        <button
          type="submit"
          className="submitButton"
          onMouseOver={() => {
            document.querySelector('.contact-btn').setAttribute('src', sendHover);
          }}
          onMouseOut={() => {
            document.querySelector('.contact-btn').setAttribute('src', send);
          }}
        >
          {loading ? 'Sending' : 'Send'}
          <img src={send} alt="send" className="contact-btn" />
        </button>
      </form>
    </motion.div>
  </div>
</Fragment>

  );
}

export default SectionWrapper(Contact, 'contact');