import type {AppState} from "../../store";
import type {AttributionItem, FooterState, SocialButton} from "../../store/types/footer";
import React, {FunctionComponent} from "react";
import {connect, ConnectedProps} from "react-redux";
import dynamic from "next/dynamic";

const Footer = dynamic(() => import("../footer/Footer"))

const connector = connect((state: AppState, props: Partial<FooterState>) => ({
  ...state.footer,
  ...props,
  isValid: !!state.footer
}))

const FooterMenu: FunctionComponent<FooterState & ConnectedProps<typeof connector>> = (
  {
    buttons,
    header,
    caption,
    disabled,
    children,
    isValid
  }) => {
  if (!isValid || disabled) {
    return null
  }
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

export default connector(FooterMenu) as FunctionComponent<Partial<FooterState>>;
