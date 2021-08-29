import Footer from "../footer/Footer";
import React, {FunctionComponent} from "react";
import {AttributionItem, FooterState, SocialButton} from "../../store/types/footer";
import {connect} from "react-redux";
import {AppState} from "../../store";

const mapStateToProps = (state: AppState, props: Partial<FooterState>) => ({
    ...state.footer,
    ...props
})

const FooterMenu: FunctionComponent<FooterState> = (
    {
        buttons,
        header,
        caption,
        disabled,
        children
    }) => {
    const socialButtons = buttons.filter(({type}) => type === 'social') as SocialButton[];
    const attributionButtons = buttons.filter(({type}) => type === 'attr') as AttributionItem[];
    return <Footer
        title={header}
        subTitle={caption}
        disabled={disabled}
        socialIcons={socialButtons}
        attributionIcons={attributionButtons}
    >{children}</Footer>;
};

export default connect(mapStateToProps)(FooterMenu) as FunctionComponent<Partial<FooterState>>;
