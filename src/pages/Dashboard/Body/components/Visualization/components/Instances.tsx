/* eslint-disable no-extra-boolean-cast */
import React, { useState, Dispatch } from 'react';
import { Button, KIND, SIZE, SHAPE } from 'baseui/button';
import DeleteIcon from 'baseui/icon/delete-alt';
import EyeIcon from 'baseui/icon/show';
import { ListItem, ListItemLabel } from 'baseui/list';
import { Skeleton } from 'baseui/skeleton';

import { removeDashboardInstance } from '../../../../../../store/actions';
import { REMOVE_DASHBOARD_INSTANCE } from '../../../../../../store/actionTypes';

import { UptimeLoader } from '../../../../../../utils';
import { removeInstanceAPI } from '../../../../../../api';

import { instance } from '../../../../../../store/dashboard/types';
import { connect } from 'react-redux';

interface InstancesType {
  instances: instance[];
  selectedInstance: string;
  selectInstance(instanceId: string): void;
  removeInstance(instanceId: string): void;
}

const Instances: React.FC<InstancesType> = ({
  instances,
  selectedInstance,
  selectInstance,
  removeInstance,
}) => {
  const [removeInstanceLoading, updateRemoveInstanceLoading] = useState({
    isLoading: false,
    instanceId: '',
  });

  const handleRemoveInstance = async (instanceId: string) => {
    if (removeInstanceLoading.isLoading) return;
    updateRemoveInstanceLoading({ isLoading: true, instanceId });

    const removed = await removeInstanceAPI(instanceId);
    if (removed) {
      removeInstance(instanceId);
    }
    updateRemoveInstanceLoading({ isLoading: false, instanceId: '' });
  };

  return (
    <ul style={{ padding: 0, maxWidth: '100%' }}>
      {!!instances.length ? (
        instances.map((instance) => (
          <ListItem
            key={instance.unique_id}
            overrides={{
              Content: {
                style: {
                  background: selectedInstance === instance.unique_id ? '#F6F6F6' : '',
                  padding: `0 20px`,
                  transition: '0.5s',
                  position: 'relative',
                  marginLeft: 0,
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
                  onClick={() => handleRemoveInstance(instance.unique_id)}
                >
                  Delete
                </Button>
                <div style={{ width: '10px' }} />
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
            <ListItemLabel>
              {removeInstanceLoading.isLoading &&
              removeInstanceLoading.instanceId === instance.unique_id ? (
                <UptimeLoader size={30} />
              ) : (
                <> {instance.url}</>
              )}
            </ListItemLabel>
          </ListItem>
        ))
      ) : (
        <Skeleton
          rows={5}
          overrides={{
            Row: {
              style: {
                height: '40px',
                marginBottom: '20px',
              },
            },
          }}
        />
      )}
    </ul>
  );
};

const mapDispatchToProps = (dispatch: Dispatch<REMOVE_DASHBOARD_INSTANCE>) => ({
  removeInstance: (instanceId: string) => dispatch(removeDashboardInstance(instanceId)),
});

export default connect(null, mapDispatchToProps)(Instances);
