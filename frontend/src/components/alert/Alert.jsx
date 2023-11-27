import React from 'react';
import { Alert } from 'react-bootstrap';
import { useAlert } from '../../contexts/alertContext';
import transformAlert from '../../utils/transformAlert';
import { CheckCircleFill, ExclamationTriangleFill } from 'react-bootstrap-icons';

const GlobalAlert = () => {
  const { alert, clearAlert } = useAlert();
  
  if (!alert) return null;

  const [ message, variant ] = transformAlert(alert);

  return (
    <Alert variant={variant} onClose={clearAlert} dismissible className='fade show mt-3 mb-3 position-absolute'>
      {variant == 'danger' ? (<ExclamationTriangleFill className='me-2'/>) : (<CheckCircleFill className='me-2'/>)}
      {message}
    </Alert>
  );
};

export default GlobalAlert;