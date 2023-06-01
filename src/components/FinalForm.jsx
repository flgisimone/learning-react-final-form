import React, { useState } from 'react'
import { Form, Field } from 'react-final-form' //-> Importazione moduli dal pacchetto di final form
import styles from "./styles.module.scss"

const FinalForm= () => {

  const[form] = useState([])

  const onSubmit = (values) => { // Effettua l'elaborazione dei dati o invia i dati al server
    form.push(values)
    localStorage.setItem("Registrazione", JSON.stringify(form))
    alert("Messaggio inviato!")
  }

  const validate = (values) => {
    const errors = {};

    if (!values.firstName) errors.firstName = 'Campo obbligatorio'
    if (!values.lastName) errors.lastName = 'Campo obbligatorio'

    if (!values.email) {
      errors.email = 'Campo obbligatorio';
    } else if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(values.email)) {
      errors.email = 'Email non valida';
    }

    if (!values.object) {
      errors.object = 'Campo obbligatorio';
    } else if (values.object.length < 5) {
      errors.object = `Oggetto dell'email troppo corto`;
    }

    if (!values.message) {
      errors.message = 'Campo obbligatorio';
    } else if (values.message.length < 1) {
      errors.message = 'Messaggio troppo corto';
    }
  
    return errors;
  };

  return (
    <Form
      onSubmit={onSubmit}
      validate={validate}
      render={({ handleSubmit, pristine, invalid }) => (

        <form onSubmit={handleSubmit} className={styles.form}>
          <img src="https://raw.githubusercontent.com/final-form/react-final-form/334f0015989e15a10f6741b87955c535593f2bde/banner.png" alt="" />
          <Field name="firstName"
            render={({input, meta}) => (
              <div className={styles.firstName}>
                <label htmlFor='firstName'>Nome*</label>
                <input type="text" {...input} autoComplete="off" id="firstName" placeholder='Inserisci il Nome' />
                {meta.touched && meta.error && <span>{meta.error}</span>}
              </div>
            )}            
          />
          <Field name="lastName"
            render={({input, meta}) => (
              <div className={styles.lastName}>
                <label htmlFor='lastName'>Cognome*</label>
                <input type="text" {...input} autoComplete="off" id="lastName" placeholder='Inserisci il Cognome' />
                {meta.touched && meta.error && <span>{meta.error}</span>}
              </div>
            )}            
          />
          <Field 
            name="email" 
            render={({input, meta}) => (
              <div className={styles.email}>
                <label htmlFor='email'>Email*</label>
                <input type="email" {...input} autoComplete="off" id="email" placeholder='Inserisci Email' />
                {meta.touched && meta.error && <span>{meta.error}</span>}
              </div>
            )}
          />
          <Field 
            name="object" 
            render={({input, meta}) => (
              <div className={styles.object}>
                <label htmlFor='oggetto'>Oggetto*</label>
                <input type="text" {...input} autoComplete="off" id="oggetto" placeholder='Inserisci Oggetto Email' />
                {meta.touched && meta.error && <span>{meta.error}</span>}
             </div>
            )}
          />
          <Field 
            name="message" 
            render={({input, meta}) => (
              <div className={styles.message}>
                <label htmlFor='message'>Messaggio*</label>
                <textarea {...input} autoComplete="off" id="message" placeholder='Inserisci messaggio' />
                {meta.touched && meta.error && <span>{meta.error}</span>}
              </div>
            )}
          />
          <button type="submit" disabled={invalid | pristine}>Invia</button>
        </form>
      )}
    />
  )
}

export default FinalForm