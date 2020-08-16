import React, { useState } from 'react';
import { connect } from 'react-redux';
import { FlexGrid, FlexGridItem } from 'baseui/flex-grid';

import rootReducer from '../../../../../store/reducers';
import { instance } from '../../../../../store/dashboard/types';

import { Instances } from './components/Instances';
import Reports from './components/Reports';

interface VisualizationType {
  instances: instance[];
}

const Visualization: React.FC<VisualizationType> = ({ instances }) => {
  const [selectedInstance, updateSelectedInstance] = useState<string>('');

  return (
    <>
      <FlexGrid flexGridColumnCount={2} flexGridColumnGap="scale1000" marginTop="scale800">
        <FlexGridItem>
          <Instances
            selectedInstance={selectedInstance}
            instances={instances}
            selectInstance={updateSelectedInstance}
          />
        </FlexGridItem>
        <FlexGridItem>
          <Reports selectedInstance={selectedInstance} />
        </FlexGridItem>
      </FlexGrid>
    </>
  );
};

const mapStateToProps = (state: ReturnType<typeof rootReducer>) => ({
  instances: state.DashboardReducer.instances,
});

export default connect(mapStateToProps)(Visualization);
