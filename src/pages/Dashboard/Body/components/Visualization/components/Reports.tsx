import React, { useCallback, useEffect, useState } from 'react';
import { connect } from 'react-redux';
import { Table } from 'baseui/table';
import { Tag, KIND } from 'baseui/tag';
import { Label4 } from 'baseui/typography';

import { formatDate } from '../../../../../../utils';

import rootReducer from '../../../../../../store/reducers';
import { reports } from '../../../../../../store/dashboard/types';

interface ReportsType {
  selectedInstance: string;
  reports: reports;
}

const COLUMNS = ['status', 'Report time'];

const Status: React.FC<{ status: number }> = ({ status }) => {
  if (status === 200) {
    return (
      <Tag closeable={false} kind={KIND.positive}>
        {status}
      </Tag>
    );
  }

  if (status === 400 || status === 500) {
    return (
      <Tag closeable={false} kind={KIND.negative}>
        {status}
      </Tag>
    );
  }

  return (
    <Tag closeable={false} kind={KIND.warning}>
      {status}
    </Tag>
  );
};

const Reports: React.FC<ReportsType> = ({ selectedInstance, reports }) => {
  const generateTableData = useCallback((): Array<[React.ReactNode, string]> => {
    if (selectedInstance && reports[selectedInstance]) {
      return reports[selectedInstance].map((report) => [
        <Status key={report.reported_at.toString()} status={report.status} />,
        formatDate(report.reported_at.toString()),
      ]);
    }
    return [];
  }, [selectedInstance, reports]);

  const [tableData, updateTabledata] = useState(generateTableData());

  useEffect(() => {
    updateTabledata(generateTableData());
  }, [selectedInstance, reports]);

  return (
    <>
      {selectedInstance ? (
        <Table columns={COLUMNS} data={tableData} />
      ) : (
        <Label4>Select instance.</Label4>
      )}
    </>
  );
};

const mapStateToProps = (state: ReturnType<typeof rootReducer>) => ({
  reports: state.DashboardReducer.reports,
});

export default connect(mapStateToProps)(Reports);
