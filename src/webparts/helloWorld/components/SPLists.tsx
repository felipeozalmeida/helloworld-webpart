import * as React from 'react';
import {ISPList} from '../../../types';
import styles from './SPLists.module.scss';

export interface ISPListsProps {
  items: ISPList[];
}

export default function SPLists({items}: ISPListsProps): JSX.Element {
  return (
    <ul className={styles.list}>
      {items.map(item => (
        <li className={styles.listItem} key={item.Id}>
          <span>{item.Title}</span>
        </li>
      ))}
    </ul>
  );
}
