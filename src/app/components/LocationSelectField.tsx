import * as React from 'react';
import {ControlLabel, FormControl, FormGroup} from 'react-bootstrap';

import t from '../translate';

export default function LocationSelectField({onChange, value}: {onChange: Function, value: string}) {
  return (
    <FormGroup controlId='locationSelectField' dir='rtl'>
      <ControlLabel>الموقع</ControlLabel>
      <FormControl componentClass='select' value={value} onChange={onChange}>
        <option value='riyadh'>{t('riyadh')}</option>
        <option value='makkah'>{t('makkah')}</option>
        <option value='other'>{t('other')}</option>
      </FormControl>
    </FormGroup>
  );
}
