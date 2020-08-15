import React, { useState } from 'react';
import { useStyletron } from 'baseui';
import { KIND } from 'baseui/button';
import { FormControl } from 'baseui/form-control';
import { Input } from 'baseui/input';
import { Modal, ModalHeader, ModalBody, ModalFooter, ModalButton } from 'baseui/modal';
import { Slider } from 'baseui/slider';
import { Label4 } from 'baseui/typography';

import rootReducer from '../../../../store/reducers';
import { connect } from 'react-redux';

interface AddInstanceModalType {
  isOpen: boolean;
  toggle(): void;
  email: string | undefined;
}

const MIN_HOUR = 1;
const MAX_HOUR = 24;
const STEP = 0.5;

const plural = (num: number): string => (num > 1 ? 's' : '');

const AddInstanceModal: React.FC<AddInstanceModalType> = ({ email, isOpen, toggle }) => {
  const [url, updateUrl] = useState('');
  const [durationInHour, updateDurationInHour] = useState([MIN_HOUR]);

  const [css, theme] = useStyletron();

  return (
    <Modal isOpen={isOpen} onClose={toggle} closeable autoFocus animate>
      <ModalHeader>Create Instance to monitor server/API.</ModalHeader>
      <ModalBody>
        <FormControl label={() => 'url'}>
          <Input
            value={url}
            onChange={(e) => updateUrl((e.target as HTMLInputElement).value)}
            placeholder="http://httpstat.us/200"
          />
        </FormControl>
        <FormControl label={() => 'interval'}>
          <Slider
            value={durationInHour}
            onChange={(state) => updateDurationInHour(state.value)}
            min={MIN_HOUR}
            max={MAX_HOUR}
            step={STEP}
            overrides={{
              ThumbValue: ({ $value }) => (
                <div
                  className={css({
                    position: 'absolute',
                    top: `-${theme.sizing.scale800}`,
                    ...theme.typography.font200,
                    backgroundColor: 'transparent',
                  })}
                >
                  {$value}Hour{plural($value[0])}
                </div>
              ),
            }}
          />
        </FormControl>
        <Label4>
          You will be notified at <u>{email}</u> every {`${durationInHour[0]}`} Hour
          {plural(durationInHour[0])}
        </Label4>
      </ModalBody>
      <ModalFooter>
        <ModalButton kind={KIND.tertiary} onClick={toggle}>
          Close
        </ModalButton>
        <ModalButton>Create</ModalButton>
      </ModalFooter>
    </Modal>
  );
};

const mapStateToProps = (state: ReturnType<typeof rootReducer>) => ({
  email: state.AuthReducer.userData?.email,
});

export default connect(mapStateToProps)(AddInstanceModal);
