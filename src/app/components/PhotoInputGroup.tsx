import * as React from 'react';
import { ControlLabel, FormControl, FormGroup } from 'react-bootstrap';

export default function PhotoInputGroup({controlId = 'photoInputGroup', handlePhotoChange, label}: {controlId?: string, handlePhotoChange: Function, label: string}) {
  return (<FormGroup controlId={controlId} dir='rtl'>
    <ControlLabel>{label}</ControlLabel>
    <FormControl accept='image/*' onChange={handlePhotoChange} placeholder={label} type='file' />
  </FormGroup>);
}
