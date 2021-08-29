import React, {FunctionComponent} from 'react';
import {connect, ConnectedProps} from "react-redux";
import {AppState} from "../../store";
import JumboHeaderSection from "./JumboHeaderSection";
import IconCardSection from "./IconCardSection";
import { Fragment } from 'react';
import HorizontalCardSection from "./HorizontalCardSection";


const connector = connect((state: AppState) => {
    return {items: state.home.items}
})
type ReduxProps = ConnectedProps<typeof connector>

const DynamicHomeContent: FunctionComponent<ReduxProps> = ({items}) => {
    const children = items.map(item => {
        const key = `${item.order}_${item.type}`;
        switch (item.type) {
            case 'JumboHeader':
                return <JumboHeaderSection key={key} {...item}/>
            case 'IconCardSection':
                return <IconCardSection key={key} {...item}/>
            case 'HorizontalCardSection':
                return <HorizontalCardSection key={key} {...item}/>
        }
    })
    return <Fragment>
        {children}
    </Fragment>
};

export default connector(DynamicHomeContent);