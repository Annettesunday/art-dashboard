import React from 'react';
import uuidv4 from 'uuid/v4';
import PropTypes from 'prop-types';
import { Table } from 'semantic-ui-react';
import TableRow from '../../TableRowComponent';

export const formatDataKeys = (data, entity) => {
  if (entity !== 'users') {
    return data;
  }

  return {
    ...data,
    assets_assigned: data.allocated_asset_count
  };
};

const TableContent = ({ data, headings, urlEntity = '', showAction = false, onClick }) => (
  <Table.Body>
    {data.map((info) => {
      const viewUrl = urlEntity ? `${urlEntity}/${info.id}/view` : '';
      return (
        <TableRow
          key={uuidv4()}
          viewDetailsRoute={viewUrl}
          headings={headings}
          data={formatDataKeys(info, urlEntity)}
          data-test="table-row"
          showAction={showAction}
          onClick={onClick}
          id={info.id}
        />
      );
    })}
  </Table.Body>
);

TableContent.propTypes = {
  data: PropTypes.array,
  headings: PropTypes.arrayOf(PropTypes.string),
  urlEntity: PropTypes.string,
  showAction: PropTypes.bool,
  onClick: PropTypes.func
};

TableContent.defaultProps = {
  onClick: () => {}
};

export default TableContent;
