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

  console.log(card);
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
            console.log(itemsPerRow);
            const rowCount = Math.ceil(gravatars.length / itemsPerRow);
            console.log(rowCount);
            const itemData = this.getItemData(itemsPerRow, gravatars);

            console.log(itemData);
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

  console.log(data);
  if (loading || !data) {
    return (
      <div className="App">
        <header className="App-header">Loading</header>
      </div>
    );
  }

  return (
    <div className="App">
      <header className="App-header">
        <CardsGrid gravatars={data.gravatars} />
      </header>
    </div>
  );
};

export default Home;
