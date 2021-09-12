import React, {FunctionComponent} from 'react';
import {connect, ConnectedProps} from "react-redux";
import {AppState} from "../../store";
import {GenericItem} from "../../store/types/home";
import dynamic from "next/dynamic";
import JumboHeader from '../sections/JumboHeader';

type ValidSources = 'home' | 'experience' | 'education'

const connector = connect((state: AppState, props: { source: ValidSources }) => {
  if (props.source in state) {
    return {item: state[props.source].item || null}
  }
  return {item: null}
})

interface DynamicContentProps extends ConnectedProps<typeof connector> {
  source: ValidSources
}


const dynamicComponent = (componentName: GenericItem["type"]) =>
dynamic<GenericItem>(() => import(`./${componentName}`), {ssr: true})


const DynamicContent: FunctionComponent<DynamicContentProps> = ({item}) => {
  if (!item) {
    return null
  }
  const Component = dynamicComponent(item.type)
  return <>
    <JumboHeader order={0} type={"JumboHeader"} content={item?.header || ''}/>
    <Component {...item}/>
  </>
};

export default connector(DynamicContent);