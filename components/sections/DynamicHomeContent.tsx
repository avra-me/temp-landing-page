import React, {Fragment, FunctionComponent} from 'react';
import {connect, ConnectedProps} from "react-redux";
import {AppState} from "../../store";
import {HomeItems} from "../../store/types/home";
import dynamic from "next/dynamic";
import JumboHeader from './JumboHeader';
import IconCardSection from './IconCardSection';
import HorizontalCardSection from './HorizontalCardSection';
import WaveCardSection from './WaveCardSection';

const connector = connect((state: AppState) => {
  return {items: state.home.items}
})
type ReduxProps = ConnectedProps<typeof connector>

const dynamicComponent = (componentName: HomeItems["type"]) => dynamic(() => import(`./${componentName}`), {ssr: true})


const DynamicHomeContent: FunctionComponent<ReduxProps> = ({items}) => {
  const children = items.map(item => {
    const key = `${item.order}_${item.type}`;
    const Component = dynamicComponent(item.type);
    switch (item.type) {
      case 'JumboHeader':
        return <JumboHeader key={key} {...item}/>
      case 'IconCardSection':
        return <IconCardSection key={key} {...item}/>
      case 'HorizontalCardSection':
        return <HorizontalCardSection key={key} {...item}/>
      case 'WaveCardSection':
        return <WaveCardSection key={key} {...item}/>
      case 'ContactFormSection':
        return <Component key={key} {...item}/>
    }
  })
  return <Fragment>
    {children}
  </Fragment>
};

export default connector(DynamicHomeContent);