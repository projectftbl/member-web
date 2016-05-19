import assign from 'lodash/object/assign';
import React from 'react';
import Radium from 'radium';
import Modal from 'react-modal';
import { reduxForm, reset } from 'redux-form';
import { local } from 'redux-react-local';
import { Rss } from '@ftbl/icons';
import Icon, { Icons } from './icon';
import { Form, Input, Button } from '@ftbl/form';
import { Heading } from '@ftbl/component';

const options = { form: 'feed', fields: [ 'link' ] };

const Dialog = reduxForm(options)(({ display, type, title, fields, handleSubmit, onClosed }) => {
  const styles = {
    content: {
      top: '50%'
    , left: '50%'
    , right: 'auto'
    , bottom: 'auto'
    , marginRight: '-50%'
    , transform: 'translate(-50%, -50%)'    
    , padding: '10px 20px 20px 20px'
    , borderRadius: 0
    }
  };

  return (
    <Modal id={type} style={styles} isOpen={display} closeTimeoutMS={150} shouldCloseOnOverlayClick={true} onRequestClose={onClosed}>
      <Form onSubmit={handleSubmit}>
        <Heading>{title}</Heading>
        <Input label='URL' field={fields.link} focus={true} Icon={Icons[type]} />
        <Button label='Connect' onClick={handleSubmit} />
        <Button label='cancel' kind='link' onClick={onClosed} />
      </Form>
    </Modal>
  );
});

export default local({
  ident: 'feed'
, initial: {}
, reducer(state, { me, meta }) { 
    return me ? assign({}, state, { [meta.type]: !state[meta.type] }) : state;
  }
})(({ colour, onConnect, type, title, authorized, state, dispatch, $ }) => {
  const styles = {
    base: {
      position: 'relative'
    , paddingTop: 2
    , cursor: 'pointer'
    }
  };

  const onSubmit = (props) => {
    onConnect(props);
    dispatch($({ type }));
    dispatch(reset('feed'));
  };

  const toggle = e => {
    if (e && e.preventDefault) e.preventDefault();
    dispatch($({ type }));
  };

  return (
    <span style={styles.base}>
      <Icon authorized={authorized} network={type} onConnect={toggle} />
      <Dialog onSubmit={onSubmit} onClosed={toggle} type={type} title={title} display={authorized && state[type]} />
    </span>
  );
});

