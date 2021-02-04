import {ISPList, ISPLists} from '../types';

export class MockBasicHttpService {

  private static _items: ISPList[] = [{ Title: 'Mock List 1', Id: '1' },
                                      { Title: 'Mock List 2', Id: '2' },
                                      { Title: 'Mock List 3', Id: '3' }];

  public static get(): Promise<ISPLists> {
    return new Promise<ISPLists>(resolve => resolve({ value: MockBasicHttpService._items }));
  }

}

