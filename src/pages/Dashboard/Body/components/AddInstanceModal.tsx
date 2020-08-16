import React, { useState, Dispatch } from 'react';
import { useStyletron } from 'baseui';
import { KIND } from 'baseui/button';
import { FormControl } from 'baseui/form-control';
import { Input } from 'baseui/input';
import { Modal, ModalHeader, ModalBody, ModalFooter, ModalButton } from 'baseui/modal';
import { Slider } from 'baseui/slider';
import { Label4, Paragraph4 } from 'baseui/typography';
import { connect } from 'react-redux';

import * as actions from '../../../../store/actions';
import * as actionTypes from '../../../../store/actionTypes';
import rootReducer from '../../../../store/reducers';

import { hoursToNanoseconds } from '../../../../utils';
import { addInstanceAPI } from '../../../../api';

interface AddInstanceModalType {
  isOpen: boolean;
  email: string | undefined;
  toggle(): void;
  addInstance(url: string, durationInNanoseconds: number, unique_id: string): void;
}

const MIN_HOUR = 1;
const MAX_HOUR = 24;
const STEP = 0.5;

const plural = (num: number): string => (num > 1 ? 's' : '');

const AddInstanceModal: React.FC<AddInstanceModalType> = ({
  addInstance,
  email,
  isOpen,
  toggle,
}) => {
  const [url, updateUrl] = useState('');
  const [durationInHour, updateDurationInHour] = useState([MIN_HOUR]);

  const [warning, updateWarning] = useState('');
  const [createInstanceLoading, updateCreateInstanceLoading] = useState(false);

  const [css, theme] = useStyletron();

  const handleAddInstance = async () => {
    if (createInstanceLoading) return;
    updateCreateInstanceLoading(true);
    // validate url
    if (!url) {
      updateWarning('Provide valid url.');
      updateCreateInstanceLoading(false);
      return;
    }

    // hour to nanoseconds
    const durationInNanoseconds = hoursToNanoseconds(durationInHour[0]);

    const addInstanceInAPI = await addInstanceAPI(url, durationInNanoseconds);
    if (addInstanceInAPI.error || !addInstanceInAPI.data) {
      updateWarning(
        addInstanceInAPI.data ? addInstanceInAPI.data : 'Error adding instance. Please try again.',
      );
      updateCreateInstanceLoading(false);
      return;
    }

    addInstance(url, durationInNanoseconds, addInstanceInAPI.data);
    updateUrl('');
    updateDurationInHour([MIN_HOUR]);
    toggle();
  };

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
        {!!warning && <Paragraph4>{warning}</Paragraph4>}
        <Label4>
          You will be notified at <u>{email}</u>
        </Label4>
      </ModalBody>
      <ModalFooter>
        <ModalButton kind={KIND.tertiary} onClick={toggle}>
          Close
        </ModalButton>
        <ModalButton isLoading={createInstanceLoading} onClick={handleAddInstance}>
          Create
        </ModalButton>
      </ModalFooter>
    </Modal>
  );
};

const mapDispatchToProps = (dispatch: Dispatch<actionTypes.ADD_DASHBOARD_INSTANCE>) => ({
  addInstance: (url: string, durationInNanoseconds: number, unique_id: string) =>
    dispatch(
      actions.addDashboardInstance({
        url,
        duration: durationInNanoseconds,
        unique_id,
      }),
    ),
});

const mapStateToProps = (state: ReturnType<typeof rootReducer>) => ({
  email: state.AuthReducer.userData ? state.AuthReducer.userData.email : undefined,
});

export default connect(mapStateToProps, mapDispatchToProps)(AddInstanceModal);
