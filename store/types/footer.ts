
export interface AttributionItem {
    content: string
    icon: string
    link: string
    type: 'attr'
}

export interface SocialButton {
    content: string
    icon: string
    link: string
    type: 'social'
}

export type FooterItem =  SocialButton | AttributionItem

export interface FooterState {
    buttons: (SocialButton | AttributionItem)[]
    header: string
    caption?: string
    disabled?: boolean
}

export const initialFooterState = {
    buttons: [],
    header: "",
    caption: "",
    disabled: false
}