import React from 'react';
import { useStyletron } from 'baseui';
import { Button, KIND, SIZE, SHAPE } from 'baseui/button';
import DeleteIcon from 'baseui/icon/delete-alt';
import EyeIcon from 'baseui/icon/show';
import { ListItem, ListItemLabel } from 'baseui/list';

import { instance } from '../../../../../../store/dashboard/types';

interface InstancesType {
  instances: instance[];
  selectedInstance: string;
  selectInstance(instanceId: string): void;
}

const Instances: React.FC<InstancesType> = ({ instances, selectedInstance, selectInstance }) => {
  const [, theme] = useStyletron();

  return (
    <ul>
      {instances.map((instance) => (
        <ListItem
          key={instance.unique_id}
          overrides={{
            Content: {
              style: {
                background: selectedInstance === instance.unique_id ? '#F6F6F6' : '',
                padding: `0 ${theme.sizing.scale1000}`,
                transition: '0.5s',
              },
            },
          }}
          endEnhancer={() => (
            <>
              <Button
                kind={KIND.secondary}
                size={SIZE.mini}
                shape={SHAPE.pill}
                endEnhancer={() => <DeleteIcon />}
              >
                Delete
              </Button>
              <div style={{ width: '18px' }} />
              <Button
                kind={KIND.secondary}
                size={SIZE.mini}
                shape={SHAPE.pill}
                onClick={() => selectInstance(instance.unique_id)}
              >
                <EyeIcon />
              </Button>
            </>
          )}
        >
          <ListItemLabel>{instance.url}</ListItemLabel>
        </ListItem>
      ))}
    </ul>
  );
};

export { Instances };
