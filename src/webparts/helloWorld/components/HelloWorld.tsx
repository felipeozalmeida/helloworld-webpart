import * as React from 'react';
import {Environment, EnvironmentType, ServiceScope} from '@microsoft/sp-core-library';
import {escape} from '@microsoft/sp-lodash-subset';

import {MockBasicHttpService} from '../../../services/MockBasicHttpService';
import {SPHttpService} from "../../../services/SPHttpService";
import {ISPList, ISPLists} from "../../../types";
import styles from './HelloWorld.module.scss';
import SPLists from './SPLists';

export interface IHelloWorldProps {
  serviceScope: ServiceScope;
  description: string;
  test1: string;
  test2: boolean;
  test3: string;
  test4: boolean;
  title: string;
}

export interface IHelloWorldState {
  loading: boolean;
  items: ISPList[];
}

export default class HelloWorld extends React.Component<IHelloWorldProps, IHelloWorldState> {

  public constructor(props: IHelloWorldProps) {
    super(props);
    this.state = {loading: false, items: []};
  }

  public render(): React.ReactElement<IHelloWorldProps> {
    const {description, test1, test2, test3, test4, title} = this.props;
    const {loading, items} = this.state;

    return (
      <div className={styles.helloWorld}>
        <div className={styles.container}>
          <div className={styles.row}>
            <div className={styles.column}>
              <span className={styles.title}>Welcome to SharePoint!</span>
              <p className={styles.subTitle}>Customize SharePoint experiences using Web Parts.</p>
              <p className={styles.description}>{escape(description)}</p>
              <p>Test 1: {escape(test1)}</p>
              <p>Test 2: {String(test2)}</p>
              <p>Test 3: {escape(test3)}</p>
              <p>Test 4: {String(test4)}</p>
              <p>Loading from {title}.</p>
              <a className={styles.button} href="https://aka.ms/spfx">
                <span className={styles.label}>Learn more</span>
              </a>
            </div>
          </div>
          {loading && <div>Loading...</div>}
          {!loading && !!items.length && <SPLists items={items}/>}
        </div>
      </div>
    );
  }

  public async componentDidMount(): Promise<void> {
    if (Environment.type === EnvironmentType.Local) {
      const response: ISPLists = await MockBasicHttpService.get();
      this.setState({items: response.value});
      return;
    }

    if ([EnvironmentType.SharePoint, EnvironmentType.ClassicSharePoint].indexOf(Environment.type) !== -1) {
      // Using our BasicHttpService
      // const { absoluteUrl } = this.props;
      // const url = `${absoluteUrl}/_api/web/lists?$filter=Hidden eq false`;
      // const response: any = await BasicHttpService.get(url);
      // this.setState({items: response.value});
      // return;

      // Using the newer SPHttpService
      const {serviceScope} = this.props;
      const spHttpService = serviceScope.consume(SPHttpService.serviceKey);
      const response: any = await spHttpService.getLists();
      this.setState({items: response});
      return;
    }
  }

}
