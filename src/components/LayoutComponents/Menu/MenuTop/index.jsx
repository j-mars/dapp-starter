import React, { useEffect, useState } from 'react';
import { connect } from 'react-redux';
import { Menu } from 'antd';
import { Link, withRouter } from 'react-router-dom';
import store from 'store';
import _ from 'lodash';
import styles from './style.module.scss';

const { SubMenu, Divider } = Menu;

const MenuTop = (props) => {
  const [selectedKeys, setSelectedKeys] = useState(store.get('app.menu.selectedKeys') || []);
  const { menuData } = props;

  console.log(menuData);
  const getSelectedKeys = () => {
    const flattenItems = (items, key) =>
      items.reduce((flattenedItems, item) => {
        flattenedItems.push(item);
        if (Array.isArray(item[key])) {
          return flattenedItems.concat(flattenItems(item[key], key));
        }
        return flattenedItems;
      }, []);
    const selectedItem = _.find(flattenItems(menuData, 'children'), [
      'url',
      props.location.pathname,
    ]);
    setSelectedKeys(selectedItem ? [selectedItem.key] : []);
  };

  useEffect(getSelectedKeys(), []);

  const handleClick = (e) => {
    store.set('app.menu.selectedKeys', [e.key]);

    setSelectedKeys([e.key]);
  };

  const generateMenuItems = () => {
    const generateItem = (item) => {
      const { key, title, url, icon } = item;
      if (item.divider) {
        return <Divider key={Math.random()} />;
      }
      if (item.url) {
        return (
          <Menu.Item key={key}>
            {item.target ? (
              <a href={url} target={item.target} rel="noopener noreferrer">
                {icon && <span className={`${icon} ${styles.icon}`} />}
                <span className={styles.title}>{title}</span>
              </a>
            ) : (
              <Link to={url}>
                {icon && <span className={`${icon} ${styles.icon}`} />}
                <span className={styles.title}>{title}</span>
              </Link>
            )}
          </Menu.Item>
        );
      }
      return (
        <Menu.Item key={key}>
          {icon && <span className={`${icon} ${styles.icon}`} />}
          <span className={styles.title}>{title}</span>
        </Menu.Item>
      );
    };
    const generateSubmenu = (items) =>
      items.map((menuItem) => {
        if (menuItem.children) {
          const subMenuTitle = (
            <span className={styles.menu} key={menuItem.key}>
              <span className={styles.title}>{menuItem.title}</span>
              {menuItem.icon && <span className={`${menuItem.icon} ${styles.icon}`} />}
            </span>
          );
          return (
            <SubMenu title={subMenuTitle} key={menuItem.key}>
              {generateSubmenu(menuItem.children)}
            </SubMenu>
          );
        }
        return generateItem(menuItem);
      });
    return menuData.map((menuItem) => {
      if (menuItem.children) {
        const subMenuTitle = (
          <span className={styles.menu} key={menuItem.key}>
            <span className={styles.title}>{menuItem.title}</span>
            {menuItem.icon && <span className={`${menuItem.icon} ${styles.icon}`} />}
          </span>
        );
        return (
          <SubMenu title={subMenuTitle} key={menuItem.key}>
            {generateSubmenu(menuItem.children)}
          </SubMenu>
        );
      }
      return generateItem(menuItem);
    });
  };

  return (
    <div>
      <div className={styles.logo}>
        <div className={styles.logoContainer}>
          <img src="resources/images/briing/logo.png" alt="logo" />
        </div>
      </div>
      <Menu theme="dark" onClick={handleClick} selectedKeys={selectedKeys} mode="horizontal">
        {generateMenuItems()}
      </Menu>
    </div>
  );
};

const mapStateToProps = (state) => ({
  menuData: state.menu.menuTopData,
});

export default withRouter(connect(mapStateToProps, null)(MenuTop));
