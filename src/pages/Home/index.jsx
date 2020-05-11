import React, { PureComponent, memo } from 'react';
import memoize from 'memoize-one';
import AutoSizer from 'react-virtualized-auto-sizer';
import { FixedSizeGrid as Grid, areEqual } from 'react-window';
import { useSubscription } from '@apollo/react-hooks';
import gravatarsSubscription from 'core/graphql/gravatarsSubscription';
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

const Home = () => {
  const { data, loading } = useSubscription(gravatarsSubscription);

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

  return (
    <div className="card">
      <div className="card-header">
        <div className="utils__title">
          <strong>Gravatars</strong>
        </div>
      </div>
      <div className="card-body">
        <CardsGrid gravatars={data.gravatars} />
      </div>
    </div>
  );
};

export default Home;
