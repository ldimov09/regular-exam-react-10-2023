import React from 'react';
import { Alert } from 'react-bootstrap';
import { useAlert } from '../../contexts/alertContext';
import transformAlert from '../../utils/transformAlert';

const GlobalAlert = () => {
  const { alert, clearAlert } = useAlert();
  
  if (!alert) return null;

  const [ message, variant ] = transformAlert(alert);

  return (
    <Alert variant={variant} onClose={clearAlert} dismissible>
      {message}
    </Alert>
  );
};

export default GlobalAlert;