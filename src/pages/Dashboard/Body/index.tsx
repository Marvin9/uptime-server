import React, { useState } from 'react';
import { Button, KIND } from 'baseui/button';
import PlusIcon from 'baseui/icon/plus';

import AddInstanceModal from './components/AddInstanceModal';
import Visualize from './components/Visualization';

const Body = () => {
  const [createInstanceModal, updateCreateInstanceModal] = useState(false);

  const toggleCreateInstanceModal = () => updateCreateInstanceModal(!createInstanceModal);

  return (
    <div className="body" style={{ marginTop: 30 }}>
      <Button startEnhancer={PlusIcon} onClick={toggleCreateInstanceModal} kind={KIND.secondary}>
        Create Instance
      </Button>

      <br />
      <br />

      <Visualize />

      <AddInstanceModal isOpen={createInstanceModal} toggle={toggleCreateInstanceModal} />
    </div>
  );
};

export default Body;
