import * as React from 'react';
import * as ReactDom from 'react-dom';
import {Version} from '@microsoft/sp-core-library';
import {
  IPropertyPaneConfiguration,
  PropertyPaneCheckbox,
  PropertyPaneDropdown,
  PropertyPaneTextField,
  PropertyPaneToggle
} from '@microsoft/sp-property-pane';
import {BaseClientSideWebPart} from '@microsoft/sp-webpart-base';

import * as strings from 'HelloWorldWebPartStrings';
import HelloWorld, {IHelloWorldProps} from './components/HelloWorld';

export interface IHelloWorldWebPartProps {
  description: string;
  test1: string;
  test2: boolean;
  test3: string;
  test4: boolean;
}

export default class HelloWorldWebPart extends BaseClientSideWebPart<IHelloWorldWebPartProps> {

  // @ts-ignore
  protected get dataVersion(): Version {
    return Version.parse('1.0');
  }

  public render(): void {
    const element: React.ReactElement<IHelloWorldProps> = React.createElement(
      HelloWorld,
      {
        serviceScope: this.context.serviceScope,
        description: this.properties.description,
        test1: this.properties.test1,
        test2: this.properties.test2,
        test3: this.properties.test3,
        test4: this.properties.test4,
        title: this.context.pageContext.web.title
      }
    );

    ReactDom.render(element, this.domElement);
  }

  protected onDispose(): void {
    ReactDom.unmountComponentAtNode(this.domElement);
  }

  protected getPropertyPaneConfiguration(): IPropertyPaneConfiguration {
    return {
      pages: [
        {
          header: {
            description: strings.PropertyPaneDescription
          },
          groups: [
            {
              groupName: strings.BasicGroupName,
              groupFields: [
                PropertyPaneTextField('description', {
                  label: strings.DescriptionFieldLabel
                }),
                PropertyPaneTextField('test1', {
                  label: strings.Test1FieldLabel,
                  multiline: true
                }),
                PropertyPaneCheckbox('test2', {
                  text: strings.Test2FieldLabel,
                  checked: true
                }),
                PropertyPaneDropdown('test3', {
                  label: strings.Test3FieldLabel,
                  options: [
                    {key: 'One', text: 'One'},
                    {key: 'Two', text: 'Two'},
                    {key: 'Three', text: 'Three'},
                    {key: 'Four', text: 'Four'}
                  ]
                }),
                PropertyPaneToggle('test4', {
                  label: strings.Test4FieldLabel,
                  onText: 'On',
                  offText: 'Off'
                })
              ]
            }
          ]
        }
      ]
    };
  }

}
