import React, {FunctionComponent} from 'react';
import {connect, ConnectedProps} from "react-redux";
import {AppState} from "../../store";
import JumboHeader from '../sections/JumboHeader';
import GenericItemExperience from "./GenericItem";

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


const DynamicContent: FunctionComponent<DynamicContentProps> = ({item}) => {
  if (!item) {
    return null
  }
  return <>
    <JumboHeader order={0} type={"JumboHeader"} content={item?.header || ''}/>
    <GenericItemExperience {...item}/>
  </>
};

export default connector(DynamicContent);