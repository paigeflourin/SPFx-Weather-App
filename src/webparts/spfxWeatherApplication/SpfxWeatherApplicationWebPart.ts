import * as React from 'react';
import * as ReactDom from 'react-dom';
import { Version } from '@microsoft/sp-core-library';
import {
  BaseClientSideWebPart,
  IPropertyPaneConfiguration,
  PropertyPaneTextField
} from '@microsoft/sp-webpart-base';

import * as strings from 'spfxWeatherApplicationStrings';
import SpfxWeatherApplication from './components/SpfxWeatherApplication';
import { ISpfxWeatherApplicationProps } from './components/ISpfxWeatherApplicationProps';
import { ISpfxWeatherApplicationWebPartProps } from './ISpfxWeatherApplicationWebPartProps';

export default class SpfxWeatherApplicationWebPart extends BaseClientSideWebPart<ISpfxWeatherApplicationWebPartProps> {

  public render(): void {
    const element: React.ReactElement<ISpfxWeatherApplicationProps > = React.createElement(
      SpfxWeatherApplication,
      {
        description: this.properties.description,
        flexDirection:this.properties.flexDirection,
        onSubmit: this.properties.onSubmit,
        dt: this.properties.dt,
        weather: this.properties.weather,
      }
    );

    ReactDom.render(element, this.domElement);
  }

  protected get dataVersion(): Version {
    return Version.parse('1.0');
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
                })
              ]
            }
          ]
        }
      ]
    };
  }
}
