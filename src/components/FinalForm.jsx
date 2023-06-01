import React, { useState } from 'react'
import { Form, Field } from 'react-final-form' //-> Importazione moduli dal pacchetto di final form
import "./styles.css"

const FinalForm= () => {

  const[form] = useState([])

  const onSubmit = (values) => { // Effettua l'elaborazione dei dati o invia i dati al server
    console.log(values)
    form.push(values)
    localStorage.setItem("Registrazione", JSON.stringify(form))
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
        <form onSubmit={handleSubmit}>
          <div>
            <Field name="firstName"
              render={({input, meta}) => (
                <div>
                  <label htmlFor='firstName'>Nome:</label>
                  <input type="text" {...input} autoComplete="off" id="firstName" />
                  {meta.touched && meta.error && <span>{meta.error}</span>}
                </div>
              )}            
            />
          </div>

          <div>
            <Field name="lastName"
              render={({input, meta}) => (
                <div>
                  <label htmlFor='lastName'>Cognome:</label>
                  <input type="text" {...input} autoComplete="off" id="lastName" />
                  {meta.touched && meta.error && <span>{meta.error}</span>}
                </div>
              )}            
            />
          </div>

          <div>
            <Field 
              name="email" 
              render={({input, meta}) => (
                <div>
                  <label htmlFor='email'>Email:</label>
                  <input type="email" {...input} autoComplete="off" id="email" />
                  {meta.touched && meta.error && <span>{meta.error}</span>}
                </div>
              )}
            />
          </div>

          <div>
            <Field 
              name="object" 
              render={({input, meta}) => (
                <div>
                  <label htmlFor='oggetto'>Oggetto:</label>
                  <input type="text" autoComplete="off" id="oggetto" {...input} />
                  {meta.touched && meta.error && <span>{meta.error}</span>}
                </div>
              )}
            />
          </div>

          <div>
            <Field 
              name="message" 
              render={({input, meta}) => (
                <div>
                  <label htmlFor='message'>Message:</label>
                  <textarea autoComplete="off" id="message" {...input} />
                  {meta.touched && meta.error && <span>{meta.error}</span>}
                </div>
              )}
            />
          </div>
          <div>
            <button type="submit" disabled={invalid | pristine}>Invia</button>
          </div>
        </form>
      )}
    />
  )
}

export default FinalForm

/**
 * Le prop "validate" e "render" nel componente Form di Final Form sono utilizzate per definire la funzione di validazione del form e per personalizzare il rendering del form:
 * validate è una prop che viene utilizzata per definire la funzione di validazione del form
 * 
 * render è una prop viene utilizzata per definire il layout del form e i componenti da utilizzare per visualizzare e gestire i campi del form
 */

/**
 * input e meta sono oggetti che contengono informazioni e funzionalità essenziali per collegare e gestire correttamente i campi del form all'interno della funzione di rendering del Field:
 * meta è un oggetto contenente informazioni sullo stato del campo del form. Alcune delle proprietà comuni di meta includono touched, error, valid, dirty, ecc.
 * 
 * input è un oggetto contenente diverse proprietà che devono essere passate all'elemento <input> per collegarlo correttamente al campo del form. 
 * Alcune delle proprietà comuni includono name, value, onChange, onBlur, ecc. 
 * L'utilizzo di {...input} nell'elemento <input> permette di passare tutte le proprietà di input come attributi all'elemento <input>, semplificando così il collegamento tra il campo del form e l'input.
 */

/**
 * Le prop "pristine" e "invalid" nel componente render di Form sono utilizzate per abilitare o disabilitare il pulsante di invio del form in base allo stato del form:
 * pristine: Indica se il form è "pulito" o non è stato toccato. Se tutti i campi del form sono rimasti invariati rispetto ai loro valori iniziali, allora pristine sarà true. 
 *           In tal caso, il pulsante di invio verrà disabilitato per impedire l'invio di un form vuoto o non modificato.
 * 
 * invalid: Indica se il form contiene errori di validazione. Se la funzione di validazione (validate) restituisce degli errori per uno o più campi, allora invalid sarà true. 
 *          In tal caso, il pulsante di invio verrà disabilitato per evitare l'invio di un form con errori di validazione.
 * 
 * In combinazione, pristine e invalid vengono utilizzati per determinare se il form è pronto per essere inviato o se ci sono ancora campi da compilare o errori da correggere.
 * 
 * Il pulsante di invio viene disabilitato (disabled={pristine || invalid}) se il form è pulito o contiene errori di validazione.
 * Solo quando il form non è più "pristine" e tutti i campi sono validi, il pulsante di invio viene abilitato.
 */