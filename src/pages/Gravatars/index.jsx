import React, { PureComponent, memo } from 'react';
import { Button, Table } from 'antd';
import { connect } from 'react-redux';
import memoize from 'memoize-one';
import AutoSizer from 'react-virtualized-auto-sizer';
import { FixedSizeGrid as Grid, areEqual } from 'react-window';
import { useSubscription } from '@apollo/react-hooks';
import gravatarsSubscription from 'core/graphql/gravatarsSubscription';
import { toggleCreateModal } from 'core/redux/modals/actions';
import utils from 'utils';
import GravatarCard from './GravatarCard';
import styles from './style.module.scss';

const CARD_WIDTH = 400;
const CARD_HEIGHT = 400;

const Cell = memo(({ columnIndex, rowIndex, style, data }) => {
  const { itemsPerRow, gravatars } = data;
  const singleColumnIndex = columnIndex + rowIndex * itemsPerRow;
  const card = gravatars[singleColumnIndex];

  return (
    <div style={style}>
      {card && (
        <div
          key={card.id}
          style={{
            width: '350px',
            display: 'inline-block',
          }}
        >
          <GravatarCard card={card} />
        </div>
      )}
    </div>
  );
}, areEqual);

class CardsGrid extends PureComponent {
  getItemData = memoize((itemsPerRow, gravatars) => ({
    itemsPerRow,
    gravatars,
  }));

  render() {
    const { gravatars } = this.props;

    return (
      <div
        style={{
          minHeight: '100vh',
          marginTop: '2em',
          position: 'sticky',
          top: '0px',
        }}
      >
        <AutoSizer defaultWidth={1920} defaultHeight={1080}>
          {({ height, width }) => {
            const itemsPerRow = Math.floor(width / CARD_WIDTH);
            const rowCount = Math.ceil(gravatars.length / itemsPerRow);
            const itemData = this.getItemData(itemsPerRow, gravatars);

            return (
              <Grid
                className={styles.grid}
                width={width}
                height={height}
                columnCount={itemsPerRow}
                columnWidth={CARD_WIDTH}
                rowCount={rowCount}
                rowHeight={CARD_HEIGHT}
                itemData={itemData}
              >
                {Cell}
              </Grid>
            );
          }}
        </AutoSizer>
      </div>
    );
  }
}

const Gravatars = (props) => {
  const { data, loading } = useSubscription(gravatarsSubscription);
  const { web3, dispatchToggleCreateModal } = props;
  if (loading || !data) {
    return (
      <div className="card">
        <div className="card-header">
          <div className="utils__title">
            <strong>Gravatars</strong>
          </div>
        </div>
        <div className="card-body">LOADING</div>
      </div>
    );
  }

  let createGravatarButton;

  if (web3) {
    createGravatarButton = (
      <Button type="primary" className={styles.headerButton} onClick={dispatchToggleCreateModal}>
        Create Gravatar
      </Button>
    );
  }

  const tableColumns = [
    {
      title: 'ID',
      dataIndex: 'id',
      defaultSortOrder: 'ascend',
      sorter: (a, b) => a.id - b.id,
    },
    {
      title: 'Display Name',
      dataIndex: 'displayName',
      defaultSortOrder: 'descend',
      sorter: (a, b) => a.displayName.localeCompare(b.displayName),
      sortDirections: ['descend'],
    },
    {
      title: 'Owner',
      dataIndex: 'owner',
    },
  ];
  return (
    <div className="card">
      <div className="card-header">
        <div className="utils__title">
          <strong>Gravatars</strong>
          <div style={{ float: 'right' }}>{createGravatarButton}</div>
        </div>
      </div>
      <div className="card-body">
        <div className="row">
          <div className="col-lg-8">
            <CardsGrid gravatars={data.gravatars} />
          </div>
          <div className="col-lg-4">
            <Table
              style={{
                minHeight: '100vh',
                marginTop: '2em',
                position: 'sticky',
                top: '0px',
              }}
              className="utils__scrollTable"
              columns={tableColumns}
              rowKey="id"
              tableLayout="auto"
              pagination={false}
              dataSource={
                data &&
                data.gravatars.map((gravatar) => ({
                  id: gravatar.id,
                  displayName: gravatar.displayName,
                  owner: utils.getShortAddress(gravatar.owner),
                }))
              }
            />
          </div>
        </div>
      </div>
    </div>
  );
};

const mapStateToProps = (state) => ({
  web3: state.login.web3,
});

const mapDispatchToProps = (dispatch) => ({
  dispatchToggleCreateModal: () => dispatch(toggleCreateModal()),
});

export default connect(mapStateToProps, mapDispatchToProps)(Gravatars);
