import React, { useCallback, useEffect, useState, Dispatch } from 'react';
import { connect } from 'react-redux';
import { Button, KIND } from 'baseui/button';
import { Table } from 'baseui/table';
import { Tag, KIND as TagKind } from 'baseui/tag';
import { Label4 } from 'baseui/typography';

import { getReportsAPI } from '../../../../../../api';
import { formatDate, UptimeLoader } from '../../../../../../utils';

import rootReducer from '../../../../../../store/reducers';
import { setDashboardReports } from '../../../../../../store/actions';
import { SET_DASHBOARD_INSTANCE_REPORTS } from '../../../../../../store/actionTypes';
import { reports } from '../../../../../../store/dashboard/types';

interface ReportsType {
  selectedInstance: string;
  reports: reports;
  setReports(rp: reports): void;
}

const COLUMNS = ['status', 'Report time'];

const Status: React.FC<{ status: number }> = ({ status }) => {
  if (status === 200) {
    return (
      <Tag closeable={false} kind={TagKind.positive}>
        {status}
      </Tag>
    );
  }

  if (status === 400 || status === 500) {
    return (
      <Tag closeable={false} kind={TagKind.negative}>
        {status}
      </Tag>
    );
  }

  return (
    <Tag closeable={false} kind={TagKind.warning}>
      {status}
    </Tag>
  );
};

const Reports: React.FC<ReportsType> = ({ selectedInstance, reports, setReports }) => {
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

  const [refreshReportsLoading, updateRefreshReportsLoading] = useState(false);
  const refreshReports = async () => {
    updateRefreshReportsLoading(true);
    const updated = await getReportsAPI();
    if (updated) {
      setReports(updated);
    }
    updateRefreshReportsLoading(false);
  };

  return (
    <div style={{ position: 'relative' }}>
      <Button
        kind={KIND.secondary}
        onClick={refreshReports}
        overrides={{
          BaseButton: {
            style: {
              marginBottom: '20px',
            },
          },
        }}
      >
        Refresh
      </Button>
      {refreshReportsLoading ? (
        <UptimeLoader size={30} />
      ) : selectedInstance ? (
        <Table columns={COLUMNS} data={tableData} />
      ) : (
        <Label4>Select instance.</Label4>
      )}
    </div>
  );
};

const mapStateToProps = (state: ReturnType<typeof rootReducer>) => ({
  reports: state.DashboardReducer.reports,
});

const mapDispatchToProps = (dispatch: Dispatch<SET_DASHBOARD_INSTANCE_REPORTS>) => ({
  setReports: (reports: reports) => dispatch(setDashboardReports(reports)),
});

export default connect(mapStateToProps, mapDispatchToProps)(Reports);
